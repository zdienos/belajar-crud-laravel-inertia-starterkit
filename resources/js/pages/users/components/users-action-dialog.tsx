import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { PasswordInput } from '@/components/password-input'
import { SelectDropdown } from '@/components/select-dropdown'
import { userTypes } from '../data/data'
import { User } from '../data/schema'
import { router } from '@inertiajs/react'

const formSchema = z
	.object({
		// firstName: z.string().min(1, { message: 'First Name is required.' }),
		// lastName: z.string().min(1, { message: 'Last Name is required.' }),
		name: z.string().min(1, { message: 'Name is required.' }),
		phone_number: z.string().min(1, { message: 'Phone number is required.' }),
		email: z
			.string()
			.min(1, { message: 'Email is required.' })
			.email({ message: 'Email is invalid.' }),
		password: z.string().transform((pwd) => pwd.trim()),
		password_confirmation: z.string().transform((pwd) => pwd.trim()),
		role: z.string().min(1, { message: 'Role is required.' }),
		isEdit: z.boolean(),
	})
	.superRefine(({ isEdit, password, password_confirmation }, ctx) => {
		if (!isEdit || (isEdit && password !== '')) {
			if (password === '') {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: 'Password is required.',
					path: ['password'],
				})
			}

			if (password.length < 8) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: 'Password must be at least 8 characters long.',
					path: ['password'],
				})
			}

			if (!password.match(/[a-z]/)) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: 'Password must contain at least one lowercase letter.',
					path: ['password'],
				})
			}

			if (!password.match(/\d/)) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: 'Password must contain at least one number.',
					path: ['password'],
				})
			}

			if (password !== password_confirmation) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: "Passwords don't match.",
					path: ['password_confirmation'],
				})
			}
		}
	})
type UserForm = z.infer<typeof formSchema>

interface Props {
	currentRow?: User
	open: boolean
	onOpenChange: (open: boolean) => void
}

export function UsersActionDialog({ currentRow, open, onOpenChange }: Props) {
	const isEdit = !!currentRow
	const form = useForm<UserForm>({
		resolver: zodResolver(formSchema),
		defaultValues: isEdit
			? {
				...currentRow,
				password: '',
				password_confirmation: '',
				isEdit,
			}
			: {
				name: '',
				email: '',
				role: '',
				phone_number: '',
				password: '',
				password_confirmation: '',
				isEdit,
			},
	})

	// const onSubmit = (values: UserForm) => {
	// 	const { isEdit, password_confirmation, ...postData } = values;

	// 	// if (isEdit && postData.password === '') {
	// 	// 	delete postData.password;
	// 	// }

	// 	if (isEdit && currentRow) {
	// 		router.put(route('users.update', currentRow.id), postData, {
	// 			onSuccess: () => {
	// 				onOpenChange(false)
	// 				form.reset()
	// 				toast({ title: 'Success!', description: 'User has been updated successfully.' })
	// 			},
	// 			onError: (errors) => {
	// 				console.error(errors);
	// 				toast({ variant: 'destructive', title: 'Error!', description: 'Failed to update user.' })
	// 			},
	// 		})
	// 	} else {
	// 		router.post(route('users.store'), postData, {
	// 			onSuccess: () => {
	// 				onOpenChange(false)
	// 				form.reset()
	// 				toast({ title: 'Success!', description: 'New user has been created.' })
	// 			},
	// 			onError: (errors) => {
	// 				console.error(errors);
	// 				toast({ variant: 'destructive', title: 'Error!', description: 'Failed to create user.' })
	// 			},
	// 		})
	// 	}
	// 	onOpenChange(false)
	// }

	const onSubmit = (values: UserForm) => {
		// 1. Buat objek payload dasar dari values
		const payload: Record<string, any> = {
			name: values.name,
			email: values.email,
			phone_number: values.phone_number,
			role: values.role,
		};

		// 2. Hanya tambahkan password jika diisi
		// Ini memastikan password kosong tidak dikirim saat mode edit
		if (values.password) {
			payload.password = values.password;
			payload.password_confirmation = values.password_confirmation;
		}

		const options = {
			// 3. Pindahkan logic onOpenChange dan reset ke onSuccess
			onSuccess: () => {
				toast({ title: 'Success!', description: `User has been ${isEdit ? 'updated' : 'created'} successfully.` })
				onOpenChange(false) // Tutup dialog HANYA jika sukses
				form.reset() // Reset form HANYA jika sukses
			},
			// 4. Implementasi mapping error dari server ke form
			onError: (errors: Record<string, string>) => {
				console.error(errors);
				Object.keys(errors).forEach(key => {
					form.setError(key as keyof UserForm, {
						type: 'server',
						message: errors[key],
					});
				});
				toast({ variant: 'destructive', title: 'Error!', description: `Failed to ${isEdit ? 'update' : 'create'} user.` })
			},
		};

		if (isEdit && currentRow) {
			router.put(route('users.update', currentRow.id), payload, options)
		} else {
			router.post(route('users.store'), payload, options)
		}
	}

	const isPasswordTouched = !!form.formState.dirtyFields.password

	return (
		<Dialog
			open={open}
			onOpenChange={(state) => {
				form.reset()
				onOpenChange(state)
			}}
		>
			<DialogContent className='sm:max-w-lg'>
				<DialogHeader className='text-left'>
					<DialogTitle>{isEdit ? 'Edit User' : 'Add New User'}</DialogTitle>
					<DialogDescription>
						{isEdit ? 'Update the user here. ' : 'Create new user here. '}
						Click save when you&apos;re done.
					</DialogDescription>
				</DialogHeader>
				<ScrollArea className='h-[26.25rem] w-full pr-4 -mr-4 py-1'>
					<Form {...form}>
						<form
							id='user-form'
							onSubmit={form.handleSubmit(onSubmit)}
							className='space-y-4 p-0.5'
						>
							<FormField
								control={form.control}
								name='name'
								render={({ field }) => (
									<FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
										<FormLabel className='col-span-2 text-right'>
											Name
										</FormLabel>
										<FormControl>
											<Input
												placeholder='John'
												className='col-span-4'
												autoComplete='off'
												{...field}
											/>
										</FormControl>
										<FormMessage className='col-span-4 col-start-3' />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='email'
								render={({ field }) => (
									<FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
										<FormLabel className='col-span-2 text-right'>
											Email
										</FormLabel>
										<FormControl>
											<Input
												placeholder='john.doe@gmail.com'
												className='col-span-4'
												{...field}
											/>
										</FormControl>
										<FormMessage className='col-span-4 col-start-3' />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='phone_number'
								render={({ field }) => (
									<FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
										<FormLabel className='col-span-2 text-right'>
											Phone Number
										</FormLabel>
										<FormControl>
											<Input
												placeholder='+123456789'
												className='col-span-4'
												{...field}
											/>
										</FormControl>
										<FormMessage className='col-span-4 col-start-3' />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='role'
								render={({ field }) => (
									<FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
										<FormLabel className='col-span-2 text-right'>
											Role
										</FormLabel>
										<SelectDropdown
											defaultValue={field.value}
											onValueChange={field.onChange}
											placeholder='Select a role'
											className='col-span-4'
											items={userTypes.map(({ label, value }) => ({
												label,
												value,
											}))}
										/>
										<FormMessage className='col-span-4 col-start-3' />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='password'
								render={({ field }) => (
									<FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
										<FormLabel className='col-span-2 text-right'>
											Password
										</FormLabel>
										<FormControl>
											<PasswordInput
												placeholder='e.g., S3cur3P@ssw0rd'
												className='col-span-4'
												{...field}
											/>
										</FormControl>
										<FormMessage className='col-span-4 col-start-3' />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='password_confirmation'
								render={({ field }) => (
									<FormItem className='grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0'>
										<FormLabel className='col-span-2 text-right'>
											Confirm Password
										</FormLabel>
										<FormControl>
											<PasswordInput
												disabled={!isPasswordTouched}
												placeholder='e.g., S3cur3P@ssw0rd'
												className='col-span-4'
												{...field}
											/>
										</FormControl>
										<FormMessage className='col-span-4 col-start-3' />
									</FormItem>
								)}
							/>
						</form>
					</Form>
				</ScrollArea>
				<DialogFooter>
					<Button type='submit' form='user-form'>
						Save changes
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
