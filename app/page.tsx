import HomePage from "@/src/components/home/home/Home";
import Footer from "@/src/shared/Footer";
import Navbar from "@/src/shared/Navbar";
import React from "react";

export default function Home() {
  return (
    <div>
      <Navbar />
      <HomePage />
      <Footer />
    </div>
  );
}
