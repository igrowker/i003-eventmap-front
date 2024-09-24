import React from 'react';
import dynamic from "next/dynamic";

const Dynamic = dynamic(() => import("./components/Map"), {
  loading: () => <p>...Loading</p>,
  ssr: false,
});

export default function Home() {
 

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Dynamic 
       
      />
    </main>
  );
}