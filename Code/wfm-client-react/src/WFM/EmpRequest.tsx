import { useState,useEffect,useRef } from "react";
import { Redirect } from "react-router";
import axios from "axios";
//import Popup from 'reactjs-popup';
import Popup from '../pop';
import ReactDOM from "react-dom";
import Employee from "../Managers/Employee";



type EmpRequest={
    EmployeeID:number;
    Requestee:string;
    RequestDate:string;
    RequestMessage:string;
    WFMManager:string;
    content:string;
    handleClose:string;
}



const EmpRequest = (props:any)=>{

  
 const [isOpen, setIsOpen] = useState(false);
 const[id,Setid] = useState('');
 const [peopleData,setPeopleData] =useState([])
 //const [accepted,setaccepted]=useState("Accepted");
 const[status,setStatus]=useState('')
 const WFMmanager=localStorage.getItem("username")
 function togglePopup(event:any){
    setIsOpen(!isOpen);
    if(isOpen!==true){
 
     const empid=event.target.id;
     Setid(empid);
     
    }
   }

  async function peopleRead(){
    try{
        let response =
          await axios.get("http://localhost:8000/employee/softlocktable")
          setPeopleData(response.data)
      }
    catch(e){
        setPeopleData([])
    }
    }


    async function addEmployee() {
        try {

            const res = await axios.put("http://localhost:8000/employee/updateSoftlock",
            { employeeid: parseInt(Array[0]),status:status});  
            peopleRead();

        } 
        catch (e) {
          console.log("Error");
        }
       }

    useEffect(()=>{
        peopleRead()
    },[])

    let Array = (id).split(",");
     
 
    return (
  <div className="card" 
  style={{width: "1300px", minHeight: "700px",position: "relative", top:"50px",left:"2%" 
  ,padding: "30px", color:"darkblue"}}>

    <h4><u>Request Awaiting Approvel</u></h4>
    <table className="table">
        <thead className="table-primary">
            <tr>

                <th scope="col">Employee ID</th>
                <th scope="col"> Requestee</th>
                <th scope="col">Request Date</th>
                <th scope="col">Request Message</th>
                <th scope="col">View Details</th>

            </tr>
        </thead>
        <tbody>
                    {
                        peopleData.map((x:EmpRequest)=>{
                            console.log(EmpRequest)
                            let empid=(x.EmployeeID)+','+(x.Requestee)+','+(x.RequestMessage)
                            
                        if(WFMmanager == x.WFMManager){
                            return(
                                <tr key={x.EmployeeID}>
                                    <td>{x.EmployeeID}</td>
                                    <td>{x.Requestee}</td>
                                    <td>{x.RequestDate}</td>
                                    <td>{x.RequestMessage}</td>
                                    <td>
                                    <button type="button" className="btn btn-outline-primary" id={empid} onClick={togglePopup}>View Details</button>
                                    {
                                        isOpen && <Popup
                                        content={<>
                                          <h2 className="highlight">Soft Lock Request Confirmation</h2>
                                          <br/>
                                          <h4><p><u>Status update for Request Lock</u></p></h4>
                                          <br />
                                          <form>

                                            <div className="form-group">
                                                <label className="col-sm-2 col-form-label" ><b>Employee ID :&ensp;</b>{Array[0]}</label>
                                                                                        
                                            </div>
                                            <div className="form-group">
                                                <label className="col-sm-2 col-form-label" > <b>Requestee :&emsp;</b>{Array[1]}</label>

                                            </div>
                                            <div className="form-group ">
                                                <label className="col-form-label" > <b>Request Message :&emsp;</b>{[Array[2]]}</label>
                                            </div>
                                            <div className="form-group">
                                                <label className="col-form-label"><b>WFM Manager :&emsp;</b>{WFMmanager}</label>
                                            </div>
                                            <div className="dropdown">
                                            <label className="col-form-label"><b>Status :&emsp;&emsp;&emsp;</b></label>
                                            <select className="input-class" value={status} onChange={(e)=>setStatus(e.target.value)}required>
                                                <option value="Select a Value" >Select a Value</option>
                                                <option value="Approved">Approved</option>
                                                <option value="Rejected">Rejected</option>
                                            </select>
                                            </div>

                                          </form>
                                          <br/>
                                          <div>
                                          <button type="button" className="btn btn-danger btn-space" onClick={togglePopup}>Cancel</button>

                                          <button type="button" className="btn btn-primary btn-space" onClick={()=>{addEmployee();togglePopup(id);}}>Send Request</button>
                                          </div>
                                        </>}
                                        handleClose={togglePopup}
                                      />


                                    }
                                    

                                    </td>
                                    
    
                                </tr>
                            )
                        }
                        })
                    }
                </tbody>
    </table>
    
 </div>
    )}

export default EmpRequest