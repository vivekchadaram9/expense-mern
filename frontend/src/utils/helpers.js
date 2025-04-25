export function formatCase(str) {
  return str
    .split("_") 
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) 
    .join(" ");
}
