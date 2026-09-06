"use client"
import { useAuthStore } from "@/store/Auth"
import React from "react"

// this is the register page where we will register the user and create an account for him for which we are using the createAccount() method in we defined in the useAuthStore react hook created using zustand
// in the handleSubmit function we are explicitly defining which type of event is gonna trigger this async function which is a reactFormEvent and that too of an HTMLFormElement and we are preventing the obvious default event which is to reload the web page dom structure

function RegisterPage(){
    const {createAccount, login} = useAuthStore()
    const [isLoading, setIsLoading] = React.useState(false)
    const [error, setError] = React.useState("")

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        // collect data : we are using the FormData method to grab all the input from the form which is the e.currentTarget and then storing each data from the formData instance 
        const formData = new FormData(e.currentTarget)
        const firstname = formData.get("firstname")
        const lastname = formData.get("lastname")
        const email = formData.get("email")
        const password = formData.get("password")

        // validate data
        if (!firstname || !lastname || !email || !password) {
            setError("please fill out all the fields")
            return 
        }

        // call the store 
        setIsLoading(true) // to show the user that we are processing and creating the account 
        setError("") // because before calling the store we have to reset all the errors 

        const response = await createAccount(
            `${firstname} ${lastname}`,
            email?.toString(),
            password?.toString()
        )

        if (response.error) {
            setError(() => response.error!.message) // here we are forcefully extracting the error error message from response 
        } else {
            // we can also redirect the user to the login page but since he has already registered himself it is safe to login the user on the go 
            const loginResponse = await login(email.toString(), password.toString())
            if (loginResponse.error) {
                setError(() => loginResponse.error!.message)
            }
        }

        setIsLoading(false) // to show the user that the account has been created successfully 
    }

    return (
        <div>
            {error && (
                <p>{error}</p>
            )}

            <form onSubmit={handleSubmit}>
            </form>
        </div>
    )
}

export default RegisterPage