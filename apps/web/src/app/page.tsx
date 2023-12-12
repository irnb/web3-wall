"use client";
import { WaitingForm } from "@/components/Forms";
import WaitingList from "@/components/WaitingList";
import { Link } from "@chakra-ui/next-js";
import { Button } from "@chakra-ui/react";

export default function Page() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <WaitingList />
    </div>
  );
}
