
export function formatVendorName(name: string): string {
  // Common corporate acronyms in Indonesia to keep uppercase
  const acronyms = ["PT", "CV", "UD", "TB", "FA", "NV", "FIRMA", "KOPERASI", "YAYASAN"];
  
  // Split by spaces to handle words
  return name
    .split(" ")
    .map((word) => {
      // Remove any punctuation for checking against acronyms list (like "PT." -> "PT")
      const cleanWord = word.replace(/[.,]/g, "").toUpperCase();
      
      // Check if it's an acronym
      if (acronyms.includes(cleanWord)) {
        return word.toUpperCase();
      }
      
      // Otherwise, Title Case (capitalize first letter, lowercase rest)
      if (word.length > 0) {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      }
      
      return word;
    })
    .join(" ");
}
