import {
    json,
    NavLink,
    Outlet,
    redirect,
    useLoaderData,
    Link,
    Form,
    useSubmit
} from "@remix-run/react";
import { LoaderFunctionArgs } from "react-router";
import authenticator from "~/services/auth.server";
import { getOrders, OrderType } from "~/services/db.server";
import { AuthUser } from "~/services/session.server";
import { ExitIcon } from "@radix-ui/react-icons";
import { Input } from "~/components/ui/input";
import OrderFilter from "~/components/OrderFilter"


type LoaderData = {
    orders: OrderType[],
    query: string | null,
    openCount: number
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

    const openCount = ((await getOrders(user.name)).filter(order => order.status === "Open")).length;

    const url = new URL(request.url);
    const query = url.searchParams.get("query");
    const filter = url.searchParams.get("filter");
    
    const orders = await getOrders(user.name, query, filter);
    return json({ orders, query, openCount })
}


export default function Dashboard() {
    const { orders, query, openCount } = useLoaderData<LoaderData>();
    const submit = useSubmit();


    return (
        <main className="w-screen h-[calc(100vh-4rem)] flex">
            <div className="ml-2 px-1 flex flex-col w-72 h-full border-2 bg-card opacity-70 rounded-xl">
                <h1 className="text-center py-2 border-b-2 border-foreground">Orders</h1>

                <div className="pb-1">
                    <Form
                        className="min-h-10 pt-4 px-1"
                        onChange={((e) => {
                            submit(e.currentTarget)
                        })}
                    >
                        <div className="flex flex-row">
                            <Input
                                id="query"
                                aira-label="Search orders"
                                className="opacity-90 bg-[center_left_0.5rem] bg-no-repeat border border-foreground w-full pl-8 bg-[url('/magnifying-glass.svg')]"
                                placeholder="Search"
                                name="query"
                                type="search"
                                defaultValue={query || ""}
                            />
                            <OrderFilter />
                        </div>
                    </Form>
                </div>

                <nav className="py-2 flex-grow overflow-auto scrollbar-none">
                    {orders.length ? (
                        <ul>
                            {orders.map((order, i) => (
                                <li key={i}>
                                    <NavLink
                                        to={`/dashboard/${order.id}`}
                                        className={({ isActive }) =>
                                            `w-full flex flex-row py-2 justify-between px-4 hover:shadow-lg hover:bg-muted-foreground ${isActive ? "bg-sky-700" : ""}`
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
                        className="flex flex-row items-center justify-center gap-x-2 hover:opacity-100 hover:scale-125"
                        to="/logout"
                    >
                        <ExitIcon />
                        <p>
                            Logout
                        </p>
                    </Link>
                </div>
            </div>

            <div className="p-8 border mx-4 w-full rounded-xl">
                <Outlet context={openCount} />
            </div>
        </main>
    )
}