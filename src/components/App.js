import React, {Component} from 'react';
import NewUserForm from './NewUserForm';
import UserList from './UserList';
import {connect} from 'react-redux';
import {getUsersRequest, createUserRequest, deleteUserRequest, usersError} from "../actions/users";
import {Alert} from 'reactstrap';
import DashboardPage from "../pages/DashboardPage";
import './App.css'

class App extends Component {
    constructor(props){
        super(props);
        this.props.getUsersRequest();
    }

    handleCreateUserSubmit = ({firstName, lastName}) => {
        this.props.createUserRequest({
            firstName,
            lastName
        });

    };

    handleDeleteUserClick = (userId) => {
        this.props.deleteUserRequest(userId);
    };

    handleCloseAlert = () => {
        this.props.usersError({
            error: ''
        });
    };

    render(){
        const users = this.props.users
        // const { users, cre, deleteUserRequest, usersError } = this.props;
        return (
            <div style={{margin: '0 auto', padding: '20px', maxWidth: '100%'}}>
                <DashboardPage>
                    users={users}
                    createUserRequest={users.createUserRequest}
                    deleteUserRequest={users.deleteUserRequest}
                    usersError={users.usersError}
                </DashboardPage>
                <h2>Users</h2>
                <Alert color="danger" isOpen={!!users.error} toggle={usersError}>
                    {users.error}
                </Alert>
                <NewUserForm onSubmit={createUserRequest} />
                {!!users.items && !!users.items.length}
                <UserList onDeleteUserClick={deleteUserRequest} users={users.items} />
            </div>
        );
    }
}

export default connect(({users}) => ({users}), {
    getUsersRequest,
    createUserRequest,
    deleteUserRequest,
    usersError
})(App);