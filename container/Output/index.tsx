import { INavigation } from "@/components/Header/Header.types";
import InputSelect from "@/components/InputSelect";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import output from "@/global/output.json";
import InputField from "@/components/InputField";
import TextArea from "@/components/TextArea";
import InputSubmit from "@/components/InputSubmit";
import Alert from "@/components/Alert";
import axios from "axios";
import {
  IOutput,
  IOutputPage,
} from "@/pages/student/group/output/output.types";

const StudentLayout = dynamic(() => import("@/layout/StudentLayout"));

export default function Output({ groupId, outputs }: IOutputPage) {
  // get cookie
  const cookies = new Cookies();
  const token = cookies.get("AUTH_LGN");
  const router = useRouter();
  const { periodId } = router.query;
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [alertFail, setAlertFail] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [type, setType] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [contribution, setContribution] = useState<string>();
  const [file, setFile] = useState<string>();
  // to top after register
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [alertFail, alertSuccess]);
  const navigations: INavigation[] = [
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
      isActive: true,
    },
  ];

  const handleAddOutput = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios
      .post(
        `${process.env.BASE_URL_V1}/output`,
        {
          group_id: groupId,
          type,
          file,
          description,
          contribution,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setAlertSuccess(!alertSuccess);
        setAlertMessage(response.data.message);
        setTimeout(() => {
          setAlertSuccess((prev) => !prev);
        }, 1500);

        setTimeout(() => {
          router.reload();
        }, 2000);
      })
      .catch((response) => {
        setAlertFail(!alertFail);
        setAlertMessage(response.response.data.message);
        setTimeout(() => {
          setAlertFail((prev) => !prev);
        }, 2000);
      });
  };

  return (
    <StudentLayout navigations={navigations}>
      <div className="mt-20 lg:m-0 lg:mt-8 lg:p-10 p-6 bg-secondary rounded-3xl">
        <h1 className="text-xl lg:text-2xl font-bold mb-6">Tambah Luaran</h1>
        {alertSuccess && (
          <Alert background="bg-active" message={alertMessage} />
        )}
        {alertFail && <Alert background="bg-danger" message={alertMessage} />}
        <form onSubmit={handleAddOutput}>
          <div className="grid grid-cols-1 gap-4">
            <InputSelect
              label="Jenis luaran"
              options={output}
              value={type}
              onChange={(e) => setType(e.target.value)}
            />
            <TextArea
              label="Deskripsi Singkat"
              name="desc"
              placeholder="Deskripsikan Luaran Secara Singkat "
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <InputField
              label="Link Luaran"
              placeholder="Masukan link atau bukti luaran"
              name="file"
              value={file}
              onChange={(e) => setFile(e.target.value)}
            />
            <InputField
              label="Kontribusi Mahasiswa"
              placeholder="ex: heldi, pratama, budi"
              name="contribution"
              value={contribution}
              onChange={(e) => setContribution(e.target.value)}
            />
            <p className="text-sm -mt-4">
              Note: setiap nama pisahkan dengan koma (,)
            </p>
          </div>
          <div className="w-80 h-10 my-4 mx-auto">
            <InputSubmit value="kirim" />
          </div>
        </form>
      </div>

      {/* section list output */}
      <div className="mt-8 mb-20 lg:m-0 lg:mt-8 lg:p-10 p-6 bg-secondary rounded-3xl">
        <h1 className="text-xl lg:text-2xl font-bold">Daftar Luaran</h1>
        <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
          {outputs.map((output: IOutput) => {
            return (
              <div key={output.id} className="bg-gray-200 rounded-xl">
                <div className="bg-primary text-secondary rounded-t-xl px-4 py-3 lg:px-8 flex items-center place-content-between text-base">
                  <h2 className="font-bold capitalize text-center mr-4">
                    {output.type}
                  </h2>
                  <a
                    className="block h-8 w-32"
                    href={output.file}
                    target="_blank"
                  >
                    <InputSubmit value="Buka Luaran" background="bg-success" />
                  </a>
                </div>
                <div className="px-6 py-4">
                  <h2 className="font-bold lg:text-xl capitalize">
                    Deskripsi Luaran
                  </h2>
                  <p className="text-justify leading-7">{output.description}</p>
                  <h2 className="font-bold lg:text-xl mt-4 capitalize">
                    Kontribusi
                  </h2>
                  <ul className="list-decimal ml-4">
                    {output.contribution.map((student: any, index: number) => {
                      return <li key={index}>{student}</li>;
                    })}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </StudentLayout>
  );
}
