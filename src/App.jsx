import { useSelector,useDispatch } from "react-redux";
import { addTask,recDelete,taskComplete,taskUnComplete,editDataSave } from "./todoSlice";
import { useState } from "react";
const App=()=>{
  const [mytsk,setMytsk]=useState("");
  const [edBtn,setEdbtn]=useState(true);
  const [edId,setEdId]=useState("");
  const mywork=useSelector((state)=>state.todo.task);
  const dispatch=useDispatch();
  let sno=0;
  const delTask=(id)=>{
    dispatch(recDelete(id));
  }
  const taskComp=(id)=>{
    dispatch(taskComplete(id));
  }
  const taskUncomp=(id)=>{
    dispatch(taskUnComplete(id));
  }

  const dataEdit=(id,data)=>{
    setMytsk(data);
    setEdbtn(false);
    setEdId(id)
  }

  const editSave=()=>{
    dispatch(editDataSave({id:edId,work:mytsk}));
    setEdbtn(true);
    setMytsk("");
  }

  const ans=mywork.map((key)=>{
    sno++;
    return(
           <tr>
            <td> {sno} </td>
            <td>
              {key.status? <span style={{color:"red",textDecoration:"line-through"}}>{key.work}</span> : key.work}
            </td>
            <td><button onClick={()=>{delTask(key.id)}}>Delete</button></td>
            <td>
              {key.status?(
                <button onClick={()=>{taskUncomp(key.id)}}>Uncomplete</button>
              ):(
                <button onClick={()=>{taskComp(key.id)}}>Complete</button>
              )}
            </td>
            <td>
              <button onClick={()=>{dataEdit(key.id,key.work)}}>Edit</button>
            </td>
           </tr>)
  })
  return(
    <>
        <h1>To Do App</h1>
        Enter your task: <input type="text" value={mytsk} onChange={(e)=>{setMytsk(e.target.value)}} />
        {edBtn?(
           <button onClick={()=>{dispatch(addTask({id:Date.now(),work:mytsk,status:false}))}}>Add</button>
        ):(
          <button onClick={editSave}>Edit Save</button>
        )}
        <hr size="4" color="red" />
        <table width="600px" border="1">
          <thead>
            <tr>
              <th>sno</th>
              <th>Work</th>
              <th>Delete</th>
              <th>Status</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {ans}
          </tbody>
        </table>
    </>
  )
}


export default App;