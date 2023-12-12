import { Text } from "@chakra-ui/react";
import { WaitingForm } from "../Forms";
import Background from "./Background";

const WaitingList: React.FC = () => {
  return (
    <div className="w-full h-full flex justify-center items-center relative">
      <Background />
      <div className="absolute w-full h-full flex justify-center items-center z-10">
        <div className="w-[500px] h-[310px] p-10 bg-[rgb(14,20,22)]/90 rounded-lg ring-0 ring-[rgb(58,35,108)] hover:ring-2 duration-500">
          <Text className="text-3xl font-semibold text-center">
            Web3Wall is currently in private beta!
          </Text>
          <Text className="text-base mt-10 mb-5 text-center">
            Join the waitlist to become one of the first to experience the
            private beta for Web3Wall.
          </Text>
          <WaitingForm />
        </div>
      </div>
    </div>
  );
};

export default WaitingList;
