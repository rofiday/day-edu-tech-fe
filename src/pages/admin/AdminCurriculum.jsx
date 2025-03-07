import Loading from "@/components/Loading";
import CurriculumDeleteModal from "@/components/modals/CurriculumDeleteModal";
import CurriculumModal from "@/components/modals/CurriculumModal";
import { useComponentStore } from "@/store/useComponentStore";
import { useCurriculumStore } from "@/store/useCurriculumStore";
import { useEffect } from "react";
import DataTable from "react-data-table-component";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";

const AdminCurriculum = () => {
  const {
    curriculums,
    getAllCurriculum,
    isLoading,
    totalRows,
    limit,
    setSearch,
    search,
  } = useCurriculumStore();
  useEffect(() => {
    getAllCurriculum();
  }, [getAllCurriculum, search]);

  const handleUpdateCurriculum = (curriculums) => {
    useCurriculumStore.setState({ formCurriculum: curriculums });
    useComponentStore.setState({ mode: "update", isModalOpen: true });
  };
  const handlePageChange = (page) => {
    useCurriculumStore.setState({ offset: (page - 1) * limit });
    getAllCurriculum();
  };
  const handleLimitChange = (limit) => {
    useCurriculumStore.setState({ limit: limit, offset: 0 });
    getAllCurriculum();
  };
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
  };
  const columns = [
    {
      name: "No",
      selector: (row, index) =>
        index + 1 + useCurriculumStore.getState().offset,
      width: "60px",
    },
    {
      name: "Title",
      selector: (row) => row.title,
      width: "200px",
      wrap: true,
    },
    {
      name: "Section",
      selector: (row) => row?.section?.title,
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
        <div className="flex space-x-2">
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              useComponentStore.setState({ isModalOpen: true, mode: "update" });
              handleUpdateCurriculum({
                id: row.id,
                title: row.title,
                sectionId: row.sectionId,
                sectionTitle: row.section?.title,
                contents: row?.contents,
              });
            }}
          >
            <FaPencilAlt />
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              useComponentStore.setState({ isModalDeleteOpen: true });
              useCurriculumStore.setState({ formCurriculum: row });
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
      <div className="mt-20">
        <div className="flex justify-between items-center px-16">
          <button
            id="action-curriculum"
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              useCurriculumStore.setState({
                formCurriculum: {
                  id: "",
                  title: "",
                  sectionId: "",
                  sectionTitle: "",
                  contents: "",
                  data: {},
                },
              });
              useComponentStore.setState({ isModalOpen: true, mode: "create" });
            }}
          >
            + Create Curriculum
          </button>
          <input
            type="text"
            placeholder="search.."
            className="border border-gray-300 rounded-md px-2 py-1 ml-4 focus:outline-none  focus:border-blue-500"
            value={search}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <DataTable
        columns={columns}
        data={curriculums}
        responsive={true}
        pagination
        paginationServer
        progressPending={isLoading ? <Loading /> : null}
        paginationTotalRows={totalRows}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        map
      />
      <CurriculumModal />
      <CurriculumDeleteModal />
    </>
  );
};

export default AdminCurriculum;
