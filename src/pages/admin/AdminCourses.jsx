import DataTable from "react-data-table-component";
import { useCourseStore } from "@/store/useCourseStore";
import { useEffect } from "react";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { useComponentStore } from "@/store/useComponentStore";
import CourseModal from "@/components/modals/CourseModal";
import CourseDeleteModal from "@/components/modals/CourseDeleteModal";
import Loading from "@/components/Loading";
const AdminCourses = () => {
  const {
    courses,
    getAllCourse,
    isLoading,
    limit,
    totalRows,
    search,
    setSearch,
  } = useCourseStore();

  useEffect(() => {
    getAllCourse();
  }, [getAllCourse, search]);

  const handleUpdateCourse = (course) => {
    useComponentStore.setState({ isModalOpen: true, mode: "update" });
    useCourseStore.setState({ formCourse: course });
  };

  const handlePageChange = (page) => {
    useCourseStore.setState({ offset: (page - 1) * limit });
    getAllCourse();
  };
  const handleLimitChange = (limit) => {
    useCourseStore.setState({ limit: limit, offset: 0 });
    getAllCourse();
  };
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
  };
  const columns = [
    {
      name: "No.",
      selector: (row, index) => index + useCourseStore.getState().offset + 1,
      width: "60px",
    },
    {
      name: "Name",
      selector: (row) => row.name,
      width: "200px",
    },
    {
      name: "Code",
      selector: (row) => row.code,
      width: "200px",
    },
    {
      name: "Type",
      selector: (row) => row.type,
      width: "200px",
    },

    {
      name: "Price",
      selector: (row) => `Rp ${row.price.toLocaleString("id-ID")}`,
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
      name: "Action",
      cell: (row) => (
        <div className="flex items-center gap-2 text-center">
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded z-5"
            onClick={() => {
              useCourseStore.setState({ readerUrl: null });
              handleUpdateCourse({
                id: row.id,
                name: row.name,
                code: row.code,
                type: row.type,
                description: row.description,
                price: row.price,
                urlImage: row.urlImage,
                isActive: row.isActive,
              });
            }}
          >
            <FaPencilAlt />
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              useComponentStore.setState({ isModalDeleteOpen: true });
              useCourseStore.setState({ formCourse: row });
            }}
          >
            <FaTrashAlt />
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="mt-20 flex flex-col">
        <div className="flex items-center justify-between px-16">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded z-0"
            onClick={() => {
              console.log("create course");
              useCourseStore.setState({
                formCourse: {
                  id: "",
                  name: "",
                  code: "",
                  description: "",
                  data: {},
                  type: "",
                  price: 0,
                  urlImage: "",
                  isActive: true,
                },
              });
              useComponentStore.setState({ isModalOpen: true, mode: "create" });
            }}
          >
            + Create Course
          </button>
          <input
            type="text"
            placeholder="search.."
            className="border border-gray-300 rounded-md px-2 py-1 ml-2 focus:outline-none focus:border-blue-500"
            value={search}
            onChange={handleSearchChange}
          />
        </div>
        <div className="mt-2 overflow-hidden mx-auto">
          <DataTable
            columns={columns}
            data={courses}
            responsive
            pagination
            progressPending={isLoading ? <Loading /> : null}
            paginationTotalRows={totalRows}
            onChangePage={handlePageChange}
            onChangeRowsPerPage={handleLimitChange}
          />
        </div>
      </div>
      <CourseModal />
      <CourseDeleteModal />
    </>
  );
};

export default AdminCourses;
