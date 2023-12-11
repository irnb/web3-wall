"use client";
import { WaitingForm } from "@/components/Forms";
import { Link } from "@chakra-ui/next-js";
import { Button } from "@chakra-ui/react";

export default function Page() {
  return (
    <div className="w-screen h-screen  flex justify-center items-center">
      <WaitingForm />
      <Button variant={"solid"}>jkj</Button>
    </div>
  );
}
