import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import useImage from "use-image";

const FileInput = ({ multiple }: { multiple?: boolean }) => {
  const [files, setFiles] = useState<FileList | null>(null);
  const [imgURL, setImgURL] = useState<string>("");
  const [img] = useImage(imgURL);

  const handleFilesChange = (files: FileList | null) => {
    if (files !== null) {
      // Update chosen files
      setFiles(files);
    }
  };

  const uploadFiles = async () => {
    if (files === null || files === undefined) {
      return;
    }

    const fileList: FileList = files;
    const item0 = fileList.item(0);
    if (item0 === null) {
      return;
    }

    let reader = new FileReader();
    reader.onload = (e) => {
      //Set the blueprint of the focused level overlay to the uploaded image
      const image = e.target?.result?.toString() ?? "";
      setImgURL(image);
      console.log(image);
    };
    reader.readAsDataURL(new Blob([item0], { type: item0.type }));
  };

  return (
    <>
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
            handleFilesChange(e.target.files);
          }}
          accept={"image/*"}
        />
      </Button>
      <Button
        onClick={(e) => {
          uploadFiles();
        }}>
        Upload Files
      </Button>
      <Box
        component="img"
        sx={{
          height: 233,
          width: 350,
          maxHeight: { xs: 233, md: 167 },
          maxWidth: { xs: 350, md: 250 },
        }}
        alt="The house from the offer."
        src={imgURL}
      />
    </>
  );
};

export default FileInput;
