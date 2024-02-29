export function formatDate(dataApi: string) {
  const dateData = new Date(dataApi ?? new Date());
  const time = dateData.getHours() + ':' + dateData.getMinutes();
  const date =
    dateData.getFullYear() +
    '/' +
    (dateData.getMonth() + 1) +
    '/' +
    dateData.getDate();

  return {
    time,
    date,
  };
}
