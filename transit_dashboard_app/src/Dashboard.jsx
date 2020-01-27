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

import React from 'react';
import DashboardCore from '@splunk/dashboard-core';
import CloudPreset from '@splunk/dashboard-presets/CloudPreset';
import authClient from './auth';
import { tenantId, cloudApiUrl } from './config/config.json';
import definition from './definition.json';

/**
  * Dashboard component based on the @splunk/dashboard-core framework for displaying our transit data.
  * The dashboard definition.json file contains the actual dashboard searches and layout information and 
  * can be viewed and edited using Splunk Investigate.
  */
export default () => (
    <div>
        <DashboardCore
            preset={CloudPreset}
            definition={definition}
            dataSourceContext={{
                cloudApiUrl,
                tenantId,
                authClient,
            }}
            height='100vh'
      />
  </div>
);
