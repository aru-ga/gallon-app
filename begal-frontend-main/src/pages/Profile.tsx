import { ChevronLeftCircle, Copy } from "lucide-react";
import { Link } from "react-router-dom";
import dummyImg from "../assets/hero-slider.png";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

export default function Profile() {
  const userSelector = useSelector((state) => state.user);

  return (
    <>
      <div className="dark:bg-gray-900 h-screen">
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
              <Avatar className="w-40 h-40">
                <AvatarImage
                  src={userSelector.user.profile_picture_url || dummyImg} // Fallback to dummy image if not available
                  alt={`${userSelector.user.name}'s img`}
                />
                <AvatarFallback>
                  <p className="text-sm text-gray-400 ">{`${userSelector.user.name}'s img`}</p>
                </AvatarFallback>
              </Avatar>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" className="text-sm font-light">
                      Change Image
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <Input
                          id="picture"
                          className="hover:cursor-pointer"
                          type="file"
                        />
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <h2 className="text-2xl font-bold">{userSelector.user.name}</h2>
                <h2>{userSelector.user.address?.detail}</h2>
                <h2>{userSelector.user.phone}</h2>
              </div>
            </div>

            <div className="flex flex-col mr-32 gap-1 -pb-10">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">Address</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Share link</DialogTitle>
                    <DialogDescription>
                      Anyone who has this link will be able to view this.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex items-center space-x-2">
                    <div className="grid flex-1 gap-2">
                      <Label htmlFor="link" className="sr-only">
                        Link
                      </Label>
                      <Input
                        id="link"
                        defaultValue="https://ui.shadcn.com/docs/installation"
                        readOnly
                      />
                    </div>
                    <Button type="submit" size="sm" className="px-3">
                      <span className="sr-only">Copy</span>
                      <Copy />
                    </Button>
                  </div>
                  <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                      <Button type="button" variant="secondary">
                        Close
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <button className="border-b  text-right hover:bg-blue-200 p-3 w-48">
                <Link to="/transaction">Transaction</Link>
              </button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">Change Password</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Share link</DialogTitle>
                    <DialogDescription>
                      Anyone who has this link will be able to view this.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex items-center space-x-2">
                    <div className="grid flex-1 gap-2">
                      <Label htmlFor="link" className="sr-only">
                        Link
                      </Label>
                      <Input
                        id="link"
                        defaultValue="https://ui.shadcn.com/docs/installation"
                        readOnly
                      />
                    </div>
                    <Button type="submit" size="sm" className="px-3">
                      <span className="sr-only">Copy</span>
                      <Copy />
                    </Button>
                  </div>
                  <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                      <Button type="button" variant="secondary">
                        Close
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <button className="border-b  text-right hover:bg-blue-200 p-3 w-48">
                Info
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
