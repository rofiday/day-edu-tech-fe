import { useState } from "react";

const faqs = [
  {
    question: "Bagaimana cara mendaftar?",
    answer:
      "Anda dapat mendaftar melalui website kami dengan mengklik tombol 'Daftar Sekarang'.",
  },
  {
    question: "Apakah ada garansi mendapatkan pekerjaan?",
    answer:
      "Kami menyediakan program job assistance untuk membantu Anda mendapatkan pekerjaan.",
  },
  {
    question: "Berapa biaya kursusnya?",
    answer:
      "Biaya kursus bervariasi tergantung pada program yang dipilih. Silakan cek halaman program untuk detail lebih lanjut.",
  },
  {
    question: "Apakah ada program gratis?",
    answer:
      "Ya, kami memiliki beberapa program gratis yang dapat Anda akses melalui platform kami.",
  },
];
const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => setOpenIndex(openIndex === index ? null : index);
  return (
    <section className="faq pt-28 px-[6%] pb-20">
      <div className="mt-16 w-full">
        <h2 className="text-4xl font-bold text-gray-900 text-center">FAQ</h2>
        <div className="mt-8 max-w-2xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-300 py-4">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left text-lg font-semibold text-gray-900 focus:outline-none transition-all duration-300"
              >
                {faq.question}
                <span className="float-right transition-transform duration-300">
                  {openIndex === index ? (
                    <span className="rotate-180">-</span>
                  ) : (
                    "+"
                  )}
                </span>
              </button>
              <div className="flex">
                {openIndex === index && (
                  <p className="text-gray-700 mt-2">{faq.answer}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
