import { DatabasesIndexType, OrderBy, Permission } from "node-appwrite"

import {db, answerCollection } from "../name"
import {databases} from "./config"

// creating a collection for storing questions data, so this function will generate a collection named questionCollection
export default async function createAnswerCollection(){
    // collection is like the whole spreadsheet tab
    await databases.createCollection(db, answerCollection, answerCollection, [
        Permission.read("any"),
        Permission.read("users"),
        Permission.create("users"),
        Permission.update("users"),
        Permission.delete("users"),
    ])
    console.log("Answer collection is created");

    // creating attributes (columns of the spreadsheet(collection)) of type "string" 

    // indexes are special data structure maintained alongside the collection which makes search queries fast
    // rows in the spreadsheet(collection) are called documents  

    // since this is a database process so it will take time so we are wrapping up all the database queries inside an array and applying a Promise.all method on it which handles multiple promises concurrently 
    await Promise.all([
        databases.createStringAttribute(db, answerCollection, "questionId", 50, true), // the size defines how much you can write in a particular string attribute
        databases.createStringAttribute(db, answerCollection, "content", 10000, true),
        databases.createStringAttribute(db, answerCollection, "authorId", 50, true),
    ])
    console.log("answer attribute created");
    
    // we do not need to create an index for the answer collection as it will be attached to the question itself 
}