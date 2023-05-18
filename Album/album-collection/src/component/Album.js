import React from 'react'
import { useState,useEffect } from 'react'
import '../component/css/album.css'
import AlbunDetails from './AlbunDetails'

const Album = () => {
    const[albumData,setAlbumData]=useState([]);
    const[input,setInput]=useState('');
    const[toggle,setToggle]=useState(true);
    const[isId,setIsId]=useState(null);
    const addTask=()=>{
        if(!input)
        {

        }
        else if(input && !toggle)
        {
            setAlbumData(albumData.map((ele)=>{
              if(ele.id===isId)
              {
                return {...ele,title:input}
              }
              localStorage.setItem("userId",ele.userId);
              localStorage.setItem("id",ele.id)
              localStorage.setItem("title",ele.title);
              return ele;
            }))
            setInput('');
            setToggle(true);
            setIsId(null);
        }
        else{
            const allInputData={userId:new Date().getTime().toString(), id:new Date().getTime().toString(),title:input};
      setAlbumData([...albumData, allInputData]);
      localStorage.setItem("userId",albumData.userId);
      localStorage.setItem("id",allInputData.id);
      localStorage.setItem("title",allInputData.title)
      setInput('');
        }
    

    }
    const deleteTask =(id)=>{
      const deltedItems=albumData.filter((ele)=>{
        return ele.id!==id
      })
      setAlbumData(deltedItems);
    }
    const updateItem=(id)=>{
      setToggle(false);
      const ele=albumData.find((ele)=>ele.id===id);
      setInput(ele.title);
      setIsId(id);


    }
    const handleChange=(e)=>{
      e.preventDefault();
      setInput(e.target.value);

    }
    const getCollection=async()=>{
        let resp=await fetch("https://jsonplaceholder.typicode.com/albums")
        let data=await (resp.json());
        console.log(data);
        setAlbumData(data);

    }

    useEffect(()=>{
        getCollection();

    },[])
  return (
    <div className='Album'>
        <h1 style={{fontStyle:"italic",color:'crimson',textTransform:"capitalize"}}>album list collection</h1>
    <div className='input-list'>
        <input type='text' title='album ' placeholder='Add Album' value={input} onChange={handleChange}/>
        {
          toggle?<button onClick={addTask}>+</button>:<button onClick={addTask} value={input}>✍</button>
        }
    </div>

    <div className='album-template'>
      {
        albumData.map((al)=>{
            return <AlbunDetails title={al.title} id={al.id} onDelete={deleteTask} onEdit={updateItem}/>
        })
      }
    </div>
    
    </div>
  )
}

export default Album