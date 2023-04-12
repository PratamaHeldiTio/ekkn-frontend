export function decodeJWT(token: string) {
  var arr = token.split(".");
  const payload = JSON.parse(atob(arr[1]));
  return payload;
}
