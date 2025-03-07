import { useCourseStore } from "@/store/useCourseStore";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const CourseSection = () => {
  const { getAllCourse, courses } = useCourseStore();

  useEffect(() => {
    getAllCourse();
  }, [getAllCourse]);

  return (
    <div className="container mx-auto pt-28 px-[6%] pb-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6">
        {courses?.map((course) => (
          <Link key={course.id} to={`/course-detail/${course.id}`}>
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
              <div className="w-full p-1 border border-gray-200 flex flex-col h-full">
                <img
                  src={import.meta.env.VITE_API_URL + course.urlImage}
                  alt={course.name}
                  className="h-48 w-full object-cover rounded-md"
                />
                <div className="flex flex-col p-4 flex-grow">
                  <div className="flex flex-col justify-start">
                    <h6 className="font-semibold min-h-16">{course.name}</h6>
                    <p className="text-gray-600">
                      {course.description.slice(0, 80)}...
                    </p>
                  </div>
                  <div className="mt-auto">
                    <p className="text-blue-600 font-bold">
                      Rp
                      {course.price.toLocaleString("id-ID", {
                        maximumFractionDigits: 2,
                        useGrouping: true,
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CourseSection;
