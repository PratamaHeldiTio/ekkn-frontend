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
  const [accuracy, setAccuracy] = useState(0);

  const [image, setImage] = useState<string | Blob>("");
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [alertFail, setAlertFail] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          setAccuracy(position.coords.accuracy);
        },
        (err) => {
          alert("Tidak dapat mengisi logbook jika lokasi ditolak");
        },
        { enableHighAccuracy: true, maximumAge: 2000, timeout: 5000 }
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
      setAlertMessage(
        "Tidak dapat mengisi logbook jika lokasi ditolak atau tidak ada koneksi internet"
      );
      setAlertFail(!alertFail);
      setTimeout(() => {
        setAlertFail((prev) => !prev);
      }, 3000);
      return;
    }

    if (accuracy > 1000) {
      setAlertMessage(
        "sepertinya akurasi lokasi anda sangat buruk melebihi 1000 meter coba menggunakan device lain atau coba lagi nanti"
      );
      setAlertFail(!alertFail);
      setTimeout(() => {
        setAlertFail((prev) => !prev);
      }, 5000);
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

  if (group == null || group.status == "false") {
    return (
      <StudentLayout
        navigations={[{ title: "Kembali ", link: "/student/logbook" }]}
      >
        <LockAcces message="Anda tidak dapat membuka halaman ini jika belum memiliki group atau group tidak terdaftar" />
        ;
      </StudentLayout>
    );
  }

  return (
    <StudentLayout
      navigations={[{ title: "Kembali ", link: "/student/logbook" }]}
    >
      <div className="mt-20 lg:my-8">
        {alertSuccess && (
          <Alert background="bg-active" message={alertMessage} />
        )}

        {alertFail && <Alert background="bg-danger" message={alertMessage} />}

        {/* section add logbook */}
        <div className="bg-secondary rounded-3xl lg:mt-8 mb-8 lg:p-8 lg:text-xl p-6">
          <h1>Kelompok: {group.name}</h1>
          <h1>Desa: {`${group.village}`}</h1>
          <h1 className="mt-8 mb-4 text-center font-bold">
            Apa Kegiatanmu Hari Ini
          </h1>
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
                maxSize={1}
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
            <div className="w-60 mt-4 mx-auto h-10">
              <InputSubmit value="Kirim" />
            </div>
          </form>
        </div>
        <div className="grid grid-cols-1 gap-8 mb-16">
          {logbooksData.map((logbook: any) => {
            return (
              <div
                key={logbook.id}
                className="bg-secondary rounded-3xl lg:p-12 p-6 lg:text-xl font-bold"
              >
                <h1>{formatTimeUnix(logbook.date).split(",")[0]}</h1>
                <p className="font-light text-sm">
                  Dikirim pada {formatTimeUnix(logbook.submitted)} WIB
                </p>
                <hr className="border-2 border-primary mt-2" />
                <p className="font-light text-sm lg:text-lg mt-8 text-justify xl:px-12 px-4">
                  {logbook.activity}
                </p>
                <a
                  href={`${process.env.BASE_URL}/static/logbook/${logbook.image}`}
                  target="_blank"
                >
                  <img
                    src={`${process.env.BASE_URL}/static/logbook/${logbook.image}`}
                    alt="Dokumentasi kegiatan"
                    className="mt-8 max-h-60 mx-auto"
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
