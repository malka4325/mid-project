import axios from 'axios'
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { MultiSelect } from 'primereact/multiselect';
import { useRef, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Fieldset } from 'primereact/fieldset';

import { OverlayPanel } from 'primereact/overlaypanel';
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
      body: bodyRef.current.value.split(",")
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
      <Button rounded aria-label="Filter" icon="pi pi-check" onClick={updateComplete} severity="success" style={{ backgroundColor: props.post.completed ? 'green' : 'gray', marginLeft: "30px", borderColor: props.post.completed ? 'green' : 'gray' }} />
      <div className="card flex justify-content-center">
            <Button type="button"  label="פרטים נוספים" onClick={(e) => op.current.toggle(e)} />
            <OverlayPanel ref={op}>
              
        <div className="card">
            <Fieldset legend={props.post.title}>
                <p className="m-0">
                  <h2>זמן יצירת המשימה:</h2>
                  <h3>{props.post.timestamps}</h3>
                </p>
            </Fieldset>
        </div>
        
            </OverlayPanel>
        </div>
    </>
  );
  const [selectedCities, setSelectedCities] = useState(null);
  const cities = [
      { name: 'בית', code: 'NY' },
      { name: 'לימודים', code: 'RM' },
      { name: 'עבודה', code: 'LDN' },
      { name: 'בריאות', code: 'IST' },
  ];

  // [{name:props.post.body.toString(),code:'old'}]
  // props.post.body.split(",").map((t)=>{cities.push({name:t,code:"old"})})
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
              <label htmlFor="username" className="text-primary-50 font-semibold">
                תגיות
              </label>
              {/* <InputText id="username" defaultValue={props.post.body} className="bg-white-alpha-20 border-none p-3 text-primary-50" ref={bodyRef}></InputText> */}
           
            <MultiSelect  value={selectedCities} onChange={(e) =>{ setSelectedCities(e.value);return}} inputRef={bodyRef} options={cities} optionLabel="name" 
               maxSelectedLabels={4}  className="bg-white-alpha-20 border-none p-3 text-primary-50" 
               defaultValue={props.todo.tags.map(tag => ({ name: tag, code: tag }))} // ברירת המחדל
               />
        
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
        <p className="m-0">
        
          {/* {console.log(props.post.body)} */}
          {props.post.body.map((tag) => <h2>{tag}</h2>)}
        </p>
      </Card>
    </div></>
  )

}

export default OnePost
