import Modal from "react-modal";
import { useComponentStore } from "@/store/useComponentStore";
import { useUserStore } from "@/store/useUserStore";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
Modal.setAppElement("#root");
const UserDeleteModal = () => {
  const { isModalDeleteOpen } = useComponentStore();
  const { formUser, deleteUserById } = useUserStore();

  const handleDeleteUser = async () => {
    try {
      await deleteUserById(formUser.id);
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
        <div className=" w-[500px] flex flex-col">
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
            Are u sure u want to delete {formUser.fullname}
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
              onClick={handleDeleteUser}
            >
              Yes
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default UserDeleteModal;
