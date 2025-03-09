import React, { useState,useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { UserAuth } from '../context/AuthContext';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const {session} = UserAuth();
  const [uploading, setUploading] = useState(false);
  const [fileUrl, setFileUrl] = useState('');
  const [fileList, setFileList] = useState([]);


  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if(!session) return;
    if (!file) return;

    setUploading(true);

    const { data, error } = await supabase.storage
      .from('test')
      .upload(`public/${file.name}`, file, {
        cacheControl: '3600',
        upsert: true,
        metadata: {
          owner_id: session.user.id, // Store the owner ID as metadata
        },
    });

    setUploading(false);

    if (error) {
      console.error('Error uploading file:', error);
    } else {
      console.log('File uploaded successfully:', data);
    }
  };

  const getFileUrl = async (fileName) => {
    const { data, error } = await supabase.storage
      .from('test')
      .createSignedUrl(`public/${fileName}`, 60); // URL valid for 60 seconds

    if (error) {
      console.error('Error getting file URL:', error);
    } else {
      setFileUrl(data.signedUrl);
      console.log('File URL:', data.signedUrl);
    }
  };

  const fetchFileList = async () => {
    const { data, error } = await supabase.storage
      .from('test')
      .list('public');

    if (error) {
      console.error('Error fetching file list:', error);
    } else {
      setFileList(data);
      console.log('File list:', data);
    }
  };

  const viewFileButtonClicked = async (fileName) =>{
    await getFileUrl(fileName); 
  }

  useEffect(() => {
    if(fileUrl)
    window.open(fileUrl, '_blank');
  }, [fileUrl]);

  useEffect(() => {
    fetchFileList();
  }, []);

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
      
<h3>Uploaded Files:</h3>
      <ul>
        {fileList.map((file) => (
            <li key={file.name}>
                {file.name}
                <button onClick={()=> viewFileButtonClicked(file.name)}>View</button>
            </li>
        ))}
      </ul>
    </div>

    
  );
};

export default FileUpload;