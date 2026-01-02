import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create demo organization
  const organization = await prisma.organization.create({
    data: {
      name: 'Demo Retail Nepal',
      email: 'contact@demoretail.np',
      phone: '+977-9841234567',
      pan: '123456789',
      vat: 'VAT123456',
      address: 'Thamel, Kathmandu',
      city: 'Kathmandu',
      country: 'Nepal',
      active: true,
    },
  });

  console.log('✅ Created organization:', organization.name);

  // Create demo users
  const hashedPassword = await bcrypt.hash('password123', 10);

  const businessOwner = await prisma.user.create({
    data: {
      email: 'owner@demoretail.np',
      name: 'Rajesh Sharma',
      password: hashedPassword,
      phone: '+977-9841111111',
      role: 'BUSINESS_OWNER',
      organizationId: organization.id,
      active: true,
    },
  });

  console.log('✅ Created business owner:', businessOwner.email);

  const storeManager = await prisma.user.create({
    data: {
      email: 'manager@demoretail.np',
      name: 'Sita Thapa',
      password: hashedPassword,
      phone: '+977-9841222222',
      role: 'STORE_MANAGER',
      organizationId: organization.id,
      active: true,
    },
  });

  console.log('✅ Created store manager:', storeManager.email);

  const referrer1 = await prisma.user.create({
    data: {
      email: 'referrer1@demoretail.np',
      name: 'Kumar Rai',
      password: hashedPassword,
      phone: '+977-9841333333',
      role: 'REFERRER',
      organizationId: organization.id,
      active: true,
    },
  });

  const referrer2 = await prisma.user.create({
    data: {
      email: 'referrer2@demoretail.np',
      name: 'Maya Gurung',
      password: hashedPassword,
      phone: '+977-9841444444',
      role: 'REFERRER',
      organizationId: organization.id,
      active: true,
    },
  });

  console.log('✅ Created referrers:', referrer1.email, referrer2.email);

  // Create demo stores
  const store1 = await prisma.store.create({
    data: {
      name: 'Thamel Branch',
      organizationId: organization.id,
      address: 'Thamel Marg, Kathmandu',
      city: 'Kathmandu',
      phone: '+977-01-4123456',
      active: true,
    },
  });

  const store2 = await prisma.store.create({
    data: {
      name: 'Pokhara Branch',
      organizationId: organization.id,
      address: 'Lakeside, Pokhara',
      city: 'Pokhara',
      phone: '+977-061-123456',
      active: true,
    },
  });

  console.log('✅ Created stores:', store1.name, store2.name);

  // Create demo campaigns
  const campaign1 = await prisma.campaign.create({
    data: {
      name: 'New Year 2081 Referral Campaign',
      description: 'Refer friends and earn rewards during New Year celebration',
      organizationId: organization.id,
      commissionType: 'PERCENTAGE',
      commissionValue: 10,
      status: 'ACTIVE',
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-12-31'),
      targetReferrals: 100,
      maxCommissionPerReferrer: 50000,
      terms: 'Valid for all new customers. Commission paid after customer makes first purchase.',
      active: true,
    },
  });

  const campaign2 = await prisma.campaign.create({
    data: {
      name: 'Summer Sale Referral Bonus',
      description: 'Flat bonus for every successful referral',
      organizationId: organization.id,
      commissionType: 'FLAT',
      commissionValue: 500,
      status: 'ACTIVE',
      startDate: new Date('2024-06-01'),
      endDate: new Date('2024-08-31'),
      targetReferrals: 50,
      terms: 'Flat NPR 500 per successful referral. Customer must make purchase within 30 days.',
      active: true,
    },
  });

  console.log('✅ Created campaigns:', campaign1.name, campaign2.name);

  // Link campaigns to stores
  await prisma.campaignStore.createMany({
    data: [
      { campaignId: campaign1.id, storeId: store1.id },
      { campaignId: campaign1.id, storeId: store2.id },
      { campaignId: campaign2.id, storeId: store1.id },
    ],
  });

  console.log('✅ Linked campaigns to stores');

  // Create demo referrals
  const referral1 = await prisma.referral.create({
    data: {
      referralCode: 'REF-KUMAR-001',
      campaignId: campaign1.id,
      storeId: store1.id,
      referrerId: referrer1.id,
      referredName: 'Priya Poudel',
      referredEmail: 'priya@example.com',
      referredPhone: '+977-9845555555',
      source: 'WhatsApp',
      status: 'CONVERTED',
    },
  });

  const referral2 = await prisma.referral.create({
    data: {
      referralCode: 'REF-KUMAR-002',
      campaignId: campaign1.id,
      storeId: store1.id,
      referrerId: referrer1.id,
      referredName: 'Santosh Tamang',
      referredEmail: 'santosh@example.com',
      referredPhone: '+977-9846666666',
      source: 'Facebook',
      status: 'ACTIVE',
    },
  });

  const referral3 = await prisma.referral.create({
    data: {
      referralCode: 'REF-MAYA-001',
      campaignId: campaign2.id,
      storeId: store2.id,
      referrerId: referrer2.id,
      referredName: 'Bikash Shrestha',
      referredEmail: 'bikash@example.com',
      referredPhone: '+977-9847777777',
      source: 'Direct',
      status: 'SIGNED_UP',
    },
  });

  console.log('✅ Created referrals:', referral1.referralCode, referral2.referralCode, referral3.referralCode);

  // Create demo rewards
  const reward1 = await prisma.referralReward.create({
    data: {
      referralId: referral1.id,
      userId: referrer1.id,
      amount: 1000,
      currency: 'NPR',
      commissionType: 'PERCENTAGE',
      status: 'APPROVED',
      approvedBy: businessOwner.id,
      approvedAt: new Date(),
    },
  });

  const reward2 = await prisma.referralReward.create({
    data: {
      referralId: referral2.id,
      userId: referrer1.id,
      amount: 750,
      currency: 'NPR',
      commissionType: 'PERCENTAGE',
      status: 'PENDING',
    },
  });

  const reward3 = await prisma.referralReward.create({
    data: {
      referralId: referral3.id,
      userId: referrer2.id,
      amount: 500,
      currency: 'NPR',
      commissionType: 'FLAT',
      status: 'PENDING',
    },
  });

  console.log('✅ Created rewards');

  // Create audit log entries
  await prisma.auditLog.create({
    data: {
      userId: businessOwner.id,
      organizationId: organization.id,
      action: 'CREATE',
      entity: 'Campaign',
      entityId: campaign1.id,
      changes: { name: campaign1.name, status: 'ACTIVE' },
    },
  });

  console.log('✅ Created audit logs');

  console.log('');
  console.log('🎉 Database seeded successfully!');
  console.log('');
  console.log('📝 Demo Login Credentials:');
  console.log('   Business Owner: owner@demoretail.np / password123');
  console.log('   Store Manager:  manager@demoretail.np / password123');
  console.log('   Referrer 1:     referrer1@demoretail.np / password123');
  console.log('   Referrer 2:     referrer2@demoretail.np / password123');
  console.log('');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
