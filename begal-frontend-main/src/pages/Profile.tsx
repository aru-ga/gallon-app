import { ChevronLeftCircle } from "lucide-react";
import { Link } from "react-router-dom";
import dummyImg from "../assets/hero-slider.png";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import userProfile from "@/api/auth";
import { UserProfile } from "@/types/userTypes";

export default function Profile() {
  const [profile, setProfile] = useState<UserProfile>({
    name: "",
    email: "",
    role: "",
    password: "",
    address: {
      detail: "",
      district: "",
      province: "",
      regency: "",
      street: "",
      village: "",
    },
    phone: 0,
    profile_picture_url: "",
  });
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      const fetchProfile = async () => {
        try {
          const profile = await userProfile(token);
          setProfile(profile.data);
          console.log(profile.data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchProfile();
    }
  }, []);
  return (
    <>
      <div className="dark:bg-gray-900">
        <Link
          to="/"
          className="flex flex-row hover:text-gray-500 items-center gap-5 px-20 pt-10 w-min"
        >
          <ChevronLeftCircle size="40" className="dark:text-white" />
        </Link>

        <div className=" dark:text-white flex flex-col rounded-lg p-5 w-5/6 mx-auto">
          <img
            src={dummyImg}
            className="object-cover rounded-xl h-96 mx-auto w-5/6"
            alt=""
          />
          <div className="flex flex-row items-center justify-between w-full">
            <div className="-mt-28 ml-20">
              <Avatar>
                <AvatarImage
                  className="rounded-full w-40"
                  src={profile.profile_picture_url}
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
                <Button variant="link">Change Image</Button>
              </Avatar>
              <div>
                <h2 className="text-2xl font-bold">{profile.name}</h2>
                <h2>{profile.address.detail}</h2>
                <h2>{profile.phone}</h2>
              </div>
            </div>

            <div className="flex flex-col mr-32 gap-1 -pb-10">
              <Link
                className="border-b  text-right hover:bg-blue-200 p-3 w-48"
                to={""}
              >
                Address
              </Link>
              <Link
                className="border-b  text-right hover:bg-blue-200 p-3 w-48"
                to={""}
              >
                Transaction
              </Link>
              <Link
                className="border-b  text-right hover:bg-blue-200 p-3 w-48"
                to={""}
              >
                Change Password
              </Link>
              <Link
                className="border-b  text-right hover:bg-blue-200 p-3 w-48"
                to={""}
              >
                Info
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
