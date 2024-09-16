import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "~/components/ui/select"

import { Button } from "./ui/button"

export default function OrderFilter() {
    return (
        <Select
            name="filter"
        >
            <SelectTrigger 
                className="w-20" 
            >
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="Open">Open</SelectItem>
                <SelectItem value="Picked">Picked</SelectItem>
                <SelectItem value="Closed">Closed</SelectItem>
            </SelectContent>
        </Select>
    )
}
