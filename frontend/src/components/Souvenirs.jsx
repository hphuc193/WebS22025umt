import { useQuery, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const GET_SOUVENIRS = gql`
  query GetSouvenirs {
    souvenirs {
      _id
      name
    }
  }
`;

export default function Souvenirs() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const { loading, error, data } = useQuery(GET_SOUVENIRS, {
    context: {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    },
  });

  if (loading) return <p className="text-center text-xl">Đang tải...</p>;
  if (error)
    return <p className="text-center text-red-500">Lỗi: {error.message}</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-900">
        Danh sách Souvenirs
      </h2>

      <div className="flex justify-end mb-4">
        <Button
          onClick={() => navigate("/souvenir/new")}
          className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700"
        >
          + Thêm mới
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.souvenirs.map((item) => (
          <Card
            key={item._id}
            className="relative overflow-hidden shadow-lg hover:shadow-xl transition cursor-pointer bg-white border-2 border-black"
            onClick={() => navigate(`/souvenir/${item._id}`)}
          >
            {/* Hình ảnh */}
            <AspectRatio ratio={16 / 9}>
              <img
                src="https://via.placeholder.com/300"
                alt="Souvenir"
                className="w-full h-full object-cover opacity-80"
              />
            </AspectRatio>

            {/* Thông tin sản phẩm */}
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold text-black">{item.name}</h3>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
