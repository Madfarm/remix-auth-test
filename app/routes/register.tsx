import { Form } from "@remix-run/react"
import { Input } from "~/components/ui/input"
import { Button } from "~/components/ui/button"

export default function Register() {
    return (
        <main>
            <Form className="border">
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