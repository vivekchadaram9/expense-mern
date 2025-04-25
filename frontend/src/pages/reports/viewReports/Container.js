import { useEffect, useState } from "react"
import { deleteReportByReportId, getReportsByUserId } from "./Services"
import { useNavigate } from "react-router-dom";

//dummy userId for now
const userId = "6807334dbfd0fbf0f7900b2a";

const ReportsFunc = () => {
  const [reports,setReports] = useState([{}])
  const [tableHeader,setTableHeader] = useState([])
  const navigate = useNavigate()
  const getAllReports = () =>{
    getReportsByUserId(userId,(res)=>{setReports(res?.data)
      if(res?.data?.length > 0 ){
        setTableHeader(Object.keys(res?.data?.[0]));
      }
    },(err)=>console.log(err))
  }
  useEffect(()=>{
    getAllReports()
  },[])

  const editReport = (report) =>{
    navigate('/update-report',{state : {report}})
  }

  const deleteReport = (id) =>{
    deleteReportByReportId(
      id,
      (res) => getAllReports(),
      (err) => console.log(err)
    );
  }

  return { reports,editReport,deleteReport,tableHeader };
}

export default ReportsFunc