import { BounceLoader } from "react-spinners";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <BounceLoader color={"#36d7b7"} size={80} />
      <p className="text-center font-bold text-gray-500 mt-4">Loading...</p>
    </div>
  );
}
