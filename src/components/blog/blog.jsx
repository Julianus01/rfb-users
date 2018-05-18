import React, { Component } from 'react';
import './blog.css';
import firebase from 'firebase';
import PostForm from './components/postForm/postForm.jsx';
import Modal from 'react-responsive-modal';
import { Button } from 'react-bootstrap';
import Posts from './components/posts/posts.jsx';

class Blog extends Component {

    constructor() {
        super();

        this.state = {
            posts: [],
            addPostModalShow: false
        }

        this.db = firebase.database().ref('blog/posts');
        this.storage = firebase.storage();
    }

    render() {

        return (
            <div>
                <h1>Blog Page Bici</h1>
                <Button bsStyle='primary' onClick={this.onOpenModal}>
                    Add Post
                </Button>
                <Modal
                    open={this.state.addPostModalShow}
                    onClose={this.onCloseModal}
                    center
                    classNames={{ overlay: 'custom-overlay', modal: 'custom-modal' }}>

                    <PostForm onCloseModal={this.onCloseModal} />

                </Modal>

                <Posts />

            </div>
        )
    }


    onOpenModal = () => {
        this.setState({ addPostModalShow: true });
    };

    onCloseModal = () => {
        this.setState({ addPostModalShow: false });
    };

}

export default Blog