const programs = [
  {
    title: "Bootcamp",
    description:
      "Pelatihan intensive dengan real case industri mempersiapkan diri anda ke dunia profesional",
    image: "https://source.unsplash.com/600x400/?students,learning",
    bgColor: "bg-blue-500",
    textColor: "text-white",
    rounded: "rounded-tr-[50px]",
  },
  {
    title: "1 on 1 mentoring",
    description:
      "melakukan sesi mentoring untuk memperdalam materi jika merasa kurang tidak hanya mengerjakan tugas",
    image: "https://source.unsplash.com/600x400/?student,books",
    bgColor: "bg-green-500",
    textColor: "text-white",
    rounded: "rounded-tl-[50px]",
  },
  {
    title: "Content Course",
    description:
      "menyediakan materi untuk dipelajari secara mendalam dengan materi yang relavan dengan case industri",
    image: "https://source.unsplash.com/600x400/?office,teamwork",
    bgColor: "bg-green-500",
    textColor: "text-white",
    rounded: "rounded-br-[50px]",
  },
  {
    title: "Mini Bootcamp",
    description:
      "Program pelatihan intensif yang dibuat untuk memenuhi kebutuhan khusus Anda selama 1 bulan.",

    image: "https://source.unsplash.com/600x400/?office,teamwork",
    bgColor: "bg-blue-500",
    textColor: "text-white",
    rounded: "rounded-bl-[50px]",
  },
];

const ProgramCard = ({
  title,
  description,
  image,
  bgColor,
  textColor,
  rounded,
}) => {
  return (
    <div className={`relative flex items-center overflow-hidden ${rounded}`}>
      <img
        src={image}
        alt={title}
        className="w-full h-40 md:h-60 object-cover brightness-75"
      />
      <div
        className={`absolute inset-0 ${bgColor} ${textColor} flex items-center px-6`}
      >
        <div>
          <h3 className="text-xl font-bold">{title}</h3>
          {description && <p className="text-sm mt-1">{description}</p>}
        </div>
      </div>
    </div>
  );
};

const ProgramSection = () => {
  return (
    <section className="pt-28 px-[6%] pb-20">
      <div className="max-w-4xl mx-auto text-center mb-8">
        <h2 className="text-3xl font-bold">Pilih Program Belajarmu</h2>
        <p className="text-gray-600">
          Kami memberikan program pembelajaran yang sesuai dengan kebutuhanmu di
          industri digital
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {programs.map((program, index) => (
          <ProgramCard key={index} {...program} />
        ))}
      </div>
    </section>
  );
};

export default ProgramSection;
