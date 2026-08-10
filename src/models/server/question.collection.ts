import { Permission } from "node-appwrite"

import {db, questionCollection } from "../name"
import {databases} from "../client/config"

export default async function createQuestionCollection(){
    // create collection
    await databases.createCollection(db, questionCollection, questionCollection, [
        Permission.read("any"),
        Permission.read("users"),
        Permission.create("users"),
        Permission.update("users"),
        Permission.delete("users"),
    ])
    console.log("question collection is created");
    
}