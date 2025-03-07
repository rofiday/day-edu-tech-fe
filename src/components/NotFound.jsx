import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-4">
      <h1 className="text-6xl font-bold text-blue-600">404</h1>
      <h2 className="text-2xl text-gray-800 mt-4">
        Oops! Halaman tidak ditemukan
      </h2>
      <p className="text-gray-600 mt-2">
        Halaman yang Anda cari mungkin telah dihapus atau tidak tersedia.
      </p>
      <Link
        to="/"
        className="mt-6 bg-blue-600 text-white py-3 px-6 rounded-md shadow-md hover:bg-blue-700 transition duration-300"
      >
        Kembali ke Beranda
      </Link>
    </div>
  );
};
export default NotFound;
