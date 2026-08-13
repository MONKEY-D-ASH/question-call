import { DatabasesIndexType, DatabaseStatus, OrderBy, Permission } from "node-appwrite"

import {db, questionCollection } from "../name"
import {databases} from "./config"

// creating a collection for storing questions data, so this function will generate a collection named questionCollection
export default async function createQuestionCollection(){
    // collection is like the whole spreadsheet tab
    await databases.createCollection(db, questionCollection, questionCollection, [
        Permission.read("any"),
        Permission.read("users"),
        Permission.create("users"),
        Permission.update("users"),
        Permission.delete("users"),
    ])
    console.log("question collection is created");

    // creating attributes (columns of the spreadsheet(collection)) of type "string" 
    // indexes are special data structure maintained alongside the collection which makes search queries fast
    // rows in the spreadsheet(collection) are called documents  

    // since this is a database process so it will take time so we are wrapping up all the database queries inside an array and applying a Promise.all method on it which handles multiple promises concurrently 
    await Promise.all([
        databases.createStringAttribute(db, questionCollection, "title", 100, true), // the size defines how much you can write in a particular string attribute
        databases.createStringAttribute(db, questionCollection, "content", 10000, true),
        databases.createStringAttribute(db, questionCollection, "authorId", 50, true),
        databases.createStringAttribute(db, questionCollection, "tags", 50, true, undefined, true), // setting undefined as the default value and since a question can have mutliple tags we are setting array of values as true 
        databases.createStringAttribute(db, questionCollection, "attachmentId", 50,  false)
    ])
    console.log("Question attribute created");
    
    // create Indexes

    await Promise.all([
        databases.createIndex(db, questionCollection, "title", DatabasesIndexType.Fulltext , ["title"], [OrderBy.Asc]), // we are selecting fulltext from the DatabaseIndexType enums and ordering this index values in ascending order
        databases.createIndex(db, questionCollection, "content", DatabasesIndexType.Fulltext , ["content"], [OrderBy.Asc]),
    ])
}