import Modal from "react-modal";
import { useComponentStore } from "@/store/useComponentStore";
import toast from "react-hot-toast";
import AutoComplete from "../AutoComplete";
import { useCurriculumStore } from "@/store/useCurriculumStore";
import QuillEditor from "../QuillEditor";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    width: "100%",
    maxWidth: "1000px",
    maxHeight: "100vh",
    overflowY: "auto",
    zIndex: 1000,
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1000,
  },
};

Modal.setAppElement("#root");
const CurriculumModal = () => {
  const { isModalOpen, mode } = useComponentStore();
  const { formCurriculum, status, createCurriculum, updateCurriculumById } =
    useCurriculumStore();

  const handleChangeFormCurriculum = (key, e) => {
    useCurriculumStore.setState((prevState) => ({
      ...prevState,
      formCurriculum: {
        ...prevState.formCurriculum,
        [key]: e.target.value,
      },
    }));
  };
  const handleFormCurriculum = async (e) => {
    e.preventDefault();
    try {
      if (
        formCurriculum?.title === "" ||
        formCurriculum?.sectionId === "" ||
        formCurriculum?.isActive === "" ||
        formCurriculum?.contents === ""
      ) {
        return toast.error("Please fill in all the fields");
      }
      const data = { ...formCurriculum };
      delete formCurriculum.id;
      if (mode === "create") {
        await createCurriculum(formCurriculum);
      } else if (mode === "update") {
        await updateCurriculumById(data.id, formCurriculum);
        console.log(status);
      }
      if (status === "success") {
        useCurriculumStore.setState({ status: null });
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
        <div className="w-full flex flex-col">
          <div className="flex flex-row justify-between items-center mb-5">
            <h3 className="text-2xl uppercase font-thin tracking-tighter">
              {mode === "create" ? "Create " : "Update "}Curriculum
            </h3>
            <button
              className="text-4xl"
              onClick={() => useComponentStore.setState({ isModalOpen: false })}
            >
              &times;
            </button>
          </div>
          <form onSubmit={handleFormCurriculum}>
            <div className="form-group">
              <div className="my-2">
                <label htmlFor="title">Title :</label>
              </div>
              <div>
                <input
                  type="text"
                  id="title"
                  placeholder="Enter title for curriculum here.."
                  className="w-full p-1 border-2 border-black rounded-md"
                  value={formCurriculum?.title}
                  onChange={(e) => handleChangeFormCurriculum("title", e)}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <div className="my-2">
                <label htmlFor="course">Select Section : </label>
              </div>
              <div>
                <AutoComplete
                  onChangeSuggestions={(suggestion) => {
                    useCurriculumStore.setState({
                      formCurriculum: {
                        ...formCurriculum,
                        sectionId: suggestion.id,
                      },
                    });
                  }}
                  apiEndpoint={`${
                    import.meta.env.VITE_API_URL
                  }/sections/search`}
                  mode={"curriculum"}
                  setQueryData={formCurriculum?.sectionTitle}
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
                  value={formCurriculum?.isActive}
                  onChange={(e) => handleChangeFormCurriculum("isActive", e)}
                  required
                >
                  <option value={true}>true</option>
                  <option value={false}>false</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <div className="my-2">
                <QuillEditor />
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

export default CurriculumModal;
