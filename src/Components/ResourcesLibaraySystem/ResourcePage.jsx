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

    const downloadFile = (url, filename) => {
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        link.remove();
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
                                    {file.header && file.header.startsWith('image/') ? (
                                        <img src={URL.createObjectURL(new Blob([new Uint8Array(file.data)], { type: file.header }))} alt={file.name} />
                                    ) : (
                                        <button onClick={() => downloadFile(URL.createObjectURL(new Blob([new Uint8Array(file.data)], { type: file.header })), file.name)}>
                                            Download {file.name}
                                        </button>
                                    )}
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
