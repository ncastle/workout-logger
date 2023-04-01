// takes two dates and compares the MMDDYYYY values of them
// returns true if they are equal and false if not
export function datesAreEqual(date1: Date, date2: Date): boolean {
  return getComparableDate(date1) === getComparableDate(date2);
}

// takes a Date object and returns a string in MMDDYYYY format
function getComparableDate(date: Date): string {
  return `${date.getMonth()}${date.getDate()}${date.getFullYear()}`;
}
