import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCourseStore } from "@/store/useCourseStore";
import { useSectionStore } from "@/store/useSectionStore";
import { useCurriculumStore } from "@/store/useCurriculumStore";
import NotFound from "@/components/NotFound";
import { useAuthStore } from "@/store/useAuthStore";
import { FaBars, FaTimes } from "react-icons/fa";
const LMS = () => {
  const { id } = useParams();
  const [selectedCurriculum, setSelectedCurriculum] = useState(null);
  const [expandedSections, setExpandedSections] = useState({}); //collapse
  const [sidebarOpen, setSidebarOpen] = useState(false); // State untuk sidebar di mobile
  const { getCourseByIdLms, course, isNotFound } = useCourseStore();
  const { getAllSection } = useSectionStore();
  const { getAllCurriculum } = useCurriculumStore();
  const { username } = useAuthStore();

  const toggleSection = (index) => {
    setExpandedSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  useEffect(() => {
    getCourseByIdLms(id);
  }, [getCourseByIdLms, id]);
  useEffect(() => {
    getAllSection();
  }, [getAllSection]);
  useEffect(() => {
    getAllCurriculum();
  }, [getAllCurriculum]);

  if (isNotFound) return <NotFound />;
  return (
    <div className="flex h-screen bg-gray-100 mt-20">
      <button
        className={`lg:hidden px-2 fixed top-6 left-44 text-black rounded-md shadow-md z-100 ${
          sidebarOpen ? "hidden" : ""
        }`}
        onClick={() => setSidebarOpen(true)}
      >
        <FaBars />
      </button>

      <aside
        className={`fixed lg:static top-0 left-0 h-full w-64 bg-white shadow-lg p-4 transition-transform transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 z-50`}
      >
        <button
          className="lg:hidden absolute top-6 right-4 text-gray-600"
          onClick={() => setSidebarOpen(false)}
        >
          <FaTimes />
        </button>
        <h2 className="text-lg font-bold text-gray-800 mb-4">Curriculum</h2>
        <div className="overflow-y-auto h-[calc(100vh-80px)]">
          {course?.sections?.map((section, index) => (
            <div key={index} className="mb-4">
              <div
                className="flex justify-between items-center cursor-pointer p-2 bg-gray-200 rounded-md"
                onClick={() => toggleSection(index)}
              >
                <h3 className="text-md font-semibold text-gray-700">
                  {section.title}
                </h3>
                <span className="text-gray-600">
                  {expandedSections[index] ? "−" : "+"}
                </span>
              </div>
              {expandedSections[index] && (
                <ul className="mt-2 space-y-2 pl-3">
                  {section?.curriculums?.map((curriculum) => (
                    <li
                      key={curriculum.id}
                      className={`p-2 rounded-md cursor-pointer transition ${
                        selectedCurriculum?.id === curriculum.id
                          ? "bg-blue-600 text-white"
                          : "hover:bg-gray-200 text-gray-800"
                      }`}
                      onClick={() => {
                        setSelectedCurriculum(curriculum);
                        setSidebarOpen(false);
                      }}
                    >
                      {curriculum.title}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </aside>

      <main className="flex-1 p-6 overflow-y-auto h-screen">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center lg:text-left">
          {course.name}
        </h1>
        <div className="bg-white shadow-md p-6 rounded-lg min-h-[400px]">
          {selectedCurriculum ? (
            <>
              <h2 className="text-2xl font-semibold text-gray-700">
                {selectedCurriculum.title}
              </h2>
              <p className="mt-2 text-gray-600">
                <div
                  dangerouslySetInnerHTML={{
                    __html: selectedCurriculum.contents,
                  }}
                />
              </p>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center mt-32">
              <p className="text-gray-600 text-lg font-semibold mb-2">
                Hallo👋,Selamat datang. {username}..
              </p>
              <p className="text-gray-600 text-center">
                Silakan pilih kurikulum dari sidebar untuk melihat konten.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default LMS;
