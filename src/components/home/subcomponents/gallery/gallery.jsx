import React, { Component } from 'react';
import './gallery.css';
import GalleryImage from '../galleryImage/galleryImage.jsx';

class Gallery extends Component {

    constructor(props) {
        super(props)

        this.state = {
            images: []
        }
    }

    render() {
        return (
            <div>
                <div className="gallery-container">
                    {this.state.images.map(image => {
                        return (
                            <div key={image.key} className="gallery-element">
                                <GalleryImage key={image.key} image={image} />
                                <button className="btn btn-danger"
                                    onClick={() => this.deleteImage(image.key)}>Delete</button>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }

    componentDidMount() {
        this.setState({
            images: this.props.images
        })
    }

    deleteImage = (key) => {
        this.props.deleteImage(key);
    }
}

export default Gallery;