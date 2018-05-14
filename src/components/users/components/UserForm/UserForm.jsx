import React, { Component } from 'react';
import './UserForm.css';

class UserForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            avatar: null
        }
    }

    render() {
        return (
            <div>
                <input placeholder="First Name" onChange={this.handleFirstNameInput}
                    value={this.state.firstName} onKeyPress={this.handleKeyPress} />
                <input placeholder="Last Name" onChange={this.handleLastNameInput}
                    value={this.state.lastName} onKeyPress={this.handleKeyPress} />

                <progress value="0" max="100">0%</progress>
                <input type="file" onChange={this.handleImageChange} />

                <button onClick={this.addUser}>Add User</button>
            </div>
        );
    }

    handleFirstNameInput = (event) => {
        this.setState({ firstName: event.target.value })
    }

    handleLastNameInput = (event) => {
        this.setState({ lastName: event.target.value })
    }

    handleImageChange = (event) => {
        this.setState({ avatar: event.target.files[0] })
    }

    addUser = () => {
        this.props.addUser({
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            avatar: this.state.avatar
        });

        this.setState({
            firstName: '',
            lastName: '',
            avatar: null
        })
    }

    handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            this.addUser();
        }
    }
}

export default UserForm;