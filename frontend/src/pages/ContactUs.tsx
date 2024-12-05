import { useEffect, useState } from "react";
import { useAxios } from "../data/useAxios";
import { IContactUs } from "../types/contactUs"

export const ContactUs: React.FC = () => {
  const axiosInstance = useAxios();
  const [contactUs, setContactUs] = useState<IContactUs[]>();

  useEffect(() => {
    axiosInstance.get("/contact-us").then((res) => {
      setContactUs(res.data);
    }).catch((error) => {
      console.error(error);
    })
  }, []);
  
  return (
    <div>ContactUs</div>
  )
}
