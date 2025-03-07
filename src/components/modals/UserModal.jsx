import Modal from "react-modal";
import { useComponentStore } from "@/store/useComponentStore";
import { useUserStore } from "@/store/useUserStore";
import toast from "react-hot-toast";
import MultiSelectCourse from "../MultiSelectCourse";
import { useCourseStore } from "@/store/useCourseStore";
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
const UserModal = () => {
  const { isModalOpen, mode } = useComponentStore();
  const { formUser, status, createUser, updateUserById } = useUserStore();
  const { selectedCourse } = useCourseStore();
  const handleFormUser = async (e) => {
    e.preventDefault();
    try {
      if (
        formUser.fullname === "" ||
        formUser.username === "" ||
        formUser.email === "" ||
        formUser.phoneNumber === "" ||
        formUser.roleName === ""
      )
        return toast.error("please fill the form");
      const data = { ...formUser };
      delete formUser.id;
      formUser.courses = selectedCourse;
      if (mode === "create") {
        await createUser(formUser);
        useUserStore.setState({ isLoading: true });
        useUserStore.setState({ isLoading: null });
      } else if (mode === "update") {
        await updateUserById(data.id, formUser);
        console.log(formUser);
      }
      if (status === "success") {
        useUserStore.setState({ status: null });
      }
      useComponentStore.setState({ isModalOpen: false });
    } catch (error) {
      console.error(error.message);
    }
  };
  const handleChangeFormUser = (key, e) => {
    useUserStore.setState((prevState) => ({
      ...prevState,
      formUser: {
        ...prevState.formUser,
        [key]: e.target.value,
      },
    }));
  };
  return (
    <div>
      <Modal
        isOpen={isModalOpen}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className=" w-[500px] flex flex-col">
          <div className="flex flex-row justify-between items-center mb-5">
            <h3 className="text-2xl uppercase font-thin tracking-tighter">
              {mode === "create" ? "Create " : "Update "}User
            </h3>
            <button
              className="text-4xl"
              onClick={() => useComponentStore.setState({ isModalOpen: false })}
            >
              &times;
            </button>
          </div>
          <form onSubmit={handleFormUser}>
            <div className="form-group">
              <div className="my-2">
                <label htmlFor="username">Username :</label>
              </div>
              <div>
                <input
                  type="text"
                  id="username"
                  placeholder="Enter username for new user.."
                  value={formUser.username}
                  onChange={(e) => {
                    handleChangeFormUser("username", e);
                  }}
                  className="w-full p-1 border-2 border-black rounded-md"
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <div className="my-2">
                <label htmlFor="fullname">Fullname :</label>
              </div>
              <div>
                <input
                  type="text"
                  id="fullname"
                  placeholder="Enter fullname for new user.."
                  value={formUser.fullname}
                  onChange={(e) => {
                    handleChangeFormUser("fullname", e);
                  }}
                  className="w-full p-1 border-2 border-black rounded-md"
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <div className="my-2">
                <label htmlFor="email">Email: </label>
              </div>
              <div>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter email for new user.."
                  value={formUser.email}
                  onChange={(e) => {
                    handleChangeFormUser("email", e);
                  }}
                  className="w-full p-1 border-2 border-black rounded-md"
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <div className="my-2">
                <label htmlFor="phoneNumber">Phone Number: </label>
              </div>
              <div>
                <input
                  type="text"
                  id="phoneNumber"
                  placeholder="Enter phone number for new user.."
                  value={formUser.phoneNumber}
                  onChange={(e) => {
                    handleChangeFormUser("phoneNumber", e);
                  }}
                  className="w-full p-1 border-2 border-black rounded-md"
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <div className="my-2">
                <label htmlFor="role">Role: </label>
              </div>
              <div>
                <select
                  id="role"
                  name="role"
                  placeholder="Select role for new user.."
                  value={formUser.roleName}
                  onChange={(e) => {
                    handleChangeFormUser("roleName", e);
                  }}
                  className="w-full p-1 border-2 border-black rounded-md"
                  required
                >
                  <option value="">Select Role</option>
                  <option value="Admin">Admin</option>
                  <option value="Student">Student</option>
                  <option value="Mentor">Mentor</option>
                </select>
              </div>
              <div className="form-group">
                <div className="my-2">
                  {formUser.roleName === "Student" && <MultiSelectCourse />}
                </div>
              </div>
            </div>
            <div className="mt-5">
              <button
                className="bg-sky-500 mt-3 w-full py-1 text-lg rounded-md text-white"
                type="submit"
                onClick={() => {
                  useUserStore.setState({ isLoading: true });
                  useUserStore.setState({ isLoading: null });
                }}
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

export default UserModal;
