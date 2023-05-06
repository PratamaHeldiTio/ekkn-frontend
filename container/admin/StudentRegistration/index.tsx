import dynamic from "next/dynamic";

const AdminLayout = dynamic(() => import("@/layout/AdminLayout"));
export default function index() {
  const navigations = [
    { title: "Mahasiswa", link: "/sakera/registration/student" },
    { title: "Dosen", link: "/sakera/registration/lecture" },
    { title: "Kelompok", link: "/sakera/registration/group" },
  ];
  return (
    <AdminLayout navigations={navigations}>
      <div></div>
    </AdminLayout>
  );
}
