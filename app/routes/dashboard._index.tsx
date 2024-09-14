import {
    json,
    NavLink,
    Outlet,
    redirect,
    useLoaderData,
    Link
} from "@remix-run/react";
import { LoaderFunctionArgs } from "react-router";
import authenticator from "~/services/auth.server";
import { getUserByName, OrderType } from "~/services/db.server";
import { AuthUser } from "~/services/session.server";
import { ExitIcon } from "@radix-ui/react-icons";

type LoaderData = {
    orders: OrderType[]
}


export const loader = async ({
    request
}: LoaderFunctionArgs) => {
    let user: AuthUser | Error | null = await authenticator.isAuthenticated(request, {
        failureRedirect: "/auth/login"
    })

    if (user == null) {
        redirect("/auth/login");
        return json({});
    }

    let orders = (await getUserByName(user.name)).orders;


    return json<LoaderData>({ orders });
}


export default function Dashboard() {
    const { orders } = useLoaderData<LoaderData>();

    return (
        <main className="w-screen h-[calc(100vh-3.5rem)] flex"> 
            <div className="flex flex-col w-64 h-full border-r-2 bg-secondary opacity-90">
                <h1 className="text-center py-2 border-b-2 border-foreground">Orders</h1>

                <div>
                    {/* Empty div */}
                </div>

                <nav className="py-2 flex-grow overflow-auto">
                    {orders.length ? (
                        <ul>
                            {orders.map((order, i) => (
                                <li key={i}>
                                    <NavLink
                                        to={`/dashboard/${order.id}`}
                                        className={({ isActive }) =>
                                            `w-full flex flex-row py-2 justify-between px-6 hover:shadow-lg hover:bg-muted-foreground ${isActive ? "bg-sky-700" : "bg-accent"}`
                                        }
                                    >
                                        <span>{order.orderNumber}</span>
                                        <span>{order.customerName}</span>
                                        <span>{order.status}</span>
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-center">No orders yet</p>
                    )}
                </nav>

                <div className="p-4 border-t-2 border-muted-foreground">
                    <Link 
                        className="flex flex-row items-center justify-center gap-x-2 hover:shadow-inner" 
                        to="/logout"
                    >
                        <ExitIcon />
                        <p>
                            Logout
                        </p>
                    </Link>
                </div>
            </div>

            
            <Outlet />
        </main>
    )
}