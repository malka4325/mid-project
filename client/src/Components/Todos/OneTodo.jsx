import axios from 'axios'
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { MultiSelect } from 'primereact/multiselect';
import { useEffect, useRef, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Fieldset } from 'primereact/fieldset';

import { OverlayPanel } from 'primereact/overlaypanel';
const OneTodo = (props) => {

  const op = useRef(null);
  const deleteTodos = async () => {

    try {
      const res = await axios.delete(`http://localhost:4300/api/todos/${props.todo._id}`)
      if (res.status === 200) {
        props.setTodos(res.data)
      }
    } catch (e) {
      console.error(e)
    }
  }

  const updateComplete = async () => {
    try {
      const res = await axios.put(`http://localhost:4300/api/todos/${props.todo._id}`)
      if (res.status === 200) {
        props.setTodos(res.data)
      }
    } catch (e) {
      console.error(e)
    }
  }
  const titleRef = useRef("")
  const tagsRef = useRef("")
  const update = async () => {

    const updateTodo = {
      _id: props.todo._id,
      title: titleRef.current.value,
      tags: tagsRef.current.value.split(",")
    }


    try {
      const res = await axios.put('http://localhost:4300/api/todos', updateTodo)
      console.log(res);
      if (res.status === 200) {
        console.log("res.data", res.data);
        props.setTodos(res.data)
      }
    } catch (e) {
      alert(e.response.data.message)
    }
  }
  const [visible, setVisible] = useState(false);
  const footer = (
    <>
      <Button rounded aria-label="Filter" label="עדכן" icon="pi pi-pencil" severity="info" onClick={() => setVisible(true)} />
      <Button style={{ marginLeft: "30px" }} rounded aria-label="Filter" label="מחק" icon="pi pi-eraser" onClick={deleteTodos} severity="danger" />
      <Button rounded aria-label="Filter" icon="pi pi-check" onClick={updateComplete} severity="success" style={{ backgroundColor: props.todo.completed ? 'green' : 'gray', marginLeft: "30px", borderColor: props.todo.completed ? 'green' : 'gray' }} />
      <div className="card flex justify-content-center">
        </div>
    </>
  );
  const cities = [
    { name: 'בית', code: 'בית' },
    { name: 'לימודים', code: 'לימודים' },
    { name: 'עבודה', code: 'עבודה' },
    { name: 'בריאות', code: 'בריאות' },
  ];
  
  const [selectedCities, setSelectedCities] = useState([]);
  
  useEffect(() => {
    if (props.todo.tags && props.todo.tags.length > 0) {
      const formattedTags = props.todo.tags.map(tag => {
        const trimmedTag = tag.trim(); 
        return cities.find(city => city.name === trimmedTag) || { name: trimmedTag, code: trimmedTag };
      });
      setSelectedCities(formattedTags);
    }
  }, [props.todo.tags]);

  return (<>
    <div style={ {margin:"0"}} className="card flex justify-content-center">
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
              <InputText id="username" defaultValue={props.todo.title} className="bg-white-alpha-20 border-none p-3 text-primary-50" ref={titleRef}></InputText>
            </div>
            <div className="inline-flex flex-column gap-2">
              <label htmlFor="username" className="text-primary-50 font-semibold">
                תגיות
              </label>
           
            <MultiSelect  value={selectedCities} onChange={(e) =>{ setSelectedCities(e.value);return}} inputRef={tagsRef} options={cities} optionLabel="name" 
               maxSelectedLabels={4}  className="bg-white-alpha-20 border-none p-3 text-primary-50" />
        
            </div>
            <div className="flex align-items-center gap-2">
              <Button label="עדכן" onClick={(e) => { update(); hide(e) }} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
              <Button label="ביטול" onClick={(e) => hide(e)} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
            </div>
          </div>
        )}
      ></Dialog>
    </div>
    <div style={ {margin:"0"}}className="card flex justify-content-center">
      <Card title ={props.todo.title}footer={footer} className="md:w-25rem">
        <p className="m-0">

          {props.todo.tags.map((tag) => <h3>{tag}</h3>)}
        </p>
      </Card>
    </div></>
  )

}

export default OneTodo
