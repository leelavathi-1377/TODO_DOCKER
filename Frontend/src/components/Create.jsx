import React, { useState } from 'react'
import axios from 'axios'

function Create() {
  const [task, setTask] = useState()
  const handleAdd = () => {
    const uri = "http://localhost:3000"
    // const uri = process.env.REACT_APP_API_URL;

    axios.post(`${uri}/add`, {
      task : task
    })
    .then((result) => {
      console.log(result)
    })
    .catch(error => {
      if (error.isAxiosError) {
        console.error("Axios Error:", error.message);
        if (error.response) {
          console.error("Response error:", error.response.status);
          console.error("Response data:", error.response.data);
        } else if (error.request) {
          console.error("Request was made but no response received:", error.request);
        }
      }
    })
  }
  return (
    <div>
        <input className='create_form_input' type='text' placeholder='Enter Task'
        onChange={(e) => {
          setTask(e.target.value)
        }}/>
        <button className='create_form_button' type='button'
        onClick={handleAdd}
        >Add</button>
    </div>
  )
}

export default Create