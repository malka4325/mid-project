import axios from 'axios'
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { MultiSelect } from 'primereact/multiselect';
import { useRef, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Fieldset } from 'primereact/fieldset';

import { OverlayPanel } from 'primereact/overlaypanel';
import { FloatLabel } from 'primereact/floatlabel';
import { InputTextarea } from 'primereact/inputtextarea';
const OnePost = (props) => {

  const op = useRef(null);
  const deletePosts = async () => {

    try {
      const res = await axios.delete(`http://localhost:4300/api/posts/${props.post._id}`)
      if (res.status === 200) {
        props.setPosts(res.data)
      }
    } catch (e) {
      console.error(e)
    }
  }

  const updateComplete = async () => {
    try {
      const res = await axios.put(`http://localhost:4300/api/posts/${props.post._id}`)
      if (res.status === 200) {
        props.setPosts(res.data)
      }
    } catch (e) {
      console.error(e)
    }
  }
  const titleRef = useRef("")
  const bodyRef = useRef("")
  const update = async () => {

    const updatePost = {
      _id: props.post._id,
      title: titleRef.current.value,
      body: bodyRef.current.value
    }


    try {
      const res = await axios.put('http://localhost:4300/api/posts', updatePost)
      console.log(res);
      if (res.status === 200) {
        console.log("res.data", res.data);
        props.setPosts(res.data)
      }
    } catch (e) {
      console.error(e)
    }
  }
  const [visible, setVisible] = useState(false);
  const footer = (
    <>
      <Button rounded aria-label="Filter" label="עדכן" icon="pi pi-pencil" severity="info" onClick={() => setVisible(true)} />

      <Button style={{ marginLeft: "30px" }} rounded aria-label="Filter" label="מחק" icon="pi pi-eraser" onClick={deletePosts} severity="danger" />
     </>
  );

  return (<>
    <div className="card flex justify-content-center">
      <Dialog style={{ direction: "rtl" }}severity="info"
        visible={visible}
        modal
        onHide={() => { if (!visible) return; setVisible(false); }}
        content={({ hide }) => (
          <div className="flex flex-column px-8 py-5 gap-4" style={{ borderRadius: '12px', backgroundImage: 'radial-gradient(circle at left top, var(--primary-400), var(--primary-700))' }}>

            <div className="inline-flex flex-column gap-2">
              <label htmlFor="username" className="text-primary-50 font-semibold">
                כותרת
              </label>
              <InputText id="username" defaultValue={props.post.title} className="bg-white-alpha-20 border-none p-3 text-primary-50" ref={titleRef}></InputText>
            </div>
              <div className="inline-flex flex-column gap-2">
                          <FloatLabel style={{color:"white"}}  className="text-primary-50 font-semibold">
                <InputTextarea defaultValue={props.post.body}style={{color:"white"}} className="bg-white-alpha-20 border-none p-3 text-primary-50"id="description" ref={bodyRef}  rows={5} cols={30} />
                <label htmlFor="description">גוף המאמר</label>
            </FloatLabel>
                    </div>
        
            <div className="flex align-items-center gap-2">
              <Button label="עדכן" onClick={(e) => { update(); hide(e) }} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
              <Button label="ביטול" onClick={(e) => hide(e)} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
            </div>
          </div>
        )}
      ></Dialog>
    </div>
    <div className="card flex justify-content-center">
      <Card title ={props.post.title}footer={footer} className="md:w-25rem">
      <Fieldset legend="גוף המאמר" toggleable>
                <p className="m-0">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
            </Fieldset>
      </Card>
    </div></>
  )

}

export default OnePost
