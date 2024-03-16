import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from "react";
import axios from "axios";


function App() {
  const [title,setTitle] = useState("");
  const [file, setFile] = useState("");
  const [allImage,setAllImage] = useState(null);

  useEffect(()=>{
    getPdf();
  },[]);

//function to get pdf from server
const getPdf = async() =>{
  const result = await axios.get("http://localhost:5000/get-files");
  console.log(result.data.data);
  setAllImage(result.data.data);

}



  const submitImage = async(e)=>{
    e.preventDefault();
    const formData = new FormData();
    formData.append("title",title);
    formData.append("file",file);
    console.log(title,file);
    const result = await axios.post("http://localhost:5000/upload-files",
    formData,
    {
      headers :{"Content-Type":"multipart/form-data"},
    });
    console.log(result);
     if(result.data.status == "ok"){
      alert("uploaded successfully!");
     }
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
      <div className='uploaded'>
        <h4>Uploaded PDF:</h4>
        <div className='output-div'>
          {allImage == null 
          ? "" 
          : allImage.map((data)=>{
            return(
              <div className='inner-div'>
            <h6>Title:{data.title}</h6>
            <button className='btn btn-primary'>Show Pdf</button>
          </div>
            );
          })
          }
        </div>

      </div>
    </div>
  );
}

export default App;
