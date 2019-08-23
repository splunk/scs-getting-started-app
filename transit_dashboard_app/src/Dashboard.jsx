/*
Copyright © 2018 Splunk Inc.
SPLUNK CONFIDENTIAL – Use or disclosure of this material in whole or in part
without a valid written license from Splunk Inc. is PROHIBITED.
*/

import React, { Component } from 'react';
import UniversalNavView from '@splunk/universal-nav/UniversalNavView';
import DashboardCore from '@splunk/dashboard-core';
import DefaultPreset from '@splunk/dashboard-presets/DefaultPreset';
import Heading from '@splunk/react-ui/Heading';
import authClient from './services/auth';
import { tenantId, cloudApiUrl } from './config/config.json';
import definition from './definition';

const options = {
    app: {
        title: 'Transit Route Data',
        version: '1.0',
        builtBy: 'Splunk',
        license: 'https://www.splunk.com/',
    },
    tenantName: tenantId,
    home: 'https://sdc.splunkbeta.com'
};
const context = {
    idpClient: authClient,
};

export default () => (
    <div>
        <UniversalNavView options={options} context={context} />
        <DashboardCore
            preset={DefaultPreset}
            definition={definition}
            dashboardContext={{
                cloudApiUrl: cloudApiUrl,
                tenantId: tenantId,
                authClient,
            }}
        />
    </div>
);
