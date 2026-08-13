import env from "@/env";

// what we are doing here is we are initializing objects of the classes from the node-appwrite package and we are intializing these objects with the client object which will include our api endpoints and projectId in these objects so they will already have those information with them 

import {Avatars, Client, Databases, Storage, Users} from "node-appwrite"

let client = new Client();

client
    .setEndpoint(env.appwrite.endpoint) // Your API Endpoint
    .setProject(env.appwrite.projectId) // Your project ID
    .setKey(env.appwrite.apikey) // Your secret API key   
;

const databases = new Databases(client)
const avatars = new Avatars(client);
const storage = new Storage(client);
const users = new Users(client)


export { client, databases, users, avatars, storage}