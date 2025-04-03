import axios from 'axios'
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { useRef, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';


const OneUser = (props) => {


  const deleteUsers = async () => {

    try {
      const res = await axios.delete(`http://localhost:4500/api/users/${props.user._id}`)
      if (res.status === 200) {
        props.setUsers(res.data)
      }
    } catch (e) {
      console.error(e)
    }
  }
  const nameRef = useRef("")
  const userNameRef = useRef("")
  const emailRef = useRef("")
  const addressRef = useRef("")
  const phoneRef = useRef("")
  const update = async () => {
    const updateUser = {
        _id:props.user._id,
        name: nameRef.current.value,
        userName: userNameRef.current.value,
         email: emailRef.current.value,
        address: addressRef.current.value,
        phone: phoneRef.current.value,
    }
    console.log(updateUser);
    try {
      const res = await axios.put('http://localhost:4500/api/users', updateUser)
      console.log(res);
      if (res.status === 200) {
        console.log("res.data", res.data);
        props.setUsers(res.data)
      }
    } catch (e) {
      alert(e.response.data.message)
    }
  }
  const sendEmail=async ()=>{
    try {
      const res = await axios.post('https://hook.eu2.make.com/7dj5dx13p0m3big3lqqdsblouckelein', {mail:props.user.email,subject:`הי ${props.user.name}`,mes:"תודה שבחרת באתר שלנו"})
      if (res.status === 200) {
alert("email send")  }}
    catch (e) {console.error(e) }
    }
  const [visible, setVisible] = useState(false);
  const footer = (
    <>
      <Button rounded aria-label="Filter" label="עדכן" icon="pi pi-pencil" severity="info" onClick={() => setVisible(true)} />

      <Button style={{ marginLeft: "30px" }} rounded aria-label="Filter" label="מחק" icon="pi pi-eraser" onClick={deleteUsers} severity="danger" />
      <Button style={{ marginTop: "10px",marginLeft:"10px" }} rounded aria-label="Filter" label="שלח מייל" icon="pi pi-envelope" onClick={sendEmail} severity="success" />

    </>
  );
 

  return (<>
    <div style={ {margin:"0"}} className="card flex justify-content-center">
    <Dialog style={{direction:"rtl"}}
            visible={visible}
            modal
            onHide={() => {if (!visible) return; setVisible(false); }}
            content={({ hide }) => (
                <div className="flex flex-column px-8 py-5 gap-4" style={{ borderRadius: '12px', backgroundImage: 'radial-gradient(circle at left top, var(--primary-400), var(--primary-700))' }}>
<div className="inline-flex flex-column gap-2">
                        <label htmlFor="username" className="text-primary-50 font-semibold">
                            שם משתמש
                        </label>
                        <InputText id="username" defaultValue={props.user.userName} className="bg-white-alpha-20 border-none p-3 text-primary-50"  ref={userNameRef}></InputText>
                    </div>
                    <div className="inline-flex flex-column gap-2">
                        <label htmlFor="username" className="text-primary-50 font-semibold">
                            שם
                        </label>
                        <InputText id="username" defaultValue={props.user.name} className="bg-white-alpha-20 border-none p-3 text-primary-50"  ref={nameRef}></InputText>
                    </div>
                    
                    <div className="inline-flex flex-column gap-2">
                        <label htmlFor="username" className="text-primary-50 font-semibold">
                            מייל
                        </label>
                        <InputText id="username"defaultValue={props.user.email}  className="bg-white-alpha-20 border-none p-3 text-primary-50"  ref={emailRef}></InputText>
                    </div>
                  
                    <div className="inline-flex flex-column gap-2">
                        <label htmlFor="username" className="text-primary-50 font-semibold">
                       כתובת
                        </label>
                        <InputText id="username" defaultValue={props.user.address} className="bg-white-alpha-20 border-none p-3 text-primary-50"  ref={addressRef}></InputText>
                    </div>
                    <div className="inline-flex flex-column gap-2">
                        <label htmlFor="username" className="text-primary-50 font-semibold">
                            טלפון
                        </label>
                        <InputText id="username" defaultValue={props.user.phone} className="bg-white-alpha-20 border-none p-3 text-primary-50"  ref={phoneRef}></InputText>
                    </div>
                    <div className="inline-flex flex-column gap-2">
                    </div>
                    <div className="flex align-items-center gap-2">
                        <Button label="עדכן" onClick={(e) =>{update(); hide(e)} } text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                        <Button label="ביטול" onClick={(e) => hide(e)} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                    </div>
                </div>
           )}
       ></Dialog>
    </div>
    <div style={ {margin:"0"}} className="card flex justify-content-center">
      <Card title ={props.user.userName} footer={footer} className="md:w-25rem">
        <p className="m-0">
          <h1></h1>
          {console.log(props.user.userName)}
        
        </p>
      </Card>
    </div></>
  )

}

export default OneUser



     









