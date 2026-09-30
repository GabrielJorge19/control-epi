import { HashRouter, Route, Routes } from "react-router-dom";
import { ToastProvider } from "./components/ToastProvider";
import { GuiaDeUsoPage } from "./pages/GuiaDeUsoPage";
import { PreencherPage } from "./pages/PreencherPage";
import { ToolPage } from "./pages/ToolPage";
import { SobrePage } from "./pages/SobrePage";
import Layout from "./ui/layout";

export default function App() {
  return (
    <HashRouter>
      <ToastProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<GuiaDeUsoPage />} />
            <Route path="tool" element={<ToolPage />} />
            <Route path="preencher" element={<PreencherPage />} />
            <Route path="sobre" element={<SobrePage />} />
          </Route>
        </Routes>
      </ToastProvider>
    </HashRouter>
  );
}
