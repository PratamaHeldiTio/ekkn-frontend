import dynamic from "next/dynamic";
import React from "react";

const StudentRegistration = dynamic(
  () => import("@/container/admin/StudentRegistration")
);

export default function StudentRegistrationPage() {
  return <StudentRegistration />;
}
