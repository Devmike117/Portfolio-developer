// src/utils/seasonalTheme.ts
export type SeasonalTheme = 'christmas' | 'independencia' | null;

export function getSeasonalTheme(date: Date = new Date()): SeasonalTheme {
	// Convertir a fecha de Ciudad de México para evitar desfases por zona horaria
	const mxDate = new Date(
		date.toLocaleString('en-US', { timeZone: 'America/Mexico_City' })
	);
	const month = mxDate.getMonth() + 1; // 1-12
	const day = mxDate.getDate();

	// Mes patrio: 1 al 16 de septiembre
	if (month === 9 && day >= 1 && day <= 16) {
		return 'independencia';
	}

	// Navidad: 1 de diciembre al 6 de enero
	if ((month === 12 && day >= 1) || (month === 1 && day <= 6)) {
		return 'christmas';
	}

	return null;
}