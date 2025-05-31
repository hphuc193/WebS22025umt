import { useQuery, useMutation, gql } from "@apollo/client";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

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

const UPDATE_MOTORBIKE = gql`
  mutation UpdateMotorbike(
    $id: ID!
    $input: MotorbikeInput!
    $files: [Upload]
  ) {
    updateMotorbike(_id: $id, input: $input, files: $files) {
      _id
      stt
      name
      pricePerDay
      quantity
      images
    }
  }
`;

const ADD_IMAGES = gql`
  mutation AddImagesToMotorbike($id: ID!, $files: [Upload!]!) {
    addImagesToMotorbike(_id: $id, files: $files) {
      _id
      images
    }
  }
`;

const DELETE_MOTORBIKE = gql`
  mutation DeleteMotorbike($id: ID!) {
    deleteMotorbike(_id: $id) {
      success
      message
    }
  }
`;

export default function ManageMotorbike() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    stt: "",
    name: "",
    pricePerDay: "",
    quantity: "",
  });
  const [files, setFiles] = useState([]);

  const { data, loading, error } = useQuery(GET_MOTORBIKE, {
    variables: { id },
    context: { headers: { Authorization: token ? `Bearer ${token}` : "" } },
  });

  useEffect(() => {
    if (data && data.motorbike) {
      setFormData({
        stt: data.motorbike.stt.toString(),
        name: data.motorbike.name,
        pricePerDay: data.motorbike.pricePerDay.toString(),
        quantity: data.motorbike.quantity.toString(),
      });
    }
  }, [data]);

  const [updateMotorbike] = useMutation(UPDATE_MOTORBIKE, {
    context: { headers: { Authorization: token ? `Bearer ${token}` : "" } },
    onCompleted: () => {
      alert("Cập nhật thành công!");
      navigate("/motorbikes");
    },
  });

  const [addImages] = useMutation(ADD_IMAGES, {
    context: { headers: { Authorization: token ? `Bearer ${token}` : "" } },
    onCompleted: () => alert("Thêm ảnh thành công!"),
  });

  const [deleteMotorbike] = useMutation(DELETE_MOTORBIKE, {
    context: { headers: { Authorization: token ? `Bearer ${token}` : "" } },
    onCompleted: () => navigate("/motorbikes"),
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const handleUpdate = async () => {
    try {
      await updateMotorbike({
        variables: {
          id,
          input: {
            stt: parseInt(formData.stt),
            name: formData.name,
            pricePerDay: parseFloat(formData.pricePerDay),
            quantity: parseInt(formData.quantity),
          },
          files: files.length > 0 ? files : null,
        },
      });
    } catch (error) {
      alert("Cập nhật thất bại!");
      console.error(error);
    }
  };

  const handleAddImages = async () => {
    if (files.length === 0) {
      alert("Vui lòng chọn ít nhất một ảnh!");
      return;
    }
    try {
      await addImages({
        variables: { id, files },
      });
      setFiles([]);
    } catch (error) {
      alert("Thêm ảnh thất bại!");
      console.error(error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Bạn có chắc chắn muốn xóa motorbike này?")) {
      try {
        await deleteMotorbike({ variables: { id } });
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
        Quản lý Motorbike
      </h2>

      <input
        type="number"
        name="stt"
        placeholder="STT"
        value={formData.stt}
        onChange={handleChange}
        className="block w-full p-2 border rounded mb-2"
      />
      <input
        type="text"
        name="name"
        placeholder="Tên motorbike"
        value={formData.name}
        onChange={handleChange}
        className="block w-full p-2 border rounded mb-2"
      />
      <input
        type="number"
        name="pricePerDay"
        placeholder="Giá mỗi ngày"
        value={formData.pricePerDay}
        onChange={handleChange}
        className="block w-full p-2 border rounded mb-2"
      />
      <input
        type="number"
        name="quantity"
        placeholder="Số lượng"
        value={formData.quantity}
        onChange={handleChange}
        className="block w-full p-2 border rounded mb-2"
      />
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        className="block w-full p-2 border rounded mb-4"
      />

      <div className="flex gap-4 flex-wrap">
        <button
          onClick={handleUpdate}
          className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600"
        >
          Cập nhật
        </button>
        <button
          onClick={handleAddImages}
          className="bg-yellow-500 text-white px-6 py-3 rounded-md hover:bg-yellow-600"
        >
          Thêm ảnh
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-700 text-white px-6 py-3 rounded-md hover:bg-red-800"
        >
          Xóa
        </button>
        <button
          onClick={() => navigate("/motorbikes")}
          className="bg-orange-500 text-white px-6 py-3 rounded-md hover:bg-orange-600"
        >
          Quay lại
        </button>
      </div>
    </div>
  );
}
