import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import 'dayjs/locale/fr'; // Importez la locale française si nécessaire
dayjs.extend(customParseFormat); // Étendez Dayjs avec le plugin
dayjs.locale('fr'); // Définissez la locale par défaut sur "fr"

export const APP_DATE_FORMAT = 'DD/MM/YYYY';
export const APP_DATE_PATTERN = 'YYYY-MM-DD';
export const COMMON_FORMAT_DATE = 'dd/MM/yyyy';
export const AMOUNT_DEFAULT_CURRENCY = 'FCFA';

/**
 * Masque générique pour le montant
 */
export const FORMAT_INPUT_MASK = '*** ***,***';

/**
 * Formate le montant avec des espaces comme séparateurs de milliers et fixe les décimales.
 * @param amount - Montant à formater
 * @param decimals - Nombre de décimales à afficher (par défaut 3)
 * @returns Montant formaté avec des espaces
 */
export const amountFullFormat = (
  amount: number,
  decimals: number = 3,
): string => {
  try {
    // Convertit le nombre entier en nombre à virgule flottante avec les décimales spécifiées
    const formattedAmount = amount.toFixed(decimals);
    // Ajoute des espaces comme séparateurs de milliers
    return formattedAmount.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  } catch (e) {
    console.error('Exception in amountFullFormat:', e);
    return '';
  }
};

/**
 * Formate le montant avec la devise spécifiée.
 * @param amount - Montant à formater
 * @param decimals - Nombre de décimales
 * @param currency - Devise à utiliser (par défaut 'FCFA')
 * @returns Montant formaté avec la devise
 */
export const amountFullFormatCurrency = (
  amount: number,
  decimals: number = 3,
  currency: string = AMOUNT_DEFAULT_CURRENCY,
): string => {
  const formattedAmount = amountFullFormat(amount, decimals);
  return `${formattedAmount} ${currency}`;
};

/**
 * Convertit une entrée utilisateur en montant sans séparateurs, puis en format décimal.
 * @param value - Valeur entrée par l'utilisateur
 * @param decimals - Nombre de décimales à afficher (par défaut 3)
 * @param currency - Devise à utiliser (par défaut 'FCFA')
 * @returns Montant formaté avec des espaces et 3 décimales
 */
export const convertInputToFormattedAmount = (
  value?: string,
  decimals: number = 3,
  currency: string = AMOUNT_DEFAULT_CURRENCY,
): string => {
  if (typeof value !== 'string') {
    return '';
  }
  const cleanedValue = value.replace(/[^0-9.]/g, '');
  const amountValue = cleanedValue ? parseFloat(cleanedValue) : NaN;
  if (!isNaN(amountValue)) {
    return amountFullFormatCurrency(amountValue, decimals, currency);
  }
  return '';
};

/**
 * Convertit un montant masqué en nombre brut sans virgules ni espaces.
 * @param value - Valeur à convertir
 * @returns Valeur numérique sans séparateurs
 */
export const convertInputMaskToNumber = (value: string) => {
  const nonNumericRegex = new RegExp(/[^0-9.]/g);
  const parsedValue = value?.replace(nonNumericRegex, '');
  return parsedValue?.replace(/[, ]/g, '');
};

/**
 * Convertit une date dans un format standard (ex : 'YYYY-MM-DD') vers le format spécifique de l'application.
 * @param date - Date à convertir
 * @returns Date formatée selon le format d'application
 */
export const convertDateFormat = (date: any) => {
  return dayjs(date).isValid() ? dayjs(date).format(APP_DATE_FORMAT) : '';
};

/**
 * Calcule la période en mois en fonction du type de contrat.
 * @param nbePeriod - Nombre de périodes
 * @param period - Type de période ('T' = trimestre, 'S' = semestre, 'A' = année)
 * @returns Nombre de mois correspondant à la période
 */
export const getPeriodInMonths = (
  nbePeriod: number,
  period: string,
): number => {
  switch (period) {
    case 'QUARTERLY': // Trimestre (3 mois)
      return nbePeriod * 3;
    case 'SEMIANNUAL': // Semestre (6 mois)
      return nbePeriod * 6;
    case 'ANNUAL': // Année (12 mois)
      return nbePeriod * 12;
    default: // Mois par défaut
      return nbePeriod;
  }
};

/**
 * Formate la date pour l'audit
 * @param date
 */
export const formatDateFormAuditTable = (date: string) => {
  if (!date) {
    return '';
  }
  const dateFormat = new Date(date);

  return dateFormat.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const getTimeValue = (date: string) => {
  if (!date) {
    return '';
  }
  const dateFormat = new Date(date);
  return dateFormat?.toLocaleTimeString('fr-FR', {
    hour: 'numeric',
    minute: 'numeric',
  });
};

export const findDynamicIdInList = (id: string, list: any) => {
  const findCollaborator = list?.content?.find(
    (collaborator: any) => collaborator.id === id,
  );
  if (!findCollaborator) {
    return null;
  }
  return findCollaborator;
};

/**
 * Fonction générique pour parser une date depuis une chaîne.
 * @param dateString - Chaîne de date à parser (ex : '22/11/2024')
 * @param inputFormat - Format d'entrée attendu (par défaut 'DD/MM/YYYY')
 * @returns Objet `Date` ou `null` si la date n'est pas valide
 */
export const parseDateString = (
  dateString: string,
  inputFormat: string = APP_DATE_FORMAT,
): Date | null => {
  const parsedDate = dayjs(dateString, inputFormat, true); // Le 3e argument impose une validation stricte
  return parsedDate.isValid() ? parsedDate.toDate() : null;
};

/**
 * Récupère le mois en fonction d'une chaîne de date.
 * @param dateString - Chaîne de date (ex : '22/11/2024')
 * @param inputFormat - Format d'entrée attendu (par défaut 'DD/MM/YYYY')
 * @param locale - Langue pour le mois (par défaut 'fr')
 * @returns Mois au format long (ex : 'novembre') ou null si la date est invalide
 */
export const getMonthFromDateString = (
  dateString: string,
  inputFormat: string = APP_DATE_FORMAT,
  locale: string = 'fr',
): string | null => {
  try {
    if (!dateString) {
      return null;
    }
    const parsedDate = dayjs(dateString, inputFormat);
    if (!parsedDate.isValid()) {
      return null;
    }
    return parsedDate.locale(locale).format('MMMM');
  } catch (e) {
    console.error('Error parsing date:', e);
    return null;
  }
};
