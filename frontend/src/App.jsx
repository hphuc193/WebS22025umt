import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Categories from "./components/Categories";
import Category from "./components/Category";
import NoPage from "./pages/NoPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Categories />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/category/:id" element={<Category />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;