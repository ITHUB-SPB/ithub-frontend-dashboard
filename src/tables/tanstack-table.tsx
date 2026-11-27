import { useState } from 'react';
import { ArrowUpDown } from "lucide-react"

import { Button } from '../components/ui/button'
import * as table from '../components/ui/table'

import {
    tableFeatures,
    createSortedRowModel,
    rowSortingFeature,
    sortFn_datetime,
    sortFn_alphanumeric,
    createColumnHelper,
    useTable,
    type ColumnDef,
    type RowData,
    type SortingState,
} from "@tanstack/react-table"

type Entry = {
    id: number;
    phone: string;
    birthDate: string;
    bookingDate: string;
}

const data: Entry[] = [
    {
        id: 1,
        phone: '+79991110022',
        birthDate: '21.06.2000',
        bookingDate: '28.11.2026'
    },
    {
        id: 2,
        phone: '+79050000011',
        birthDate: '11.04.2003',
        bookingDate: '29.11.2026'
    },
    {
        id: 3,
        phone: '+79121110000',
        birthDate: '14.01.2001',
        bookingDate: '29.11.2026'
    }
]

const features = tableFeatures({
    rowSortingFeature,
    sortedRowModel: createSortedRowModel(),
    sortFns: { alphanumeric: sortFn_alphanumeric, datetime: sortFn_datetime }
})

const columnHelper = createColumnHelper<typeof features, Entry>()

// interface DataTableProps<TData extends RowData> {
//     columns: ColumnDef<typeof features, TData>[]
//     data: TData[]
// }

const columns = columnHelper.columns([
    columnHelper.accessor('phone', {
        header: ({ column }) => (
            <Button
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Phone
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        )
    }),
    columnHelper.accessor('birthDate', { header: "Birth Date" }),
    columnHelper.accessor('bookingDate', { header: "Booking Date" })
])

export default function TanstackTable() {
    const [sorting, setSorting] = useState<SortingState>([])

    const tableHelper = useTable({
        features,
        data,
        columns,
        onSortingChange: setSorting,
        state: {
            sorting,
        },
    })

    return (
        <table.Table className='w-1/2'>
            <table.TableHeader>
                {tableHelper.getHeaderGroups().map(headerGroup => (
                    <table.TableRow key={headerGroup.id}>
                        {headerGroup.headers.map(header => (
                            <table.TableHead>
                                {header.isPlaceholder ? null : (
                                    <tableHelper.FlexRender header={header} />
                                )}
                            </table.TableHead>
                        ))}
                    </table.TableRow>
                ))}
            </table.TableHeader>

            <table.TableBody>
                {tableHelper.getRowModel().rows.map(row => (
                    <table.TableRow key={row.id}>
                        {row.getAllCells().map(cell => (
                            <table.TableCell key={cell.id}>
                                <tableHelper.FlexRender cell={cell} />
                            </table.TableCell>
                        ))}
                    </table.TableRow>
                ))}
            </table.TableBody>
        </table.Table>
    )
}