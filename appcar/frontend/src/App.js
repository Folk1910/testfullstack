import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./page/home";
import Add from "./page/add";
import Edit from "./page/edit";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<Add />} />
        <Route path="/edit/:id" element={<Edit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;