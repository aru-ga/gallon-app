import Navbar from "@/components/Navbar";
import { Link, useLocation } from "react-router-dom";
import dummyImg from "@/assets/feature-slider.png";
import { Button } from "@/components/ui/button";
import { UsersIcon } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import Footer from "@/components/Footer";

export default function About() {
  const location = useLocation();
  return (
    <>
      <Navbar activePath={location.pathname} />
      <div className="pt-28 px-32 dark:bg-gray-900 dark:text-white">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-10">
            <h3 className="text-2xl border p-2 w-min whitespace-nowrap rounded">
              Beli galon tanpa ribet
            </h3>
            <h3 className="text-4xl w-1/2">
              Lorem ipsum dolor sit amet consectetur. Amet tortor phasellus in
              velit integer sed. Ullamcorper velit non massa egestas.
            </h3>
            <div className="flex flex-row gap-5">
              <Link
                to="/nearest-depot"
                className="rounded bg-blue-500 text-white p-3"
              >
                Cek Depot Terdekat
              </Link>
              <Link to="/contact" className="border p-3 rounded">
                Contact Us
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <img src={dummyImg} alt="dummy" />
            <img src={dummyImg} alt="dummy" />
          </div>
        </div>

        <div className="mt-20 flex flex-row">
          <div className="flex flex-col w-1/3 gap-14">
            <h3 className="text-2xl border ml-10 p-2 w-min whitespace-nowrap rounded">
              About Begal
            </h3>
            <img src={dummyImg} alt="" className="w-80 h-80" />
          </div>

          <div className="flex flex-col justify-center gap-10">
            <h3 className="font-bold text-3xl">
              Lorem ipsum dolor sit amet consectetur adipisicing.
            </h3>
            <p className="text-2xl">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officia
              nesciunt delectus libero corporis exercitationem laudantium cum
              laborum aliquam nemo vitae.
            </p>
            <Button className="rounded w-min">see more</Button>
          </div>
        </div>
      </div>

      <div
        className="mt-20 flex flex-row justify-between bg-cover bg-center py-20"
        style={{ backgroundImage: `url(${dummyImg})` }}
      >
        <div className="h-full w-2/5">
          <div className="flex flex-col px-10 py-20 bg-blue-600 h-1/2 w-1/2 justify-around">
            <UsersIcon className="text-white w-10 h-10" />
            <h3 className="text-white">Lorem</h3>
            <p className="text-white">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Voluptates atque reiciendis veniam corporis optio quam.
            </p>
          </div>
          <div className="flex flex-col px-10 py-20 bg-white h-1/2 w-1/2 justify-around">
            <UsersIcon className="w-10 h-10" />
            <h3 className="">Lorem</h3>
            <p className="">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Voluptates atque reiciendis veniam corporis optio quam.
            </p>
          </div>
        </div>

        <div className="h-full"></div>

        <div className="w-1/2 bg-white flex flex-col">
          <h3 className="text-5xl text-right h-full p-10">
            WHY <div className="font-bold"> CHOOSE </div>
            <div className="font-bold"> US?</div>
          </h3>
          <div className="flex flex-row">
            <div className="flex flex-col h-full px-10 py-20 bg-blue-600 w-1/2 justify-around">
              <UsersIcon className="text-white w-10 h-10" />
              <h3 className="text-white">Lorem</h3>
              <p className="text-white">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Voluptates atque reiciendis veniam corporis optio quam.
              </p>
            </div>

            <div className="flex flex-col h-full px-10 py-20 bg-white w-1/2 justify-around">
              <UsersIcon className="w-10 h-10" />
              <h3 className="">Lorem</h3>
              <p className="">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Voluptates atque reiciendis veniam corporis optio quam.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="my-28 w-screen bg-[#F3F5F6] justify-around py-20 h-full flex flex-row">
        <div className="w-1/2 h-full flex justify-center items-center">
          <img src={dummyImg} className="w-1/2" alt="" />
        </div>

        <div className="flex flex-col h-full">
          <h3 className="text-5xl mb-20 pr-20">Frequently Asked Questions</h3>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>Is it accessible?</AccordionTrigger>
              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Is it accessible?</AccordionTrigger>
              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Is it accessible?</AccordionTrigger>
              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>Is it accessible?</AccordionTrigger>
              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>Is it accessible?</AccordionTrigger>
              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-6">
              <AccordionTrigger>Is it accessible?</AccordionTrigger>
              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-7">
              <AccordionTrigger>Is it accessible?</AccordionTrigger>
              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      <Footer />
    </>
  );
}
