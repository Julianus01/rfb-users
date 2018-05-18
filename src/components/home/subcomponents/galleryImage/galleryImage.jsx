import React, {Component} from 'react';
import './galleryImage.css';

class GalleryImage extends Component{
    constructor(props){
        super(props);

        this.state = {
            image: this.props.image
        }
    }

    render(){
        
        return(
            <div>
                <img src={this.state.image.imgSrc}/>
            </div>
        )
    }

    componentWillReceiveProps(props) {
        if(props !== this.state.image){
            this.setState({ ...props });
        }
    }
}

export default GalleryImage;