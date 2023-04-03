import { IAlert } from "./Alert.types";

export default function Alert({ border, background, message }: IAlert) {
  return (
    <p
      className={`border-2 text-sm ${border} ${background} rounded-lg my-4 p-2 w-full`}
    >
      {message}
    </p>
  );
}
