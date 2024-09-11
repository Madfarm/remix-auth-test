import { Form } from "@remix-run/react"
import { Input } from "~/components/ui/input"
import { Button } from "~/components/ui/button"

export default function Register() {
    return (
        <main className="flex items-center justify-center my-8">
            <Form className="border border-solid rounded-sm w-2/3 space-y-6 p-12">
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