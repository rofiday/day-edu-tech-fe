import Modal from "react-modal";
import { useComponentStore } from "@/store/useComponentStore";
import { useCourseStore } from "@/store/useCourseStore";
import toast from "react-hot-toast";
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

Modal.setAppElement("#root");

const CourseModal = () => {
  const { isModalOpen } = useComponentStore();
  const { formCourse, status, createCourse, updateCourseById, readerUrl } =
    useCourseStore();
  const { mode } = useComponentStore();

  const handleChangeFormCourse = (key, e) => {
    useCourseStore.setState((prevState) => ({
      ...prevState,
      formCourse: {
        ...prevState.formCourse,
        [key]: e.target.value,
      },
    }));
  };

  const handleChangeImage = (key, e) => {
    const file = e.target.files[0];
    if (!file.type.match(/^image\//)) {
      toast.error("Only images are allowed");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Maximum size of image is 5MB");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      useCourseStore.setState((prevState) => ({
        ...prevState,
        formCourse: {
          ...prevState.formCourse,
          [key]: file,
        },
      }));
      useCourseStore.setState({ readerUrl: reader.result });
    };
    reader.readAsDataURL(file);
  };
  const handleFormCourse = async (e) => {
    e.preventDefault();
    try {
      if (
        formCourse.name === "" ||
        formCourse.code === "" ||
        formCourse.description === "" ||
        formCourse.type === "" ||
        formCourse.price === 0 ||
        formCourse.urlImage === ""
      ) {
        return toast.error("please fill the form");
      }
      const data = { ...formCourse };
      delete formCourse.id;
      if (mode === "create") {
        const formData = new FormData();
        formData.append("folder", "courses");
        Object.keys(formCourse).forEach((key) => {
          formData.append(key, formCourse[key]);
        });
        await createCourse(formData);
      } else if (mode === "update") {
        const formData = new FormData();
        formData.append("folder", "courses");
        Object.keys(formCourse).forEach((key) => {
          formData.append(key, formCourse[key]);
        });
        await updateCourseById(data.id, formData);
      }
      if (status === "success") {
        useCourseStore.setState({ status: null });
      }
      useComponentStore.setState({ isModalOpen: false });
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="">
      <Modal
        isOpen={isModalOpen}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="flex flex-col">
          <div className="flex flex-row justify-between items-center">
            <h3 className="text-2xl uppercase font-semibold tracking-wide">
              {mode === "create" ? "create " : "update "}Course
            </h3>
            <button
              className="text-4xl"
              onClick={() => {
                useComponentStore.setState({ isModalOpen: false });
              }}
            >
              &times;
            </button>
          </div>
          <form onSubmit={handleFormCourse}>
            <div className="form-group">
              <div className="my-2">
                <label htmlFor="name">Name :</label>
              </div>
              <div>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter name course here.."
                  value={formCourse?.name}
                  onChange={(e) => handleChangeFormCourse("name", e)}
                  className="w-full p-1 border-2 border-black rounded-md"
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <div className="my-2">
                <label htmlFor="code">Code :</label>
              </div>
              <div>
                <input
                  type="text"
                  id="code"
                  placeholder="Enter code course here..(FS_JS_BC).etc"
                  value={formCourse?.code}
                  onChange={(e) => handleChangeFormCourse("code", e)}
                  className="w-full p-1 border-2 border-black rounded-md"
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <div className="my-2">
                <div>
                  <label htmlFor="type">Type: </label>
                </div>
                <select
                  id="type"
                  value={formCourse?.type}
                  onChange={(e) => handleChangeFormCourse("type", e)}
                  className="w-full p-1 border-2 border-black rounded-md"
                  required
                >
                  <option value="">Select Type</option>
                  <option value="bootcamp">Bootcamp</option>
                  <option value="mini bootcamp">Mini Bootcamp</option>
                  <option value="content course">Content Course</option>
                  <option value="1on1 mentoring">1on1 Mentoring</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <div className="my-2">
                <label htmlFor="description">Description : </label>
              </div>
              <div>
                <textarea
                  name="description"
                  id="description"
                  placeholder="Enter description course here.."
                  value={formCourse?.description}
                  onChange={(e) => handleChangeFormCourse("description", e)}
                  className="w-full p-1 border-2 border-black rounded-md h-28"
                  required
                ></textarea>
              </div>
            </div>
            <div className="form-group">
              <div className="my-2">
                <label htmlFor="price">Price : </label>
              </div>
              <div>
                <input
                  type="number"
                  id="price"
                  placeholder="Enter price course here.."
                  value={formCourse?.price}
                  onChange={(e) => handleChangeFormCourse("price", e)}
                  className="w-full p-1 border-2 border-black rounded-md"
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <div className="my-2">
                <label htmlFor="urlImage">Image : </label>
              </div>
              <div>
                <input
                  type="file"
                  id="urlImage"
                  onChange={(e) => handleChangeImage("urlImage", e)}
                  className="w-full p-1 border-2 border-black rounded-md"
                />
                <img
                  src={
                    mode === "update"
                      ? readerUrl
                        ? readerUrl
                        : import.meta.env.VITE_API_URL + formCourse.urlImage
                      : readerUrl
                      ? readerUrl
                      : "https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png"
                  }
                  className="mt-2 w-full h-auto object-cover"
                  onError={(e) => {
                    e.target.src =
                      "https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png";
                  }}
                  alt="Course"
                />
              </div>
            </div>
            <div className="form-group">
              <div className="my-2">
                <label htmlFor="isActive">isActive : </label>
              </div>
              <div>
                <select
                  id="isActive"
                  value={formCourse?.isActive}
                  onChange={(e) => handleChangeFormCourse("isActive", e)}
                  className="w-full p-1 border-2 border-black rounded-md"
                  required
                >
                  <option value={true}>true</option>
                  <option value={false}>false</option>
                </select>
              </div>
            </div>
            <div className="mt-5">
              <button
                className="bg-sky-500 mt-3 w-full py-1 text-lg rounded-md text-white"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default CourseModal;
