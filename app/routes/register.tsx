import { Input } from "~/components/ui/input"
import { Button } from "~/components/ui/button"
import authenticator from "~/services/auth.server"


import type { ActionFunctionArgs } from "@remix-run/node"
import { 
    Form,
} from "@remix-run/react"

export const action = async ({
    request
}: ActionFunctionArgs) => {
    return await authenticator.authenticate("form",  request, {
        successRedirect: "/",
        failureRedirect: "/login"
    })
}


export default function Register() {
    return (
        <main className="flex items-center justify-center my-8">
            <Form 
                className="border border-solid rounded-sm w-2/3 space-y-6 p-12"
                method="post"
            >
                <h2>Register</h2>
                <Input 
                    type="text" 
                    placeholder="Username"
                    aria-label="Username"
                    name="userName" 
                />
                <Input 
                    type="password" 
                    placeholder="Password"
                    aria-label="Password"
                    name="password" 
                />
                <Button type="submit">Submit</Button>
            </Form>
        </main>
    )
}