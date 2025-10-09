import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";

export default function App() {
  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}
