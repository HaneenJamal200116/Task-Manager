import React, { useState } from 'react'
import Display from './Display';
import { Link } from 'react-router-dom';

const Add = () => {
    const [formData, setFormData] = useState({
        title:'',
        description:''
    });
    const [error,setError]=useState(null);

    const handleSubmit=async(e)=>{
        const token = localStorage.getItem('token')
        e.preventDefault(); 
        try{
          const response=await fetch('http://localhost:5000/tasks/add',{
            method:'POST',
            headers:{
              'Content-Type':'application/json',
              'Authorization': `Bearer ${token}`
            },
            body:JSON.stringify(formData)
          })
          const data=await response.json();
          if(response.ok){
            console.log('Task added successfully:', data);
          }else{
            setError(data.message);
            console.error('Error adding task:', data.message);
          }
        }
        catch(error){
          setError('An error occurred during adding task.');
          console.error('Error during adding task:', error);
        }
    }


    const handleChange=(e)=>{
        const { name, value } = e.target;
        setFormData((prevState) => ({
          ...prevState,
          [name]: value,
        }));
    } 


  return (
    <div className='h-screen  bg-gray-100'>
      <button className=" m-5 bg-indigo-600 text-white py-2 px-4 rounded-lg shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
        <Link to="/signin">Logout</Link>
      </button>
      <div className="flex justify-around flex-wrap  mt-10 ">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md ml-6 max-h-[400px]">
          <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">Add Task</h1>
          <form>
            <div className='mb-6'>
              <label className="block text-sm font-medium text-gray-700" htmlFor="title">Title</label>
              <input className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" type="text" id="title" name="title" value={formData.title} onChange={handleChange} />
            </div>
            <div className='mb-6'>
              <label className="block text-sm font-medium text-gray-700" htmlFor="description">Description</label>
              <input className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" type="text" id="description" name="description" value={formData.description} onChange={handleChange} />
            </div>
        
            <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" type="submit" onClick={handleSubmit}>Add</button>

          </form>
          
        </div>
        
        <div>
          <Display/>
        </div>
        
      </div>
    </div>
  )
}

export default Add
