import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { pdfjs } from "react-pdf";
import PdfComp from "./components/PdfComp";
import { useRef } from "react";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

function App() {
  const fileInputRef = useRef(null);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState("");
  const [allImage, setAllImage] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  //state to store page numbers for extraction
  const [pageNumbers, setPageNumbers] = useState("");

  useEffect(() => {
    getPdf();
  }, []);

  //function to get pdf from server
  const getPdf = async () => {
    const result = await axios.get("http://localhost:5000/get-files");
    console.log(result.data.data);
    setAllImage(result.data.data);
  };

  const submitImage = async (e) => {
    e.preventDefault();

    // Check if file is not null and is a PDF
    if (file && file.type !== "application/pdf") {
      alert("Please select only PDF files.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);
    formData.append("pageNumbers", pageNumbers);
    console.log(title, file, pageNumbers);
    const result = await axios.post(
      "http://localhost:5000/upload-files",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    console.log(result);
    if (result.data.status === "ok") {
      alert("uploaded successfully!");
      getPdf();
      //clear form fields
      setTitle("");
      setPageNumbers("");
      fileInputRef.current.value = null;
    setFile(null);
    }
  };
  //function to show pdf on homepage
  const showPdf = (pdf) => {
    setPdfFile(`http://localhost:5000/files/${pdf}`);
  };
  //function to download modified pdf
  const downloadModifiedPdf = async (pdfId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/get-modified-pdf/${pdfId}`,
        {
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "modified_pdf.pdf");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading modified PDF:", error);
    }
  };

  return (
    <div className="App">
      <form className="formStyle" onSubmit={submitImage}>
        <h4>PDF MASTER</h4>
        <br />
        <input
          type="text"
          className="form-control"
          placeholder="Title"
          required
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <br />
        <input
          type="file"
          className="form-control"
          accept="appliaction/pdf"
          required
          onChange={(e) => setFile(e.target.files[0])}
          ref={fileInputRef}
          
        />
        <br />
        <input
          type="text"
          className="form-control"
          placeholder="Page Numbers to Extract (e.g., 1, 3, 5-7)"
          onChange={(e) => setPageNumbers(e.target.value)}
          value={pageNumbers}
        />
        <br />

        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
      <div className="uploaded">
        <h4>Uploaded PDF:</h4>
        <div className="output-div">
          {allImage == null
            ? ""
            : allImage.map((data) => {
                return (
                  <div className="inner-div">
                    <h6>Title:{data.title}</h6>
                    <button
                      className="btn btn-primary"
                      onClick={() => showPdf(data.pdf)}
                    >
                      Show Pdf
                    </button>
                    <button
                      className="btn btn-primary"
                      onClick={() => downloadModifiedPdf(data._id)}
                    >
                      Download Pdf
                    </button>
                  </div>
                );
              })}
        </div>
      </div>
      <PdfComp pdfFile={pdfFile} />
    </div>
  );
}

export default App;
