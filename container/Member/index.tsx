import { useRouter } from "next/router";
import React from "react";
import dynamic from "next/dynamic";
const StudentLayout = dynamic(() => import("@/layout/StudentLayout"));
export default function Member() {
  const router = useRouter();
  const { periodId } = router.query;
  const navigations = [
    {
      title: "Anggota",
      link: `/student/group/member/${periodId}`,
    },
    {
      title: "Dokumen",
      link: `/student/group/document/${periodId}`,
    },
    {
      title: "Luaran",
      link: `/student/group/output/${periodId}`,
    },
  ];
  return (
    <StudentLayout navigations={navigations}>
      <div>Member {periodId}</div>
      <p>haloooo</p>
    </StudentLayout>
  );
}
