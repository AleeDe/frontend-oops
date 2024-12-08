import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ResourceUpload.css';

const ResourceUpload = ({ refreshData }) => {
    const [resources, setResources] = useState({
        title: '',
        description: '',
        subject: '',
        semester: '',
        postedby: '',
        files: []
    });

    const navigate = useNavigate(); // Use useNavigate hook

    const handleFileChange = (event) => {
        setResources(prevState => ({
            ...prevState,
            files: Array.from(event.target.files)
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setResources(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', resources.title);
        formData.append('description', resources.description);
        formData.append('subject', resources.subject);
        formData.append('semester', resources.semester);
        formData.append('postedby', resources.postedby);

        resources.files.forEach(file => {
            formData.append('files', file);
        });

        const token = localStorage.getItem('token'); // Retrieve the token from local storage

        try {
            const response = await axios.post('http://localhost:8080/resources', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });
            // refreshData(); // Refresh data
            navigate('/resources'); // Redirect to resources page
            console.log('Resource saved:', response.data);
        } catch (err) {
            console.error('Error uploading resource:', err);
        }
    };

    return (
        <div className="rForm">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={resources.title}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    value={resources.description}
                    onChange={handleChange}
                    required
                />
                <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    required
                />
                <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    value={resources.subject}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="semester"
                    placeholder="Semester"
                    value={resources.semester}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="postedby"
                    placeholder="Posted by"
                    value={resources.postedby}
                    onChange={handleChange}
                    required
                />
                <button className="rBtn" type="submit">Upload</button>
            </form>
        </div>
    );
};

export default ResourceUpload;
