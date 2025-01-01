import axios from 'axios'
import { useState,useEffect, useRef } from 'react'
import OneTodo from './OneTodo'
import AddTodo from './AddTodo'
import { InputText } from 'primereact/inputtext';
import React from 'react'; 
import { Button } from 'primereact/button';



const Todos =() =>{
  
     const [todos,setTodos]=useState([])
     const [visible, setVisible] = useState(false);
     const [flag,setFlag]=useState(true)
     const titleRef = useRef("")
    useEffect(()=>{getTodos()},[])
    const getTodos = async () => {
        try {  
            const res = await axios.get('http://localhost:4300/api/todos')
            if (res.status === 200) {
                 setTodos(res.data);
                 setFlag(true)

            }
        } catch (e) {
            console.error(e)
        }}
        // console.log(todos)
        const searchByTitle=async(titleRef)=>{
            
            try {  
                const res = await axios.get(`http://localhost:4300/api/todos/byTilte/${titleRef.current.value}`)
                if (res.status === 200) {
                console.log(res);
                setTodos(res.data);
                }
            } catch (e) {
                console.error(e)
            }}  
            const getUncompleted=async(titleRef)=>{
                try {  
                    const res = await axios.get(`http://localhost:4300/api/todos/unCompleted`)
                    if (res.status === 200) {
                        setTodos(res.data);
                        setFlag(false)
                    }
                } catch (e) {
                    console.error(e)
                }}

    return(
        <><h1 style={ {margin:"0"}}  className="card flex justify-content-center">משימות</h1>
        <div style={ {margin:"0"}} className="card flex flex-column md:flex-row gap-3">
                     <div className="p-inputgroup flex-1" style={{marginLeft:"40%",marginRight:'20%'}}> 
       
                     <div className="p-inputgroup flex-1" style={{marginRight:'20%'}}>
                     <InputText  ref={titleRef} placeholder="הכנס שם משימה" style={{direction:"rtl"}} onChange={()=>{titleRef.current.value?searchByTitle(titleRef):getTodos()}}/>
             <Button icon="pi pi-search" severity="info" onClick={()=>{searchByTitle()}} />

     </div>

             </div>
              {flag?
             <Button icon="pi pi-search" severity="info" label='משימות שלא השלמו'rounded aria-label="Filter" onClick={getUncompleted}direction="down-right"/>
        :<Button  severity="info" label='לכל המשימות'rounded aria-label="Filter" onClick={getTodos}direction="down-right"/>}</div>
        <Button icon="pi pi-plus" severity="info" rounded aria-label="Filter" onClick={() => setVisible(true)}style={{marginRight:"50px",marginBottom:'50px' ,right: 0, bottom: 0 ,position:'fixed'}}direction="down-right" />

        {visible&&<AddTodo setTodos={setTodos} setVisible={setVisible} visible={visible}  />}
        {todos.map((todo)=><OneTodo todo={todo} setTodos={setTodos}/>)}

        </>
    )
}

export default Todos


        






     



     