import axios from 'axios'
import { useState, useEffect, useRef } from 'react'
import OnePost from './OnePost'
import AddPost from './AddPost'
import { InputText } from 'primereact/inputtext';
import React from 'react';
import { Button } from 'primereact/button';



const Posts = () => {

    const [posts, setPosts] = useState([])
    const [visible, setVisible] = useState(false);
    const [flag, setFlag] = useState(true)
    const titleRef = useRef("")
    useEffect(() => { getPosts() }, [])
    const getPosts = async () => {
        try {
            const res = await axios.get('http://localhost:4300/api/posts')
            if (res.status === 200) {
                setPosts(res.data);
                setFlag(true)

            }
        } catch (e) {
            console.error(e)
        }
    }
    // console.log(posts)
    const searchByTitle = async (titleRef) => {

        try {
            const res = await axios.get(`http://localhost:4300/api/posts/byTilte/${titleRef.current.value}`)
            if (res.status === 200) {
                console.log(res);
                setPosts(res.data);
            }
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <><div className="card flex flex-column md:flex-row gap-3">
            <div className="p-inputgroup flex-1" style={{ marginLeft: "40%", marginRight: '20%' }}>

                <div className="p-inputgroup flex-1" style={{ marginLeft: "30%", marginRight: '20%' }}>
                    <InputText ref={titleRef} placeholder="הכנס שם משימה" style={{ direction: "rtl" }} onChange={() => { titleRef.current.value ? searchByTitle(titleRef) : getPosts() }} />
                    <Button icon="pi pi-search" severity="info" onClick={() => { searchByTitle() }} />

                </div>
            </div></div>
            <Button icon="pi pi-plus" severity="info" rounded aria-label="Filter" onClick={() => setVisible(true)} style={{ marginRight: "50px", marginBottom: '50px', right: 0, bottom: 0, position: 'fixed' }} direction="down-right" />

            {visible && <AddPost setPosts={setPosts} setVisible={setVisible} visible={visible} />}
            {posts.map((post) => <OnePost post={post} setPosts={setPosts} />)}

        </>
    )
}

export default Posts












