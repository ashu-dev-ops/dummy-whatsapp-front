import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  Grid,
  InputBase,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { PageStyle } from "./PageStyle";
import { Calendar } from "primereact/calendar";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import SelectCountry from "react-select-country-list";
import PhoneInput from "react-phone-input-2";
import axios from "axios";

// import "react-phone-input-2/lib/style.css";

export default function AddSingleForm() {
  const [btnActive, setBtnActive] = useState(false);
  const [dob, setDob] = useState(null);
  const [value, setValue] = useState(null);
  const [gender, setGender] = React.useState("");

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };
  const [Professvalue, setProfessValue] = useState(null);

  const handleAutocompleteChange = (event, newValue) => {
    setProfessValue(newValue);
    console.log("Value entered: ", Professvalue);
  };
  //   const CountryCodeInput = ({ countryCode, handleCountryCodeChange }) => {
  //     // Handler for country code change
  //     const handleSelectChange = (selectedOption) => {
  //       handleCountryCodeChange(selectedOption.value);
  //     };
  //   };
  //   const handleSelectChange = (selectedOption) => {
  //     handleCountryCodeChange(selectedOption.value);
  //   };
  //   const [countryCode, SelectCountry] = useState();
  //   const handleSelectChange = (options) => {
  //     setValue(options);
  //   };
  const [phoneNumber, setPhoneNumber] = useState(""); // State to manage the phone number
  const handlePhoneChange = async () => {
    if (phoneNumber.length === 10) {
      const { data } = await axios.post(
        "http://localhost:3000/api/v1/jobs/check-number",
        { phone: phoneNumber }
      );
      setBtnActive(data.exist);
      console.log(data);
    } else {
      setBtnActive(false);
    }
  };
  useEffect(() => {
    handlePhoneChange();
  }, [phoneNumber]);
  return (
    <PageStyle>
      <Box sx={{ display: "flex", height: "100%", width: "100%" }}>
        <Paper
          sx={{
            minHeight: "70vh",
            margin: "auto",
            width: "80%",
            // marginTop: 50,
          }}
          elevation={4}
        >
          {/* <InputBase></InputBase> */}
          <Typography variant="h5" my={2} textAlign="center">
            Add single Customer
          </Typography>
          <Grid
            container
            spacing={5}
            columnSpacing={10}
            padding={4}
            paddingTop={2}
          >
            <Grid item xs={6}>
              <TextField
                label="Name"
                // value={name}
                // onChange={handleNameChange}
                fullWidth
                variant="outlined"
                style={{ marginBottom: 16 }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                fullWidth
                variant="outlined"
                inputProps={{
                  maxLength: 10, // Specify a maximum length of 10 characters
                  pattern: "\\d*",
                }}
                style={{ marginBottom: 16 }}
                helperText={btnActive && "phone number already exsit"}
                error={btnActive}
              />
            </Grid>
            <Grid item xs={4}>
              {/* <Calendar value={dob} onChange={(e) => setDob(e.value)} /> */}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="DOB"
                  value={value}
                  onChange={(newValue) => {
                    setValue(newValue);
                    console.log(newValue.format("DD-MM-YYYY"));
                  }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={4}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Anniversary"
                  value={value}
                  onChange={(newValue) => {
                    setValue(newValue);
                    console.log(newValue.format("DD-MM-YYYY"));
                  }}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={gender}
                  label="Gender"
                  onChange={handleGenderChange}
                >
                  <MenuItem value={"male"}>male</MenuItem>
                  <MenuItem value={"female"}>female</MenuItem>
                  <MenuItem value={"other"}>other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={5}>
              <Autocomplete
                options={["engineer", "accountant", "doctor"]}
                value={value}
                onChange={handleAutocompleteChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Profession"
                    variant="outlined"
                  />
                )}
              />
            </Grid>
            <Grid item xs={4}></Grid>
          </Grid>
          <Button sx={{ mx: 5 }} variant="contained" disabled={btnActive}>
            submit
          </Button>
        </Paper>
      </Box>
    </PageStyle>
  );
}
