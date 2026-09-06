"use client"
// the whole idea of the layout is to containerize all the file inside the auth folder just like inside the src folder you have a layout file 

import { useAuthStore } from "@/store/Auth"
import { useRouter } from "next/router";
import React from "react";

//  so the layout is a react component which takes children as its arguments and we are also defining the type of the chidren argument which is the reactNode type and then we are querying the useAuthStore() which is stored in the browser storage from which we are extracting the session variable so that we can know if there is an active session going on or we can say the user is logged in
// we are using the reactRouter to re-route the user if there is no active session present or the user is not present
// we are using the second if conditional statement because in that milliseconds of time while the user is getting directed to the home page, the react will still try to render the children on the screen so to prevent that we are using the second if conditional statement so the react definately know not to render the children component 
// if the session is present then we are gonna display the "children" component  

const Layout = ({children}: {children: React.ReactNode}) => {
    const {session} = useAuthStore();
    const router = useRouter()

    React.useEffect(() => {
        if (!session) {
            router.push("/")
        }
    }, [session, router])

    if (!session) {
        return null;
    }

    return (
        <div className="">
            <div className="">{children}</div>
        </div>
    )
}

export default Layout