
/**
 * Converts unix time to HH:MM format;
 * TODO Add more custom formats;
 */
export function convertUnixTime(unixTime: number): string {
	const currentDate = new Date(unixTime);

	const hours = currentDate.getHours();
	const minutes = currentDate.getMinutes();

	const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
	const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;

	return `${formattedHours}:${formattedMinutes}`;
}