
export function timeAgo(dateInput) {
	const date = new Date(dateInput);
	const now = new Date();
	const seconds = Math.floor((now - date) / 1000);

	// Проверка на будущую дату
	if (seconds < 0) {
		return 'in the future';
	}

	const intervals = [
		{ label: 'year', seconds: 31536000 },
		{ label: 'month', seconds: 2592000 },
		{ label: 'day', seconds: 86400 },
		{ label: 'hour', seconds: 3600 },
		{ label: 'minute', seconds: 60 },
		{ label: 'second', seconds: 1 }
	];

	for (const interval of intervals) {
		const count = Math.floor(seconds / interval.seconds);
		if (count >= 1) {
			// Склонение для английского (можно заменить на русский ниже)
			if (count === 1) {
				return `1 ${interval.label} ago`;
			} else {
				return `${count} ${interval.label}s ago`;
			}
		}
	}

	return 'just now';
}

export function formatDateLong(dateInput) {
	const date = new Date(dateInput);

	const months = [
		'January', 'February', 'March', 'April', 'May', 'June',
		'July', 'August', 'September', 'October', 'November', 'December'
	];

	const month = months[date.getMonth()];
	const day = date.getDate();
	const year = date.getFullYear();

	return `${month} ${day}, ${year}`;
}
