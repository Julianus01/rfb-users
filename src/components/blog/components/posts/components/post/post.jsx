import React, { Component } from 'react';
import './post.css';
import { Button } from 'react-bootstrap';
import Modal from 'react-responsive-modal';
import EditPostForm from './components/editPostForm/editPostForm.jsx';

class Post extends Component {

    constructor(props) {
        super(props);

        this.state = {
            ...props,

            editPostModalShow: false
        }

    }

    render() {

        return (
            <div className="post-container">
                <h2>{this.state.title}</h2>
                {this.state.imgSrc ? (<img src={this.state.imgSrc}></img>) : null}
                <p>{this.state.text}</p>
                
                <div>
                    <Button bsSize="large" bsStyle="primary" onClick={this.onOpenModal}>Edit</Button>
                </div>

                <Modal
                    open={this.state.editPostModalShow}
                    onClose={this.onCloseModal}
                    center
                    classNames={{ overlay: 'custom-overlay', modal: 'custom-modal' }}>

                    <EditPostForm id={this.state.id} title={this.state.title} text={this.state.text}
                        imgSrc={this.state.imgSrc} updatePost={this.updatePost} />

                </Modal>
            </div>
        )
    }

    componentWillReceiveProps(props) {
        if (
            props.title !== this.props.title ||
            props.text !== this.props.text ||
            props.imgSrc !== this.props.imgSrc
        ) {
            this.setState({ ...props })
        }
    }

    onOpenModal = () => {
        this.setState({
            editPostModalShow: true
        })
    }

    onCloseModal = () => {
        this.setState({
            editPostModalShow: false
        })
    }

    updatePost = (post) => {
        this.props.updatePost(post);

        this.onCloseModal();
    }

}

export default Post;