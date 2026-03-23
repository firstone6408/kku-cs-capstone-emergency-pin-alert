import { useEffect, useState } from "react";
import Sweetalert from "sweetalert2";

export function useDeviceLocation() {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // console.log(navigator.geolocation);
    if (!navigator.geolocation) {
      setError("ไม่สามารถระบุพิกัดตำแหน่งเครื่องคุณได้");
      // Sweetalert.fire({
      //   title: "เกิดข้อผิดพลาด",
      //   text: "ไม่สามารถระบุพิกัดตำแหน่งเครื่องคุณได้ กรุณาอนุญาติให้ทางเว็บไซต์เข้าถึงตำแหน่งของคุณ",
      //   icon: "error",
      // });
      setIsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        setIsLoading(false);
      },
      (error) => {
        // console.error("Geolocation error:", error); // เพิ่มดูว่า browser ให้ข้อมูลยังไง
        let msg = "";

        switch (error.code) {
          case error.PERMISSION_DENIED:
            msg = "คุณไม่ได้อนุญาตให้เข้าถึงตำแหน่ง";
            break;
          case error.POSITION_UNAVAILABLE:
            msg = "ไม่สามารถระบุตำแหน่งได้";
            break;
          case error.TIMEOUT:
            msg = "การระบุตำแหน่งหมดเวลา";
            break;
          default:
            msg = "เกิดข้อผิดพลาดไม่ทราบสาเหตุ";
        }
        setError(msg);
        Sweetalert.fire({
          title: "เกิดข้อผิดพลาด",
          text: `ไม่สามารถระบุพิกัดตำแหน่งเครื่องคุณได้ ${msg}`,
          icon: "error",
        });
        setIsLoading(false);
      },
    );
  }, []);

  return { latitude, longitude, isLoading, error };
}
