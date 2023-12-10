"use client";
import { Link } from "@chakra-ui/next-js";
import { Button } from "@chakra-ui/react";

export default function Page() {
  return (
    <Link href="/about" color="blue.400" _hover={{ color: "blue.500" }}>
      About
      <div className="w-5 h-5 bg-red-500 "></div>
      <Button variant="ghost">connect</Button>
    </Link>
  );
}
