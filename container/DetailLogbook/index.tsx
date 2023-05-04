/* eslint-disable @next/next/no-img-element */
import Alert from "@/components/Alert";
import InputField from "@/components/InputField";
import InputFile from "@/components/InputFile";
import InputSubmit from "@/components/InputSubmit";
import LockAcces from "@/components/LockAccess";
import TextArea from "@/components/TextArea";
import { formatTimeUnix } from "@/helper";
import { ILogbookDetail } from "@/pages/student/logbook/[periodID]/detailLogbook.types";
import axios from "axios";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
const StudentLayout = dynamic(() => import("@/layout/StudentLayout"));
export default function DetailLogbook({ group, logbooks }: ILogbookDetail) {
  // get cookie
  const cookies = new Cookies();
  const token = cookies.get("AUTH_LGN");
  const router = useRouter();
  const { periodID } = router.query;

  const [logbooksData, setLogbooks] = useState(logbooks);
  const [imagePreview, setImagePreview] = useState({
    name: "",
    fileUrl: "",
  });
  const [date, setDate] = useState("");
  const [activity, setActivity] = useState("");
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  const [image, setImage] = useState<string | Blob>("");
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [alertFail, setAlertFail] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    if (group == null) {
      router.replace("/404");
      return;
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (err) => {
          alert("Tidak dapat mengisi logbook jika lokasi ditolak");
        }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // to top after register
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [alertFail, alertSuccess]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (latitude == 0 || longitude == 0) {
      setAlertMessage("Tidak dapat mengisi logbook jika lokasi ditolak");
      setAlertFail(!alertFail);
      setTimeout(() => {
        setAlertFail((prev) => !prev);
      }, 3000);
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("date", date);
    formData.append("activity", activity);
    formData.append("period_id", periodID as string);
    formData.append("group_id", group.id);
    formData.append("latitude", latitude.toString());
    formData.append("longitude", longitude.toString());

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
        }, 2000);

        setActivity("");
        setDate("");
        setImage("");
        setImagePreview({ name: "", fileUrl: "" });

        axios
          .get(`${process.env.BASE_URL_V1}/logbooks/${periodID}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            const logbooks: any = [];
            response.data.data.map((data: any) => {
              const logbook = {
                id: data.id,
                date: data.date,
                activity: data.activity,
                image: data.image,
                submitted: data.submitted,
              };
              logbooks.push(logbook);
            });

            setLogbooks(logbooks);
          })
          .catch(() => setLogbooks([]));
      })
      .catch((response) => {
        setAlertMessage(response.response.data.message);
        setAlertFail(!alertFail);
        setTimeout(() => {
          setAlertFail((prev) => !prev);
        }, 2000);
      });
  };

  return (
    <StudentLayout
      navigations={[{ title: "Kembali ", link: "/student/logbook" }]}
    >
      <div className="my-16 lg:my-8">
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
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <TextArea
              placeholder="Ceritakan kegiatan kkn mu hari ini"
              name="activity"
              value={activity}
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
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6">
          {logbooksData.map((logbook: any) => {
            return (
              <div
                key={logbook.id}
                className="bg-secondary rounded-3xl lg:p-8 lg:text-xl p-6 font-bold"
              >
                <h1>{formatTimeUnix(logbook.date).split(",")[0]}</h1>
                <p className="font-light text-sm">
                  Dikirim pada {formatTimeUnix(logbook.submitted)} WIB
                </p>
                <p className="font-light text-sm lg:text-base mt-4 text-justify">
                  {logbook.activity}
                </p>
                <a
                  href={`${process.env.BASE_URL}/static/logbook/${logbook.image}`}
                  target="_blank"
                >
                  <img
                    src={`${process.env.BASE_URL}/static/logbook/${logbook.image}`}
                    alt="Dokumentasi kegiatan"
                    className="mt-4 max-h-80 mx-auto"
                  />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </StudentLayout>
  );
}