'use client'

import { useState } from 'react'
import { IconAlertTriangle } from '@tabler/icons-react'
// import { toast } from '@/hooks/use-toast'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { User } from '../data/schema'
import { router } from '@inertiajs/react'
import { toast } from 'sonner'


interface Props {
	open: boolean
	onOpenChange: (open: boolean) => void
	currentRow: User
}

export function UsersDeleteDialog({ open, onOpenChange, currentRow }: Props) {
	const [value, setValue] = useState('')
	const [isDeleting, setIsDeleting] = useState(false) // State untuk loading

	// const handleDelete = () => {
	// 	if (value.trim() !== currentRow.email) return

	// 	onOpenChange(false)
	// 	toast({
	// 		title: 'The following user has been deleted:',
	// 		description: (
	// 			<pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
	// 				<code className='text-white'>
	// 					{JSON.stringify(currentRow, null, 2)}
	// 				</code>
	// 			</pre>
	// 		),
	// 	})
	// }

	const handleDelete = () => {
		if (value.trim() !== currentRow.email || isDeleting) return

		setIsDeleting(true) // Mulai loading

		router.delete(route('users.destroy', currentRow.id), {
			preserveState: true,
			preserveScroll: true, // Agar tidak scroll ke atas
			onSuccess: () => {
				onOpenChange(false)
				toast.success(`User ${currentRow.name} has been deleted successfully.`)
				// toast.success({
				// 	title: 'Success!',
				// 	description: `User ${currentRow.name} has been deleted successfully.`,
				// })
			},
			onError: (errors) => {
				console.error(errors);
				toast.error(`Failed to delete user. Please try again.`)
				// toast({
				// 	variant: 'destructive',
				// 	title: 'Error!',
				// 	description: 'Failed to delete user. Please try again.',
				// })
			},
			onFinish: () => {
				setIsDeleting(false) // Selesai loading
			}
		})
	}

	return (
		<>
			<ConfirmDialog
				open={open}
				onOpenChange={onOpenChange}
				handleConfirm={handleDelete}
				// disabled={value.trim() !== currentRow.email}
				disabled={value.trim() !== currentRow.email || isDeleting}
				title={
					<span className='text-destructive'>
						<IconAlertTriangle
							className='mr-1 inline-block stroke-destructive'
							size={18}
						/>{' '}
						Delete User
					</span>
				}
				desc={
					<div className='space-y-4'>
						<p className='mb-2'>
							Are you sure you want to delete{' '}
							<span className='font-bold'>{currentRow.name} ({currentRow.email})</span>?
							<br />
							This action will permanently remove the user with the role of{' '}
							<span className='font-bold'>
								{currentRow.role.toUpperCase()}
							</span>{' '}
							from the system. This cannot be undone.
						</p>

						<Label className='my-2'>
							Email:
							<Input
								value={value}
								onChange={(e) => setValue(e.target.value)}
								placeholder='Enter email to confirm deletion.'
							/>
						</Label>

						<Alert variant='destructive'>
							<AlertTitle>Warning!</AlertTitle>
							<AlertDescription>
								Please be carefull, this operation can not be rolled back.
							</AlertDescription>
						</Alert>
					</div>

				}
				confirmText='Delete'
				destructive
			/>
		</>

	)
}
