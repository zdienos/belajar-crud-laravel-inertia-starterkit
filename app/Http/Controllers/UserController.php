<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
	/**
	 * Menampilkan daftar semua user dengan paginasi.
	 * Ini adalah satu-satunya method yang merender view utama.
	 */
	public function index(Request $request): Response
	{
		$perPage = $request->input('per_page', 10); // Ambil per_page dari request, default 10

		$users = User::query()
			->latest() // Urutkan berdasarkan yang terbaru
			->paginate($perPage)
			->withQueryString(); // Jaga query string saat berpindah halaman

		return Inertia::render('users/index', [
			'users' => $users,
		]);
	}

	/**
	 * Menampilkan form untuk membuat user baru.
	 * TIDAK DIGUNAKAN dalam arsitektur modal, karena form 'create'
	 * ditampilkan di dalam modal pada halaman index.
	 */
	public function create()
	{
		// Method ini tidak diperlukan karena kita menggunakan modal di halaman index.
	}

	/**
	 * Menyimpan user yang baru dibuat ke dalam database.
	 */
	public function store(Request $request): RedirectResponse
	{
		// 1. Validasi input
		$validated = $request->validate([
			'name' => 'required|string|max:255',
			'email' => 'required|string|email|max:255|unique:users',
			'password' => ['required', 'confirmed', Password::defaults()],
		]);

		// 2. Buat user baru
		User::create([
			'name' => $validated['name'],
			'email' => $validated['email'],
			'password' => Hash::make($validated['password']),
			'phone_number' => $request->phone_number,
			'role' => $request->role,
			'status' => 'active'
		]);

		// 3. Redirect kembali ke halaman index dengan pesan sukses
		return redirect()->route('users.index')->with('success', 'User berhasil ditambahkan.');
	}

	/**
	 * Menampilkan detail user tertentu.
	 * TIDAK DIGUNAKAN dalam arsitektur saat ini.
	 */
	public function show(User $user)
	{
		// Method ini tidak diperlukan dalam scope aplikasi saat ini.
	}

	/**
	 * Menampilkan form untuk mengedit user.
	 * TIDAK DIGUNAKAN dalam arsitektur modal, karena form 'edit'
	 * ditampilkan di dalam modal pada halaman index.
	 */
	public function edit(User $user)
	{
		// Method ini tidak diperlukan karena kita menggunakan modal di halaman index.
	}

	/**
	 * Memperbarui data user tertentu di dalam database.
	 */
	// public function update(Request $request, User $user): RedirectResponse
	// {
	// 	// 1. Validasi input
	// 	$validated = $request->validate([
	// 		'name' => 'required|string|max:255',
	// 		// Pastikan email unik, kecuali untuk user yang sedang diedit saat ini
	// 		'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
	// 		// Password bersifat opsional saat update
	// 		'password' => ['nullable', 'confirmed', Password::defaults()],
	// 	]);

	// 	// 2. Update data user
	// 	$user->name = $validated['name'];
	// 	$user->email = $validated['email'];

	// 	// 3. Jika ada password baru, hash dan update passwordnya
	// 	if ($request->filled('password')) {
	// 		$user->password = Hash::make($validated['password']);
	// 	}

	// 	$user->save();

	// 	// 4. Redirect kembali ke halaman index dengan pesan sukses
	// 	return redirect()->route('users.index')->with('success', 'User berhasil diperbarui.');
	// }

	public function update(Request $request, User $user): RedirectResponse
	{
		// 1. Validasi input dari form edit
		$validated = $request->validate([
			'name' => 'required|string|max:255',
			// Rule::unique akan mengabaikan email user saat ini,
			// sehingga tidak terjadi error "email already exists" jika email tidak diubah.
			'email' => [
				'required',
				'string',
				'email',
				'max:255',
				Rule::unique('users')->ignore($user->id),
			],
			'phone_number' => 'required|string|max:20',
			'role' => 'required|string|in:manager,cashier,admin,superadmin', // Sesuaikan dengan role yang ada
			// Password bersifat opsional ('nullable') saat update.
			// Jika tidak diisi, validasi ini akan dilewati.
			'password' => ['nullable', 'confirmed', Password::defaults()],
		]);

		// 2. Update data dasar user
		$user->update([
			'name' => $validated['name'],
			'email' => $validated['email'],
			'phone_number' => $validated['phone_number'],
			'role' => $validated['role'],
		]);

		// 3. Hanya update password jika field password diisi pada form
		if ($request->filled('password')) {
			$user->update([
				'password' => Hash::make($validated['password']),
			]);
		}

		// 4. Redirect kembali dengan pesan sukses
		return redirect()->route('users.index')->with('success', 'User berhasil diperbarui.');
	}

	/**
	 * Menghapus user tertentu dari database.
	 */
	public function destroy(User $user): RedirectResponse
	{
		// 1. Hapus user
		$user->delete();

		// 2. Redirect kembali ke halaman index dengan pesan sukses
		return redirect()->route('users.index')->with('success', 'User berhasil dihapus.');
	}
}
