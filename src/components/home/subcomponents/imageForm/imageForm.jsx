import React, { Component } from 'react';
import './imageForm.css';

class ImageForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            image: null
        }
    }

    render() {
        return (
            <div>
                <input type="file" onChange={this.handleImageChange}/>
                <button onClick={this.uploadImage}>Upload Image</button>
            </div>
        )
    }

    handleImageChange = (event) => {
        this.setState({
            image: event.target.files[0]
        })
    }

    uploadImage = () => {
        this.props.uploadImage(this.state.image);
    }
}

export default ImageForm