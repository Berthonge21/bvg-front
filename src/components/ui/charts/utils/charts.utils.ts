type ObjectItem = {
  date: string;
  values: {
    [key: string]: number;
  };
};
export const extractArrays = (
  data: ObjectItem[],
): { date: string[]; values: { [key: string]: number[] } } => {
  const result: {
    date: string[];
    values: { [key: string]: number[] };
    maxValues: { [key: string]: number };
  } = {
    date: [],
    values: {},
    maxValues: {},
  };

  // Vérifier que data est un tableau avant d'utiliser forEach
  if (!Array.isArray(data)) {
    console.error('Data is not an array:', data);
    return result; // Retourner un objet vide par défaut
  }

  // Extract all unique keys in values
  const allKeys = new Set<string>();
  data?.forEach(item => {
    result.date.push(item.date);
    Object?.keys(item.values).forEach(key => allKeys.add(key));
  });

  // Initialize arrays and max values for each key
  allKeys.forEach(key => {
    result.values[key] = [];
    result.maxValues[key] = 0; // Initialize max value to 0
  });

  // Populate arrays with values and update max values
  data.forEach(item => {
    allKeys.forEach(key => {
      const value = item.values[key] || 0;
      result.values[key].push(value);
      result.maxValues[key] = Math.max(result.maxValues[key], value);
    });
  });

  return result;
};

export const getColorSchemaByCategory = (color: string): string => {
  switch (color) {
    case '#2563EB':
      return 'packBasicColor';
      break;
    case '#38BDF8':
      return 'packStandardColor';
      break;
    case '#DBEAFE':
      return 'packProColor';
      break;
    default:
      return 'black';
  }
};
