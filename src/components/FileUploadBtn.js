import { Button, CircularProgress, Box } from "@mui/material";
import { useRef, useState } from "react";
// import {Box}
const FileUploadButton = ({ onFileSelect }) => {
  // Create a ref for the file input element
  //   const fileInputRef = useRef(null);
  //   const inputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const handleClick = () => {
    // 👇️ open file input box on click of another element
    inputRef.current.click();
  };
  const inputRef = useRef(null);
  const handleFileChange = async (event) => {
    const fileObj = event.target.files && event.target.files[0];
    setIsLoading(true);
    if (!fileObj) {
      return;
    }
    const formData = new FormData();
    formData.append("file", fileObj);
    try {
      const response = await fetch("http://localhost:3000/api/v1/jobs/upload", {
        method: "POST",
        body: formData,
      });
      console.log(response);
      //   toast("csv is successfully uploaded");
      console.log("done and running");
      // setIsLoading();
      //   setIsLoading(false);
    } catch (error) {
      //   toast("error occur");
      console.log(error.message);
    }
  };
  return (
    <div>
      {/* Hidden file input element */}

      {/* Render the Material-UI Button */}
      <Box>
        {" "}
        <input
          style={{ display: "none" }}
          ref={inputRef}
          type="file"
          onChange={handleFileChange}
        />
        {isLoading ? (
          <Button disabled varitant="outlined">
            <CircularProgress />
          </Button>
        ) : (
          <Button onClick={handleClick} variant="contained" className="btn">
            upload csv
          </Button>
        )}
      </Box>
    </div>
  );
};

export default FileUploadButton;
