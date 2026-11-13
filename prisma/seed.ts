import { PrismaClient, Plan, Role } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("Password123!", 10);

  // 1 Organization: slug: "acme", name: "Acme Inc", plan FREE
  const org = await prisma.organization.upsert({
    where: { slug: "acme" },
    update: {},
    create: {
      slug: "acme",
      name: "Acme Inc",
      plan: Plan.FREE,
    },
  });

  // 2 Departments under Acme: Engineering, Sales
  const engDept = await prisma.department.upsert({
    where: {
      orgId_name: {
        orgId: org.id,
        name: "Engineering",
      },
    },
    update: {},
    create: {
      orgId: org.id,
      name: "Engineering",
      description: "Engineering and Development",
    },
  });

  await prisma.department.upsert({
    where: {
      orgId_name: {
        orgId: org.id,
        name: "Sales",
      },
    },
    update: {},
    create: {
      orgId: org.id,
      name: "Sales",
      description: "Sales and Marketing",
    },
  });

  // 3 Users under Acme:
  // admin@acme.test — role ADMIN
  // manager@acme.test — role MANAGER
  // staff@acme.test — role STAFF
  await prisma.user.upsert({
    where: {
      orgId_email: {
        orgId: org.id,
        email: "admin@acme.test",
      },
    },
    update: {
      passwordHash,
      role: Role.ADMIN,
    },
    create: {
      orgId: org.id,
      email: "admin@acme.test",
      name: "Acme Admin",
      passwordHash,
      role: Role.ADMIN,
    },
  });

  await prisma.user.upsert({
    where: {
      orgId_email: {
        orgId: org.id,
        email: "manager@acme.test",
      },
    },
    update: {
      passwordHash,
      role: Role.MANAGER,
    },
    create: {
      orgId: org.id,
      email: "manager@acme.test",
      name: "Acme Manager",
      passwordHash,
      role: Role.MANAGER,
    },
  });

  const staffUser = await prisma.user.upsert({
    where: {
      orgId_email: {
        orgId: org.id,
        email: "staff@acme.test",
      },
    },
    update: {
      passwordHash,
      role: Role.STAFF,
    },
    create: {
      orgId: org.id,
      email: "staff@acme.test",
      name: "Acme Staff",
      passwordHash,
      role: Role.STAFF,
    },
  });

  // 1 StaffProfile for the STAFF user: employeeCode: "EMP-001", department Engineering, position: "Software Engineer", hireDate: 2024-01-15
  await prisma.staffProfile.upsert({
    where: {
      userId: staffUser.id,
    },
    update: {
      employeeCode: "EMP-001",
      departmentId: engDept.id,
      position: "Software Engineer",
      hireDate: new Date("2024-01-15T00:00:00.000Z"),
    },
    create: {
      userId: staffUser.id,
      orgId: org.id,
      employeeCode: "EMP-001",
      departmentId: engDept.id,
      position: "Software Engineer",
      hireDate: new Date("2024-01-15T00:00:00.000Z"),
    },
  });

  console.log("Seed completed successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
