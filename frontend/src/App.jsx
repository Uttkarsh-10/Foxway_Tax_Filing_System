import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Individual from "./pages/Individual";
import Corporate from "./pages/Corporate";
import Records from "./pages/Records";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/individual" element={<Individual />} />
        <Route path="/corporate" element={<Corporate />} />
        <Route path="/records" element={<Records />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;