import Alert from "@/components/Alert";
import { INavigation } from "@/components/Header/Header.types";
import InputField from "@/components/InputField";
import InputFile from "@/components/InputFile";
import InputSelect from "@/components/InputSelect";
import InputSubmit from "@/components/InputSubmit";
import LockAcces from "@/components/LockAccess";
import TextArea from "@/components/TextArea";
import StudentLayout from "@/layout/StudentLayout";
import { IDocumentPage } from "@/pages/student/group/document/document.types";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";

export default function Document({ group, villages }: IDocumentPage) {
  // get cookie
  const cookies = new Cookies();
  const token = cookies.get("AUTH_LGN");
  const router = useRouter();
  const { periodId } = router.query;

  // state
  const [village, setVillage] = useState("");
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [alertFail, setAlertFail] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [report, setReport] = useState<string | Blob>("");
  const [reportPreview, setReportPreview] = useState({
    name: "",
    fileUrl: "",
  });
  const [potential, setPotential] = useState<string | Blob>("");
  const [potentialPreview, setPotentialPreview] = useState({
    name: "",
    fileUrl: "",
  });

  const [inputvalue, setInputValue] = useState({
    strength: group.village.strength,
    weakness: group.village.weakness,
    oportunities: group.village.oportunities,
    threats: group.village.threats,
  });

  const { strength, weakness, oportunities, threats } = inputvalue;

  // to top after register
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [alertFail, alertSuccess]);

  // navigation header
  const navigations: INavigation[] = [
    {
      title: "Anggota",
      link: `/student/group/member/${periodId}`,
    },
    {
      title: "Dokumen",
      link: `/student/group/document/${periodId}`,
      isActive: true,
    },
    {
      title: "Luaran",
      link: `/student/group/output/${periodId}`,
    },
  ];

  const handleAddVillage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios
      .post(
        `${process.env.BASE_URL_V1}/group/village/${group.id}`,
        {
          village: village,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        setAlertMessage("Desa berhasil dipilih");
        setAlertSuccess(!alertSuccess);
        setTimeout(() => {
          setAlertSuccess((prev) => !prev);
          router.reload();
        }, 1500);
      })
      .catch(() => {
        setAlertMessage("Desa gagal dipilih");
        setAlertFail(!alertFail);
        setTimeout(() => {
          setAlertFail((prev) => !prev);
        }, 2000);
      });
  };

  // handle on submit proposal
  const handleUpload = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name } = e.currentTarget;
    const formData = new FormData();

    if (name == "report") {
      formData.append(name, report);
    } else if (name == "potential") {
      formData.append(name, potential);
    }

    axios
      .post(`${process.env.BASE_URL_V1}/group/${name}/${group.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setAlertMessage(response.data.message);
        setAlertSuccess(!alertSuccess);
        setTimeout(() => {
          setAlertSuccess((prev) => !prev);
          router.reload();
        }, 1500);
      })
      .catch((response) => {
        setAlertMessage(response.response.data.message);
        setAlertFail(!alertFail);
        setTimeout(() => {
          setAlertFail((prev) => !prev);
        }, 2000);
      });
  };

  // handle change desc village
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setInputValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDescVillage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios
      .put(
        `${process.env.BASE_URL_V1}/village/add_desc/${group.village.id}`,
        {
          strength,
          weakness,
          oportunities,
          threats,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        setAlertMessage("Deskripsi desa berhasil disimpan");
        setAlertSuccess(!alertSuccess);
        setTimeout(() => {
          setAlertSuccess((prev) => !prev);
        }, 2000);
      })
      .catch(() => {
        setAlertMessage("Deskripsi desa gagal disimpan");
        setAlertFail(!alertFail);
        setTimeout(() => {
          setAlertFail((prev) => !prev);
        }, 2000);
      });
  };

  // condition render component
  if (group.id == "") {
    return (
      <StudentLayout navigations={navigations}>
        <LockAcces message="Anda tidak memiliki akses pada halaman ini" />;
      </StudentLayout>
    );
  } else {
    return (
      <StudentLayout navigations={navigations}>
        <div className="my-20 lg:my-8">
          {alertSuccess && (
            <Alert background="bg-active" message={alertMessage} />
          )}

          {alertFail && <Alert background="bg-danger" message={alertMessage} />}

          <div className="bg-secondary p-8 rounded-3xl">
            {group.village.id != "" ? (
              <InputField
                label="Desa"
                value={group.village.value}
                readOnly={true}
              />
            ) : (
              <form onSubmit={handleAddVillage}>
                <InputSelect
                  options={villages}
                  label="Desa"
                  required={true}
                  value={village}
                  onChange={(e) => setVillage(e.target.value)}
                />
                <div className="w-40 mx-auto mb-16 h-10">
                  <InputSubmit value="Pilih" />
                </div>
              </form>
            )}

            {/* dercribe village section */}
            <div className="mt-5">
              <h1 className="font-bold lg:text-lg">Deskripsi Desa</h1>
              <p className="mb-5 mt-2">
                Lengkapi deskripsi desa sesuai hasil saat survey desa yang anda
                lakukan
              </p>
              <form
                onSubmit={handleDescVillage}
                className="grid grid-cols-1 gap-5"
              >
                <TextArea
                  name="strength"
                  label="Strength"
                  value={strength}
                  placeholder="Potensi yang ada di desa/lokasi KKN"
                  onChange={handleChange}
                />
                <TextArea
                  name="weakness"
                  label="Weakness"
                  value={weakness}
                  placeholder="Berbagai persoalan internal yang menghambat perkembangan desa"
                  onChange={handleChange}
                />
                <TextArea
                  value={oportunities}
                  name="oportunities"
                  label="Oportunities"
                  placeholder="Peluang untuk mengembangkan potensi desa"
                  onChange={handleChange}
                />
                <TextArea
                  name="threats"
                  label="Threats"
                  value={threats}
                  placeholder="Hambatan eksternal dalam pengembangan desa"
                  onChange={handleChange}
                />
                <div className="w-60 mx-auto h-10">
                  <InputSubmit value="Simpan" />
                </div>
              </form>
            </div>

            {/* potential village section */}
            {group.potential != "" ? (
              <div>
                <h1 className="font-bold lg:text-lg mt-16">Potensi Desa</h1>
                <div className="text-center px-5 mt-4 flex flex-col justify-center py-10 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-secondary  hover:bg-gray-100">
                  <a
                    href={`${process.env.BASE_URL}/static/potential/${group.potential}`}
                    target="_blank"
                    className="font-bold text-gray-500 hover:text-active break-words"
                  >
                    {group.potential}
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleUpload} className="mt-6" name="potential">
                <InputFile
                  label="Potensi Desa"
                  format="PDF"
                  maxSize={10}
                  file={potentialPreview}
                  onChange={(e: any) => {
                    setPotential(e.target.files[0]);
                    setPotentialPreview({
                      fileUrl: URL.createObjectURL(e.target.files[0]),
                      name: e.target.files[0].name,
                    });
                  }}
                />
                <div className="w-60 mt-4 mx-auto h-10">
                  <InputSubmit value="Kirim" />
                </div>
              </form>
            )}

            {/* report section */}
            {group.report != "" ? (
              <div>
                <h1 className="font-bold lg:text-lg mt-6">Laporan</h1>
                <div className="text-center px-5 mt-4 flex flex-col justify-center py-10 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-secondary  hover:bg-gray-100">
                  <a
                    href={`${process.env.BASE_URL}/static/report/${group.report}`}
                    target="_blank"
                    className="font-bold text-gray-500 hover:text-active break-words"
                  >
                    {group.report}
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleUpload} className="mt-6" name="report">
                <InputFile
                  label="Laporan"
                  format="PDF"
                  maxSize={10}
                  file={reportPreview}
                  onChange={(e: any) => {
                    setReport(e.target.files[0]);
                    setReportPreview({
                      fileUrl: URL.createObjectURL(e.target.files[0]),
                      name: e.target.files[0].name,
                    });
                  }}
                />
                <div className="w-60 mt-4 mx-auto h-10">
                  <InputSubmit value="Kirim" />
                </div>
              </form>
            )}
          </div>
        </div>
      </StudentLayout>
    );
  }
}
