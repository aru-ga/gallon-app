import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropletIcon,
  SmartphoneIcon,
  UsersIcon,
  WavesIcon,
} from "lucide-react";
import AboutIllustration from "@/assets/about.png";
import About2Illustration from "@/assets/about-2.png";
import faqIllustration from "@/assets/faq.png";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import whyChooseUsIllustration from "@/assets/whychooseus.png";
import TextSlider from "@/components/TextSliderUp";
import { useState } from "react";
import { SocialIcon } from "react-social-icons";

export default function About() {
  const [showMore, setShowMore] = useState(false);
  return (
    <main>
      <div className="pt-28 px-32 dark:bg-gray-900 dark:text-white">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-10">
            <h3 className="text-5xl font-bold w-min whitespace-nowrap rounded">
              Beli galon
            </h3>
            <TextSlider
              words={["Lebih Mudah", "Lebih Hemat", "Lebih Cepat"]}
              interval={2000}
            />
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
            <img src={AboutIllustration} alt="dummy" />
          </div>
        </div>

        <div className="mt-20 flex flex-row">
          <div className="flex flex-col w-1/3 gap-14">
            <h3 className="text-2xl border ml-10 p-2 w-min whitespace-nowrap rounded">
              About Begal
            </h3>
            <img src={About2Illustration} alt="" className="w-80 h-80" />
          </div>

          <div className="flex flex-col justify-center gap-10">
            <p className="text-xl">
              Begal adalah platform terpercaya untuk memenuhi kebutuhan air
              minum bersih Anda. Kami berkomitmen untuk memberikan layanan
              terbaik dengan harga terjangkau dan akses mudah.
            </p>
            <div
              className={`text-xl transition-all duration-500 ${
                showMore ? "opacity-100" : "opacity-0"
              } ${showMore ? "h-auto" : "h-0 overflow-hidden"}`}
            >
              Kami hadir untuk memenuhi kebutuhan air minum Anda dengan layanan
              terpercaya, dan kemudahan akses. Pilihan cerdas untuk kenyamanan
              dan kesehatan keluarga Anda!
            </div>
            <Button
              className="rounded-full w-min bg-blue-600 hover:bg-blue-700"
              onClick={() => setShowMore((prev) => !prev)}
            >
              {showMore ? "See Less" : "See More"}
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-20 flex flex-row bg-cover dark:bg-gray-900 bg-center py-10">
        <div className="h-full flex flex-col w-1/5">
          <div className="flex flex-col px-10 py-20 bg-blue-600 h-1/2 gap-5 justify-around">
            <UsersIcon className="text-white w-10 h-10" />
            <h3 className="text-white font-semibold text-2xl">
              Seller yang banyak
            </h3>
            <p className="text-white">
              Bergabung dengan ratusan mitra yang tersebar di berbagai daerah,
              kami memberikan kemudahan bagi Anda untuk memilih layanan terbaik
              di lokasi Anda.
            </p>
          </div>
          <div className="flex flex-col px-10 py-20 bg-white dark:bg-gray-700 dark:text-white h-1/2 justify-around gap-5">
            <WavesIcon className="w-10 h-10" />
            <h3 className="font-semibold text-2xl">EFISIENSI</h3>
            <p className="">
              Proses pemesanan yang sederhana dan efisien, memastikan Anda
              mendapatkan produk dengan cepat tanpa perlu ribet.
            </p>
          </div>
        </div>

        <div className="h-full w-2/5 flex items-center justify-center">
          <img src={whyChooseUsIllustration} className="bg-cover" alt="" />
        </div>

        <div className="w-1/2 bg-white dark:bg-gray-800 flex flex-col ">
          <h3 className="text-5xl text-right h-full p-10 dark:text-white">
            WHY <div className="font-bold"> CHOOSE </div>
            <div className="font-bold"> US?</div>
          </h3>
          <div className="flex flex-row">
            <div className="flex flex-col h-full gap-5 px-10 py-20 bg-blue-600 w-1/2 justify-around">
              <SmartphoneIcon className="text-white w-10 h-10" />
              <h3 className="font-semibold text-2xl text-white">KEMUDAHAN</h3>
              <p className="text-white">
                Layanan kami tersedia di berbagai platform, membuatnya mudah
                untuk memesan kapan saja, di mana saja.
              </p>
            </div>

            <div className="flex flex-col h-full gap-5 px-10 py-20 bg-white dark:bg-gray-700 dark:text-white w-1/2 justify-around">
              <DropletIcon className="w-10 h-10" />
              <h3 className="font-semibold text-2xl">PRODUK YANG LENGKAP</h3>
              <p className="">
                Tersedia beragam pilihan air galon dari berbagai merek
                terpercaya untuk memenuhi kebutuhan Anda.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="my-28 bg-gray-200 justify-around py-20 h-full flex flex-row">
        <div className="w-1/2 h-full flex justify-center items-center">
          <img src={faqIllustration} className="" alt="" />
        </div>

        <div className="flex flex-col h-full px-20">
          <h3 className="text-5xl mb-20 pr-20 font-bold">
            Frequently Asked Questions
          </h3>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>
                Berapa banyak mitra yang bekerja sama dengan begal?
              </AccordionTrigger>
              <AccordionContent>1000+ dan masih bertambah</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                Bagaimana cara menjadi mitra di begal?
              </AccordionTrigger>
              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>
                Apakah ada biaya admin untuk mendaftar sebagai mitra?
              </AccordionTrigger>
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
          </Accordion>
        </div>
      </div>
    </main>
  );
}
