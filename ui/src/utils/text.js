export function truncate100(text = "") {
  if (text.length > 100) {
    return text.slice(0, 100) + "...";
  }
  return text;
}
