// format runtime in minutes in (movies/[id].tsx)
export function formatRuntime(runtime: number) {
	return Intl.NumberFormat('en-US', {
		style: 'unit',
		unit: 'minute',
		unitDisplay: 'short',
	}).format(runtime);
}

//format currency
export function formatCurrency(amount: number) {
	return Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
	}).format(amount);
}
