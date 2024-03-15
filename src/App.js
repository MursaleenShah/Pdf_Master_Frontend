import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  const [title,setTitle] = useState("");
  const [file, setFile] = useState("");
  const submitImage = async(e)=>{
    e.preventDefault();
    const formData = new FormData();
    formData.append("title",title);
    formData.append("file",file);
    console.log(title,file);
  }
  return (
    <div className="App">
       <form className="formStyle" onSubmit={submitImage}>
        <h4>PDF MASTER</h4>
        <br/>
        <input
        type='text'
        className='form-control'
        placeholder='Title'
        required 
        onChange={(e)=>setTitle(e.target.value)}
        />
        <br/>
         <input
        type='file'
        className='form-control'
        accept='appliaction/pdf'
        required 
        onChange={(e)=>setFile(e.target.files[0])}
        />
        <br/>
        <button className='btn btn-primary'
        type='submit'>
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;
