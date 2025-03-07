import hero from "@/assets/images/hero.png";

const HeroSection = () => {
  return (
    <section className="container mx-auto flex flex-col mt-20 lg:flex-row items-center px-6 md:px-12">
      <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
        <h2 className="text-4xl font-bold text-blue-600">
          Revolusi Belajar Lebih Cerdas dan Cepat!
        </h2>

        <p className="text-gray-700 mt-4 sm:mt-6">
          Kursus dan pelatihan terstruktur membuat Anda siap kerja dengan cepat.
          Bersama kami, Anda dapat mengembangkan skill dan karier lebih cepat.
        </p>

        <button className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 sm:mt-8">
          Gabung Sekarang
        </button>
      </div>

      {/* Image */}
      <div className="w-full lg:w-1/2 flex justify-center mt-8 lg:mt-0">
        <img
          src={hero}
          alt="Hero Image"
          className="w-[300px] md:w-[400px] lg:w-[500px] xl:w-[600px]"
        />
      </div>
    </section>
  );
};

export default HeroSection;
