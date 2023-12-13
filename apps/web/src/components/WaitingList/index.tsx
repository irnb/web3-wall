import { WaitingForm } from "../Forms";
import Background from "./Background";

const WaitingList: React.FC = () => {
  return (
    <div className="w-full h-full flex justify-center items-center relative">
      <Background />
      <div className="absolute w-full h-full flex justify-center items-center z-10">
        <div className="flex flex-col w-[500px] h-[310px] p-10 bg-[rgb(14,20,22)]/90 rounded-lg ring-0 ring-[rgb(58,35,108)] hover:ring-2 duration-500">
          <span className="text-3xl font-semibold text-center text-white">
            Web3Wall is currently in private beta!
          </span>
          <span className="text-base mt-10 mb-5 text-center text-white/90">
            Join the waitlist to become one of the first to experience the
            private beta for Web3Wall.
          </span>
          <WaitingForm />
        </div>
      </div>
    </div>
  );
};

export default WaitingList;
