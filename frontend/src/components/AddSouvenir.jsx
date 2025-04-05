import { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";

const ADD_SOUVENIR = gql`
  mutation CreateSouvenir($input: SouvenirInput!) {
    createSouvenir(input: $input) {
      _id
      name
      description
      price
    }
  }
`;

export default function AddSouvenir() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const navigate = useNavigate();

  // Lấy token từ localStorage
  const token = localStorage.getItem("token");

  // Gửi request với token trong headers
  const [addSouvenir] = useMutation(ADD_SOUVENIR, {
    context: {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addSouvenir({
        variables: {
          input: {
            name,
            description,
            price: parseFloat(price),
          },
        },
      });
      navigate("/souvenirs");
    } catch (error) {
      console.error("Lỗi khi thêm souvenir:", error);
      alert("Thêm souvenir thất bại!");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow-md rounded-lg border border-gray-200">
      <h2 className="text-2xl font-bold text-center mb-4 text-gray-900">Thêm Souvenir</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          className="border p-3 w-full rounded-md focus:ring-2 focus:ring-blue-400"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Tên souvenir"
          required
        />
        <textarea
          className="border p-3 w-full rounded-md focus:ring-2 focus:ring-blue-400"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Mô tả"
          rows="3"
          required
        />
        <input
          type="number"
          className="border p-3 w-full rounded-md focus:ring-2 focus:ring-blue-400"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Giá (VND)"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-3 rounded-md font-medium w-full transition hover:bg-blue-600"
        >
          Thêm
        </button>
      </form>
    </div>
  );
}
