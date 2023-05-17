import React from 'react'
import '../component/css/albumDet.css'

const AlbunDetails = (props) => {
  return (
    <div>
          <div className='album-details'>
                 <div className='album-title'>
                    <h2>{props.title}</h2>
                     <button className='editDet' title='edit' onClick={()=>props.onEdit(props.id)}>✍</button>
                     <button className='deleteDet' title='delete' onClick={()=>props.onDelete(props.id)}>X</button>
                 </div>
        </div>
    </div>
  )
}

export default AlbunDetails