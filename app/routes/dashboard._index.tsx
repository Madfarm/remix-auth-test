import { useOutletContext } from "@remix-run/react"
import { useContext } from "react"
import { Button } from "~/components/ui/button"
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "~/components/ui/card"


export default function DashboardIndex() {
    const openCount: number = useOutletContext();

    return (
        <div>
            <Card className="sm:col-span-2">
                <CardHeader className="pb-3">
                    <CardTitle>Open Orders: {openCount}</CardTitle>
                    <CardDescription className="max-w-lg text-balance leading-relaxed">
                        
                    </CardDescription>
                </CardHeader>
                <CardFooter>
                    <Button>Create New Order</Button>
                </CardFooter>
            </Card>
        </div>
    )
}
