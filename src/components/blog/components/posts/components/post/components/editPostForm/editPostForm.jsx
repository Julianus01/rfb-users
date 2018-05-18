import React, { Component } from 'react';
import './editPostForm.css';
import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';

class EditPostForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            ...props
        }
        
    }

    render() {
        return (
            <div className='editPostForm-wrapper'>
                    <FormGroup controlId="formBasicText">
                        <h2>Edit your post</h2>

                        <ControlLabel>Title:</ControlLabel>
                        <FormControl
                            type="text"
                            placeholder="Title"
                            value={this.state.title}
                            onChange={this.handleTitleInput}
                        />

                        {/* <ControlLabel>Title:</ControlLabel>
                        <FormControl
                            type="text"
                            placeholder="Title"
                            value={this.state.title}
                        /> */}

                        <ControlLabel>Text:</ControlLabel>
                        <textarea 
                            cols="30" 
                            rows="15"
                            placeholder='Text'
                            value={this.state.text}
                            onChange={this.handleTextInput}>

                        </textarea>


                        <FormControl.Feedback />

                        <Button bsStyle='primary' onClick={this.updatePost}>Save</Button>

                    </FormGroup>
            </div>
        )
    }

    handleTitleInput = (event) => {
        this.setState({
            title: event.target.value
        })
    }

    handleTextInput = event => {
        this.setState({
            text: event.target.value
        })
    }

    updatePost = () => {
        let post = {
            id: this.state.id,
            title: this.state.title,
            text: this.state.text,
            imgSrc: this.state.imgSrc
        }

        this.props.updatePost(post);

        this.setState({
            title: '',
            text: '',
            imgSrc: ''
        })
    }

    // Lifecycle

}

export default EditPostForm;