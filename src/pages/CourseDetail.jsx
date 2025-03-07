import Loading from "@/components/Loading";
import { useAuthStore } from "@/store/useAuthStore";
import { useCourseStore } from "@/store/useCourseStore";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const CourseDetail = () => {
  const {
    course,
    getCourseByIdPublic,
    getCourseByIdProtected,
    addCourseToCart,
    message,
    error,
    isAvailableCourse, // logic untuk proteksi tombol beli course
    isLoading,
  } = useCourseStore();
  const { roleName } = useAuthStore();
  const { id } = useParams();

  useEffect(() => {
    if (localStorage.getItem("isAuthenticated")) {
      getCourseByIdProtected(id);
    } else {
      getCourseByIdPublic(id);
    }
  }, [id, getCourseByIdPublic, getCourseByIdProtected]);

  useEffect(() => {
    if (message) toast.success(message);
    if (error) toast.error(error);
    useCourseStore.setState({ message: null, error: null });
  }, [message, error]);

  const addToCart = async () => {
    try {
      if (isAvailableCourse === false) return;
      if (!localStorage.getItem("isAuthenticated")) {
        return (window.location.href = "/login");
      }
      await addCourseToCart(id);
      useCourseStore.setState({ isAvailableCourse: false });
    } catch (error) {
      console.error(error.message);
    }
  };

  if (!course)
    return (
      <p className="text-center mt-10 text-xl text-gray-500">
        Course not found
      </p>
    );

  if (isLoading) return <Loading />;

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen mt-20">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-5">
        <img
          src={import.meta.env.VITE_API_URL + course?.urlImage}
          alt={course?.name}
          className="w-full h-auto max-h-[30rem] object-cover rounded-lg shadow-md object-center sm:h-[20rem] md:h-[25rem] lg:h-[30rem]"
        />
        <h2 className="text-3xl font-bold mt-6 text-gray-800">
          {course?.name}
        </h2>
        <p className="text-gray-600 mt-3 leading-relaxed">
          {course?.description}
        </p>
        <p className="text-blue-600 font-bold text-xl mt-4">
          Rp {course?.price?.toLocaleString()}
        </p>
        {roleName !== "Admin" && (
          <button
            onClick={addToCart}
            className={`mt-4 px-4 py-2 rounded-lg transition ${
              !isAvailableCourse
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {!isAvailableCourse ? "Course not available" : "Add to Cart"}
          </button>
        )}

        <h3 className="text-2xl font-semibold mt-8 text-gray-800">Silabus</h3>
        <div className="mt-4 space-y-3">
          {course?.sections?.map((section) => (
            <SectionItem
              key={`${section.id}-${section.title}`}
              section={section}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const SectionItem = ({ section }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border rounded-lg p-4 bg-gray-100 shadow-sm">
      <div
        className="flex justify-between items-center cursor-pointer hover:bg-gray-200 p-2 rounded transition"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h4 className="text-lg font-bold text-gray-800">{section.title}</h4>
        <span className="text-gray-600 text-xl">{isOpen ? "▼" : "▶"}</span>
      </div>
      {isOpen && (
        <div className="mt-2 ml-4 space-y-2">
          {section?.curriculums?.map((curriculum) => (
            <CurriculumItem key={curriculum.id} curriculum={curriculum} />
          ))}
        </div>
      )}
    </div>
  );
};

const CurriculumItem = ({ curriculum }) => {
  return (
    <div className="border-l-4 border-blue-500 pl-4 py-2 bg-gray-50 rounded-md shadow-sm">
      <h5 className="text-md font-semibold text-gray-700">
        {curriculum.title}
      </h5>
    </div>
  );
};

export default CourseDetail;
