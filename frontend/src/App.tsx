import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import HomePage from "./pages/HomePage";
import ProductCard from "./pages/ProductCard";
import { Catalog } from "./components/Catalog/Catalog";
import BagPage from "./pages/BagPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/product/:slug" element={<ProductCard />} />
          <Route path="catalog" element={<Catalog />} />
          <Route path="bag" element={<BagPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
