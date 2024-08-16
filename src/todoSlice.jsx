import { createSlice } from "@reduxjs/toolkit";

const todoSlice=createSlice(
    {
        name:"todo",
        initialState:{
            task:[]
        },
        reducers:{
            addTask:(state,actions)=>{
                state.task.push(actions.payload);
            },
            recDelete:(state,actions)=>{
                state.task=state.task.filter(item=>item.id!=actions.payload);
            },
            taskComplete:(state,actions)=>{
                for(var i=0;i<state.task.length;++i)
                {
                    if(state.task[i].id==actions.payload)
                    {
                        state.task[i].status=true;
                    }
                }
            },
            taskUnComplete:(state,actions)=>{
                for(var i=0;i<state.task.length;++i)
                {
                    if(state.task[i].id==actions.payload)
                    {
                        state.task[i].status=false;
                    }
                }
            },
            editDataSave:(state,actions)=>{
                for(var i=0;i<state.task.length;i++)
                {
                    if(state.task[i].id==actions.payload.id)
                    {
                        state.task[i].work=actions.payload.work;
                    }
                }
            }

        }
    }
)

export default todoSlice.reducer;
export const {addTask,recDelete,taskComplete,taskUnComplete,editDataSave}=todoSlice.actions;