import { Input } from "~/components/ui/input"
import { Button } from "~/components/ui/button"
import authenticator from "~/services/auth.server"



import type { ActionFunctionArgs } from "@remix-run/node"
import { 
    Form,
} from "@remix-run/react"
import { RegisterUser } from "~/services/db.server"

export const action = async ({
    request
}: ActionFunctionArgs) => {
    const clonedReq = request.clone()

    const form = await request.formData();
    const username = form.get('userName') as string;
    const password = form.get('password') as string;

    await RegisterUser({ userName: username, password: password});

    return await authenticator.authenticate("form",  clonedReq, {
        successRedirect: "/dashboard",
        failureRedirect: "/auth/login",
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