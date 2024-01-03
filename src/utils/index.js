function formatDateString(dateString) {
  const date = new Date(dateString);

// Format the date into a standard date format (e.g., "YYYY/MM/DD")
const formattedDate = `${(date.getMonth() + 1).toString().padStart(2, "0")}/
                      ${date.getDate().toString().padStart(2, "0")}/
                      ${date.getFullYear()}`;


  return formattedDate;
}

function formatDateWithAMPM(dateString) {
  const date = new Date(dateString);

  // Get hours and minutes
  const hours = date.getHours();
  const minutes = date.getMinutes();

  // Format the time into 12-hour format with AM/PM
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;

  // Format the date into a standard date format
  const formattedDate = `${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}/${date
    .getDate()
    .toString()
    .padStart(2, "0")}/${date.getFullYear()} ${formattedHours
    .toString()
    .padStart(2, "0")}:${minutes.toString().padStart(2, "0")} ${ampm}`;

  return formattedDate;
}

export { formatDateString, formatDateWithAMPM };
