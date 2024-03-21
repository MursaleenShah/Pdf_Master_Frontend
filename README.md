#                 **PDF Master Frontend**
PDF Master Frontend is a React.js application designed to work with the PDF Master backend.It allows users to upload PDF files, specify page numbers for extraction, view uploaded PDFs, and download modified PDFs.
![Homepage Screensot](./images/Screenshot%20(410).png)
![File Uploaded Successfully Screenshot](./images/Screenshot%20(411).png)

# Installation
1. Clone this repository.
2. Install dependencies using `npm install`.

# Usage
1. Start the frontend application by running `npm start`.
2. The application will run on http://localhost:3000 by default.
3. Make sure the backend server is running on http://localhost:5000 to handle API requests.

# Features
1. Upload PDF: Upload PDF files to the server.
2. Extract Pages: Users can specify page numbers to extract from uploaded PDFs. The application communicates with the backend to extract the requested pages and generate a new PDF file containing only the selected pages.
3. View Uploaded PDFs: View a list of uploaded PDF files with their titles.
4. Show PDF: View the content of uploaded PDF files directly in the browser.
5. Download Modified PDFs: After extracting specific pages from a PDF, users can download the modified PDF file directly from the application. This feature enables users to save the extracted pages for offline use.

# Dependencies
1. React.js: JavaScript library for building user interfaces.
2. Axios : A promise-based HTTP client for making AJAX requests to communicate with the backend server.
3. react-pdf: React components for displaying PDF documents within the application. These components utilize pdfjs-dist under the hood to render PDF content in React applications, providing a seamless viewing experience for users.
4. pdfjs-dist: The PDF.js library for working with PDF documents in JavaScript. This library provides core functionality for parsing, rendering, and manipulating PDF files directly within the browser.

# Contributing
Contributions to PDF Master Frontend are welcome! If you have any ideas, enhancements, or bug fixes, please open an issue or submit a pull request.

