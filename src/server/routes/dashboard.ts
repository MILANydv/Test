import express from 'express';
import { prisma } from '../../integrations/prisma';
import { authMiddleware, type AuthRequest } from '../middleware/auth';

const router = express.Router();

router.use(authMiddleware);

router.get('/metrics', async (req, res) => {
  try {
    const { organizationId } = (req as AuthRequest).user || {};

    const totalReferrals = await prisma.referral.count({
      where: organizationId
        ? {
            campaign: {
              organizationId,
            },
          }
        : {},
    });

    const activeReferrals = await prisma.referral.count({
      where: {
        status: 'ACTIVE',
        ...(organizationId && {
          campaign: {
            organizationId,
          },
        }),
      },
    });

    const convertedReferrals = await prisma.referral.count({
      where: {
        status: 'CONVERTED',
        ...(organizationId && {
          campaign: {
            organizationId,
          },
        }),
      },
    });

    const rewards = await prisma.referralReward.aggregate({
      where: organizationId
        ? {
            referral: {
              campaign: {
                organizationId,
              },
            },
          }
        : {},
      _sum: {
        amount: true,
      },
    });

    const pendingRewards = await prisma.referralReward.aggregate({
      where: {
        status: 'PENDING',
        ...(organizationId && {
          referral: {
            campaign: {
              organizationId,
            },
          },
        }),
      },
      _sum: {
        amount: true,
      },
    });

    const paidRewards = await prisma.referralReward.aggregate({
      where: {
        status: 'PAID',
        ...(organizationId && {
          referral: {
            campaign: {
              organizationId,
            },
          },
        }),
      },
      _sum: {
        amount: true,
      },
    });

    const topReferrers = await prisma.user.findMany({
      where: {
        role: 'REFERRER',
        ...(organizationId && { organizationId }),
      },
      include: {
        referralsMade: {
          include: {
            rewards: true,
          },
        },
      },
      take: 5,
    });

    const topReferrersData = topReferrers.map((user) => ({
      userId: user.id,
      name: user.name,
      referralCount: user.referralsMade.length,
      totalCommission: user.referralsMade.reduce(
        (sum, referral) =>
          sum +
          referral.rewards.reduce((rewardSum, reward) => rewardSum + reward.amount, 0),
        0
      ),
    }));

    const conversionRate =
      totalReferrals > 0 ? convertedReferrals / totalReferrals : 0;

    res.json({
      totalReferrals,
      activeReferrals,
      convertedReferrals,
      totalCommissions: rewards._sum.amount || 0,
      pendingCommissions: pendingRewards._sum.amount || 0,
      paidCommissions: paidRewards._sum.amount || 0,
      conversionRate,
      topReferrers: topReferrersData,
    });
  } catch (error) {
    console.error('Get metrics error:', error);
    res.status(500).json({ error: 'Failed to fetch metrics' });
  }
});

export default router;
