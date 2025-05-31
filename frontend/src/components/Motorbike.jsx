import { useQuery, gql } from "@apollo/client";
import { useParams, useNavigate } from "react-router-dom";

const GET_MOTORBIKE = gql`
  query GetMotorbike($id: ID!) {
    motorbike(_id: $id) {
      _id
      stt
      name
      pricePerDay
      quantity
      images
    }
  }
`;

export default function Motorbike() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const { loading, error, data } = useQuery(GET_MOTORBIKE, {
    variables: { id },
    context: {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    },
  });

  if (loading)
    return <p className="text-center text-lg text-gray-700">Đang tải...</p>;
  if (error)
    return <p className="text-center text-red-500">Lỗi: {error.message}</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white shadow-lg rounded-lg border border-gray-200">
      <h2 className="text-3xl font-bold mb-4 text-gray-900">
        {data.motorbike.name}
      </h2>

      <p className="text-gray-700 text-lg mb-4">STT: {data.motorbike.stt}</p>
      <p className="text-xl font-semibold text-blue-600 mb-4">
        Giá mỗi ngày: {data.motorbike.pricePerDay.toLocaleString()} VND
      </p>
      <p className="text-gray-700 text-lg mb-6">
        Số lượng: {data.motorbike.quantity}
      </p>

      {data.motorbike.images && data.motorbike.images.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {data.motorbike.images.map((image, index) => (
            <img
              key={index}
              src={`https://opulent-space-system-97554gv97rr43xw97-4000.app.github.dev${image}`}
              alt={`${data.motorbike.name} - ${index + 1}`}
              className="w-full h-auto rounded-md shadow-md"
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 mb-6">Chưa có ảnh cho sản phẩm này.</p>
      )}

      <div className="flex gap-4">
        <button
          onClick={() => navigate("/motorbikes")}
          className="bg-blue-500 text-white px-6 py-3 rounded-md font-medium transition hover:bg-blue-600"
        >
          ⬅ Quay lại
        </button>

        {(role === "admin" || role === "manager") && (
          <button
            onClick={() => navigate(`/manage-motorbike/${id}`)}
            className="bg-green-500 text-white px-6 py-3 rounded-md font-medium transition hover:bg-green-600"
          >
            ⚙️ Quản lý sản phẩm
          </button>
        )}
      </div>
    </div>
  );
}
