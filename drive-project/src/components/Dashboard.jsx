import { useState, useEffect } from "react";
import axios from "axios";
//import { API } from "../utils/api";
import { useNavigate } from "react-router-dom";
import { API } from "../API";

function Dashboard() {
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();

  // Auth: redirect to login if not logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/files", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const res = await axios.get(API.FILES, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFiles(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a file");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const token = localStorage.getItem("token");
      await axios.post(API.UPLOAD, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      });
      setFile(null);
      fetchFiles();
    } catch (err) {
      console.error("Upload error:", err);
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(API.DELETE(id), {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchFiles(); // Also fixed: should be fetchFiles not fetchFile
    } catch (err) {
      console.error("Delete error:", err);
    }
  };
  

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-xl mx-auto bg-white p-6 rounded shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Upload File</h1>

        {/* Upload Form */}
        <form onSubmit={handleUpload}>
          <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg className="w-8 h-8 mb-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M4 16v1a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-1m-4-4l-4-4m0 0l-4 4m4-4v12" />
              </svg>
              <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
              <p className="text-xs text-gray-500">Any file type • Max size: 10MB</p>
            </div>
            <input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange} />
          </label>

          <button type="submit" className="mt-5 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
            Upload
          </button>
        </form>

        {/* Uploaded Files List */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-3">Your Files</h2>
          {files.length > 0 ? (
            <ul className="space-y-3">
              {files.map(file => (
                <li key={file._id} className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded">
                  <span className="truncate w-2/3 text-gray-700">{file.originalname}</span>
                  <div className="flex gap-2">
                  <a
                    //  href={`http://localhost:5000/api/uploads/${file.filename}`}
                      target="_blank"
                     rel="noopener noreferrer"
                     className="text-blue-600 hover:underline text-sm"
                   //  download={file.originalname} 
                   href={`http://localhost:5000/api/uploads/${file.filename}`}
                   download={file.originalname}
                  >
                        Download
                     </a>

                    <button
                      onClick={() => handleDelete(file._id)}
                      className="text-red-600 hover:underline text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No files uploaded yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
