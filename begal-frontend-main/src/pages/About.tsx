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

export default function About() {
  const [showMore, setShowMore] = useState(false);
  return (
    <main>
      <div className="pt-28 px-8 md:px-32 dark:bg-gray-900 dark:text-white">
        <div className="flex flex-col md:flex-row items-center md:justify-between gap-10">
          <div className="flex flex-col gap-10 text-center md:text-left">
            <h3 className="text-4xl md:text-5xl font-bold w-min mx-auto md:mx-0 whitespace-nowrap rounded">
              Beli galon
            </h3>
            <TextSlider
              words={["Lebih Mudah", "Lebih Hemat", "Lebih Cepat"]}
              interval={2000}
            />
            <div className="flex flex-col md:flex-row gap-5 justify-center md:justify-start">
              <Link
                to="/nearest-depot"
                className="rounded bg-blue-500 text-white p-3 text-center"
              >
                Cek Depot Terdekat
              </Link>
              <Link to="/contact" className="border p-3 rounded text-center">
                Contact Us
              </Link>
            </div>
          </div>

          <div className="flex justify-center">
            <img
              src={AboutIllustration}
              alt="dummy"
              className="w-80 md:w-auto"
            />
          </div>
        </div>

        <div className="mt-20 flex flex-col md:flex-row gap-10">
          <div className="flex flex-col md:w-1/3 gap-14">
            <h3 className="text-2xl border mx-auto md:ml-10 p-2 w-min whitespace-nowrap rounded">
              About Begal
            </h3>
            <img
              src={About2Illustration}
              alt=""
              className="w-64 h-64 mx-auto md:w-80 md:h-80"
            />
          </div>

          <div className="flex flex-col justify-center gap-10 text-center md:text-left">
            <p className="text-lg md:text-xl">
              Begal adalah platform terpercaya untuk memenuhi kebutuhan air
              minum bersih Anda. Kami berkomitmen untuk memberikan layanan
              terbaik dengan harga terjangkau dan akses mudah.
            </p>
            <div
              className={`text-lg md:text-xl transition-all duration-500 ${
                showMore ? "opacity-100" : "opacity-0"
              } ${showMore ? "h-auto" : "h-0 overflow-hidden"}`}
            >
              Kami hadir untuk memenuhi kebutuhan air minum Anda dengan layanan
              terpercaya, dan kemudahan akses. Pilihan cerdas untuk kenyamanan
              dan kesehatan keluarga Anda!
            </div>
            <Button
              className="rounded-full w-min bg-blue-600 hover:bg-blue-700 mx-auto md:mx-0"
              onClick={() => setShowMore((prev) => !prev)}
            >
              {showMore ? "See Less" : "See More"}
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-20 flex flex-col md:flex-row gap-10 md:gap-0 bg-cover dark:bg-gray-900 bg-center py-10">
        <div className="flex flex-col w-full md:w-1/5">
          <div className="flex flex-col px-10 py-10 md:py-20 bg-blue-600 h-full gap-5 justify-around">
            <UsersIcon className="text-white w-10 h-10 mx-auto md:mx-0" />
            <h3 className="text-white font-semibold text-xl md:text-2xl text-center md:text-left">
              Seller yang banyak
            </h3>
            <p className="text-white text-center md:text-left">
              Bergabung dengan ratusan mitra yang tersebar di berbagai daerah,
              kami memberikan kemudahan bagi Anda untuk memilih layanan terbaik
              di lokasi Anda.
            </p>
          </div>
          <div className="flex flex-col px-10 py-10 md:py-20 bg-white dark:bg-gray-700 dark:text-white h-full justify-around gap-5">
            <WavesIcon className="w-10 h-10 mx-auto md:mx-0" />
            <h3 className="font-semibold text-xl md:text-2xl text-center md:text-left">
              EFISIENSI
            </h3>
            <p className="text-center md:text-left">
              Proses pemesanan yang sederhana dan efisien, memastikan Anda
              mendapatkan produk dengan cepat tanpa perlu ribet.
            </p>
          </div>
        </div>

        <div className="h-full w-full md:w-2/5 flex justify-center items-center">
          <img
            src={whyChooseUsIllustration}
            className="bg-cover w-80 md:w-auto"
            alt=""
          />
        </div>

        <div className="w-full md:w-1/2 bg-white dark:bg-gray-800 flex flex-col ">
          <h3 className="text-4xl md:text-5xl text-center md:text-right h-full p-10 dark:text-white">
            WHY <div className="font-bold"> CHOOSE </div>
            <div className="font-bold"> US?</div>
          </h3>
          <div className="flex flex-col md:flex-row">
            <div className="flex flex-col h-full gap-5 px-10 py-10 md:py-20 bg-blue-600 w-full md:w-1/2 justify-around">
              <SmartphoneIcon className="text-white w-10 h-10 mx-auto md:mx-0" />
              <h3 className="font-semibold text-xl md:text-2xl text-center md:text-left text-white">
                KEMUDAHAN
              </h3>
              <p className="text-white text-center md:text-left">
                Layanan kami tersedia di berbagai platform, membuatnya mudah
                untuk memesan kapan saja, di mana saja.
              </p>
            </div>

            <div className="flex flex-col h-full gap-5 px-10 py-10 md:py-20 bg-white dark:bg-gray-700 dark:text-white w-full md:w-1/2 justify-around">
              <DropletIcon className="w-10 h-10 mx-auto md:mx-0" />
              <h3 className="font-semibold text-xl md:text-2xl text-center md:text-left">
                PRODUK YANG LENGKAP
              </h3>
              <p className="text-center md:text-left">
                Tersedia beragam pilihan air galon dari berbagai merek
                terpercaya untuk memenuhi kebutuhan Anda.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="my-28 bg-gray-200 justify-around py-20 h-full flex flex-col md:flex-row gap-10">
        <div className="w-full md:w-1/2 h-full flex justify-center items-center">
          <img src={faqIllustration} className="w-80 md:w-auto" alt="" />
        </div>

        <div className="flex flex-col h-full px-8 md:px-20">
          <h3 className="text-4xl md:text-5xl mb-10 md:mb-20 pr-0 md:pr-20 font-bold text-center md:text-left">
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
