"use client";
import { useState } from "react";
import { WaitingForm } from "../Forms";
import Background from "./Background";
import { Button } from "../ui/button";

const WaitingList: React.FC = () => {
  const [isFollowedTwitter, setIsFollowedTwitter] = useState(false);
  const followTwitterHandler = () => {
    window.open(
      "https://x.com",
      "popUpWindow",
      "height=700,width=800,left=10,top=10,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no,status=yes"
    );
    setIsFollowedTwitter(true);
  };

  return (
    <div className="w-full h-full flex justify-center items-center relative">
      <Background />
      <div className="absolute w-full h-full flex justify-center items-center z-10">
        <div className="flex flex-col w-full ssm:w-[500px] sm:h-[360px] p-10 bg-[rgb(14,20,22)]/90 rounded-lg ring-0 ring-[rgb(58,35,108)] hover:ring-2 duration-500 border border-[rgb(58,35,108)]/50 mx-3 ssm:mx-0 text-white">
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
                <p></p>
              </div>
            </>
          ) : (
            <WaitingForm />
          )}
        </div>
      </div>
    </div>
  );
};

export default WaitingList;
