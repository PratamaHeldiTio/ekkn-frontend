import { IAlert } from "./Alert.types";

export default function Alert({ background, message, textSize }: IAlert) {
  return (
    <p
      className={` w-full ${textSize} text-center ${background} font-bold rounded-3xl my-4 p-3 text-secondary`}
    >
      {message}
    </p>
  );
}
