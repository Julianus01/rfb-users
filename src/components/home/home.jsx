import React, { Component } from 'react';
import './home.css';
import Gallery from './subcomponents/gallery/gallery.jsx';
import ImageForm from './subcomponents/imageForm/imageForm.jsx';
import firebase from 'firebase';

class Home extends Component {

    constructor() {
        super();

        this.state = {
            images: []
        }

        this.db = firebase.database().ref('images/dogs');
        this.storage = firebase.storage();
    }

    render() {
        return (
            <div>
                <ImageForm uploadImage={this.uploadImage} />
                <Gallery images={this.state.images} deleteImage={this.deleteImage} />
            </div>
        );
    }

    componentWillMount() {
        var images = this.state.images;

        this.db.on('child_added', snap => {
            images.push({
                key: snap.key,
                imgSrc: snap.val().imgSrc
            })

            this.setState({ images });
        });

        this.db.on('child_removed', snap => {
            for (var i = 0; i < images.length; i++) {
                if (images[i].key === snap.key) {
                    images.splice(i, 1);
                }
            }

            this.setState({ images });
        })
    }

    uploadImage = (image) => {
        // Create new user entry and ref storage

        var key = this.db.push().key;
        var storageRef = this.storage.ref('images/dogs/' + key);

        var uploadTask = storageRef.put(image);
        uploadTask.on('state_changed', snap => {

        }, (err) => {

        }, () => {
            // Update new user entry with data
            var downloadUrl = uploadTask.snapshot.downloadURL;
            var newImage = this.db.child(key);
            newImage.set({
                imgSrc: downloadUrl
            })
        })
    }

    deleteImage = (key) => {
        this.db.child(key).remove();
        this.storage.ref('images/dogs/').child(key).delete();
    }

}

export default Home;