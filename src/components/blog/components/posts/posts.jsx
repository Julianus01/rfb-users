import React, { Component } from 'react';
import './posts.css';
import firebase from 'firebase';
import Post from './components/post/post.jsx';

class Posts extends Component {
    constructor() {
        super();

        this.state = {
            posts: []
        }

        this.db = firebase.database().ref('blog/posts');
        this.storage = firebase.storage();
    }

    render() {
        return (
            <div className="posts-list">
                {this.state.posts.map(post => {
                    return (
                        <Post key={post.id} id={post.id} title={post.title}
                            imgSrc={post.imgSrc} text={post.text}
                            updatePost={this.updatePost} />
                    )
                })}
            </div>
        )
    }

    componentWillMount() {
        var posts = this.state.posts;
        var valuePosts = [];

        this.db.on('child_added', snap => {
            posts.unshift({
                id: snap.key,
                title: snap.val().title,
                imgSrc: snap.val().imgSrc,
                text: snap.val().text
            })

            this.setState({ posts })
        })

        this.db.on('child_changed', snap => {
            var posts = this.state.posts;

            var index = this.state.posts.findIndex(post => post.id === snap.key);

            posts[index] = snap.val();
            posts[index].id = snap.key;

            this.setState({
                posts: posts
            })
        })
    }

    addPost = (post) => {
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

        this.setState({ addPostModalShow: false })
    }

    updatePost = (post) => {
        this.db.child(post.id).update({
            title: post.title,
            text: post.text,
            imgSrc: post.imgSrc
        });
    }
}

export default Posts;