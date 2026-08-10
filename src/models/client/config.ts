import env from "@/env"

// these are the classes that we installed in the appwrite sdk and we are intializing a client object which will have our project configurations which we like api endpoint and projectID and api key which we generated on the appwrite website.
// also we are initializing objects of other classes like databases, account, avatars and storage so that we can use the methods inside those classes to make http calls to the appwrite server which will actually do our job like updating the database, create a new user and managing the database, account and other stuff

import { Client, Avatars, Databases, Storage, Users } from "node-appwrite";

// this object is necessary to intialize so that all the other objects are intialized using this client object which will help all the methods we use using those objects access to this crucial information to make http calls to the appwrite server to your project there 
const client = new Client()
    .setEndpoint(env.appwrite.endpoint) // Your API Endpoint
    .setProject(env.appwrite.projectId) // Your project ID
    .setDevKey(env.appwrite.apikey) // Your API key

const databases = new Databases(client)
const avatars = new Avatars(client);
const storage = new Storage(client);
const users = new Users(client);

export { client, databases, users, avatars, storage }
