import express from 'express';
import { prisma } from '../../integrations/prisma';
import { authMiddleware, type AuthRequest } from '../middleware/auth';

const router = express.Router();

router.use(authMiddleware);

router.get('/', async (req, res) => {
  try {
    const { organizationId } = (req as AuthRequest).user || {};

    const referrals = await prisma.referral.findMany({
      where: organizationId
        ? {
            campaign: {
              organizationId,
            },
          }
        : {},
      include: {
        campaign: true,
        store: true,
        referrer: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json(referrals);
  } catch (error) {
    console.error('Get referrals error:', error);
    res.status(500).json({ error: 'Failed to fetch referrals' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const referral = await prisma.referral.findUnique({
      where: { id },
      include: {
        campaign: true,
        store: true,
        referrer: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!referral) {
      return res.status(404).json({ error: 'Referral not found' });
    }

    res.json(referral);
  } catch (error) {
    console.error('Get referral error:', error);
    res.status(500).json({ error: 'Failed to fetch referral' });
  }
});

router.post('/', async (req, res) => {
  try {
    const referralData = req.body;

    const referral = await prisma.referral.create({
      data: referralData,
    });

    res.json(referral);
  } catch (error) {
    console.error('Create referral error:', error);
    res.status(500).json({ error: 'Failed to create referral' });
  }
});

export default router;
