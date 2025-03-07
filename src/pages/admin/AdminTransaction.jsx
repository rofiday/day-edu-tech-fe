import Loading from "@/components/Loading";
import OrderModal from "@/components/modals/OrderModal";
import { useComponentStore } from "@/store/useComponentStore";
import { useTransactionStore } from "@/store/useTransactionStore";
import { useEffect } from "react";
import DataTable from "react-data-table-component";
import { FaEye } from "react-icons/fa";

const AdminTransactions = () => {
  const {
    getAllOrders,
    orders,
    search,
    setSearch,
    isLoading,
    totalRows,
    limit,
  } = useTransactionStore();

  useEffect(() => {
    getAllOrders();
  }, [getAllOrders, search]);
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
  };
  const handlePageChange = (page) => {
    useTransactionStore.setState({ offset: (page - 1) * limit });
    getAllOrders();
  };
  const handleLimitChange = (limit) => {
    useTransactionStore.setState({ limit: limit, offset: 0 });
    getAllOrders();
  };
  const columns = [
    {
      name: "No.",
      selector: (row, index) => index + 1,
      width: "60px",
    },
    {
      name: "Order ID",
      selector: (row) => row?.orderId,
      width: "250px",
      style: { fontSize: "14px" },
    },
    {
      name: "Username",
      selector: (row) => row?.user?.username,
      style: { fontSize: "14px" },
    },
    {
      name: "Total Price",
      selector: (row) => `IDR ${row?.totalPrice?.toLocaleString("id-ID")}`,
      style: { fontSize: "14px" },
    },
    {
      name: "Email",
      selector: (row) => row?.user?.email,
      style: { fontSize: "14px" },
    },
    {
      name: "Status",
      selector: (row) => row?.status,
      cell: (row) => (
        <span
          className={`badge ${
            row?.status === "paid" ? "bg-green-500" : "bg-red-500"
          } text-white py-1 px-2 rounded`}
        >
          {row?.status}
        </span>
      ),
      style: { fontSize: "14px" },
    },
    {
      name: "Payment Status",
      selector: (row) => row?.paymentStatus,
      style: { fontSize: "14px" },
    },
    {
      name: "action",
      cell: (row) => (
        <button
          onClick={() => {
            useTransactionStore.setState({
              order: {
                data: row.data,
                status: row.status,
                orderId: row.orderId,
              },
            });
            useComponentStore.setState({ isModalOpen: true });
          }}
        >
          <FaEye />
        </button>
      ),
    },
  ];
  return (
    <div className="container mx-auto mt-20">
      <input
        type="text"
        placeholder="search.."
        onChange={handleSearchChange}
        value={search}
        className="px-2 py-1 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
      />
      <DataTable
        columns={columns}
        data={orders}
        progressPending={isLoading ? <Loading /> : null}
        paginationTotalRows={totalRows}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        responsive
        pagination
        striped
      />
      <OrderModal />
    </div>
  );
};

export default AdminTransactions;
