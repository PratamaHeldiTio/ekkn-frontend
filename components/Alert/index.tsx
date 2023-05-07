import { IAlert } from "./Alert.types";

export default function Alert({
  background,
  message,
  margin,
  padding,
}: IAlert) {
  return (
    <p
      className={` capitalize w-full text-center ${background} font-bold rounded-3xl ${
        padding ? padding : "p-3"
      } ${margin ? margin : "my-4"} text-secondary`}
    >
      {message}
    </p>
  );
}
