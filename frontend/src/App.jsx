import React from "react";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/books" element={<Books />} />
      <Route path="/books/:id" element={<Book />} />
      <Route path="*" element={<NotFound />} />

    </Routes>
   
  );
}


export default App;