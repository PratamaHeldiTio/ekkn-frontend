import Alert from "@/components/Alert";
import InputField from "@/components/InputField";
import InputFile from "@/components/InputFile";
import InputSelect from "@/components/InputSelect";
import InputSubmit from "@/components/InputSubmit";
import LockAcces from "@/components/LockAccess";
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
  const [village, setVillage] = useState("");
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [alertFail, setAlertFail] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [proposal, setProposal] = useState<string | Blob>("");
  const [proposalPreview, setProposalPreview] = useState({
    name: "",
    fileUrl: "",
  });
  const [report, setReport] = useState<string | Blob>("");
  const [reportPreview, setReportPreview] = useState({
    name: "",
    fileUrl: "",
  });

  // to top after register
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [alertFail, alertSuccess]);

  // navigation header
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
        setAlertSuccess(!alertSuccess);
        setTimeout(() => {
          setAlertSuccess((prev) => !prev);
          setAlertMessage("Desa berhasil dipilih");
          router.reload();
        }, 1500);
      })
      .catch(() => {
        setAlertFail(!alertFail);
        setTimeout(() => {
          setAlertFail((prev) => !prev);
          setAlertMessage("Desa gagal dipilih");
        }, 2000);
      });
  };

  // handle on submit proposal
  const handleUpload = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name } = e.currentTarget;
    const formData = new FormData();

    if (name == "proposal") {
      formData.append(name, proposal);
    } else if (name == "report") {
      formData.append(name, report);
    }

    axios
      .post(`${process.env.BASE_URL_V1}/group/${name}/${group.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setAlertMessage("Upload file berhasil dilakukan");
        setAlertSuccess(!alertSuccess);
        setTimeout(() => {
          setAlertSuccess((prev) => !prev);
          router.reload();
        }, 1500);
      })
      .catch(() => {
        setAlertMessage("Upload file gagal dilakukan");
        setAlertFail(!alertFail);
        setTimeout(() => {
          setAlertFail((prev) => !prev);
        }, 2000);
      });
  };

  // condition render component
  if (group == null) {
    return (
      <StudentLayout navigations={navigations}>
        <LockAcces />;
      </StudentLayout>
    );
  } else {
    return (
      <StudentLayout navigations={navigations}>
        <div className="my-16 lg:my-8">
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
                <div className="w-40 mx-auto">
                  <InputSubmit value="Pilih" />
                </div>
              </form>
            )}

            {/* proposals section */}
            {group.proposal != "" ? (
              <div>
                <h1 className="font-bold lg:text-lg mt-6">Proposal</h1>
                <div className="text-center px-5 mt-4 flex flex-col justify-center py-10 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-secondary  hover:bg-gray-100">
                  <a
                    href={`${process.env.BASE_URL}/static/proposal/${group.proposal}`}
                    target="_blank"
                    className="font-bold text-gray-500 hover:text-active break-words"
                  >
                    {group.proposal}
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleUpload} className="mt-6" name="proposal">
                <InputFile
                  label="Proposal"
                  format="PDF"
                  maxSize={10}
                  file={proposalPreview}
                  onChange={(e: any) => {
                    setProposal(e.target.files[0]);
                    setProposalPreview({
                      fileUrl: URL.createObjectURL(e.target.files[0]),
                      name: e.target.files[0].name,
                    });
                  }}
                />
                <div className="w-60 mt-4 mx-auto">
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
                <div className="w-60 mt-4 mx-auto">
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
