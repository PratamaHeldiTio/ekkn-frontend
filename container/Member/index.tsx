import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import InputField from "@/components/InputField";
import InputSubmit from "@/components/InputSubmit";
import axios from "axios";
import Cookies from "universal-cookie";
import Alert from "@/components/Alert";
import { decodeJWT } from "@/helper";
import { INavigation } from "@/components/Header/Header.types";
const StudentLayout = dynamic(() => import("@/layout/StudentLayout"));

export default function Member({ group, leader }: any) {
  const router = useRouter();
  const { periodId } = router.query;
  const [nameGroup, setNameGroup] = useState("");
  const [referral, setReferral] = useState("");
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [alertFail, setAlertFail] = useState(false);
  // get cookie
  const cookies = new Cookies();
  const token = cookies.get("AUTH_LGN");
  const navigations: INavigation[] = [
    {
      title: "Anggota",
      link: `/student/group/member/${periodId}`,
      isActive: true,
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

  // to top after register
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [alertFail, alertSuccess]);

  const handleCreateGroup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post(
        `${process.env.BASE_URL_V1}/group/${periodId}`,
        {
          name: nameGroup,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        setAlertSuccess(!alertSuccess);
        setTimeout(() => {
          setAlertSuccess((prev) => !prev);
          router.reload();
        }, 1500);
      })
      .catch(() => {
        setAlertFail(!alertFail);
        setTimeout(() => {
          setAlertFail((prev) => !prev);
        }, 2000);
      });
  };

  const handleJoinGroup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post(
        `${process.env.BASE_URL_V1}/group/join/${periodId}`,
        {
          referral: referral,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        setAlertSuccess(!alertSuccess);
        setTimeout(() => {
          setAlertSuccess((prev) => !prev);
          router.reload();
        }, 1500);
      })
      .catch(() => {
        setAlertFail(!alertFail);
        setTimeout(() => {
          setAlertFail((prev) => !prev);
        }, 2000);
      });
  };

  const handleRegisterGroup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .put(
        `${process.env.BASE_URL_V1}/group/register/${group.id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        setAlertSuccess(!alertSuccess);
        setTimeout(() => {
          setAlertSuccess((prev) => !prev);
          router.reload();
        }, 1500);
      })
      .catch(() => {
        setAlertFail(!alertFail);
        setTimeout(() => {
          setAlertFail((prev) => !prev);
        }, 2000);
      });
  };

  // student registered and haven't group
  if (!group) {
    return (
      <StudentLayout navigations={navigations}>
        <div className="mt-16 lg:mt-8">
          {alertSuccess && (
            <Alert
              background="bg-active"
              message="Kelompok berhasil dibuat/bergabung"
            />
          )}

          {alertFail && (
            <Alert
              background="bg-danger"
              message="Kelompok gagal dibuat/bergabung"
            />
          )}
          <div className="p-6 bg-secondary rounded-3xl">
            <div className="lg:w-9/12 mx-auto xl:w-6/12">
              <h1 className="font-bold text-xl text-center mb-4">
                Buat Kelompok
              </h1>
              <form onSubmit={handleCreateGroup}>
                <InputField
                  placeholder="Masukan nama kelompok sekreatif anda"
                  name="groupName"
                  value={nameGroup}
                  label="Nama Kelompok"
                  required={true}
                  onChange={(e) => setNameGroup(e.target.value)}
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
              <form onSubmit={handleJoinGroup}>
                <InputField
                  placeholder="Masukan kode referral kelompok"
                  name="referral"
                  value={referral}
                  required={true}
                  onChange={(e) => setReferral(e.target.value)}
                />
                <div className="w-40 mx-auto mb-4">
                  <InputSubmit value="Gabung" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </StudentLayout>
    );
  } else {
    return (
      <StudentLayout navigations={navigations}>
        <div className="my-16 lg:m-0 lg:mt-8 p-6 bg-secondary rounded-3xl">
          <h1 className="font-bold text-center text-xl lg:text-2xl mb-4">
            Anggota Kelompok
          </h1>
          {alertSuccess && (
            <Alert
              background="bg-active"
              message="Kelompok berhasil didaftarkan"
            />
          )}

          {alertFail && (
            <Alert
              background="bg-danger"
              message="Kelompok gagal didaftarkan"
            />
          )}
          <ul className="lg:text-lg">
            <li className="my-2 truncate">Nama : {group.name}</li>
            <li className="my-2 truncate">Ketua : {group.leader}</li>
            <li className="my-2 truncate">
              Tempat :{" "}
              {group.village.name != ""
                ? `Desa ${group.village.name}, Kecamatan ${group.village.kecamatan}, Kabupaten ${group.village.kabupaten}`
                : "Belum ada desa"}{" "}
            </li>
            <li className="my-2 truncate">
              Status :{" "}
              {group.status == "true" ? "Terdaftar" : "Belum terdaftar"}
            </li>
            <li className="my-2 truncate">
              Pembimbing :{" "}
              {group.mentor ? group.mentor : "Belum ada pembimbing"}
            </li>
          </ul>

          <h1 className="text-center font-bold text-xl mt-8">
            Referral {group.referral}
          </h1>
          <div className="overflow-y-scroll my-4">
            <table className="mx-auto">
              <thead className="bg-primary text-secondary">
                <tr>
                  <th className="px-4 border border-secondary">No</th>
                  <th className="border border-secondary">Nim</th>
                  <th className="border border-secondary">Nama</th>
                  <th className="border border-secondary">Prodi</th>
                  <th className="border border-secondary p-3">Bahasa Madura</th>
                </tr>
              </thead>
              <tbody>
                {group.students.map((student: any, index: any) => {
                  return (
                    <tr key={student.nim}>
                      <td className="px-4 text-center border border-primary p-3">
                        {index + 1}
                      </td>
                      <td className="border border-primary min-w-[10rem] p-3">
                        {student.nim}
                      </td>
                      <td className="border border-primary min-w-[10rem] p-3">
                        {student.name}
                      </td>
                      <td className="border border-primary min-w-[10rem] p-3">
                        {student.prodi}
                      </td>
                      <td className="text-center  border border-primary min-w-[10rem] p-3">
                        {student.madura_lang == "true" ? "Ya" : "Tidak"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {group.leader == leader && (
            <form onSubmit={handleRegisterGroup} className="max-w-sm mx-auto">
              <InputSubmit
                value={group.status == "true" ? "Terdaftar" : "Daftarkan"}
                disabled={group.status == "true" && true}
              />
            </form>
          )}
        </div>
      </StudentLayout>
    );
  }
}
