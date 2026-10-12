import fs from "fs";
import path from "path";
import mongoose from "mongoose";
import { MenuItem } from "../models/MenuItem";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/bhojon-bilash";

async function seed() {
  console.log("Starting Bhojon Bilash Menu Seeding...");

  const jsonPath = path.join(process.cwd(), "data", "menu.json");
  const rawData = fs.readFileSync(jsonPath, "utf-8");
  const dishes = JSON.parse(rawData);

  try {
    console.log(`Connecting to MongoDB at: ${MONGODB_URI}`);
    await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 5000 });
    console.log("Connected to MongoDB successfully.");

    await MenuItem.deleteMany({});
    console.log("Cleared existing menu items.");

    const inserted = await MenuItem.insertMany(dishes);
    console.log(`Successfully seeded ${inserted.length} menu items into database!`);
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB.");
  }
}

seed();
