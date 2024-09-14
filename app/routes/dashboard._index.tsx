import { json, NavLink, Outlet, redirect, useLoaderData } from "@remix-run/react";
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
                <h1 className="text-center py-2 border-b-2">Orders</h1>
                <div>

                </div>

                <nav className="py-2">
                    {orders.length ? 
                    (<ul className="overflow-auto">
                        {orders.map((order, i) => (
                            <li key={i} className="">
                                <NavLink 
                                    to={`/dashboard/${order.id}`}
                                    className={({ isActive }) =>
                                        `w-full flex flex-row justify-between px-6 hover:shadow-lg hover:bg-muted-foreground ${
                                          isActive
                                            ? "bg-sky-700"
                                            : "bg-accent"
                                        }`
                                    }
                                >
                                    <span>{order.orderNumber}</span>
                                    <span>{order.customerName}</span>
                                    <span>{order.status}</span>
                                </NavLink>
                            </li>
                        ))}
                    </ul>)
                    :
                    (<p>No orders yet</p>) 
                    }
                </nav>
            </div>
            <Outlet />
        </main>
    )
}