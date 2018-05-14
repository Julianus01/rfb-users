import React, { Component } from 'react';
import './users.css';
import User from './components/user/user.jsx';
import UserForm from './components/UserForm/UserForm.jsx';
import '../../db_config/db_config'; // DB_CONFIG
import firebase from 'firebase';

class Users extends Component {

    constructor(props) {
        super(props);

        this.state = {
            users: []
        }

        this.db = firebase.database().ref().child('users');
        this.storage = firebase.storage();
    }

    render() {
        return (
            <div className="users-page">
                <UserForm addUser={this.addUser} />
                <div>
                    <h2>Users</h2>
                    <div className="users-list">
                        {this.state.users.map(user => {
                            return (
                                <User key={user.id} id={user.id} firstName={user.firstName}
                                    lastName={user.lastName} avatar={user.avatar}
                                    deleteUser={this.deleteUser} />
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }

    componentWillMount() {
        var users = this.state.users;

        // Update on User added
        this.db.on('child_added', snap => {
            users.push({
                id: snap.key,
                firstName: snap.val().firstName,
                lastName: snap.val().lastName,
                avatar: snap.val().avatar
            })

            this.setState({ users })
        })

        // Update on User removed
        this.db.on('child_removed', snap => {
            for (var i = 0; i < users.length; i++) {
                if (users[i].id === snap.key) {
                    users.splice(i, 1);
                }
            }

            this.setState({ users })
        })
    }

    addUser = (user) => {
        // Create new user entry and ref storage
        var postKey = this.db.push().key;
        var storageRef = this.storage.ref('users/images/' + postKey);
        var uploadTask = storageRef.put(user.avatar);

        uploadTask.on('state_changed', snap => {

        }, (err) => {

        }, () => {
            // Update new user entry with data
            var downloadUrl = uploadTask.snapshot.downloadURL;
            var updates = {};
            var postData = {
                firstName: user.firstName,
                lastName: user.lastName,
                avatar: downloadUrl
            }

            updates['/users/' + postKey] = postData;
            firebase.database().ref().update(updates);
        })
    }

    deleteUser = (id) => {
        this.db.child(id).remove();
        this.storage.ref('users/images').child(id).delete();
    }

}


export default Users;