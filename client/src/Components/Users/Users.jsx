import axios from 'axios'
import { useState,useEffect, useRef } from 'react'
import OneUser from './OneUser'
import AddUser from './AddUser'
import { InputText } from 'primereact/inputtext';
import React from 'react'; 
import { Button } from 'primereact/button';


const Users =() =>{
  
     const [users,setUsers]=useState([])
     const [visible, setVisible] = useState(false);

     const userNameRef = useRef("")
    useEffect(()=>{getUsers()},[])
    const getUsers = async () => {
        try {  
            const res = await axios.get('http://localhost:4300/api/users')
            if (res.status === 200) {
                 setUsers(res.data);
            }
        } catch (e) {
            console.error(e)
        }}
        console.log(users)
        const searchByUserName=async()=>{
                try {  
                    const res = await axios.get(`http://localhost:4300/api/users/byUserName/${userNameRef.current.value}`)
                    if (res.status === 200) {
                    console.log(res);
                    setUsers(res.data);
                    }
                } catch (e) {
                    console.error(e)
                }}   
    return( <>
    <h1>משתמשים</h1>
        <div className="card flex flex-column md:flex-row gap-3">
                     <div className="p-inputgroup flex-1" style={{marginLeft:"50%",marginRight:"30%"}}>
                 <InputText  ref={userNameRef} placeholder="הכנס שם משתמש" style={{direction:"rtl"}} onChange={()=>{userNameRef.current.value?searchByUserName(userNameRef):getUsers()}}/>
             <Button icon="pi pi-search" severity="info" onClick={()=>{searchByUserName()}} />
            </div> 
     </div>
        <Button icon="pi pi-plus" severity="info" rounded aria-label="Filter" onClick={() => setVisible(true)}style={{marginRight:"50px",marginBottom:'50px' ,right: 0, bottom: 0 ,position:'fixed'}}direction="down-right" />
        {visible&&<AddUser setUsers={setUsers} setVisible={setVisible} visible={visible}  />}
        {users.map((user)=><OneUser user={user} setUsers={setUsers}/>)}
        </>
    )
}

export default Users
     