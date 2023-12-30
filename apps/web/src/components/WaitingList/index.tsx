"use client";
import { useEffect, useState } from "react";
import { WaitingForm } from "../Forms";
import Background from "./Background";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import {
  getLocalStorageItemWithExpiry,
  setLocalStorageItemWithExpiry,
} from "@/utils/localStorage";
import Script from "next/script";
import { defaultFramerProps, fadeInAnimation } from "@/utils/animations";

const WaitingList: React.FC = () => {
  const [isFollowedTwitter, setIsFollowedTwitter] = useState<boolean>(false);
  useEffect(() => {
    const storedValue = getLocalStorageItemWithExpiry("isFollowedTwitter");
    setIsFollowedTwitter(
      storedValue !== null ? JSON.parse(storedValue) : false
    );
  }, []);
  const followTwitterHandler = () => {
    window.open(
      "https://x.com/farmwall_fun",
      "popUpWindow",
      "height=700,width=800,left=10,top=10,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no,status=yes"
    );
    setIsFollowedTwitter(true);
    setLocalStorageItemWithExpiry(
      "isFollowedTwitter",
      JSON.stringify(true),
      30 * 24 * 60
    );
  };

  return (
    <div className="w-full h-full flex justify-center items-center relative">
      <Background />
      <motion.div
        {...defaultFramerProps}
        variants={fadeInAnimation}
        custom={1}
        className="absolute w-full h-full flex justify-center items-center z-10 overflow-hidden"
      >
        <div className="relative flex flex-col w-full ssm:w-[500px] sm:h-[360px] p-10 bg-[rgb(14,20,22)]/90 rounded-lg ring-0 ring-[rgb(58,35,108)] hover:ring-2 duration-500 border border-[rgb(58,35,108)]/50 mx-3 ssm:mx-0 text-white">
          <span className="text-3xl font-semibold text-center ">
            FarmWall waitlist!
          </span>
          <span className="text-base mt-10 mb-5 text-center text-white/90">
            Join the FarmWall waitlist for early access to the platform and
            entering the first round of contest with eye-catching prizes
          </span>
          {!isFollowedTwitter ? (
            <>
              <div className="flex flex-col justify-center items-center gap-1 text-sm text-gray-300">
                <p className="text-center">Follow Twitter for fun updates 🚀</p>
                <p className="text-center">Then you can join our wait list!</p>
                <Button
                  className="mt-3"
                  onClick={followTwitterHandler}
                  variant={"default"}
                >
                  Follow Twitter
                </Button>
              </div>
            </>
          ) : (
            <WaitingForm />
          )}

          {isFollowedTwitter && (
            <div className="absolute top-1 right-1">
              <motion.a
                {...defaultFramerProps}
                variants={fadeInAnimation}
                custom={2}
                href="https://twitter.com/farmwall_fun?ref_src=twsrc%5Etfw"
                className="twitter-follow-button"
                data-show-count="false"
                data-size="large"
                data-show-screen-name="false"
              >
                Follow
              </motion.a>
              <Script async src="https://platform.twitter.com/widgets.js" />
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default WaitingList;
