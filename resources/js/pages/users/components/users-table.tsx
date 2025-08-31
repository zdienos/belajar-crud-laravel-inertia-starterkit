import { useEffect, useMemo, useState } from 'react'
import {
	ColumnDef,
	ColumnFiltersState,
	RowData,
	SortingState,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from '@tanstack/react-table'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { User } from '../data/schema'
import { DataTablePagination } from './data-table-pagination'
import { DataTableToolbar } from './data-table-toolbar'
import debounce from 'lodash.debounce';
import { router } from '@inertiajs/react'



declare module '@tanstack/react-table' {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	interface ColumnMeta<TData extends RowData, TValue> {
		className: string
	}
}

// interface DataTableProps {
// 	columns: ColumnDef<User>[]
// 	data: User[]
// }

interface PaginatedUsers {
	data: User[];
	total: number;
	per_page: number;
	current_page: number;
	links: any[];
}

interface DataTableProps {
	columns: ColumnDef<User>[];
	data: PaginatedUsers;
}


export function UsersTable({ columns, data }: DataTableProps) {
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
	const [sorting, setSorting] = useState<SortingState>([])

	const pagination = useMemo(() => ({
		pageIndex: data.current_page - 1,
		pageSize: data.per_page,
	}), [data.current_page, data.per_page]);

	useEffect(() => {
		// Ambil URL saat ini agar parameter lain (jika ada) tidak hilang
		const currentUrl = window.location.href;

		// Buat objek parameter yang akan dikirim
		const params: any = {
			page: pagination.pageIndex + 1,
			per_page: pagination.pageSize,
		};

		// Tambahkan parameter sorting jika ada
		if (sorting.length > 0) {
			params.sort = sorting[0].id;
			params.direction = sorting[0].desc ? 'desc' : 'asc';
		}

		// Tambahkan parameter filter jika ada (contoh untuk satu filter aktif)
		if (columnFilters.length > 0) {
			params.filter = columnFilters[0].id;
			params.filter_value = columnFilters[0].value;
		}

		// Kirim request ke server dengan state terbaru
		router.get(currentUrl.split('?')[0], params, {
			preserveState: true,
			replace: true,
		});

	}, [pagination, sorting, columnFilters]); // 👈 Effect ini berjalan saat state BERUBAH


	const debouncedSetColumnFilters = useMemo(
		() => debounce(setColumnFilters, 100), // Debounce 500ms
		[]
	);


	const table = useReactTable({
		data: data.data,
		columns,
		rowCount: data.total,

		// --- Konfigurasi Manual ---
		manualPagination: true,
		manualSorting: true,      // 👈 BERITAHU TABEL: Sorting dilakukan server
		manualFiltering: true,  // 👈 BERITAHU TABEL: Filtering dilakukan server
		// -------------------------

		state: {
			pagination,
			sorting,
			columnFilters,
		},
		// --- Hubungkan UI ke State ---
		onPaginationChange: (updater) => { // 👈 INI BAGIAN PALING PENTING YANG HILANG
			const newPagination = typeof updater === 'function' ? updater(pagination) : updater;
			// Kita tidak memanggil setPagination di sini karena state dikontrol oleh URL.
			// Kita langsung trigger useEffect dengan membuat request baru.
			router.get(window.location.href.split('?')[0], {
				page: newPagination.pageIndex + 1,
				per_page: newPagination.pageSize,
			}, { preserveState: true, replace: true });
		},
		onSortingChange: setSorting, // UI sorting akan update state 'sorting'
		onColumnFiltersChange: debouncedSetColumnFilters, // UI filter akan update state 'columnFilters'
		// onColumnVisibilityChange: setColumnVisibility,
		// onRowSelectionChange: setRowSelection,
		// -------------------------

		getCoreRowModel: getCoreRowModel(),
	})

	return (
		<div className='space-y-4'>
			<DataTableToolbar table={table} />
			<div className='rounded-md border'>
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id} className='group/row'>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead
											key={header.id}
											colSpan={header.colSpan}
											className={header.column.columnDef.meta?.className ?? ''}
										>
											{header.isPlaceholder
												? null
												: flexRender(
													header.column.columnDef.header,
													header.getContext()
												)}
										</TableHead>
									)
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && 'selected'}
									className='group/row'
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell
											key={cell.id}
											className={cell.column.columnDef.meta?.className ?? ''}
										>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className='h-24 text-center'
								>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<DataTablePagination table={table} />
		</div>
	)
}
