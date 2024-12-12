import db from '$lib/server/db';
import { transactions } from '$lib/server/db/schema';
import { and, gte, lte, sql } from 'drizzle-orm';
import type { PageServerLoad } from '../$types';
import { startOfWeek, endOfWeek } from 'date-fns'; // library untuk memanipulasi tanggal

async function getWeeklyTransactionData() {
	const startOfThisWeek = startOfWeek(new Date());
	const endOfThisWeek = endOfWeek(new Date());

	// Query untuk mengambil transaksi dalam rentang waktu minggu ini
	const results = await db
		.select({
			date: transactions.createdAt,
			amount: transactions.amount
		})
		.from(transactions)
		.where(
			and(gte(transactions.createdAt, startOfThisWeek), lte(transactions.createdAt, endOfThisWeek))
		)
		.orderBy(transactions.createdAt);

	return results;
}

async function getWeeklyChartData() {
	const results = await getWeeklyTransactionData();

	// Format data untuk chart
	const categories = []; // Label kategori, misalnya nama hari (Senin, Selasa, dll.)
	const data = []; // Data untuk jumlah transaksi

	// Untuk setiap transaksi, ambil tanggal dan jumlahnya
	let weeklyTotal = 0;
	let currentDay = startOfWeek(new Date()); // Mulai dengan hari pertama minggu ini
	let currentDayTotal = 0;

	results.forEach((row) => {
		const transactionDate = new Date(row.date!);
		if (transactionDate.getDate() === currentDay.getDate()) {
			// Jika transaksi pada hari yang sama, tambahkan ke total hari ini
			currentDayTotal += parseFloat(row.amount.toString());
		} else {
			// Jika sudah berganti hari, simpan total dan mulai hitung untuk hari berikutnya
			categories.push(currentDay.toLocaleDateString()); // Menambahkan tanggal (misalnya: '01 Feb')
			data.push(currentDayTotal);

			// Update untuk hari berikutnya
			currentDay = transactionDate;
			currentDayTotal = parseFloat(row.amount.toString());
		}
	});

	// Setelah selesai iterasi, pastikan data terakhir juga dimasukkan
	categories.push(currentDay.toLocaleDateString());
	data.push(currentDayTotal);

	return {
		categories,
		series: [
			{
				name: 'Weekly Transactions',
				data
			}
		]
	};
}

export const load = (async (event) => {
	// count today transactions
	const today = new Date();
	today.setHours(0, 0, 0, 0);
	const tomorrow = new Date(today);
	tomorrow.setDate(tomorrow.getDate() + 1);

	const todayTransactions = await db
		.select({ total: sql`COUNT(*) as total`, sum: sql`SUM(amount) as totalAmount` })
		.from(transactions)
		.where(and(gte(transactions.createdAt, today), lte(transactions.createdAt, tomorrow)));

	const weeklyChartData = await getWeeklyChartData();

	console.log(weeklyChartData);

	return {
		todayTransactions: todayTransactions[0],
		title: 'Admin Page',
		weeklyChartData
	};
}) satisfies PageServerLoad;
