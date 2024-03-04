import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateBook from "./pages/CreateBook";
import EditBook from "./pages/EditBook";
import ShowBook from "./pages/ShowBook";
import DeleteBook from "./pages/DeleteBook";


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create" element={<CreateBook />} />
      <Route path="/edit/:id" element={<EditBook />} />
      <Route path="/show/:id" element={<ShowBook />} />
      <Route path="/delete/:id" element={<DeleteBook />} />
    </Routes>
   
  );
}


export default App;