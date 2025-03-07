//data  seluruh course
import { useCourseStore } from "@/store/useCourseStore";
import { useEffect } from "react";
import { MultiSelect } from "react-multi-select-component";

const MultiSelectCourse = () => {
  const { courses, getAllCourse, selectedCourse } = useCourseStore();

  useEffect(() => {
    getAllCourse();
  }, [getAllCourse]);
  const options = courses?.map((course) => ({
    label: course?.name,
    value: course?.id,
  }));
  const handleSelected = (selectedCourse) => {
    useCourseStore.setState({ selectedCourse: selectedCourse });
  };
  return (
    <div>
      <h1>Select Courses: </h1>
      <MultiSelect
        options={options}
        value={selectedCourse}
        onChange={handleSelected}
        labelledBy="Select"
      />
    </div>
  );
};

export default MultiSelectCourse;
