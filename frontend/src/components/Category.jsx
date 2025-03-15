import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { CATEGORY_QUERY } from "../graphql/categories.js";

const Category = () => {
  const { id } = useParams(); // Lấy ID từ URL
  const { data, loading, error } = useQuery(CATEGORY_QUERY, {
    variables: { id }, // Truyền ID vào truy vấn
  });

  console.log("Fetched Data:", data); // Debug API

  if (loading) return <p className="text-gray-500">Loading...</p>;
  if (error) return <pre className="text-red-500">{error.message}</pre>;
  if (!data || !data.category) return <p className="text-gray-600">Không tìm thấy danh mục.</p>;

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800">{data.category.name}</h2>
      <p className="text-gray-600">ID: {data.category._id}</p>
    </div>
  );
};

export default Category;