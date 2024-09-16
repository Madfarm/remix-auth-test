import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "~/components/ui/select"

export default function OrderFilter() {
    return (
        <Select
            name="filter"
            defaultValue=""
        >
            <SelectTrigger 
                className="w-20" 
            >
                <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="Clear">Clear</SelectItem>
                <SelectItem value="Open">Open</SelectItem>
                <SelectItem value="Picked">Picked</SelectItem>
                <SelectItem value="Closed">Closed</SelectItem>
            </SelectContent>
        </Select>
    )
}
