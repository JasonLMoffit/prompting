const { sequelize } = require("../config/database");
const user = require("./user");
const bcrypt = require("bcryptjs");

// Define associations here when you add more models
// Example: user.hasMany(Order);

const seedDatabase = async () => {
  try {
    // Check if demo users already exist
    const existingusers = await user.findAll();

    if (existingusers.length === 0) {
      // Create demo admin user
      const adminPassword = await bcrypt.hash("demo123", 10);
      await user.create({
        email: "admin@seedco.com",
        password: adminPassword,
        firstName: "Admin",
        lastName: "user",
        role: "admin",
        isActive: true,
      });

      // Create demo customer user
      const customerPassword = await bcrypt.hash("demo123", 10);
      await user.create({
        email: "customer@seedco.com",
        password: customerPassword,
        firstName: "Demo",
        lastName: "Customer",
        role: "customer",
        isActive: true,
      });

      console.log("✅ Demo users created successfully.");
    } else {
      console.log("✅ Demo users already exist, skipping creation.");
    }
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  }
};

const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log("✅ Database models synchronized successfully.");

    // Comment out seeding to prevent automatic demo user creation
    // await seedDatabase();
  } catch (error) {
    console.error("❌ Error synchronizing database models:", error);
  }
};

module.exports = {
  sequelize,
  user,
  syncDatabase,
};
