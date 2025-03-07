import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const FooterSection = () => {
  return (
    <footer className="bg-blue-500 text-gray-300 py-10">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* About Section */}
        <div>
          <h3 className="text-xl font-semibold text-white">EduTech Academy</h3>
          <p className="mt-3 text-sm">
            Platform pembelajaran digital yang membantu kamu menguasai teknologi
            dengan mentor terbaik.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-lg font-semibold text-white">Navigasi</h3>
          <ul className="mt-3 space-y-2">
            <li>
              <a href="#" className="hover:text-blue-400">
                Kelas
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400">
                Mentor
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400">
                Blog
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400">
                Karir
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <h3 className="text-lg font-semibold text-white">Hubungi Kami</h3>
          <p className="mt-3 text-sm">Jl. Teknologi No. 12, Jakarta</p>
          <p className="text-sm">Email: support@edutech.com</p>
          <p className="text-sm">Phone: +62 812 3456 7890</p>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold text-white">Ikuti Kami</h3>
          <div className="mt-3 flex space-x-4">
            <a href="#" className="hover:text-blue-400">
              <FaFacebook size={20} />
            </a>
            <a href="#" className="hover:text-blue-400">
              <FaTwitter size={20} />
            </a>
            <a href="#" className="hover:text-blue-400">
              <FaInstagram size={20} />
            </a>
            <a href="#" className="hover:text-blue-400">
              <FaLinkedin size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="mt-10 text-center border-t border-gray-700 pt-4">
        <p className="text-sm">
          &copy; 2025 EduTech Academy. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default FooterSection;
