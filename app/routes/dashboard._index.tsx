import { json, Outlet } from "@remix-run/react";
import { LoaderFunctionArgs } from "react-router";
import authenticator from "~/services/auth.server";

export const loader = async ({
    request
}: LoaderFunctionArgs) => {
    let user = await authenticator.isAuthenticated(request, {
        failureRedirect: "/auth/login"
    })

    return json({ user })
}


export default function Dashboard() {

    return (
        <main className="w-screen h-screen">
            <div className="flex flex-col w-64 h-screen border-r-2 bg-secondary">
                <h1>Orders</h1>
                <div>
                    
                </div>

                <nav>

                </nav>
            </div>
            <Outlet />
        </main>
    )
}