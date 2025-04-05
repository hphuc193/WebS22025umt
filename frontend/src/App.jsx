import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Souvenirs from "./components/Souvenirs";
import Souvenir from "./components/Souvenir";
import AddSouvenir from "./components/AddSouvenir";
import NoPage from "./pages/NoPage";
import ManageSouvenir from "./components/ManageSouvenir";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/souvenirs" element={<Souvenirs />} />
        <Route path="/souvenir/:id" element={<Souvenir />} />
        <Route path="/souvenir/new" element={<AddSouvenir />} />
        <Route path="/manage-souvenir/:id" element={<ManageSouvenir />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
