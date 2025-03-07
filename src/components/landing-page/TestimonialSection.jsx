import { useState, useEffect } from "react";

const testimonials = [
  {
    name: "Rahmat Hidayat",
    role: "Software Engineer",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    text: "Bootcamp ini benar-benar membantu saya meningkatkan skill coding. Saya sekarang bekerja sebagai Software Engineer di perusahaan impian saya!",
  },
  {
    name: "Siti Aisyah",
    role: "Frontend Developer",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    text: "Materi yang diberikan sangat lengkap dan praktis. Mentor juga sangat suportif dalam membimbing kita memahami konsep-konsep sulit!",
  },
  {
    name: "Budi Santoso",
    role: "UI/UX Designer",
    image: "https://randomuser.me/api/portraits/men/12.jpg",
    text: "Saya senang belajar di sini! Bootcamp ini memberikan banyak latihan nyata yang membantu saya mendapatkan pekerjaan sebagai UI/UX Designer.",
  },
  {
    name: "Ayu Puspita",
    role: "Backend Developer",
    image: "https://randomuser.me/api/portraits/women/25.jpg",
    text: "Saya mendapatkan pemahaman yang lebih baik tentang backend development dan sekarang bekerja sebagai Backend Developer di startup teknologi!",
  },
  {
    name: "Dewi Lestari",
    role: "Fullstack Developer",
    image: "https://randomuser.me/api/portraits/women/50.jpg",
    text: "Bootcamp ini luar biasa! Saya mendapatkan wawasan mendalam tentang pengembangan web dan berhasil menjadi Fullstack Developer.",
  },
  {
    name: "Arif Setiawan",
    role: "Data Analyst",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
    text: "Materi data science yang diajarkan sangat membantu saya berkarir sebagai Data Analyst di perusahaan teknologi.",
  },
];

const TestimonialCard = ({ name, role, image, text }) => {
  return (
    <div className="w-full md:w-full lg:w-1/3 p-4">
      <div className="bg-white shadow-lg rounded-2xl p-6 text-center hover:shadow-xl transition-all duration-300 min-h-[400px]">
        <img
          src={image}
          alt={name}
          className="w-20 h-20 mx-auto rounded-full border-4 border-blue-500"
        />
        <h3 className="text-lg font-semibold mt-4">{name}</h3>
        <p className="text-sm text-gray-500">{role}</p>
        <p className="text-gray-700 italic mt-10">{text}</p>
      </div>
    </div>
  );
};

const TestimonialSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(1); // Default untuk layar kecil

  // Fungsi untuk menghitung jumlah item per slide berdasarkan ukuran layar
  const updateItemsPerSlide = () => {
    if (window.innerWidth >= 1024) {
      setItemsPerSlide(3); // Layar besar (lg)
    } else if (window.innerWidth >= 768) {
      setItemsPerSlide(1); // Layar sedang (md)
    } else {
      setItemsPerSlide(1); // Layar kecil (sm)
    }
  };

  // Effect untuk mengupdate itemsPerSlide saat ukuran layar berubah
  useEffect(() => {
    updateItemsPerSlide();
    window.addEventListener("resize", updateItemsPerSlide);
    return () => window.removeEventListener("resize", updateItemsPerSlide);
  }, []);

  const totalSlides = Math.ceil(testimonials.length / itemsPerSlide);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === totalSlides - 1 ? 0 : prevIndex + 1
      );
    }, 3000);
    return () => clearInterval(interval);
  }, [totalSlides]);

  return (
    <section className="pt-28 px-[6%] pb-20 bg-gray-100">
      <div className="max-w-4xl mx-auto text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-800">Apa Kata Alumni?</h2>
        <p className="text-gray-600 mt-2">
          Testimoni dari para alumni yang telah berhasil berkarir di industri
          digital.
        </p>
      </div>

      <div className="overflow-hidden relative max-w-5xl mx-auto">
        <div
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {[...Array(totalSlides)].map((_, slideIndex) => (
            <div key={slideIndex} className="flex w-full flex-shrink-0">
              {testimonials
                .slice(
                  slideIndex * itemsPerSlide,
                  slideIndex * itemsPerSlide + itemsPerSlide
                )
                .map((testimonial, index) => (
                  <TestimonialCard key={index} {...testimonial} />
                ))}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-6 space-x-2">
        {[...Array(totalSlides)].map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-4 h-4 rounded-full transition-all duration-300 ${
              currentIndex === index
                ? "bg-blue-500 shadow-md"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
          ></button>
        ))}
      </div>
    </section>
  );
};

export default TestimonialSection;
