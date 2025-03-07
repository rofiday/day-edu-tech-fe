import DataTable from "react-data-table-component";
import { useEffect } from "react";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { useSectionStore } from "@/store/useSectionStore";
import SectionModal from "@/components/modals/SectionModal";
import { useComponentStore } from "@/store/useComponentStore";
import SectionDeleteModal from "@/components/modals/SectionDeleteModal";
import Loading from "@/components/Loading";
const AdminSection = () => {
  const {
    getAllSection,
    sections,
    limit,
    totalRows,
    isLoading,
    search,
    setSearch,
  } = useSectionStore();

  useEffect(() => {
    getAllSection();
  }, [getAllSection, search]);

  const handleUpdateSection = (section) => {
    useSectionStore.setState(
      { formSection: section },
      console.log(section),
      useComponentStore.setState({ isModalOpen: true, mode: "update" })
    );
  };
  const handleDeleteSection = (section) => {
    useSectionStore.setState({ formSection: section });
    useComponentStore.setState({ isModalDeleteOpen: true });
  };
  const handlePageChange = (page) => {
    useSectionStore.setState({ offset: (page - 1) * limit });
    getAllSection();
  };
  const handleLimitChange = (limit) => {
    useSectionStore.setState({ limit: limit, offset: 0 });
    getAllSection();
  };
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
  };
  const columns = [
    {
      name: "No.",
      selector: (row, index) => index + useSectionStore.getState().offset + 1,
      width: "60px",
    },
    {
      name: "Title",
      selector: (row) => row.title,
      width: "250px",
      wrap: true,
    },
    {
      name: "Course",
      selector: (row) => row.course?.name,
      width: "200px",
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
        <div className="flex items-center gap-2">
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              console.log(row);
              handleUpdateSection({
                id: row.id,
                title: row.title,
                courseId: row.courseId,
                courseName: row.course?.name,
                isActive: row.isActive,
              });
              useComponentStore.setState({ isModalOpen: true, mode: "update" });
            }}
          >
            <FaPencilAlt />
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              handleDeleteSection(row);
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
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
            onClick={() => {
              useComponentStore.setState({ isModalOpen: true, mode: "create" });
              useSectionStore.setState({
                formSection: {
                  title: "",
                  courseId: "",
                  isActive: true,
                },
              });
            }}
          >
            + Create Sections
          </button>
          <input
            type="text"
            placeholder="search..."
            className=" px-2 py-1 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500 "
            value={search}
            onChange={handleSearchChange}
          />
        </div>
        <div className="mt-2 overflow-hidden mx-auto w-full">
          <DataTable
            columns={columns}
            data={sections}
            paginationServer
            progressPending={isLoading ? <Loading /> : null}
            paginationTotalRows={totalRows}
            onChangePage={handlePageChange}
            onChangeRowsPerPage={handleLimitChange}
            responsive
            pagination
            striped
          />
        </div>
      </div>
      <SectionModal />
      <SectionDeleteModal />
    </>
  );
};

export default AdminSection;
