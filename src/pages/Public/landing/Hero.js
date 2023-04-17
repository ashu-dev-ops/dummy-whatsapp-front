import React from "react";
import { Box, Button, Typography } from "@mui/material";
import heroImg from "../../../assets/dashboard.png";
import { Link } from "react-router-dom";
import AllBustomer, { MyDataTable } from "../../../Dum";
import BasicDemo from "../../../Dum";
export default function Hero() {
  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        // backgroundColor: "red",
        width: "100%",
        marginTop: "5vh",
        flexDirection: { sm: "column", md: "row", xs: "column" },
        // bgcolor: "red",
        // flexDirection: { sm: "column", md: "row", xs: "column" },
      }}
    >
      <Box
        sx={{
          height: "100%",
          //width: 30,
          width: { xs: "100%", sm: "100%", md: "60%" },
          //   clipPath: " polygon(0 0, 90% 0, 100% 100%, 0 100%);",
          //   bgcolor: "blue",
          display: "flex",
          margin: "auto",
        }}
      >
        <Box sx={{ margin: "auto", padding: 4, width: "100%" }}>
          <Typography
            sx={{ fontWeight: "bold" }}
            color="primary.para"
          ></Typography>
          <Typography variant="h3" sx={{ fontWeight: 500 }} marginBottom={3}>
            Organic company growth with
            <Box
              component="span"
              color="#377dff"
              // borderBottom={10}
              // borderColor="primary.underline"
              marginLeft={2}
              padding={0}
              height="fitContent"
              // marginBottom={2}
              sx={{
                position: "relative",

                "&::before": {
                  content: '""',
                  position: "absolute",
                  width: "100%",
                  height: 10,
                  bgcolor: "primary.underline",
                  bottom: -2,
                  zIndex: -1,
                },
              }}
            >
              targeted leads
            </Box>
          </Typography>
          <Typography variant="h6" fontWeight="medium" color="primary.para">
            Our mission is to spread education that is easy accessible and
            everyone can learn
          </Typography>
          <Box my={5} sx={{ display: "flex", gap: 3 }}>
            <Button
              variant="outlined"
              sx={{ px: 2, py: 1 }}
              component={Link}
              to="/dashboard"
            >
              {/* Browse plans */}
              Dashboard
            </Button>
            <Button
              variant="contained"
              sx={{ px: 2, py: 1 }}
              component={Link}
              to="/auth"
            >
              log In
            </Button>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          //   padding: 10,
          width: { xs: "100%", sm: "100%", md: "65%" },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          perspective: "240px",
          // clipPath: {
          //   sm: " polygon(5% 0, 100% 0%, 100% 100%, 0 100%)",
          //   xs: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%) ",
          // },
          //   fontWeight: "bold",
        }}
      >
        <Box
          component="img"
          sx={{
            height: "60vh",
            //width: 30,
            width: "82%",
            transform: {
              md: "rotateX(360deg) rotateY(355deg)",
              sm: "rotateX(360deg) rotateY(360deg)",
            },
            transformStyle: " preserve-3d",
            //   clipPath: " polygon(0 0, 100% 0, 100% 100%, 15% 100%);",
            // bgcolor: "red",
            //flexGrow: 1,
          }}
          alt="The house from the offer."
          src={heroImg}
        ></Box>
      </Box>
      {/* <BasicDemo /> */}
    </Box>
  );
}
