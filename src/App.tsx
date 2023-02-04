import React, { useState } from "react";
import "./App.css";
import { FileUpload } from "./Components/FileInput";

function App() {
  return (
    <>
      <FileUpload
        width={"200px"}
        accept={["*.png", "*.jpeg"]}
        onChange={(e) => {
          console.log(e.target.files);
        }}
      />
    </>
  );
}

export default App;
