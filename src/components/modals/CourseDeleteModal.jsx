import Modal from "react-modal";
import { useComponentStore } from "@/store/useComponentStore";
import { useCourseStore } from "@/store/useCourseStore";
import toast from "react-hot-toast";

const CourseDeleteModal = () => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%, -50%)",
      width: "80%",
      maxWidth: "600px",
      maxHeight: "80vh",
      overflowY: "auto",
      zIndex: 1000, // Pastikan z-index lebih tinggi dari komponen lain
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: 1000, // Pastikan z-index lebih tinggi dari komponen lain
    },
  };

  const { isModalDeleteOpen } = useComponentStore();
  const { formCourse, deleteCourseById } = useCourseStore();

  const handleDelete = async () => {
    try {
      await deleteCourseById(formCourse.id);
      useComponentStore.setState({ isModalDeleteOpen: false });
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete course");
    }
  };

  return (
    <div>
      <Modal
        isOpen={isModalDeleteOpen}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className=" w-full flex flex-col">
          <div className="flex flex-row justify-between items-center mb-5">
            <h3 className="text-2xl uppercase font-thin tracking-tighter">
              Delete
            </h3>
            <button
              onClick={() =>
                useComponentStore.setState({ isModalDeleteOpen: false })
              }
              className="text-4xl"
            >
              &times;
            </button>
          </div>
          <h1 className="text-center font-bold text-2xl">
            Are you sure you want to delete {formCourse?.name}?
          </h1>
          <div className="flex justify-center items-center gap-5 my-10">
            <button
              className="bg-red-500 p-2 text-white text-md"
              onClick={() =>
                useComponentStore.setState({ isModalDeleteOpen: false })
              }
            >
              No
            </button>
            <button
              className="bg-green-500 p-2 text-white text-md"
              onClick={handleDelete}
            >
              Yes
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CourseDeleteModal;
