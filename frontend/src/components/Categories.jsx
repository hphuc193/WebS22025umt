import { useQuery } from "@apollo/client";
import { CATEGORIES_QUERY } from "../graphql/categories.js";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

function Categories() {
  const { data, loading, error } = useQuery(CATEGORIES_QUERY);

  if (loading) return <p className="text-gray-500 text-center">Loading...</p>;
  if (error) return <pre className="text-red-500 text-center">{error.message}</pre>;

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <ul className="max-w-lg w-full bg-gray-100 rounded-lg shadow-md p-6 border border-red-500">
        {data.categories.map((category) => (
          <li
            key={category._id}
            className="flex items-center justify-between p-3 border-b last:border-b-0 hover:bg-blue-50 transition duration-300"
          >
            <Link to={`/category/${category._id}`} className="text-blue-600 hover:text-blue-800 font-medium">
              {category.name}
            </Link>
            <Button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md">View</Button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
