import React, { useState, useEffect , useRef } from "react";
import Box from '@mui/material/Box';
import { GlobalStyles } from '@mui/material';
import Navbar from "../components/navbar/Navbar";
import ReactFileReader from 'react-file-reader';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from "axios";
import Modal from "@mui/material/Modal";
import Swal from 'sweetalert2';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import * as XLSX from 'xlsx';

export default function SmartSus_upload_sus_vendor_confirm({ onSearch }) {
  const [isNavbarOpen, setIsNavbarOpen] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [distinctDataMonitorTable, setdistinctDataMonitorTable] = useState([]);

  const Custom_Progress = () => (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
    <div className="loader"></div>
    <div style={{ marginTop: 16, fontSize: 18, fontWeight: 'bold', color: '#3498db' }}>Loading Data...</div>
      <style jsx>{`
        .loader {
          border: 8px solid #f3f3f3;
          border-top: 8px solid #3498db;
          border-radius: 50%;
          width: 50px;
          height: 50px;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );

  const fetchDataMonitorTable = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`http://10.17.100.115:3001/api/smart_planning/filter-monitoring-table-update-data`);
      const data  = response.data;
      setdistinctDataMonitorTable(data);
    } catch (error) {
      console.error(`Error fetching distinct data SUS Delivery order: ${error}`);
    } finally {
      setIsLoading(false); 
    }
  };

  useEffect(() => {
    fetchDataMonitorTable();
  }, []);

  const handleNavbarToggle = (openStatus) => {
      setIsNavbarOpen(openStatus);
  };
  
  return (
    <>
      <Navbar onToggle={handleNavbarToggle}/>
      <Box marginLeft={isNavbarOpen ? "220px" : 3} marginTop={10}>
        <Box sx={{height: 80 , marginTop: '10px' , marginLeft: '60px'}}>
          <div style={{height: 780, width:1800 , marginRight: 25, fontSize: 14, overflow: 'auto',}}>
            {isLoading ? (
                <Custom_Progress />
            ) : (
                <table style={{width: 1900, borderCollapse: 'collapse', marginTop: 10, }}>
                  <thead style={{fontSize: 15, fontWeight: 'bold', position: 'sticky', top: 0, zIndex: 1, }}>
                    <tr>
                      <th
                          style={{
                          textAlign: "center",
                          backgroundColor: "#AED2FF",
                          height: "40px",
                          width: "15px",
                          border: 'solid black 1px'
                          }}
                      >
                          No.
                      </th>
                      <th
                          style={{
                          textAlign: "center",
                          backgroundColor: "#AED2FF",
                          width: "60px",
                          border: 'solid black 1px'
                          }}
                      >
                          PY Name
                      </th>
                      <th
                          style={{
                          textAlign: "center",
                          backgroundColor: "#AED2FF",
                          width: "60px",
                          border: 'solid black 1px'
                          }}
                      >
                          Schema
                      </th>
                      <th
                          style={{
                          textAlign: "center",
                          backgroundColor: "#AED2FF",
                          width: "60px",
                          border: 'solid black 1px'
                          }}
                      >
                          Table Name
                      </th>
                      <th
                          style={{
                          textAlign: "center",
                          backgroundColor: "#AED2FF",
                          width: "70px",
                          border: 'solid black 1px'
                          }}
                      >
                          Status Date
                      </th>
                      <th
                          style={{
                          textAlign: "center",
                          backgroundColor: "#AED2FF",
                          width: "70px",
                          border: 'solid black 1px'
                          }}
                      >
                          Curr. Check
                      </th>
                      <th
                          style={{
                          textAlign: "center",
                          backgroundColor: "#AED2FF",
                          width: "70px",
                          border: 'solid black 1px'
                          }}
                      >
                          Min ID
                      </th>
                      <th
                          style={{
                          textAlign: "center",
                          backgroundColor: "#AED2FF",
                          width: "70px",
                          border: 'solid black 1px'
                          }}
                      >
                          Max ID
                      </th>
                      <th
                          style={{
                          textAlign: "center",
                          backgroundColor: "#AED2FF",
                          width: "120px",
                          border: 'solid black 1px'
                          }}
                      >
                          Min DateTime
                      </th>
                      <th
                          style={{
                          textAlign: "center",
                          backgroundColor: "#AED2FF",
                          width: "120px",
                          border: 'solid black 1px'
                          }}
                      >
                          Max DateTime
                      </th>
                      <th
                          style={{
                          textAlign: "center",
                          backgroundColor: "#AED2FF",
                          width: "70px",
                          border: 'solid black 1px'
                          }}
                      >
                          Run Time
                      </th>
                    </tr>
                  </thead>
                  <tbody style={{ fontSize: 14, textAlign: 'center' }}>
                    {distinctDataMonitorTable.map((item, index) => (
                      <tr key={index}>
                        <td style={{
                                    border: 'solid black 1px',
                                    textAlign: 'center',
                                    height: "30px",
                                  }}
                        >
                          {item.sort_no}
                        </td>
                        <td style={{
                                    border: 'solid black 1px',
                                    textAlign: 'left',
                                    height: "30px",
                                    paddingLeft: '10px',
                                  }}
                        >
                          {item.py_name}
                        </td>
                        <td style={{
                                    border: 'solid black 1px',
                                    textAlign: 'center',
                                    height: "30px",
                                  }}
                        >
                          {item.sch_name}
                        </td>
                        <td style={{
                                    border: 'solid black 1px',
                                    textAlign: 'left',
                                    height: "30px",
                                    paddingLeft: '10px',
                                  }}
                        >
                          {item.table_name}
                        </td>
                        <td style={{
                                    border: 'solid black 1px',
                                    textAlign: 'center',
                                    height: "30px",
                                    backgroundColor: item.status_date === "NORMAL" ? "#00FF9C" : 
                                                     item.status_date === "NORMAL ***" ? "#FFD586" : "red",
                                    color: item.status_date === "ABNORMAL" ? "white" : "black"
                                  }}
                        >
                          {item.status_date}
                        </td>
                        <td style={{
                                    border: 'solid black 1px',
                                    textAlign: 'center',
                                    height: "30px",
                                    backgroundColor: item.curr_check === "NORMAL" ? "#00FF9C" : 
                                                     item.curr_check === "NORMAL ***" ? "#FFD586" : "red",
                                    color: item.curr_check === "ABNORMAL" ? "white" : "black"
                                  }}
                        >
                          {item.curr_check}
                        </td>
                        <td style={{
                                    border: 'solid black 1px',
                                    textAlign: 'left',
                                    height: "30px",
                                    paddingLeft: '10px',
                                    // color: Number(item.min_id).toLocaleString() > 1 ? "red" : "black"
                                  }}
                        >
                          {Number(item.min_id).toLocaleString()}
                        </td>
                        <td style={{
                                    border: 'solid black 1px',
                                    textAlign: 'left',
                                    height: "30px",
                                    paddingLeft: '10px',
                                    // color: Number(item.max_id).toLocaleString() > 1 ? "red" : "black"
                                  }}
                        >
                          {Number(item.max_id).toLocaleString()}
                        </td>
                        <td style={{
                                    border: 'solid black 1px',
                                    textAlign: 'center',
                                    height: "30px",
                                  }}
                        >
                          {item.min_update_datetime}
                        </td>
                        <td style={{
                                    border: 'solid black 1px',
                                    textAlign: 'center',
                                    height: "30px",
                                  }}
                        >
                          {item.max_update_datetime}
                        </td>
                        <td style={{
                                    border: 'solid black 1px',
                                    textAlign: 'center',
                                    height: "30px",
                                  }}
                        >
                          {item.run_time}
                        </td>
                      </tr>
                    ))}
                  </tbody>
              </table>
            )}
          </div>
        </Box>
      </Box>
    </>
  );
}