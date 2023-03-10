import { UrlTypes } from "./Interface";
import siteMetaData from "@/data/siteMetaData";

export const basicSiteUrlTypes: UrlTypes[] = [
  {
    id: 1,
    text: "Home",
    url: "/",
  },
  {
    id: 2,
    text: "Tools",
    url: "/tools",
  },
  {
    id: 3,
    text: "About",
    url: "/about",
  },
];

export const topToolsTypes: UrlTypes[] = [
  {
    id: 1,
    text: "Add Two Numbers",
    url: "/tools/add-two-numbers",
  },
  {
    id: 2,
    text: "Convert Binary to Decimal",
    url: "/tools/convert-binary-to-decimal",
  },
  {
    id: 3,
    text: "Convert Binary to Hexadecimal",
    url: "/tools/convert-binary-to-hexadecimal",
  },
  {
    id: 4,
    text: "Convert Binary to Octal",
    url: "/tools/convert-binary-to-octal",
  },
  {
    id: 5,
    text: "Convert Days to Seconds",
    url: "/tools/convert-days-to-seconds",
  },
];


export const socialTypes: UrlTypes[] = [
  {
    id: 1,
    text: "GitHub",
    url: `${siteMetaData.githubUrl}`,
  },
  {
    id: 2,
    text: "Twitter",
    url: `${siteMetaData.twitterUrl}`,
  },
  {
    id: 3,
    text: "Discord",
    url: `${siteMetaData.discordUrl}`,
  },
];