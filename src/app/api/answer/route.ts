import { answerCollection, db } from "@/models/name";
import { databases, users } from "@/models/server/config";
import { NextRequest, NextResponse } from "next/server";
import { ID } from "node-appwrite";
import { UserPrefs } from "@/store/Auth"

export async function POST(request: NextRequest){
    try {
       const { questionId, answer, authorId } = await request.json() // we are extracting these attributes that we defined in the answer collection to create a fresh document from the frontend request
        // this ID is a helper class inside the node-appwrite which generates a unique identifier required while creating documents, users etc 
        // we have to use the specific keys that we defined while creating the collection to assign values in the document(rows)
       const response = await databases.createDocument(db, answerCollection, ID.unique(), {
        content: answer,
        authorId: authorId,
        questionId: questionId
       })

    // increase author reputation because he has provided an answer on the application
    // we are grabbing the userprefs of the user using his authorId and then using the updatePrefs method we are updating the grabbed reputation by 1
    const prefs = await users.getPrefs<UserPrefs>(authorId)
    await users.updatePrefs(authorId, {
        reputation: Number(prefs.reputation) + 1
    })

    return NextResponse.json(response, {
        status: 201
    })

    } catch (error: any) {
        return NextResponse.json(
            {
                message: error?.message || "Error while creating answer"
            },{
                status: error?.status || error?.code || 500
            }
        )
    }
}

export async function DELETE(request: NextRequest){
    try {
        const answerId = await request.json()
        const answer = await databases.getDocument(db, answerCollection, answerId)
        const response = await databases.deleteDocument(db, answerCollection, answerId )

        // decrease the reputation of the user  
        const prefs = await users.getPrefs<UserPrefs>(answer.authorId)
        await users.updatePrefs(answer.authorId, {
            reputation: Number(prefs.reputation) - 1
        })

        return NextResponse.json(
            {data: response}, 
            {status: 201}
        )

    } catch (error: any) {
        return NextResponse.json(
            {
                message: error?.message || "Error while deleting answer"
            },{
                status: error?.status || error?.code || 500
            }
        )
    }
}