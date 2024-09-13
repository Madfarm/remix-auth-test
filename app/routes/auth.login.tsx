import { Input } from "~/components/ui/input"
import { Button } from "~/components/ui/button"
import authenticator from "~/services/auth.server"
import { AuthorizationError } from "remix-auth"



import type { ActionFunctionArgs } from "@remix-run/node"
import { 
    Form,
} from "@remix-run/react"

export const action = async ({
    request
}: ActionFunctionArgs) => {
    try {
        return await authenticator.authenticate("form",  request, {
            successRedirect: "/",
            throwOnError: true
        })
    } catch(error){
        if (error instanceof Response) return error;
        if (error instanceof AuthorizationError) {
            return error;
        }
    }
}


export default function Login() {
    return (
        <main className="flex items-center justify-center my-8">
            <Form 
                className="border border-solid rounded-sm w-2/3 space-y-6 p-12"
                method="post"
            >
                <h2>Login</h2>
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
                <Button type="submit">Login</Button>
            </Form>
        </main>
    )
}