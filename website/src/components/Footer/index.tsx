import React from "react";
import { Jura } from "@next/font/google";
import Btn from "../Button/Btn";
import UrlBtn from "../Button/UrlBtn";
import { FaGithub } from "react-icons/fa";
import { stringify } from "querystring";

const jura = Jura({
  subsets: ["latin"],
  variable: "--font-jura",
  weight: ["500"],
});

interface footerSiteType {
  id: number;
  text: string;
  url: string;
  externalLink: boolean;
  cssStyle?: string;
}
[];
const footerSite: footerSiteType[] = [
  {
    id: 1,
    text: "Home",
    url: "/",
    externalLink: false,
    cssStyle: "",
  },
  {
    id: 2,
    text: "Tools",
    url: "/tools",
    externalLink: false,
    cssStyle: "",
  },
  {
    id: 3,
    text: "About",
    url: "/about",
    externalLink: false,
    cssStyle: "",
  },
  {
    id: 4,
    text: "Github",
    url: "https://github.com/codinasion",
    externalLink: true,
    cssStyle: "",
  },
];
interface footerSocialType {
  id: number;
  text: string;
  url: string;
  externalLink: boolean;
  cssStyle?: string;
}
[];
const footerSocial: footerSocialType[] = [
  {
    id: 1,
    text: "GitHub",
    url: "https://github.com/codinasion",
    externalLink: true,
    cssStyle: "",
  },
  {
    id: 2,
    text: "Twitter",
    url: "https://twitter.com",
    externalLink: true,
    cssStyle: "",
  },
  {
    id: 3,
    text: "Discord",
    url: "https://Discord.com",
    externalLink: true,
    cssStyle: "",
  },
];

function Footer() {
  return (
    <div id="footer" className="w-full relative">
      <div className="relative overflow-hidden">
        <svg
          className="w-full relative top-2 z-10 scale-x-125"
          viewBox="0 0 1920 318"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0 46L45.7143 53C91.4286 61 182.857 76 274.286 114C365.714 152 457.143 212 548.571 212C640 212 731.429 152 822.857 114C914.286 76 1005.71 61 1097.14 68C1188.57 76 1280 106 1371.43 129C1462.86 152 1554.29 167 1645.71 144C1737.14 121 1828.57 61 1874.29 30L1920 0V318H1874.29C1828.57 318 1737.14 318 1645.71 318C1554.29 318 1462.86 318 1371.43 318C1280 318 1188.57 318 1097.14 318C1005.71 318 914.286 318 822.857 318C731.429 318 640 318 548.571 318C457.143 318 365.714 318 274.286 318C182.857 318 91.4286 318 45.7143 318H0V46Z"
            fill="#DADEEA"
          />
        </svg>
        <svg
          className="w-full absolute top-0 scale-x-110"
          viewBox="0 0 1920 318"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0 46L45.7143 53C91.4286 61 182.857 76 274.286 114C365.714 152 457.143 212 548.571 212C640 212 731.429 152 822.857 114C914.286 76 1005.71 61 1097.14 68C1188.57 76 1280 106 1371.43 129C1462.86 152 1554.29 167 1645.71 144C1737.14 121 1828.57 61 1874.29 30L1920 0V318H1874.29C1828.57 318 1737.14 318 1645.71 318C1554.29 318 1462.86 318 1371.43 318C1280 318 1188.57 318 1097.14 318C1005.71 318 914.286 318 822.857 318C731.429 318 640 318 548.571 318C457.143 318 365.714 318 274.286 318C182.857 318 91.4286 318 45.7143 318H0V46Z"
            fill="#fff"
          />
        </svg>
      </div>
      <footer
        className="bg-very-light-blue pb-32 pt-16 lg:pt-0"
        aria-labelledby="home"
        aria-label="site copyright privacy license top-tools subscribe"
      >
        <div className="max-w-[1100px] mx-auto flex flex-col justify-center items-center gap-16 xl:gap-32 relative top-0 px-3">
          <div className="grid justify-center items-center gap-5">
            <h2
              className={`${jura.className} text-4xl lg:text-5xl xl:text-6xl text-center txt-gradient mb-3`}
            >
              Open-Tools
            </h2>
            <form
              action="#"
              className="flex gap-1 w-full sm:w-[450px] items-center"
              id="subscribe-us"
              aria-label="subscribe-form"
            >
              <input
                type="email"
                name="subscribe"
                id="subscribe"
                aria-label="subscribe"
                className="w-full border-2 px-4
              h-fit p-2 text-lg bg-very-light-blue rounded-xl border-very-dark-blue focus:border-very-dark-blue"
                placeholder="Enter your email"
              />
              <button
                className="bg-very-dark-blue h-full p-2 px-3 text-lg hover:text-very-dark-blue hover:border-very-dark-blue border-2 border-transparent hover:bg-very-light-blue rounded-xl text-white"
                type="submit"
                aria-labelledby="subscribe-us"
              >
                Subscribe
              </button>
              {/* <Btn text={"Subscribe"} cssStyle={"py-2 !px-4 !text-lg"} /> */}
            </form>
          </div>

          <div className="flex flex-col sm:flex-row flex-wrap gap-10 text-lg sm:text-base md:gap-20 justify-center w-full text-center sm:text-left">
            <ul className="space-y-3">
              <li className="mb-4 font-bold pl-1">
                <h2>Site tour</h2>
              </li>
              {footerSite.map((item) => (
                <li key={Math.random() * 500}>
                  <UrlBtn
                    href={item.url}
                    ariaLabel={`Footer element:- Go to ${item.text} page`}
                    name={item.text}
                    cssStyle="pl-1 border-l-2 hover:border-very-dark-blue dark:!text-black"
                  />
                </li>
              ))}
            </ul>
            <ul className="space-y-3">
              <li className="mb-4 font-bold pl-1">
                <h2 className="font-bold">Top tolls</h2>
              </li>
              {footerSite.map((item) => (
                <li key={Math.random() * 500}>
                  <UrlBtn
                    href={`/tools/tool#${item.id}`}
                    ariaLabel={`Footer element:- Read more about ${item.text} tools`}
                    name={`Tool name #${item.id}`}
                    cssStyle="pl-1 border-l-2 hover:border-very-dark-blue dark:!text-black"
                  />
                </li>
              ))}
            </ul>
            <ul className="space-y-3">
              <li className="mb-4 font-bold pl-1">
                <h2 className="font-bold">Community</h2>
              </li>

              {footerSocial.map((item) => (
                <li key={Math.random() * 5000}>
                  <UrlBtn
                    href={item.url}
                    ariaLabel={`Footer element:- Follow us on ${item.text}`}
                    target={item.externalLink ? "_blank" : "_top"}
                    name={item.text}
                    cssStyle="Zpl-1 border-l-2 hover:border-very-dark-blue dark:!text-black"
                  />
                </li>
              ))}
            </ul>
            <div className="w-full lg:w-fit order-first lg:order-last hidden lg:block">
              <div className="space-y-5 text-center lg:text-left mx-auto w-[400px]">
                <header title={"for developer"}>
                  <h2 className="font-bold text-lg">For Developers</h2>
                  <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Tempora, sunt!
                  </p>
                </header>

                <Btn
                  href={"https://github.com/codinasion/"}
                  target={"_blank"}
                  ariaLabel={`Join us on Github it's an open-source`}
                  text={"Join Codinasion"}
                  icon={<FaGithub />}
                  cssStyle={`w-full py-3`}
                />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
