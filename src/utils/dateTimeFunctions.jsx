export function formatDate(date) {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(date).toLocaleDateString("en-US", options);
}

export function formatTime(time) {
  const options = { hour: "numeric", minute: "numeric", hour12: true };
  return new Date(time).toLocaleTimeString("en-US", options);
}
