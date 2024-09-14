import { json, Outlet, redirect, useLoaderData } from "@remix-run/react";
import { LoaderFunctionArgs } from "react-router";
import authenticator from "~/services/auth.server";
import { getUserByName, OrderType } from "~/services/db.server";
import { AuthUser } from "~/services/session.server";

type LoaderData = {
    orders: OrderType[]
}


export const loader = async ({
    request
}: LoaderFunctionArgs) => {
    let user: AuthUser | Error | null = await authenticator.isAuthenticated(request, {
        failureRedirect: "/auth/login"
    })

    if(user == null) {
        redirect("/auth/login");
        return json({});
    }

    let orders = (await getUserByName(user.name)).orders;
 

    return json<LoaderData>({ orders });
}


export default function Dashboard() {
    const { orders } = useLoaderData<LoaderData>();

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