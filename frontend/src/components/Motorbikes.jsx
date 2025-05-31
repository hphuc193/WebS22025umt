import { useQuery, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const GET_MOTORBIKES = gql`
  query GetMotorbikes(
    $page: Int
    $limit: Int
    $filter: MotorbikeFilter
    $sort: MotorbikeSort
  ) {
    motorbikes(page: $page, limit: $limit, filter: $filter, sort: $sort) {
      items {
        _id
        stt
        name
        pricePerDay
        quantity
        images
      }
      total
      page
      limit
    }
  }
`;

export default function Motorbikes() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(6); // Giá trị mặc định
  const [searchTerm, setSearchTerm] = useState("");
  const [appliedSearchTerm, setAppliedSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("ASC");

  const { loading, error, data, refetch } = useQuery(GET_MOTORBIKES, {
    variables: {
      page,
      limit,
      filter: {
        name: appliedSearchTerm || undefined,
        minPrice: minPrice ? parseFloat(minPrice) : undefined,
        maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
      },
      sort: { field: sortField, order: sortOrder },
    },
    context: {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    },
  });

  const handleSearch = () => {
    setAppliedSearchTerm(searchTerm);
    setPage(1);
    refetch();
  };

  const handleFilter = () => {
    setPage(1);
    refetch();
  };

  const handleSort = () => {
    setPage(1);
    refetch();
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    refetch();
  };

  const handleLimitChange = (newLimit) => {
    setLimit(newLimit);
    setPage(1); // Reset về trang 1 khi thay đổi số lượng item mỗi trang
    refetch();
  };

  if (loading) return <p className="text-center text-xl">Đang tải...</p>;
  if (error)
    return <p className="text-center text-red-500">Lỗi: {error.message}</p>;
  if (!data || !data.motorbikes) {
    return <p className="text-center">Không có dữ liệu để hiển thị.</p>;
  }

  const {
    items,
    total,
    page: currentPage,
    limit: itemsPerPage,
  } = data.motorbikes;
  const totalPages = Math.ceil(total / itemsPerPage);
  const displayedItems = items.length; // Số item hiển thị trên trang hiện tại

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-900">
        Danh sách Motorbikes
      </h2>

      {role === "admin" && (
        <div className="flex justify-end mb-4">
          <button
            onClick={() => navigate("/motorbike/new")}
            className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700"
          >
            + Thêm mới
          </button>
        </div>
      )}

      {/* Bộ lọc và tìm kiếm */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label htmlFor="search" className="block mb-1">
              Tìm kiếm theo tên
            </label>
            <div className="flex gap-2">
              <input
                id="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Nhập tên xe máy..."
                className="w-full p-2 border rounded-md"
              />
              <button
                onClick={handleSearch}
                className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700"
              >
                Tìm kiếm
              </button>
            </div>
          </div>

          <div className="flex-1">
            <label className="block mb-1">Giá mỗi ngày</label>
            <div className="flex gap-2">
              <input
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                placeholder="Giá tối thiểu"
                className="w-full p-2 border rounded-md"
              />
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                placeholder="Giá tối đa"
                className="w-full p-2 border rounded-md"
              />
            </div>
            <button
              onClick={handleFilter}
              className="mt-2 w-full bg-gray-800 text-white p-2 rounded-md hover:bg-gray-700"
            >
              Lọc giá
            </button>
          </div>

          <div className="flex-1">
            <label className="block mb-1">Sắp xếp</label>
            <div className="flex gap-2">
              <select
                value={sortField}
                onChange={(e) => setSortField(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                <option value="name">Tên</option>
                <option value="pricePerDay">Giá mỗi ngày</option>
              </select>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                <option value="ASC">Tăng dần</option>
                <option value="DESC">Giảm dần</option>
              </select>
            </div>
            <button
              onClick={handleSort}
              className="mt-2 w-full bg-gray-800 text-white p-2 rounded-md hover:bg-gray-700"
            >
              Sắp xếp
            </button>
          </div>
        </div>
      </div>

      {/* Thông tin phân trang */}
      <div className="text-center mb-4">
        <p>
          Tổng số xe máy: <strong>{total}</strong> | Đang hiển thị:{" "}
          <strong>{displayedItems}</strong> | Trang hiện tại:{" "}
          <strong>{currentPage}</strong> / <strong>{totalPages}</strong>
        </p>
        <label className="mt-2 block">
          Số lượng mỗi trang:
          <select
            value={limit}
            onChange={(e) => handleLimitChange(parseInt(e.target.value))}
            className="ml-2 p-1 border rounded-md"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div
            key={item._id}
            className="relative overflow-hidden shadow-lg hover:shadow-xl transition cursor-pointer bg-white border-2 border-black rounded-md"
            onClick={() => navigate(`/motorbike/${item._id}`)}
          >
            <div className="aspect-[16/9]">
              <img
                src={
                  item.images && item.images.length > 0
                    ? `https://opulent-space-system-97554gv97rr43xw97-4000.app.github.dev${item.images[0]}`
                    : "https://via.placeholder.com/300"
                }
                alt={item.name}
                className="w-full h-full object-cover opacity-80"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-black">{item.name}</h3>
              <p className="text-gray-600">{item.pricePerDay} VND/ngày</p>
            </div>
          </div>
        ))}
      </div>

      {/* Điều khiển phân trang */}
      <div className="flex justify-center gap-4 mt-6">
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(1)}
          className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 disabled:bg-gray-400"
        >
          Trang đầu
        </button>
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 disabled:bg-gray-400"
        >
          Trang trước
        </button>
        <p>
          Trang {currentPage} / {totalPages}
        </p>
        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
          className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 disabled:bg-gray-400"
        >
          Trang sau
        </button>
        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(totalPages)}
          className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 disabled:bg-gray-400"
        >
          Trang cuối
        </button>
      </div>
    </div>
  );
}
