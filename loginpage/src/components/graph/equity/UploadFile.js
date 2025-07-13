
import { useState } from 'react';

const FileUpload = ({ label, onFileParsed }) => {
  const [filename, setFilename] = useState('');
  const [status, setStatus] = useState(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const text = await file.text();

      setFilename(file.name);
      setStatus('success');

      if (onFileParsed) {
        onFileParsed({ name: file.name, content: text });
      }
    } catch (error) {
      console.error('Error reading file:', error);
      setFilename(file.name);
      setStatus('failed');
    }
  };

  return (
    <div className="file-upload-container">
      <label className="upload-label">{label}</label>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      {status === 'success' && (
        <p className="upload-success">✅ {filename} uploaded successfully.</p>
      )}
      {status === 'failed' && (
        <p className="upload-failed">❌ Failed to upload {filename}. Please try again.</p>
      )}
    </div>
  );
};

export default FileUpload;
