/* eslint-disable react-hooks/exhaustive-deps */
import DataTable from "react-data-table-component";
import { useUserStore } from "@/store/useUserStore";
import { useEffect } from "react";
import { useComponentStore } from "@/store/useComponentStore";
import UserModal from "@/components/modals/UserModal";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import UserDeleteModal from "@/components/modals/UserDeleteModal";
import Loading from "@/components/Loading";
import { useCourseStore } from "@/store/useCourseStore";

const AdminUsers = () => {
  const { users, isLoading, getAllUser, totalRows, limit, setSearch, search } =
    useUserStore();
  const { getAllCourse, courses } = useCourseStore();
  useEffect(() => {
    getAllUser();
  }, [getAllUser, search]);
  useEffect(() => {
    getAllCourse();
  }, []);

  const handleEditUser = (user) => {
    useComponentStore.setState({ isModalOpen: true, mode: "update" });
    useUserStore.setState({ formUser: user });
    useCourseStore.setState({
      selectedCourse: user.courses.map((course) => {
        return {
          label: course.name,
          value: course.id,
        };
      }),
    });
  };

  const handleDeleteUser = (user) => {
    useComponentStore.setState({ isModalDeleteOpen: true });
    useUserStore.setState({ formUser: user });
  };

  const handlePageChange = (page) => {
    useUserStore.setState({ offset: (page - 1) * limit });
    getAllUser();
  };

  const handleLimitChange = (limit) => {
    useUserStore.setState({ limit: limit, offset: 0 });
    getAllUser();
  };
  courses.map((course) => course.name).join(", ");
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
  };
  const columns = [
    {
      name: "No",
      selector: (row, index) => index + 1 + useUserStore.getState().offset,
      width: "60px",
    },

    {
      name: "Fullname",
      selector: (row) => row.fullname,
    },
    {
      name: "Username",
      selector: (row) => row.username,
    },
    {
      name: "Phone Number",
      selector: (row) => row.phoneNumber,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      wrap: true,
    },
    {
      name: "Role",
      selector: (row) => row.roles.map((role) => role.roleName).join(", "),
      width: "5rem",
    },
    {
      name: "course name",
      selector: (row) => row.courses.map((course) => course.name).join(", "),
      width: "6rem",
    },
    {
      name: "Active",
      cell: (row) => (
        <span
          className={`${
            row.isActive
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          } px-2 py-1 rounded-full text-xs font-semibold`}
        >
          {row.isActive ? "Active" : "Not Active"}
        </span>
      ),
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex space-x-2 items-center">
          <button
            onClick={() => {
              console.log(row);
              handleEditUser({
                id: row.id,
                fullname: row.fullname,
                username: row.username,
                email: row.email,
                phoneNumber: row.phoneNumber,
                roleName: row.roles[0]?.roleName ?? "",
                courses: row.courses,
              });
            }}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            <FaPencilAlt />
          </button>
          <button
            onClick={() => handleDeleteUser(row)}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            <FaTrashAlt />
          </button>
        </div>
      ),
    },
  ];
  const generateAlfabet = users.sort((a, b) =>
    a.fullname.localeCompare(b.fullname)
  );

  return (
    <>
      <div className="mt-20">
        <div className="flex items-center justify-between px-16">
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
            onClick={() => {
              useComponentStore.setState({ isModalOpen: true, mode: "create" });
              useUserStore.setState({
                formUser: {
                  fullname: "",
                  username: "",
                  email: "",
                  phoneNumber: "",
                  roleName: "Student",
                },
              });
            }}
          >
            + Create User
          </button>
          <input
            type="text"
            placeholder="search..."
            className="border border-gray-300 rounded-md px-2 py-1 ml-4 focus:outline-none focus:border-blue-500"
            value={search}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <DataTable
        columns={columns}
        data={generateAlfabet}
        pagination
        paginationServer
        progressPending={isLoading ? <Loading /> : null}
        paginationTotalRows={totalRows}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        responsive={true}
      />
      <UserModal />
      <UserDeleteModal />
    </>
  );
};

export default AdminUsers;
