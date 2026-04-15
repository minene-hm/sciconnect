import { useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';

const SubmitTalk = () => {
  const [talkTitle, setTalkTitle] = useState('');
  const [abstract, setAbstract] = useState('');
  const [category, setCategory] = useState('');
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    else if (e.type === 'dragleave') setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!talkTitle || !abstract || !category || !file) {
      alert('Please fill all fields and upload a file');
      return;
    }
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    console.log({ talkTitle, abstract, category, fileName: file.name });
  };

  if (submitted) {
    return (
      <div className="dashboard-card" style={{ textAlign: 'center' }}>
        <FaCheckCircle size={60} color="#2ecc71" />
        <h2>Submission Completed!</h2>
        <p>Your talk has been submitted successfully.</p>
      </div>
    );
  }

  return (
    <div className="dashboard-card">
      <h2>Submit Your Talk</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Talk Title *</label>
          <input type="text" value={talkTitle} onChange={(e) => setTalkTitle(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Abstract / Description *</label>
          <textarea rows="4" value={abstract} onChange={(e) => setAbstract(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Topic Category *</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Select...</option>
            <option>AI & Machine Learning</option>
            <option>Renewable Energy</option>
            <option>Data Science</option>
            <option>Cybersecurity</option>
            <option>Health Technology</option>
          </select>
        </div>
        <div className="form-group">
          <label>Presentation File (PDF/PPT/PPTX) *</label>
          <div
            className={`upload-area ${dragActive ? 'drag-active' : ''}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => document.getElementById('fileInput').click()}
          >
            {file ? (
              <div>📄 {file.name} <button type="button" onClick={(e) => { e.stopPropagation(); setFile(null); }}>Remove</button></div>
            ) : (
              <p>Drag & drop or click to upload (PDF, PPT, PPTX)</p>
            )}
            <input type="file" id="fileInput" accept=".pdf,.ppt,.pptx" onChange={handleFileChange} hidden />
          </div>
        </div>
        <button type="submit" className="btn-primary">Submit Talk</button>
      </form>
    </div>
  );
};

export default SubmitTalk;