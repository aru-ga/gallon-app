import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import dummyImg from "@/assets/hero-slider.png";

export default function SellerProfile() {
  return (
    <>
      <SidebarInset className="dark:bg-gray-900 dark:text-white">
        <div className="flex flex-row items-center space-x-2 p-3">
          <SidebarTrigger />
          <Separator orientation="vertical" />
          <h1>Profile</h1>
        </div>

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
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
                <Button variant="link">Change Image</Button>
              </Avatar>
              <div>
                <h2 className="text-2xl font-bold">User</h2>
                <h2>Address</h2>
                <h2>Number</h2>
              </div>
            </div>

            <div className="flex flex-col mr-32 gap-1 -mb-10">
              <Button variant="link" className="border-b p-0 text-right hover:bg-blue-200 w-48">
                Address
              </Button>
              <Button variant="link" className="border-b text-right hover:bg-blue-200 p-3 w-48">
                Transaction
              </Button>
              <Button variant="link" className="border-b text-right hover:bg-blue-200 p-3 w-48">
                Change Password
              </Button>
              <Button variant="link" className="border-b text-right hover:bg-blue-200 p-3 w-48">
                Info
              </Button>
            </div>
          </div>
        </div>
      </SidebarInset>
    </>
  );
}
