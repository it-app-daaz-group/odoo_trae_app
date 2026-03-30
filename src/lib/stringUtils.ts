const legalEndings = [
  'pt',
  'cv',
  'tbk',
  'pte ltd',
  'ltd',
  'limited',
  'gmbh',
  'llc',
  'inc',
  'corp',
  'corporation'
];

const properCaseExceptions = new Set([
  'PT', 'CV', 'TBK', 'PTE', 'LTD', 'LLC', 'INC'
]);

export function removePunctuation(str: string): string {
  return str.replace(/[.,\-\/#!$%\^&\*;:{}=\-_`~()]/g, "");
}

export function cleanNameForComparison(name: string): string {
  let cleaned = name.toLowerCase();

  // Remove all legal endings first
  legalEndings.forEach(ending => {
    // Use a regex to remove the word, handling different spacing
    const regex = new RegExp(`\\b${ending}\\b`, 'g');
    cleaned = cleaned.replace(regex, '');
  });

  // Remove all punctuation
  cleaned = cleaned.replace(/[.,\-\/#!$%\^&\*;:{}=\-_`~()]/g, "");

  // Normalize whitespace
  return cleaned.replace(/\s+/g, ' ').trim();
}

export function toProperCaseWithExceptions(str: string): string {
  return str.replace(/\w\S*/g, (txt) => {
    const upper = txt.toUpperCase();
    if (properCaseExceptions.has(upper)) {
      return upper;
    }
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

export function cleanNameKey(name: string): string {
  return cleanNameForComparison(name).replace(/\s+/g, "");
}
