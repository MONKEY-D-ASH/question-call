import { Permission } from "node-appwrite"
import { questionAttachmentBucket } from "../name"
import { storage } from "./config"

// The Appwrite Storage product lets you manage project files like images, videos, PDFs, and documents. It handles uploads, downloads, and security permissions, while offering built-in file chunking, encryption, antivirus scanning, and on-the-fly image transformations without requiring a separate media stack.
// so here we will first try to get the existing storage from the appwrite and if there is none existing then we will create one in the error part of the try catch block
export default async function getOrCreateStorage() {
    try {
        await storage.getBucket(questionAttachmentBucket);
        console.log("Storage Connected");
    } catch (error) {
        try {
            // we are creating a new storage bucket here which will support the following file extensions 
            await storage.createBucket(
                questionAttachmentBucket,
                questionAttachmentBucket,
                [
                    Permission.create("users"),
                    Permission.read("any"),
                    Permission.read("users"),
                    Permission.update("users"),
                    Permission.delete("users"),
                ],
                false, // When set to true, individual files within the bucket can enforce their own custom permissions alongside bucket-level controls.
                undefined, // true here toggles bucket availability
                undefined, // maximum file size is undefined 
                ["jpg", "png", "gif", "jpeg", "webp", "heic"]
            );
        } catch (error) {
            console.log("Error creating storage:", error);
        }
    }
}