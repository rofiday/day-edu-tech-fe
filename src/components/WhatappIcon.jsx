const WhatappIcon = () => {
  const phoneNumber = "628123456789"; // Ganti dengan nomor WhatsApp tujuan

  return (
    <a
      href={`https://wa.me/${phoneNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg flex items-center justify-center hover:bg-green-600 transition-all duration-300"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 24"
        className="w-6 h-6"
      >
        <path d="M20.52 3.48A11.94 11.94 0 0 0 12 0a12 12 0 0 0-10.39 17.89L0 24l6.3-1.62A12 12 0 0 0 12 24a11.94 11.94 0 0 0 8.48-3.48A12 12 0 0 0 20.52 3.48zM12 22a10 10 0 0 1-5.3-1.48l-.38-.22-3.73.96.99-3.59-.24-.38A10 10 0 1 1 12 22zm5-7.55c-.28-.14-1.65-.81-1.91-.9s-.44-.14-.63.14-.73.9-.9 1.09-.33.21-.6.07a7.56 7.56 0 0 1-2.22-1.37 8.34 8.34 0 0 1-1.56-1.94c-.16-.28 0-.42.12-.58s.28-.33.42-.49.18-.28.28-.46a.5.5 0 0 0 0-.49c0-.14-.63-1.54-.86-2.11s-.45-.49-.63-.5h-.53a1 1 0 0 0-.73.33 3.07 3.07 0 0 0-.95 2.28 5.38 5.38 0 0 0 1.14 3.06 11.3 11.3 0 0 0 4.21 3.5c1.58.68 2.18.61 2.57.57a2.82 2.82 0 0 0 1.84-.86 2.26 2.26 0 0 0 .42-1.58c0-.14-.12-.21-.28-.28z"></path>
      </svg>
    </a>
  );
};

export default WhatappIcon;
