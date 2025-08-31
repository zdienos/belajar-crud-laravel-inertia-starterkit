import { useUsers } from '../context/users-context'
import { UsersActionDialog } from './users-action-dialog'
import { UsersDeleteDialog } from './users-delete-dialog'

export function UsersDialogs() {
	const { open, setOpen, currentRow, setCurrentRow } = useUsers()
	return (
		<>
			<UsersActionDialog
				key='user-add'
				open={open === 'add'}
				onOpenChange={() => setOpen('add')}
			/>

			{currentRow && (
				<>
					<UsersActionDialog
						key={`user-edit-${currentRow.id}`}
						open={open === 'edit'}
						onOpenChange={() => {
							setOpen('edit')
							setTimeout(() => {
								setCurrentRow(null)
							}, 500)
						}}
						currentRow={currentRow}
					/>

					<UsersDeleteDialog
						key={`user-delete-${currentRow.id}`}
						open={open === 'delete'}
						onOpenChange={() => {
							setOpen('delete')
							setTimeout(() => {
								setCurrentRow(null)
							}, 500)
						}}
						currentRow={currentRow}
					/>
				</>
			)}
		</>
	)
}
