import dynamic from "next/dynamic";

const DynamicComponent = dynamic(() => import("./FullMap"), {
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


export default function Page() {
  return <DynamicComponent />
}