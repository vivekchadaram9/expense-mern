import {
  Box,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Button,
  Typography,
} from "@mui/material";
import "./styles.css";
import AddReportFunction from "./Container";


export default function AddReport(props) {
  const { reportTypes, stateObject, handleChange, handleSubmit,isUpdate } = AddReportFunction(props)
  return (
    <div className="main-container">
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          maxWidth: 400,
          mx: "auto",
          p: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography variant="h6" textAlign="center">
          {isUpdate ? "Update" : "Add"} Report
        </Typography>

        <TextField
          label="Report Name"
          name="report_name"
          value={stateObject?.report_name}
          onChange={(e) => handleChange(e.target.value, "report_name")}
          required
        />

        <TextField
          label="Report Description"
          name="report_description"
          value={stateObject?.report_description}
          onChange={(e) => handleChange(e.target.value, "report_description")}
          multiline
          required
        />
        <FormControl fullWidth required>
          <InputLabel>Advance Taken</InputLabel>
          <Select
            name="advance_taken"
            value={stateObject?.advance_taken}
            onChange={(e) => handleChange(e.target.value, "advance_taken")}
            label="Advance Taken"
          >
            <MenuItem disabled value="">
              <em>Select</em>
            </MenuItem>
            <MenuItem value={true}>
              <em>Yes</em>
            </MenuItem>
            <MenuItem value={false}>
              <em>No</em>
            </MenuItem>
          </Select>
        </FormControl>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <FormControl required sx={{ width: "45%" }}>
            <InputLabel>Report Type</InputLabel>
            <Select
              name="report_type"
              value={stateObject?.report_type?.type}
              onChange={(e) => handleChange(e.target.value, "report_type")}
              label="Report Type"
            >
              <MenuItem disabled value="">
                <em>Select</em>
              </MenuItem>
              {reportTypes?.map((cat) => (
                <MenuItem key={cat?._id} value={cat}>
                  {cat?.type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl required sx={{ width: "45%" }}>
            <InputLabel>Cost Charging</InputLabel>
            <Select
              name="cost_charging"
              value={stateObject?.cost_charging || ""}
              onChange={(e) => handleChange(e.target.value, "cost_charging")}
              label="Cost Charging"
            >
              <MenuItem disabled value="">
                <em>Select</em>
              </MenuItem>
              <MenuItem value={"Cost Center"}>
                <em>Cost Center</em>
              </MenuItem>
              <MenuItem value={"WBS"}>
                <em>WBS</em>
              </MenuItem>
            </Select>
          </FormControl>
        </div>

        <Button type="submit" variant="contained" fullWidth>
          {isUpdate ? "Update" : "Save"}
        </Button>
      </Box>
    </div>
  );
}
