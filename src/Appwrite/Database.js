import { Client, Databases } from 'appwrite';
import config from "../Configure/Config";

// Initialize Appwrite client
const client = new Client();

client
  .setEndpoint(config.appwriteUrl) // Use config values
  .setProject(config.appwriteProjectid);

// Export databases instance
export const databases = new Databases(client);

// Export IDs from config
export const databaseId = config.appwriteDatabaseid;
export const contactCollectionId = config.appwriteCollectionid; // if it's the same contact collection
export const bookingCollectionId = config.appwritebookingid;



