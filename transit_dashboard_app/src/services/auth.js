/*
Copyright © 2018 Splunk Inc.
SPLUNK CONFIDENTIAL – Use or disclosure of this material in whole or in part
without a valid written license from Splunk Inc. is PROHIBITED.
*/

import OktaAuth from '@splunk/cloud-auth/OktaAuth';

import { auth as authConfig } from '../config/config.json';

export default new OktaAuth({
    ...authConfig,
    redirectUri: window.location.origin, // eslint-disable-line
});
