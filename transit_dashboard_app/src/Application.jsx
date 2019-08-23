/*
Copyright © 2018 Splunk Inc.
SPLUNK CONFIDENTIAL – Use or disclosure of this material in whole or in part
without a valid written license from Splunk Inc. is PROHIBITED.
*/

import React, { Component } from 'react';
import WaitSpinner from '@splunk/react-ui/WaitSpinner';
import Message from '@splunk/react-ui/Message';
import authClient from './services/auth';
import Dashboard from './Dashboard';
import { Center } from './styles';

class Application extends Component {
    state = {
        loggedIn: false,
        error: null,
    };

    componentDidMount() {
        this.authenticate();
    }

    authenticate = async () => {
        try {
            // authClient will redirect to login page if user is not authenticated.
            const authenticated = await authClient.checkAuthentication();
            this.setState({
                loggedIn: authenticated,
            });
        } catch (ex) {
            this.setState({
                loggedIn: false,
                error: ex.message,
            });
        }
    };

    render() {
        const { loggedIn, error } = this.state;
        if (error) {
            return (
                <Center>
                    <Message type="error">{error}</Message>
                </Center>
            );
        }
        if (!loggedIn) {
            return (
                <Center>
                    <WaitSpinner screenReaderText="Loading..." />
                </Center>
            );
        }
        return (
            <Dashboard />
        );
    }
}

export default Application;
