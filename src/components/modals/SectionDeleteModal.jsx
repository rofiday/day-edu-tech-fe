import Modal from "react-modal";
import { useComponentStore } from "@/store/useComponentStore";
import { useSectionStore } from "@/store/useSectionStore";
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
    zIndex: 1000,
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1000,
  },
};
Modal.setAppElement("#root");
const SectionDeleteModal = () => {
  const { isModalDeleteOpen } = useComponentStore();
  const { formSection, deleteSectionById } = useSectionStore();
  const handleDeleteSection = async () => {
    try {
      console.log(formSection);
      await deleteSectionById(formSection?.id);
      console.log(formSection.title);
      useComponentStore.setState({ isModalDeleteOpen: false });
    } catch (error) {
      console.error(error.message);
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
            Are u sure u want to delete{" "}
            <span className="text-red-500">{formSection?.title}</span>?
          </h1>
          <div className="flex justify-between items-center my-5 px-24">
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
              onClick={handleDeleteSection}
            >
              Yes
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SectionDeleteModal;
