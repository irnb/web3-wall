"use client";
import { WaitingForm } from "@/components/Forms";
import { Link } from "@chakra-ui/next-js";
import { Button } from "@chakra-ui/react";

export default function Page() {
  return (
    <div className="w-screen h-screen bg-slate-400 flex justify-center items-center">
      <WaitingForm />
    </div>
  );
}
