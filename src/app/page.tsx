import React from "react";
import dynamic from "next/dynamic";
import "ldrs/ring";
import "ldrs/infinity";

// Default values shown

const Dynamic = dynamic(() => import("./components/Map"), {
  loading: () => (
    <>
      <div className="flex justify-center items-center flex-col">
        <p>...Loading </p>
        <div className="relative w-24 h-24 animate-spin rounded-full bg-gradient-to-r from-green-200 via-green-500 to-red-800 ">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gray-600 rounded-full border-2 border-white"></div>
        </div>
      </div>
    </>
  ),
  ssr: false,
});

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Dynamic />
    </main>
  );
}
