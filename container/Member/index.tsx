import { useRouter } from "next/router";
import React from "react";
import dynamic from "next/dynamic";
import InputField from "@/components/InputField";
import InputSubmit from "@/components/InputSubmit";
const StudentLayout = dynamic(() => import("@/layout/StudentLayout"));

export default function Member({ group }: any) {
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

  // if student not registered but input period valid
  if (group.status == "false") {
    return <div>Anda tidak memiliki akses silahkan balik lagi</div>;
  }

  if (!group) {
    return (
      <StudentLayout navigations={navigations}>
        <div className="mt-16 lg:mt-8 p-6 bg-secondary rounded-3xl">
          <div className="lg:w-9/12 mx-auto xl:w-6/12">
            <h1 className="font-bold text-xl text-center mb-4">
              Buat Kelompok
            </h1>
            <form>
              <InputField
                placeholder="Masukan nama kelompok sekreatif anda"
                name="groupName"
                label="Nama Kelompok"
                required={true}
              />
              <div className="w-40 mx-auto mb-4">
                <InputSubmit value="Buat kelompok" />
              </div>
            </form>
            <p>
              Note: Ketika anda membuat kelompok otomatis anda sebagai ketua
            </p>
          </div>
        </div>

        <div className="mt-8 p-6 bg-secondary rounded-3xl">
          <div className="lg:w-9/12 mx-auto xl:w-6/12">
            <h1 className="font-bold text-xl text-center mb-4">
              Gabung Kelompok
            </h1>
            <form>
              <InputField
                placeholder="Masukan kode referral kelompok"
                name="referral"
                required={true}
              />
              <div className="w-40 mx-auto mb-4">
                <InputSubmit value="Gabung" />
              </div>
            </form>
          </div>
        </div>
      </StudentLayout>
    );
  } else {
    return <div>ini anggota</div>;
  }
}
