import { answerCollection, db, questionCollection, voteCollection } from "@/models/name";
import { databases, users } from "@/models/server/config";
import { UserPrefs } from "@/store/Auth";
import { NextRequest, NextResponse } from "next/server";
import { Query } from "node-appwrite";
import {ID} from "node-appwrite"

export async function POST(request: NextRequest){
    try {
        // grab the data from the request
        const {voteById, voteStatus, type, typeId} = await request.json()

        // list document: here the Query is a helper class that is used to build structured filter, sorting and pagination statements for database requests, the SDK converts this to a js object and then stringify it and then send it to the appwrite database where appwrite server returns the documents which matches the query 
        const response = await databases.listDocuments(db, voteCollection,[
            Query.equal("type", type),
            Query.equal("typeId", typeId),
            Query.equal("voteById", voteById),
        ] )

        // this means if there is a already a document with the exact vote which means the length > 0 that the user is sending the request for right now again, so we are just deleting the document at the 0th position of the array
        if (response.documents.length > 0) {
            await databases.deleteDocument(db, voteCollection, response.documents[0].$id)
            
            // decrease the reputation as the user is clicking the button again

            const QuestionOrAnswer = await databases.getDocument(
                db,
                type === "question" ? questionCollection: answerCollection, 
                typeId
            )
            // using the document of the question or the answer on which the vote has been made , we are grabbing the user which matches the authorId which is extracted from the above document
            // The users here is an instance or object of the Users service in Appwrite that lets you manage user accounts from the server side (different from account, which is client‑side for the currently logged‑in user).

            const authorPrefs = await users.getPrefs<UserPrefs>(QuestionOrAnswer.authorId)

            // updating the reputation of the user whose question or answer has been clicked by the logged in user , basically the person who wrote the answer or the question

            await users.updatePrefs<UserPrefs>(QuestionOrAnswer.authorId, {reputation: response.documents[0].voteStatus === "upvoted" ? Number(authorPrefs.reputation) - 1 : Number(authorPrefs.reputation) + 1 })
        } 

        // that means prevoious vote does not exists (meaning this is a fresh vote by the user) or vote status changes  
        if (response.documents[0]?.voteStatus !== voteStatus) {
            const doc = await databases.createDocument(db, voteCollection, ID.unique(),{
                type,
                typeId,
                voteStatus,
                voteById
            })
            // handle the reputation: increase or decrease the reputation 
            const QuestionOrAnswer = await databases.getDocument(
                db,
                type === "question" ? questionCollection : answerCollection,
                typeId
            )
            const authorPrefs = await users.getPrefs<UserPrefs>(QuestionOrAnswer.authorId)
            
            // if vote was present 
            if(response.documents[0]){
                // that means previous vote was "upvoted" and new value is "downvoted" so we have to decrease the reputation
                await users.updatePrefs<UserPrefs>(QuestionOrAnswer.authorId, {
                    reputation: response.documents[0].voteStatus === "upvoted" ? Number(authorPrefs.reputation) -1 : Number(authorPrefs.reputation) + 1
                })
            } else {
                // if vote is not present then we have to increase or decrease the reputation of the user solely based on the voteStatus of the new created document , so if the status is "upvoted" we increase reputation or voteStatus is "downvoted" then we decrease the reputation of the user
                await users.updatePrefs<UserPrefs>(QuestionOrAnswer.authorid, {
                    reputation: voteStatus === "upvoted" ? Number(authorPrefs.reputation) + 1: Number(authorPrefs.reputation) - 1
                })
            }

        }

        // what we are doing here is we are calculating all the upvotes and all the downvotes of that particular question or answer and then subracting it in the response so that we can have the total votes on that particular question or answer
        const [upvotes, downvotes] = await Promise.all([
            databases.listDocuments(db, voteCollection, [
                Query.equal("type", type),
                Query.equal("typeId", typeId),
                Query.equal("voteStatus", "upvoted"),
                Query.equal("voteById", voteById),
                Query.limit(1),
            ]),
            databases.listDocuments(db, voteCollection, [
                Query.equal("type", type),
                Query.equal("typeId", typeId),
                Query.equal("voteStatus", "downvoted"),
                Query.equal("voteById", voteById),
                Query.limit(1)  
            ]),
        ])

        return NextResponse.json(
            {
                data: {
                    document: null,
                    voteResult: upvotes.total - downvotes.total
                },
                message: "vote Withdrawn"
            },
            {status: 200}
        )

    } catch (error: any) {
        return NextResponse.json(
        {
            message: error?.message || "There is an error while handling the vote"
        },
        {
            status: error?.status || error?.code || 500
        })
    }
}