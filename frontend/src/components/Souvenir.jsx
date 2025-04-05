import { useQuery, gql } from "@apollo/client";
import { useParams, useNavigate } from "react-router-dom";

const GET_SOUVENIR = gql`
  query GetSouvenir($id: ID!) {
    souvenir(_id: $id) {
      _id
      name
      description
      price
    }
  }
`;

export default function Souvenir() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const { loading, error, data } = useQuery(GET_SOUVENIR, {
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
        {data.souvenir.name}
      </h2>

      <p className="text-gray-700 text-lg mb-4">{data.souvenir.description}</p>

      <p className="text-xl font-semibold text-blue-600 mb-6">
        💰 Giá: {data.souvenir.price.toLocaleString()} VND
      </p>

      <div className="flex gap-4">
        <button
          onClick={() => navigate("/souvenirs")}
          className="bg-blue-500 text-white px-6 py-3 rounded-md font-medium 
                     transition hover:bg-blue-600 focus:ring-2 focus:ring-blue-300"
        >
          ⬅ Quay lại
        </button>

        <button
          onClick={() => navigate(`/manage-souvenir/${id}`)}
          className="bg-green-500 text-white px-6 py-3 rounded-md font-medium 
                     transition hover:bg-green-600 focus:ring-2 focus:ring-green-300"
        >
          ⚙️ Quản lý sản phẩm
        </button>
      </div>
    </div>
  );
}
