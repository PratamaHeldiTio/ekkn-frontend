export function decodeJWT(token: string) {
  if (!token) {
    return;
  }
  var arr = token.split(".");
  const payload = JSON.parse(atob(arr[1]));
  return payload;
}

export const formatTimeUnix = (time: number): string => {
  const date = new Date(time * 1000);
  const stringDate = new Intl.DateTimeFormat("id", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);

  const stringTime = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(time * 1000);

  return `${stringDate}, ${stringTime}`;
};

export const formatUnixToDateHtml = (time: number): string => {
  const date = new Date(time * 1000);

  return date.toISOString().split("T")[0];
};
