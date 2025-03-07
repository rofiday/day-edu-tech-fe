import {
  FaTools,
  FaBriefcase,
  FaGraduationCap,
  FaNetworkWired,
} from "react-icons/fa";

const difficulties = [
  {
    title: "Skill yang Belum Matang",
    icon: <FaTools className="text-xl text-blue-500" />,
    points: [
      "Keterampilan teknis kamu masih kurang oke untuk pekerjaan impianmu.",
      "Soft skills, seperti komunikasi dan team work, masih perlu diupdate lagi!",
    ],
  },
  {
    title: "Pengalaman Kerja Minim",
    icon: <FaBriefcase className="text-xl text-blue-500" />,
    points: [
      "Belum punya pengalaman yang relevan atau cukup.",
      "Gak sempat magang atau ikut proyek yang bisa diceritakan di portofolio.",
    ],
  },
  {
    title: "Pendidikan Kurang Trusted!",
    icon: <FaGraduationCap className="text-xl text-blue-500" />,
    points: [
      "Track record pendidikan kamu mungkin belum sesuai dengan requirement kerja.",
      "Apa yang kamu pelajari gak nyambung sama yang dibutuhin industri.",
    ],
  },
  {
    title: "Network Profesional Terbatas",
    icon: <FaNetworkWired className="text-xl text-blue-500" />,
    points: [
      "Belum punya banyak koneksi di industri yang diinginkan.",
      "Gak punya mentor atau orang berpengalaman yang bisa membantu.",
    ],
  },
];

const JobDifficultyCard = ({ title, icon, points }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-5 border border-gray-200 pt-28 px-[6%] pb-6">
      <div className="flex justify-between items-center border-b pb-2 mb-3">
        <h4 className="font-semibold text-lg">{title}</h4>
        {icon}
      </div>
      <ul className="list-disc pl-5 text-gray-700 space-y-2">
        {points.map((point, index) => (
          <li key={index}>{point}</li>
        ))}
      </ul>
    </div>
  );
};

const ContentSection = () => {
  return (
    <section className="bg-blue-50 py-10">
      <div className="max-w-4xl mx-auto text-center mb-6">
        <h2 className="text-2xl font-bold">Susah Cari Kerja?</h2>
        <p className="text-gray-600">
          Mau tahu kendala yang sering bikin orang kesulitan dapat kerja? Lihat
          checklist-nya di sini!
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto px-4">
        {difficulties.map((item, index) => (
          <JobDifficultyCard key={index} {...item} />
        ))}
      </div>
    </section>
  );
};

export default ContentSection;
