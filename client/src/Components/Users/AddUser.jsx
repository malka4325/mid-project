import axios from 'axios'
import { useState, useRef } from 'react'
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { MultiSelect } from 'primereact/multiselect';
const AddUser = (props) => {

    const nameRef = useRef("")
    const userNameRef = useRef("")
    const emailRef = useRef("")
    const addressRef = useRef("")
    const phoneRef = useRef("")
   

    const addUser = async () => {
        
        const newUser = {
            name: nameRef.current.value,
            userName: userNameRef.current.value,
            address: addressRef.current.value,
            phone: phoneRef.current.value,
            email: emailRef.current.value,

        }
        try {
            const res = await axios.post('http://localhost:4300/api/users', newUser)
            console.log(res);
            if (res.status === 200) {
                console.log("res.data",res.data);
               props.setUsers(res.data)
            }
        } catch (e) {
            alert(e.response.data.message)
        }
    }
 
    return (
        <>

<div className="card flex justify-content-center">
        
        <Dialog style={{direction:"rtl"}}
            visible={props.visible}
            modal
            onHide={() => {if (!props.visible) return; props.setVisible(false); }}
            content={({ hide }) => (
                <div className="flex flex-column px-8 py-5 gap-4" style={{ borderRadius: '12px', backgroundImage: 'radial-gradient(circle at left top, var(--primary-400), var(--primary-700))' }}>
<div className="inline-flex flex-column gap-2">
                        <label htmlFor="username" className="text-primary-50 font-semibold">
                            שם משתמש
                        </label>
                        <InputText id="username"  className="bg-white-alpha-20 border-none p-3 text-primary-50"  ref={userNameRef}></InputText>
                    
                    </div>
                    <div className="inline-flex flex-column gap-2">
                        <label htmlFor="username" className="text-primary-50 font-semibold">
                            שם
                        </label>
                        <InputText id="username"  className="bg-white-alpha-20 border-none p-3 text-primary-50"  ref={nameRef}></InputText>
                    </div>
                    
                    <div className="inline-flex flex-column gap-2">
                        <label htmlFor="username" className="text-primary-50 font-semibold">
                            מייל
                        </label>
                        <InputText id="username"  className="bg-white-alpha-20 border-none p-3 text-primary-50"  ref={emailRef}></InputText>
                    </div>
                  
                    <div className="inline-flex flex-column gap-2">
                        <label htmlFor="username" className="text-primary-50 font-semibold">
                       כתובת
                        </label>
                        <InputText id="username"  className="bg-white-alpha-20 border-none p-3 text-primary-50"  ref={addressRef}></InputText>
                    </div>
                    <div className="inline-flex flex-column gap-2">
                        <label htmlFor="username" className="text-primary-50 font-semibold">
                            טלפון
                        </label>
                        <InputText id="username"  className="bg-white-alpha-20 border-none p-3 text-primary-50"  ref={phoneRef}></InputText>
                    </div>
                    <div className="inline-flex flex-column gap-2">
                    </div>
                    <div className="flex align-items-center gap-2">
                        <Button label="הוסף" onClick={(e) =>{addUser(); hide(e)} } text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                        <Button label="ביטול" onClick={(e) => hide(e)} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                    </div>
                </div>
           )}
       ></Dialog>
    </div>
        </>
    )
            }

export default AddUser