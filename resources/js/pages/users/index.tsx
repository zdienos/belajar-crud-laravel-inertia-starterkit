import { AuthenticatedLayout } from "@/layouts"
import { Main } from '@/components/layout/main'
import { columns } from './components/users-columns'
import { UsersDialogs } from './components/users-dialogs'
import { UsersPrimaryButtons } from './components/users-primary-buttons'
import { UsersTable } from './components/users-table'
import UsersProvider from './context/users-context'
import { userListSchema } from './data/schema'
// 1. HAPUS BARIS INI: import { users } from './data/users'

interface userType {
	id: number,
	name: string,
	firstName: string,
	lastName: string,
	username: string,
	email: string,
	phoneNumber: string,
	status: string,
	role: string,
	createdAt: string,
	updatedAt: string,
}


interface PaginatedUsers {
	data: any[];
	links: { url: string | null; label: string; active: boolean }[];
	total: number;
	per_page: number;
	current_page: number;
	// ... properti paginasi lainnya jika Anda butuh
}

// 2. TAMBAHKAN { users } SEBAGAI PARAMETER (PROPS)
// export default function Users({ users.data }: { users: any[] }) { // Anda bisa perbaiki 'any[]' dengan tipe data yang lebih spesifik
export default function Users({ users }: { users: PaginatedUsers }) {

	// Parse user list dari props, bukan dari file statis lagi
	// const userList = userListSchema.parse(users.data)
	const userList = users

	return (
		<UsersProvider>
			<AuthenticatedLayout title={"Users"}>
				<Main>
					<div className='mb-2 flex items-center justify-between space-y-2 flex-wrap'>
						<div>
							<h2 className='text-2xl font-bold tracking-tight'>User List</h2>
							<p className='text-muted-foreground'>
								Manage your users and their roles here.
							</p>
						</div>
						<UsersPrimaryButtons />
					</div>
					<div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
						{/* Data yang dimasukkan ke table sekarang berasal dari props */}
						<UsersTable data={userList} columns={columns} />
					</div>
				</Main>

				<UsersDialogs />
			</AuthenticatedLayout>
		</UsersProvider>
	)
}
