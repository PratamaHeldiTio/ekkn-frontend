import { IAlert } from "./Alert.types";

export default function Alert({ background, message }: IAlert) {
  return (
    <p
      className={`text-lg text-center ${background} font-bold rounded-lg my-4 p-3 text-secondary`}
    >
      {message}
    </p>
  );
}
