import React, { useState } from "react";
import { PageStyle } from "../../components/PageStyle";
import { Box, Button, Typography } from "@mui/material";
import imageOne from "../../assets/Upload.gif";
import imageTwo from "../../assets/Fill out.gif";
import AddSingleForm from "../../components/AddSingleForm";
import { Link } from "react-router-dom";
import FileUploadButton from "../../components/FileUploadBtn";
export default function AddCustomer() {
  const [isAddSingleOpen, setIsAddSingleOpen] = useState(false);
  if (isAddSingleOpen) {
    return <AddSingleForm />;
  }
  return (
    <PageStyle>
      <Box sx={{ display: "flex", flexDirection: { sm: "column", md: "row" } }}>
        <Box
          sx={{
            display: "flex",
            width: { md: "100%", sm: "50%" },
            flexDirection: "column",
          }}
        >
          <Box
            component="img"
            src={imageOne}
            alt="ffff"
            sx={{ height: "90%", margin: "auto" }}
            loop={true}
          ></Box>
          {/* <Typography textAlign="center">upload csv</Typography> */}
          {/* <Button variant="contained" sx={{ margin: "auto" }}>
            upload csv
          </Button> */}
          <Box sx={{ margin: "auto" }}>
            <FileUploadButton />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            width: { md: "50%", sm: "100%" },
            flexDirection: "column",
          }}
        >
          <Box
            component="img"
            src={imageTwo}
            alt="ffff"
            sx={{ height: "90%", margin: "auto" }}
            loop={true}
          ></Box>
          <Button
            variant="contained"
            sx={{ margin: "auto" }}
            // onClick={() => setIsAddSingleOpen(true)}
            component={Link}
            to="/dashboard/add-single-customer"
          >
            Add customer
          </Button>
        </Box>
      </Box>
    </PageStyle>
  );
}
