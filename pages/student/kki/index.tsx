import dynamic from "next/dynamic";

const KKI = dynamic(() => import("@/container/KKI"));
export default function KKIPage() {
  return <KKI />;
}
