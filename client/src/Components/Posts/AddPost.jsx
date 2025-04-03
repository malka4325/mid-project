import axios from 'axios'
import {  useRef } from 'react'
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { InputTextarea } from "primereact/inputtextarea";
import { FloatLabel } from "primereact/floatlabel";
const AddPost = (props) => {

    const titleRef = useRef("")
    const bodyRef = useRef("")
   
    const addPost = async () => {
        
        const newPost = {
            title: titleRef.current.value,
            body: bodyRef.current.value
        }
        try {
            const res = await axios.post('http://localhost:4500/api/posts', newPost)
            console.log(res);
            if (res.status === 200) {
                console.log("res.data",res.data);
               props.setPosts(res.data)
            }
        } catch (e) {
            console.error(e)
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
                            כותרת
                        </label>
                        <InputText id="username"  className="bg-white-alpha-20 border-none p-3 text-primary-50"  ref={titleRef}></InputText>
                    </div>   
                    <div className="inline-flex flex-column gap-2">
                          <FloatLabel style={{color:"white"}}  className="bg-white-alpha-20 border-none p-3 text-primary-50">
                <InputTextarea className="bg-white-alpha-20 border-none p-3 text-primary-50"id="description" ref={bodyRef}  rows={5} cols={30} />
                <label htmlFor="description">גוף המאמר</label>
            </FloatLabel>
                    </div>

                    <div className="flex align-items-center gap-2">
                        <Button label="הוסף" onClick={(e) =>{addPost(); hide(e)} } text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                        <Button label="ביטול" onClick={(e) => hide(e)} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                    </div>
                </div>
            )}
        ></Dialog>
    </div>
        </>
    )
}

export default AddPost;




        


        
