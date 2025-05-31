import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Home"; // Thêm Home
import Souvenirs from "./components/Souvenirs";
import Souvenir from "./components/Souvenir";
import AddSouvenir from "./components/AddSouvenir";
import ManageSouvenir from "./components/ManageSouvenir";
import Motorbikes from "./components/Motorbikes"; // Thêm Motorbikes
import Motorbike from "./components/Motorbike"; // Thêm Motorbike
import AddMotorbike from "./components/AddMotorbike"; // Thêm AddMotorbike
import ManageMotorbike from "./components/ManageMotorbike"; // Thêm ManageMotorbike
import NoPage from "./pages/NoPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} /> {/* Trang chọn danh sách */}
        <Route path="/souvenirs" element={<Souvenirs />} />
        <Route path="/souvenir/:id" element={<Souvenir />} />
        <Route path="/souvenir/new" element={<AddSouvenir />} />
        <Route path="/manage-souvenir/:id" element={<ManageSouvenir />} />
        <Route path="/motorbikes" element={<Motorbikes />} />
        <Route path="/motorbike/:id" element={<Motorbike />} />
        <Route path="/motorbike/new" element={<AddMotorbike />} />
        <Route path="/manage-motorbike/:id" element={<ManageMotorbike />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
