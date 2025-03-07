import { useCourseStore } from "@/store/useCourseStore";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const MyCoursesPage = () => {
  const { getUserCourses, myCourses } = useCourseStore();

  useEffect(() => {
    getUserCourses();
  }, [getUserCourses]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">My Courses</h1>
        {myCourses.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {myCourses.map((myCourse) => (
              <div
                key={myCourse.id}
                className="bg-white rounded-lg shadow-md overflow-hidden transition transform hover:scale-105"
              >
                <img
                  src={import.meta.env.VITE_API_URL + myCourse.urlImage}
                  alt={myCourse.name}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {myCourse.name}
                  </h2>
                  <p className="text-gray-600 mt-2">{myCourse.description}</p>
                  <Link
                    to={"/lms/" + myCourse.id}
                    className="mt-4 inline-block bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition w-full text-center"
                  >
                    Go to LMS
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center font-semibold text-2xl mt-12">
            You haven&apos;t enrolled in any classes yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default MyCoursesPage;
