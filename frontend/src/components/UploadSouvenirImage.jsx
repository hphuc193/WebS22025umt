// src/components/UploadSouvenirImage.jsx
import { useMutation, gql } from "@apollo/client";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

const UPLOAD_IMAGE = gql`
  mutation UploadSouvenirImage($_id: ID!, $file: File!) {
    uploadSouvenirImage(_id: $_id, file: $file) {
      _id
      images
    }
  }
`;

const GET_SOUVENIR = gql`
  query GetSouvenir($id: ID!) {
    souvenir(_id: $id) {
      _id
      name
      images
    }
  }
`;

export default function UploadSouvenirImage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [file, setFile] = useState(null);

  const [uploadImage, { loading, error }] = useMutation(UPLOAD_IMAGE, {
    refetchQueries: [{ query: GET_SOUVENIR, variables: { id } }],
    context: {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    },
  });

  const handleUpload = async () => {
    if (!file) return;
    try {
      await uploadImage({ variables: { _id: id, file } });
      setFile(null);
      navigate(`/souvenir/${id}`); // Quay lại trang chi tiết sau khi upload
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white shadow-lg rounded-lg border border-gray-200">
      <h2 className="text-3xl font-bold mb-4 text-gray-900">
        Upload ảnh cho sản phẩm
      </h2>

      <div className="mb-6">
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 
                     file:rounded-md file:border-0 file:text-sm file:font-semibold 
                     file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
      </div>

      <div className="flex gap-4">
        <button
          onClick={handleUpload}
          disabled={loading}
          className="bg-blue-500 text-white px-6 py-3 rounded-md font-medium 
                     transition hover:bg-blue-600 focus:ring-2 focus:ring-blue-300"
        >
          {loading ? "Đang tải lên..." : "Save"}
        </button>

        <button
          onClick={() => navigate(`/souvenir/${id}`)}
          className="bg-gray-500 text-white px-6 py-3 rounded-md font-medium 
                     transition hover:bg-gray-600 focus:ring-2 focus:ring-gray-300"
        >
          Hủy
        </button>
      </div>

      {error && <p className="text-red-500 mt-4">Lỗi: {error.message}</p>}
    </div>
  );
}
