import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
       <form className='formStyle'>
        <h4>PDF MASTER</h4>
        <br/>
        <input
        type='text'
        className='form-control'
        placeholder='Title'
        required 
        />
        <br/>
         <input
        type='file'
        className='form-control'
        accept='appliaction/pdf'
        required 
        />
        <br/>
      </form>
    </div>
  );
}

export default App;
