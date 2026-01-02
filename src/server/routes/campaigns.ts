import express from 'express';
import { prisma } from '../../integrations/prisma';
import { authMiddleware, type AuthRequest } from '../middleware/auth';

const router = express.Router();

router.use(authMiddleware);

router.get('/', async (req, res) => {
  try {
    const { organizationId } = (req as AuthRequest).user || {};

    const campaigns = await prisma.campaign.findMany({
      where: organizationId ? { organizationId } : {},
      include: {
        organization: true,
        campaignStores: {
          include: {
            store: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json(campaigns);
  } catch (error) {
    console.error('Get campaigns error:', error);
    res.status(500).json({ error: 'Failed to fetch campaigns' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const campaign = await prisma.campaign.findUnique({
      where: { id },
      include: {
        organization: true,
        campaignStores: {
          include: {
            store: true,
          },
        },
      },
    });

    if (!campaign) {
      return res.status(404).json({ error: 'Campaign not found' });
    }

    res.json(campaign);
  } catch (error) {
    console.error('Get campaign error:', error);
    res.status(500).json({ error: 'Failed to fetch campaign' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { organizationId } = (req as AuthRequest).user || {};
    const campaignData = req.body;

    const campaign = await prisma.campaign.create({
      data: {
        ...campaignData,
        organizationId,
      },
    });

    res.json(campaign);
  } catch (error) {
    console.error('Create campaign error:', error);
    res.status(500).json({ error: 'Failed to create campaign' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const campaignData = req.body;

    const campaign = await prisma.campaign.update({
      where: { id },
      data: campaignData,
    });

    res.json(campaign);
  } catch (error) {
    console.error('Update campaign error:', error);
    res.status(500).json({ error: 'Failed to update campaign' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.campaign.delete({
      where: { id },
    });

    res.json({ message: 'Campaign deleted successfully' });
  } catch (error) {
    console.error('Delete campaign error:', error);
    res.status(500).json({ error: 'Failed to delete campaign' });
  }
});

export default router;
