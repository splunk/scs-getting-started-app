/**
 * Copyright 2019 Splunk, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"): you may
 * not use this file except in compliance with the License. You may obtain
 * a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 */

import React, { Component } from 'react';
import authClient from './auth';
import { tenantId, auth } from './config/config.json';
import Dashboard from './Dashboard';
import { Center, ErrorCircle, ErrorMsg, GlobalStyle, List, ListItem } from './styles';

/**
  * This is the main React component which has states corresponding to:
  *   configured: whether the app has been properly configured with a client id and tenant
  *   loggedIn:   whether the user is currently logged into Splunk Cloud Services
  *   error:      any errors that may have resulted from login or other services
  *  
  */
class App extends Component {
    state = {
        configured: tenantId !== 'YOUR TENANT ID' && auth.clientId !== 'YOUR CLIENT ID',
        loggedIn: false,
        error: null,
    };

    componentDidMount() {
        const { configured } = this.state;
        if (configured === true) {
            this.authenticate();
        }
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
                error: ex.errorCode,
            });
        }
    };

    render() {
        const { configured, loggedIn, error } = this.state;
        // For the error case give some common resolution steps related to app setup if login related or
        // display the error itself otherwise
        if (error) {
            if (!loggedIn) {
                // Clear any tokens from storage as login failed
                authClient.tokenManager.clear();
                return (
                    <React.Fragment>
                        <GlobalStyle />
                        <ErrorMsg><ErrorCircle>!</ErrorCircle>Error logging in, try the following:</ErrorMsg>
                        <List>
                            <ListItem>✔ Log into <a href='https://si.scp.splunk.com' target='_blank'>https://si.scp.splunk.com</a> and accept the Terms of Service</ListItem>
                            <ListItem>✔ Verify that your clientId ({auth.clientId}) corresponds to a web app that you have created <a href='https://dev.splunk.com/scs/docs/apps' target='_blank'>[more info]</a></ListItem>
                            <ListItem>✔ Verify that your tenant is subscribed to the app corresponding to {auth.clientId} <a href='https://dev.splunk.com/scs/docs/apps/subscribe' target='_blank'>[more info]</a></ListItem>
                        </List>
                        <ErrorMsg>Code: {error}</ErrorMsg>
                    </React.Fragment>
                );
            }
            return (
                <Center>
                    <GlobalStyle />
                    <ErrorMsg><ErrorCircle>!</ErrorCircle>{error}</ErrorMsg>
                </Center>
            );
        }
        // Instruct the user to update their config.json if the client id or tenant haven't been entered
        if (!configured) {
            return (
                <Center>
                    <GlobalStyle />
                    <ErrorMsg><ErrorCircle>!</ErrorCircle>
                    Configure your clientId and tenantId in src/config/config.json to continue</ErrorMsg>
                </Center>
            );
        }
        // Temporarily display Loading... text while redirecting to login to Splunk Cloud Services
        if (!loggedIn) {
            return (
                <Center>
                    <GlobalStyle />
                    <div>Loading...</div>
                </Center>
            );
        }
        // If the app is configured and the user is logged in, display the Dashboard component
        return (
            <React.Fragment>
                <GlobalStyle />
                <Dashboard />
            </React.Fragment>
        );
    }
}

export default App;
