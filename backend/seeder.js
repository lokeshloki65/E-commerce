import products from "./data/products.js";
import users from "./data/users.js";
import Product from "./model/productModel.js";
import User from "./model/userModal.js";

import connectDB from "./config/db.js";

connectDB();

const importData = async () => {
  try {
    // Clear existing data
    await Product.deleteMany();
    await User.deleteMany();

    // Log the start of seeding
    console.log("Starting data import...");
    console.log(`Found ${users.length} users to import`);
    console.log(`Found ${products.length} products to import`);

    // Insert users
    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;
    console.log("Users imported successfully");
    console.log("Admin user ID:", adminUser);

    // Add admin user to products
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    // Insert products
    await Product.insertMany(sampleProducts);
    console.log(`${sampleProducts.length} products imported successfully`);

    console.log("Data import completed");
    process.exit();
  } catch (error) {
    console.error("Error importing data:", error.message);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();
    console.log("Data destroyed successfully");
    process.exit();
  } catch (error) {
    console.error("Error destroying data:", error.message);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
