export function decodeJWT(token: string) {
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

  const stringTime = new Intl.DateTimeFormat("en", {
    minute: "2-digit",
    second: "2-digit",
  }).format(time);

  return `${stringDate}, ${stringTime}`;
};
