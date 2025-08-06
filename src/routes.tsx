import { Routes, Route } from "react-router-dom";

import Products from "@/pages/products/Table";
import AppLayout from "./layouts/AppLayout";
import Form from "./pages/products/Form";
import NotFound from "./pages/not-found";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route path="" element={<Products />} />
        <Route path="products">
          <Route path="" element={<Products />} />
          <Route path="new" element={<Form edit={false} />} />
          <Route path=":id" element={<Form edit />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
