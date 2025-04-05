import { useQuery, useMutation, gql } from "@apollo/client";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

// Truy vấn lấy thông tin sản phẩm
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

// Mutation cập nhật sản phẩm
const UPDATE_SOUVENIR = gql`
  mutation UpdateSouvenir($id: ID!, $input: SouvenirInput!) {
    updateSouvenir(_id: $id, input: $input) {
      _id
      name
      description
      price
    }
  }
`;

// Mutation xóa sản phẩm
const DELETE_SOUVENIR = gql`
  mutation DeleteSouvenir($id: ID!) {
    deleteSouvenir(_id: $id) {
      success
      message
    }
  }
`;

export default function ManageSouvenir() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // State để lưu thông tin sản phẩm
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
  });

  // Lấy dữ liệu sản phẩm
  const { data, loading, error } = useQuery(GET_SOUVENIR, {
    variables: { id },
    context: { headers: { Authorization: token ? `Bearer ${token}` : "" } },
  });

  // Điền dữ liệu vào form khi tải xong
  useEffect(() => {
    if (data && data.souvenir) {
      setFormData({
        name: data.souvenir.name,
        description: data.souvenir.description,
        price: data.souvenir.price.toString(), // Chuyển giá thành chuỗi
      });
    }
  }, [data]);

  // Mutation cập nhật sản phẩm
  const [updateSouvenir] = useMutation(UPDATE_SOUVENIR, {
    context: { headers: { Authorization: token ? `Bearer ${token}` : "" } },
    onCompleted: () => {
      alert("Cập nhật thành công!");
      navigate("/souvenirs"); // Tự động quay về danh sách souvenirs
    },
  });

  // Mutation xóa sản phẩm
  const [deleteSouvenir] = useMutation(DELETE_SOUVENIR, {
    context: { headers: { Authorization: token ? `Bearer ${token}` : "" } },
    onCompleted: () => navigate("/souvenirs"),
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await updateSouvenir({
        variables: {
          id,
          input: { ...formData, price: parseFloat(formData.price) },
        },
      });
    } catch (error) {
      alert("Cập nhật thất bại!");
      console.error(error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      try {
        await deleteSouvenir({ variables: { id } });
        alert("Xóa thành công!");
      } catch (error) {
        alert("Xóa thất bại!");
        console.error(error);
      }
    }
  };

  if (loading)
    return <p className="text-center text-lg text-gray-700">Đang tải...</p>;
  if (error)
    return <p className="text-center text-red-500">Lỗi: {error.message}</p>;

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow-md rounded-lg border border-gray-200">
      <h2 className="text-2xl font-bold mb-4 text-gray-900">
        Quản lý sản phẩm
      </h2>

      <input
        type="text"
        name="name"
        placeholder="Tên sản phẩm"
        value={formData.name}
        onChange={handleChange}
        className="block w-full p-2 border rounded mb-2"
      />

      <textarea
        name="description"
        placeholder="Mô tả"
        value={formData.description}
        onChange={handleChange}
        className="block w-full p-2 border rounded mb-2"
      />

      <input
        type="number"
        name="price"
        placeholder="Giá"
        value={formData.price}
        onChange={handleChange}
        className="block w-full p-2 border rounded mb-4"
      />

      <div className="flex gap-4">
        <button
          onClick={handleUpdate}
          className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600"
        >
          Cập nhật
        </button>

        <button
          onClick={handleDelete}
          className="bg-red-700 text-white px-6 py-3 rounded-md hover:bg-red-800"
        >
          Xóa
        </button>

        <button
          onClick={() => navigate("/souvenirs")}
          className="bg-orange-500 text-white px-6 py-3 rounded-md hover:bg-orange-600"
        >
          Quay lại
        </button>
      </div>
    </div>
  );
}
