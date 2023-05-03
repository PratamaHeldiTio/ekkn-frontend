import Alert from "@/components/Alert";
import InputField from "@/components/InputField";
import InputFile from "@/components/InputFile";
import InputSubmit from "@/components/InputSubmit";
import TextArea from "@/components/TextArea";
import { ILogbookDetail } from "@/pages/student/logbook/[periodID]/detailLogbook.types";
import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
const StudentLayout = dynamic(() => import("@/layout/StudentLayout"));
export default function DetailLogbook({ group }: ILogbookDetail) {
  // get cookie
  const cookies = new Cookies();
  const token = cookies.get("AUTH_LGN");
  const router = useRouter();
  const { periodID } = router.query;

  const [imagePreview, setImagePreview] = useState({
    name: "",
    fileUrl: "",
  });
  const [date, setDate] = useState("");
  const [activity, setActivity] = useState("");
  const [image, setImage] = useState<string | Blob>("");
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [alertFail, setAlertFail] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", image);
    formData.append("date", date);
    formData.append("activity", activity);
    formData.append("period_id", periodID as string);
    formData.append("group_id", group.id);

    axios
      .post(`${process.env.BASE_URL_V1}/logbook`, formData, {
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

  // to top after register
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [alertFail, alertSuccess]);

  return (
    <StudentLayout
      navigations={[{ title: "Kembali ", link: "/student/logbook" }]}
    >
      <div className="md:grid md:grid-cols-2 md:gap-8 my-16 lg:my-8">
        {alertSuccess && (
          <Alert background="bg-active" message={alertMessage} />
        )}

        {alertFail && <Alert background="bg-danger" message={alertMessage} />}

        {/* section add logbook */}
        <div className="bg-secondary rounded-3xl lg:mt-8 lg:p-8 lg:text-xl p-6 font-bold">
          <h1>Kelompok: {group.name}</h1>
          <h1>Desa: {`${group.village}`}</h1>
          <h1 className="my-6 text-center">Apa Kegiatanmu Hari Ini</h1>
          <form onSubmit={handleSubmit}>
            <InputField
              label="Tanggal"
              type="date"
              required
              name="date"
              onChange={(e) => setDate(e.target.value)}
            />
            <TextArea
              placeholder="Ceritakan kegiatan kkn mu hari ini"
              name="activity"
              onChange={(e) => setActivity(e.target.value)}
            />
            <div className="mt-6">
              <InputFile
                format="png, jpg, jpeg"
                maxSize={5}
                label="dokumentasi kegiatan"
                file={imagePreview}
                onChange={(e: any) => {
                  setImage(e.target.files[0]);
                  setImagePreview({
                    fileUrl: URL.createObjectURL(e.target.files[0]),
                    name: e.target.files[0].name,
                  });
                }}
              />
            </div>
            <div className="w-60 mt-4 mx-auto">
              <InputSubmit value="Kirim" />
            </div>
          </form>
        </div>
      </div>
    </StudentLayout>
  );
}
