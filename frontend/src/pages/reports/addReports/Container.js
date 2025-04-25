import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAllReportTypes, saveNewReport, updateReport } from "./Services";

const defaultStateObject = {
  report_name: "",
  report_description: "",
  advance_taken: "",
  report_type: {},
  cost_charging: "",
  charging: "Default",
  user_id: "6807334dbfd0fbf0f7900b2a", //need to add this dynamically after user logs in
  status: "not submitted",
};

const AddReportFunction = (props) => {
  const location = useLocation();
  const report = location.state?.report;
 const [isUpdate,setIsUpdate] = useState(false)
  const [reportTypes, setReportTypes] = useState([]);
  const [stateObject, setStateObject] = useState(defaultStateObject);
  const navigate = useNavigate();

  useEffect(() => {
    fetchReportTypes();
    if(report){
      setIsUpdate(true)
      setStateObject(report)
    }
  }, []);

  const fetchReportTypes = () => {
    getAllReportTypes(
      (response) => setReportTypes(response),
      (error) => console.error(error)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(isUpdate){
      updateReport(
        stateObject?._id,
        stateObject,
        (res) => console.log(res),
        (error) => console.error(error)
      );
    }else{
      saveNewReport(
      stateObject,
      (res) => console.log(res),
      (error) => console.error(error)
    );
    }
    window.history.replaceState({}, document.title);
    navigate("/reports");
  };

  const handleChange = (value, field) => {
    setStateObject((prev) => ({ ...prev, [field]: value }));
  };

  return { reportTypes, stateObject, handleChange, handleSubmit, isUpdate };
};

export default AddReportFunction;
