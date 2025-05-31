import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

const Upload = () => {
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setImage(URL.createObjectURL(selectedFile));
    }
  };

  const handleUploadImage = async () => {
    const formData = new FormData();
    formData.append(
      "operations",
      JSON.stringify({
        query: `mutation Upload($file: File!) { upload(file: $file) }`,
        variables: { file: null },
      })
    );
    formData.append("map", JSON.stringify({ 0: ["variables.file"] }));
    formData.append("0", file);

    try {
      const response = await fetch("http://localhost:4000/graphql", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
      });
      const result = await response.json();
      console.log(result);
    } catch (err) {
      console.error("Upload error:", err);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <Card className="w-full max-w-md p-4 flex flex-col items-center">
        <CardContent className="w-full flex flex-col items-center gap-4">
          <Label htmlFor="image-upload" className="block mb-2">
            Chọn ảnh:
          </Label>
          <Input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
          {image && (
            <div className="mt-4 flex flex-col items-center gap-2">
              <img
                src={image}
                alt="Preview"
                className="w-32 h-32 object-cover rounded-lg border"
              />
              <Button variant="outline" size="sm" onClick={handleUploadImage}>
                Upload
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Upload;
