import { useRouter } from "next/router";
import { IHeaderState } from "./HeaderState.types";

export default function HeaderState({
  navigationState = [],
  page,
  setPage,
}: IHeaderState) {
  const router = useRouter();
  return (
    <div className="fixed top-0 left-0 right-0 bg-secondary drop-shadow-lg lg:static lg:drop-shadow-none lg:rounded-3xl">
      <div className="grid grid-cols-4 justify-items-stretch p-3 lg:p-4 px-8 lg:px-12 place-items-center min-h-[5rem]">
        <ul className="col-span-3">
          {navigationState.map((nav) => {
            return (
              <li
                key={nav}
                className={`mr-8 lg:text-xl xl:text-2xl font-bold inline-block cursor-pointer ${
                  nav == page && "text-active"
                }`}
                onClick={() => {
                  if (setPage != undefined) {
                    setPage(nav);
                  }
                }}
              >
                {nav}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
