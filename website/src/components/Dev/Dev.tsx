import React, { useContext, useEffect } from "react";
import Header from "../Header/Header";
import ProfileImg from "../ProfileImg/ProfileImg";
import Btn from "../Button/Btn";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import { motion } from "framer-motion";
import { scrollScale } from "src/AnimationVariants/animationVariants";
import { TheContext } from "src/Context/Context";
import siteMetaData from "@/data/siteMetaData";

interface devsProfileType {
  avatar_url: string;
  html_url: string;
  name: string;
}
const Dev = () => {
  const context = useContext(TheContext);

  useEffect(() => {
    const fetchDevFun = async () => {
      const request = await fetch(
        "https://api.github.com/orgs/codinasion/members?per_page=30"
      );
      const data = await request.json();
      if (request.status === 200) {
        context.setDevs({ apiStatus: true, apiData: data });
      }
    };
    if (!context.devs.apiStatus) {
      fetchDevFun();
    }
  }, []);

  return (
    context.devs.apiStatus && (
      <div
        id="dev"
        className="max-w-[1100px] overflow-x-hidden py-60 relative mx-auto flex flex-col justify-center items-center space-y-[50px] p-3"
      >
        <motion.div
          initial="offscreen"
          whileInView={"onscreen"}
          viewport={{ amount: 0.8, once: false }}
          variants={scrollScale(1.2)}
        >
          <Header
            title="Our Contributors"
            subTitle="Our awesome contributors"
            cssStyle="!text-very-light-blue"
          />
        </motion.div>
        <motion.div
          initial="offscreen"
          whileInView={"onscreen"}
          viewport={{ amount: 0.8, once: false }}
          variants={scrollScale(1.2)}
          className="flex max-w-[1000px] flex-wrap items-center justify-center gap-2 sm:gap-5"
        >
          <div className="flex gap-2 sm:gap-5 flex-wrap justify-center">
            {context.devs.apiData.slice(0, 10).map((item: devsProfileType) => (
              <ProfileImg
                key={Math.random() * 50 + "devrow-1"}
                profileUrl={item.html_url}
                name={item.name}
                imgUrl={item.avatar_url}
                cssStyle={"hover:scale-105"}
              />
            ))}
          </div>
          <div className="flex gap-2 sm:gap-5 flex-wrap justify-center">
            {context.devs.apiData.slice(10, 18).map((item: devsProfileType) => (
              <ProfileImg
                key={Math.random() * 50 + "devrow-1"}
                name={item.name}
                profileUrl={item.html_url}
                imgUrl={item.avatar_url}
                cssStyle={"hover:scale-105"}
              />
            ))}
          </div>
          <div className="flex gap-2 sm:gap-5 flex-wrap justify-center">
            {context.devs.apiData.slice(18, 26).map((item: devsProfileType) => (
              <ProfileImg
                profileUrl={item.html_url}
                key={Math.random() * 50 + "devrow-1"}
                name={item.name}
                imgUrl={item.avatar_url}
                cssStyle={"hover:scale-105"}
              />
            ))}
            <Link
              href="https://github.com/orgs/codinasion/teams/members/members"
              target={"_blank"}
              className="text-3xl animate-pulse flex items-end justify-center aspect-square rounded-full p-2 w-16 sm:w-20 text-white"
            >
              .....
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial="offscreen"
          whileInView={"onscreen"}
          viewport={{ amount: 0.8, once: false }}
          variants={scrollScale(1.2)}
        >
          <Btn
            href={`${siteMetaData.joinUrl}`}
            ariaLabel="Join Codinasion on Github"
            target={"_blank"}
            text={"Join Codinasion"}
            icon={<FaGithub />}
          />
        </motion.div>
      </div>
    )
  );
};

export default Dev;
