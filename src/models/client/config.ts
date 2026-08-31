import env from "@/env"

// WHY CLIENT MODELS EXISTS 

// SERVER MODELS   
// Define how data is stored and queried in the database (Prisma schemas, Mongoose models, SQL tables). They include business logic, validation, and DB operations.

// CLIENT MODELS  
// Define the shape of the data the client expects to receive from the server. They aren’t connected to the DB — they’re TypeScript interfaces, DTOs (Data Transfer Objects), or hooks that describe how the client consumes the data.

// these are the classes that we installed in the appwrite sdk and we are intializing a client object which will have our project configurations which we like api endpoint and projectID and api key which we generated on the appwrite website.
// also we are initializing objects of other classes like databases, account, avatars and storage so that we can use the methods inside those classes to make http calls to the appwrite server which will actually do our job like updating the database, create a new user and managing the database, account and other stuff

import { Client, Account, Avatars, Databases, Storage } from "appwrite";

// this object is necessary to intialize so that all the other objects are intialized using this client object which will help all the methods we use using those objects access to this crucial information to make http calls to the appwrite server to your project there 
const client = new Client()
    .setEndpoint(env.appwrite.endpoint) // Your API Endpoint
    .setProject(env.appwrite.projectId) // Your project ID
    .setDevKey(env.appwrite.apikey) // Your API key

const databases = new Databases(client)
const avatars = new Avatars(client);
const storage = new Storage(client);
const account = new Account(client);

export { client, databases, account, avatars, storage }
