export function getDatesInRange(weeks) {
  const dates = [];
  const today = new Date();

  for (let i = 0; i < weeks; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i * 7);
    const formattedDate = date.toISOString().split("T")[0]; // Convert to YYYY-MM-DD format
    dates.push(formattedDate);
  }

  return dates;
}

export function padStartArray(arr, desiredLength, padValue) {
  if (arr.length >= desiredLength) {
    return arr; // No need to pad if the array is already long enough
  }

  const paddingLength = desiredLength - arr.length;
  const paddingArray = Array(paddingLength).fill(padValue);

  return paddingArray.concat(arr);
}
