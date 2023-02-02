import React, { useState } from "react";
import { Button } from "@mui/material";

const FileInput = ({ multiple }: { multiple?: boolean }) => {
  const [files, setFiles] = useState<FileList | null>(null);

  return (
    <Button
      variant="contained"
      component="label">
      {files === null
        ? "Upload File"
        : files.length > 1
        ? `${files.length} Files`
        : `${files.item(0)?.name}`}
      <input
        type="file"
        hidden
        multiple={multiple ?? false}
        onChange={(e) => {
          setFiles(e.target.files);
        }}
      />
    </Button>
  );
};

export default FileInput;
