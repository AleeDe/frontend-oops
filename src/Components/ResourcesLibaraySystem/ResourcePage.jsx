import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ResourcePage.css';

const ResourcePage = () => {
    const [resources, setResources] = useState([]);

    useEffect(() => {
        fetchResources();
    }, []);

    const fetchResources = async () => {
        try {
            const response = await axios.get('http://localhost:8080/resources', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setResources(response.data);
        } catch (error) {
            console.error('Error fetching resources:', error);
        }
    };

    const downloadFile = (fileData, filename, contentType) => {
        const byteCharacters = atob(fileData); // Decode base64 to binary
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: contentType });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link); // Clean up
        URL.revokeObjectURL(url); // Release memory
    };

    return (
        <div className="resourcePage">
            <h1>Resources</h1>
            <div className="resourceList">
                {resources.map((resource) => (
                    <div key={resource.stringId} className="resourceCard">
                        <h2>{resource.title}</h2>
                        <p>{resource.description}</p>
                        <p>Subject: {resource.subject}</p>
                        <p>Semester: {resource.semester}</p>
                        <p>Posted by: {resource.postedby}</p>
                        <div className="fileList">
                            {resource.files.map((file, index) => (
                                <div key={index} className="fileItem">
                                    <button onClick={() => downloadFile(file.data, file.name, file.header)}>
                                        Download {file.name}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ResourcePage;
