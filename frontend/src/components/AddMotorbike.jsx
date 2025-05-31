import { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";

const ADD_MOTORBIKE = gql`
  mutation CreateMotorbike($input: MotorbikeInput!, $files: [Upload]) {
    createMotorbike(input: $input, files: $files) {
      _id
      stt
      name
      pricePerDay
      quantity
      images
    }
  }
`;

export default function AddMotorbike() {
  const [stt, setStt] = useState("");
  const [name, setName] = useState("");
  const [pricePerDay, setPricePerDay] = useState("");
  const [quantity, setQuantity] = useState("");
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [addMotorbike] = useMutation(ADD_MOTORBIKE, {
    context: {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    },
  });

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addMotorbike({
        variables: {
          input: {
            stt: parseInt(stt),
            name,
            pricePerDay: parseFloat(pricePerDay),
            quantity: parseInt(quantity),
          },
          files: files.length > 0 ? files : null,
        },
      });
      navigate("/motorbikes");
    } catch (error) {
      console.error("Lỗi khi thêm motorbike:", error);
      alert("Thêm motorbike thất bại!");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow-md rounded-lg border border-gray-200">
      <h2 className="text-2xl font-bold text-center mb-4 text-gray-900">
        Thêm Motorbike
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="number"
          className="border p-3 w-full rounded-md focus:ring-2 focus:ring-blue-400"
          value={stt}
          onChange={(e) => setStt(e.target.value)}
          placeholder="STT"
          required
        />
        <input
          type="text"
          className="border p-3 w-full rounded-md focus:ring-2 focus:ring-blue-400"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Tên motorbike"
          required
        />
        <input
          type="number"
          className="border p-3 w-full rounded-md focus:ring-2 focus:ring-blue-400"
          value={pricePerDay}
          onChange={(e) => setPricePerDay(e.target.value)}
          placeholder="Giá mỗi ngày (VND)"
          required
        />
        <input
          type="number"
          className="border p-3 w-full rounded-md focus:ring-2 focus:ring-blue-400"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Số lượng"
          required
        />
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="border p-3 w-full rounded-md"
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
