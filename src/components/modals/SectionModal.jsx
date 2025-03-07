import Modal from "react-modal";
import { useComponentStore } from "@/store/useComponentStore";
import toast from "react-hot-toast";
import { useSectionStore } from "@/store/useSectionStore";
import AutoComplete from "../AutoComplete";
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
const SectionModal = () => {
  const { isModalOpen, mode } = useComponentStore();
  const { formSection, createSection, status, updateSectionById } =
    useSectionStore();

  const handleChangeFormSection = (key, e) => {
    useSectionStore.setState((prevState) => ({
      ...prevState,
      formSection: {
        ...prevState.formSection,
        [key]: e.target.value,
      },
    }));
  };
  const handleFormSection = async (e) => {
    e.preventDefault();
    try {
      if (
        formSection.title === "" ||
        formSection.courseId === "" ||
        formSection.isActive === ""
      ) {
        return toast.error("please fill the form");
      }
      const data = { ...formSection };
      delete formSection.id;
      if (mode === "create") {
        await createSection(formSection);
      } else if (mode === "update") {
        await updateSectionById(data.id, formSection);
        console.log(data.id);
        console.log("update");
      }
      if (status === "success") {
        useSectionStore.setState({ status: null });
      }
      useComponentStore.setState({ isModalOpen: false });
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <div>
      <Modal
        isOpen={isModalOpen}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className=" w-full flex flex-col">
          <div className="flex flex-row justify-between items-center mb-5">
            <h3 className="text-2xl uppercase font-thin tracking-tighter">
              {mode === "create" ? "Create " : "Update "}Section
            </h3>
            <button
              className="text-4xl"
              onClick={() => useComponentStore.setState({ isModalOpen: false })}
            >
              &times;
            </button>
          </div>
          <form onSubmit={handleFormSection}>
            <div className="form-group">
              <div className="my-2">
                <label htmlFor="title">Title :</label>
              </div>
              <div>
                <input
                  type="text"
                  id="title"
                  placeholder="Enter title section here.."
                  className="w-full p-1 border-2 border-black rounded-md"
                  value={formSection?.title}
                  onChange={(e) => handleChangeFormSection("title", e)}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <div className="my-2">
                <label htmlFor="course">Select Course : </label>
              </div>
              <div>
                <AutoComplete
                  onChangeSuggestions={(suggestion) => {
                    useSectionStore.setState({
                      formSection: { ...formSection, courseId: suggestion.id },
                    });
                  }}
                  apiEndpoint={`${import.meta.env.VITE_API_URL}/courses/search`}
                  mode={"section"}
                  setQueryData={formSection?.courseName}
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
                  className="w-full p-1 border-2 border-black rounded-md"
                  value={formSection?.isActive}
                  onChange={(e) => handleChangeFormSection("isActive", e)}
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

export default SectionModal;
