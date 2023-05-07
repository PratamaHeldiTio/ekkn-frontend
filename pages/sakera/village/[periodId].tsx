import dynamic from "next/dynamic";

const VillageByPeriod = dynamic(
  () => import("@/container/admin/VillageByPeriod")
);
export default function VillageByPeriodPage() {
  return <VillageByPeriod />;
}
