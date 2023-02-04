import React from "react";
import { CloudUpload } from "@mui/icons-material";
import { InputLabel, Typography } from "@mui/material";
import { Box } from "@mui/system";

export type FileUploadProps = {
  imageButton?: boolean;
  accept: string[];
  hoverLabel?: string;
  dropLabel?: string;
  width?: string;
  height?: string;
  backgroundColor?: string;
  image?: {
    url: string;
    imageStyle?: {
      width?: string;
      height?: string;
    };
  };
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onDrop?: (event: React.DragEvent<HTMLElement>) => void;
};

export const FileUpload: React.FC<FileUploadProps> = ({
  accept,
  imageButton = true,
  hoverLabel = "Click or drag to upload file",
  dropLabel = "Drop file here",
  width = "600px",
  height = "100px",
  backgroundColor = "#fff",
  image: {
    url = "",
    imageStyle = {
      height: "inherit",
    },
  } = {},
  onChange,
  onDrop,
}) => {
  const [imageUrl, setImageUrl] = React.useState(url);
  const [labelText, setLabelText] = React.useState<string>(hoverLabel);
  const [isDragOver, setIsDragOver] = React.useState<boolean>(false);
  const [isMouseOver, setIsMouseOver] = React.useState<boolean>(false);
  const stopDefaults = (e: React.DragEvent) => {
    e.stopPropagation();
    e.preventDefault();
  };
  const dragEvents = {
    onMouseEnter: () => {
      setIsMouseOver(true);
    },
    onMouseLeave: () => {
      setIsMouseOver(false);
    },
    onDragEnter: (e: React.DragEvent) => {
      stopDefaults(e);
      setIsDragOver(true);
      setLabelText(dropLabel);
    },
    onDragLeave: (e: React.DragEvent) => {
      stopDefaults(e);
      setIsDragOver(false);
      setLabelText(hoverLabel);
    },
    onDragOver: stopDefaults,
    onDrop: (e: React.DragEvent<HTMLElement>) => {
      stopDefaults(e);
      setLabelText(hoverLabel);
      setIsDragOver(false);
      if (imageButton && e.dataTransfer.files[0]) {
        setImageUrl(URL.createObjectURL(e.dataTransfer.files[0]));
      }
      if (onDrop) {
        onDrop(e);
      }
    },
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (imageButton && event.target.files?.length) {
      let reader = new FileReader();
      reader.onload = (e) => {
        setImageUrl(e.target?.result?.toString() ?? "");
      };
      reader.readAsDataURL(event.target.files[0]);
    }

    onChange(event);
  };

  return (
    <>
      <input
        onChange={handleChange}
        accept={accept.join(", ")}
        multiple={false}
        id="file-upload"
        type="file"
        style={{ display: "none" }}
      />

      <InputLabel
        htmlFor="file-upload"
        {...dragEvents}
        sx={[
          {
            opacity: isDragOver || isMouseOver ? 0.7 : 0.4,
            color: "black",
            border: "2px dashed gray",
            backgroundColor: "lightGray",
            width: width,
            height: height,
            borderRadius: "5px",
          },
          {
            backgroundImage: imageButton ? `url(${imageUrl})` : "",
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            backgroundPosition: "center",
          },
        ]}>
        <Box
          bgcolor={backgroundColor}
          style={{ pointerEvents: "none" }}>
          {(imageUrl === "" || isDragOver || isMouseOver) && (
            <>
              <Box
                height={height}
                width={width}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  alignItems: "center",
                  position: "absolute",
                }}>
                <CloudUpload fontSize="large" />
                <Typography>{labelText}</Typography>
              </Box>
            </>
          )}
        </Box>
      </InputLabel>
    </>
  );
};
