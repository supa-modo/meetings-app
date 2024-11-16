export function formatDate(date) {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(date).toLocaleDateString("en-US", options);
}

export function formatTime(time) {
  const options = { hour: "numeric", minute: "numeric", hour12: true };
  return new Date(time).toLocaleTimeString("en-US", options);
}

export function formatTime2(time, format = "HH:mm") {
  if (!time) return ""; // Handle empty or undefined time

  const date = new Date(time);

  if (isNaN(date.getTime())) return ""; // Handle invalid date

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  if (format === "HH:mm") {
    return `${hours}:${minutes}`;
  } else if (format === "HH:mm:ss") {
    return `${hours}:${minutes}:${seconds}`;
  }

  return `${hours}:${minutes}`; // Default format
}

// Helper function to convert Base64 to Blob
export function base64ToBlob(base64, contentType) {
  const byteCharacters = atob(base64.split(",")[1]);
  const byteArrays = [];
  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    const slice = byteCharacters.slice(offset, offset + 512);
    const byteNumbers = new Array(slice.length)
      .fill()
      .map((_, i) => slice.charCodeAt(i));
    byteArrays.push(new Uint8Array(byteNumbers));
  }
  return new Blob(byteArrays, { type: contentType });
}
