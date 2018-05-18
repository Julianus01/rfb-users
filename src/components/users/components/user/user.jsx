import React, { Component } from 'react';
import './user.css';

class User extends Component {

    constructor(props) {
        super(props);

        this.id = this.props.id;
        this.firstName = this.props.firstName;
        this.lastName = this.props.lastName;
        this.avatar = this.props.avatar;
    }

    render() {
        return (
            <div className="user-container">
                <p>{this.firstName}</p>
                <p>{this.lastName}</p>
                <img src={this.avatar}/>
                <button className="btn btn-danger"
                    onClick={() => this.deleteUser(this.id)}>Delete</button>
            </div>
        )
    }

    deleteUser = (id) => {
        this.props.deleteUser(id);
    }

}

export default User;