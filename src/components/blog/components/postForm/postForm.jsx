import React, { Component } from 'react';
import './postForm.css';
import firebase from 'firebase';

class PostForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            title: '',
            image: null,
            text: '',
        }

        this.db = firebase.database().ref('blog/posts');
        this.storage = firebase.storage();
    }

    render() {

        return (
            <div>
                <h2>Add a New Post</h2>
                <p>Title</p>
                <input type="text" placeholder="Title of new Post"
                    onChange={this.handleInputTitleChange} />

                <p>Input Image</p>
                <input type="file" onChange={this.handleInputImageChange} />

                <p>Text</p>
                <textarea cols="30" rows="10" placeholder="Content of new Post" 
                onChange={this.handleInputTextChange} value={this.state.text}></textarea>

                <button className="btn btn-primary"
                    onClick={this.addPost}>Post</button>
            </div>
        )
    }

    handleInputTitleChange = (event) => {
        this.setState({
            title: event.target.value
        })
    }

    handleInputImageChange = (event) => {
        this.setState({
            image: event.target.files[0]
        });
    }

    handleInputTextChange = (event) => {
        this.setState({
            text: event.target.value
        });
    }

    // addPost = () => {
    //     this.props.addPost(this.state);

    //     this.setState({
    //         title: '',
    //         image: null,
    //         text: ''
    //     })
    // }

    addPost = () => {
        var post = this.state;

        var key = this.db.push().key;
        var storageRef = this.storage.ref('blog/posts/' + key);

        if (post.image != null) {
            var uploadTask = storageRef.put(post.image);
            uploadTask.on('state_changed', snap => {

            }, (err) => {

            }, () => {
                var downloadUrl = uploadTask.snapshot.downloadURL;
                var newPost = this.db.child(key);
                newPost.set({
                    title: post.title,
                    imgSrc: downloadUrl,
                    text: post.text
                })
            });
        } else {
            let postKey = this.db.push().key;
            this.db.child(postKey).set({
                title: post.title,
                text: post.text,
                imgSrc: ''
            })
        }

        this.props.onCloseModal();
    }


}

export default PostForm;