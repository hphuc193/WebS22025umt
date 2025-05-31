import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="p-6 max-w-md mx-auto text-center">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Chọn danh sách</h2>
      <div className="flex flex-col gap-4">
        <button
          onClick={() => navigate("/souvenirs")}
          className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600"
        >
          Souvenirs
        </button>
        <button
          onClick={() => navigate("/motorbikes")}
          className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600"
        >
          Motorbikes
        </button>
      </div>
    </div>
  );
}
