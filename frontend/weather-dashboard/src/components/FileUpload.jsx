import React, { useState } from 'react';
import { Upload, Download, File, X, CheckCircle, AlertCircle } from 'lucide-react';
import { fileAPI } from '../services/api';
import { downloadBlob } from '../utils/helpers';

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [downloadFilename, setDownloadFilename] = useState('');
  const [downloading, setDownloading] = useState(false);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setUploadStatus(null);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploading(true);
    setUploadStatus(null);

    try {
      const result = await fileAPI.uploadFile(selectedFile);
      setUploadStatus({ type: 'success', message: 'File uploaded successfully!' });
      setSelectedFile(null);
      // Reset file input
      document.getElementById('file-input').value = '';
    } catch (error) {
      setUploadStatus({ type: 'error', message: error.message });
    } finally {
      setUploading(false);
    }
  };

  const handleDownload = async () => {
    if (!downloadFilename.trim()) return;

    setDownloading(true);
    try {
      const blob = await fileAPI.downloadFile(downloadFilename.trim());
      downloadBlob(blob, downloadFilename.trim());
      setDownloadFilename('');
    } catch (error) {
      setUploadStatus({ type: 'error', message: error.message });
    } finally {
      setDownloading(false);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    setUploadStatus(null);
    document.getElementById('file-input').value = '';
  };

  return (
    <div className="card">
      <h3 className="text-xl font-bold mb-4">Weather Reports & Files</h3>
      
      {/* Upload Section */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold mb-3">Upload Files</h4>
        
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <input
            id="file-input"
            type="file"
            onChange={handleFileSelect}
            className="hidden"
            accept=".jpg,.jpeg,.png,.pdf,.doc,.docx,.txt"
          />
          
          {!selectedFile ? (
            <div>
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600 mb-2">
                Click to select weather reports or images
              </p>
              <button
                onClick={() => document.getElementById('file-input').click()}
                className="btn-primary"
              >
                Select File
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center gap-3">
                <File className="w-5 h-5 text-blue-500" />
                <span className="text-sm font-medium">{selectedFile.name}</span>
                <span className="text-xs text-gray-500">
                  ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                </span>
              </div>
              <button
                onClick={removeFile}
                className="text-red-500 hover:text-red-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {selectedFile && (
          <div className="mt-3">
            <button
              onClick={handleUpload}
              disabled={uploading}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploading ? 'Uploading...' : 'Upload to S3'}
            </button>
          </div>
        )}

        {/* Upload Status */}
        {uploadStatus && (
          <div className={`mt-3 p-3 rounded-lg flex items-center gap-2 ${
            uploadStatus.type === 'success' 
              ? 'bg-green-50 text-green-700 border border-green-200' 
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}>
            {uploadStatus.type === 'success' ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <AlertCircle className="w-5 h-5" />
            )}
            <span>{uploadStatus.message}</span>
          </div>
        )}
      </div>

      {/* Download Section */}
      <div>
        <h4 className="text-lg font-semibold mb-3">Download Files</h4>
        <div className="flex gap-3">
          <input
            type="text"
            value={downloadFilename}
            onChange={(e) => setDownloadFilename(e.target.value)}
            placeholder="Enter filename to download"
            className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
          <button
            onClick={handleDownload}
            disabled={downloading || !downloadFilename.trim()}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            {downloading ? 'Downloading...' : 'Download'}
          </button>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          Enter the exact filename as stored in S3 (e.g., weather-report.pdf)
        </p>
      </div>
    </div>
  );
};

export default FileUpload;