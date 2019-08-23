/*
Copyright © 2018 Splunk Inc.
SPLUNK CONFIDENTIAL – Use or disclosure of this material in whole or in part
without a valid written license from Splunk Inc. is PROHIBITED.
*/

import 'babel-polyfill';
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import Application from './Application';

const renderApp = container => {
    unmountComponentAtNode(container);
    render(<Application />, container);
};

(() => {
    const containerEl = document.createElement('div');
    document.body.appendChild(containerEl);
    renderApp(containerEl);
})();
