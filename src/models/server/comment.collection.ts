import { Permission } from "node-appwrite"
import { db, commentCollection } from "../name"
import { databases } from "./config"

export default async function createCommentCollection() {
    // creating collection 
    await databases.createCollection(db, commentCollection, commentCollection, [
        Permission.create("users"),
        Permission.read("any"),
        Permission.read("users"),
        Permission.update("users"),
        Permission.delete("users"),
    ] )
    console.log("Comment Collection Created");

    // creating Attributes
    await Promise.all([
        databases.createStringAttribute(db, commentCollection, "content", 10000, true),
        databases.createEnumAttribute(db, commentCollection, "type", ["answer", "question"], true), // this is an enum attribute which is use to provide accepted values that this field could accquire 
        databases.createStringAttribute(db, commentCollection, "typeId", 50, true), // this comment will be connected to the document of the type which is entered in the enum above if the comment is on an answer it will store the id of that answer document and if the comment is on a question it will store the id of that question document
        databases.createStringAttribute(db, commentCollection, "authorId", 50, true), // this comment will be connected to the author document from the authors or users collection  
    ])
    
}