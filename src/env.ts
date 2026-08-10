// we are creating a seperate file where we are storing all the .env variables under an object under different key names so that we do not have to write this big ass line everytime to access these variables
// casting the variabls as stirng to make sure that the keys are always a string

const env = {
    appwrite: {
        endpoint: String(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT),
        projectId: String(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID),
        apikey: String(process.env.APPWRITE_API_KEY),
        databaseId: String(process.env.APPWRITE_DATABASE_ID)
    }
}

export default env