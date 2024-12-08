import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './Post.css';
import PostCreator from './PostCreator';
import EditPost from './EditPost';


export default function Post() {
    const [postData, setPostData] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [showAddPost, setShowAddPost] = useState(false);
    const [showEditPost, setShowEditPost] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    const token = localStorage.getItem('token'); // Get token from local storage
    const username = localStorage.getItem('username'); // Get username from local storage

    const fetchStudentData = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:8080/jiPost', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Response data:', response.data);
            if (response.data && Array.isArray(response.data)) {
                setPostData(response.data);
            } else {
                setErrorMessage('No post data available.');
            }
        } catch (error) {
            console.error('Error fetching post data:', error);
            setErrorMessage('Error fetching post data.');
        }
    }, [token]);

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:8080/jiPost/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status === 204) {
                fetchStudentData(); // Refresh the post data after deletion
            } else {
                setErrorMessage('Failed to delete post.');
            }
        } catch (error) {
            console.error('Error deleting post:', error);
            setErrorMessage('Error deleting post.');
        }
    };

    useEffect(() => {
        if (token) {
            fetchStudentData();
        }
    }, [token, fetchStudentData]);

    const handleEdit = (post) => {
        setSelectedPost(post);
        setShowEditPost(true);
    };

  
    return (
        <div className='cont-1'>
            <div className="button-group">
                {!showAddPost && (
                    <button onClick={() => setShowAddPost(true)}>Add Post</button>
                )}
            </div>
            {showAddPost && (
                <PostCreator
                    onClose={() => setShowAddPost(false)}
                    refreshData={fetchStudentData}
                />
            )}
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            {postData.length > 0 ? (
                <div className="row">
                    {postData.map((post) => (
                        <div className="card" key={post.id}>
                            <div className="postedHead">
                                <div className="postedBy">
                                    <img src="" alt="Logo" />
                                    <h4>{post.postedby}</h4>
                                </div>
                                <div className="formtype">
                                    <h4>{post.formTitle}</h4>
                                </div>
                            </div>
                            <div className="subead">
                                <div className="title">
                                    <h3>{post.title}</h3>
                                </div>
                                {username === post.postedby && (
                                    <div className="btns">
                                        <button onClick={() => handleEdit(post)}>Edit</button>
                                        <button onClick={() => handleDelete(post.stringId)}>Delete</button>
                                    </div>
                                )}
                            </div>
                            <p>{post.desc}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <div>No post data available.</div>
            )}
            {showEditPost && selectedPost && (
                <EditPost
                    post={selectedPost}
                    onClose={() => setShowEditPost(false)}
                    refreshData={fetchStudentData}
                />
            )}
        </div>
  )
}
