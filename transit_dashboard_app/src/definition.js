/*
Copyright © 2018 Splunk Inc.
SPLUNK CONFIDENTIAL – Use or disclosure of this material in whole or in part
without a valid written license from Splunk Inc. is PROHIBITED.
*/

export default {
    dataSources: {
        num_agencies_search: {
            options: {
                query: `| from index:main where source="agencies_with_coverage_json" | stats dc('id') as numAgencies`,
                queryParameters: {
                    earliest: '0',
                    latest: 'now',
                },
            },
            type: 'ds.search',
        },
        num_routes_search: {
            options: {
                query: `| from index:main where source="arrivals_and_departures_json" | stats dc('data.entry.stopId') as numStops`,
                queryParameters: {
                    earliest: '0',
                    latest: 'now',
                },
            },
            type: 'ds.search',
        },
        num_stops_search: {
            options: {
                query:
                    `| from index:main where source="arrivals_and_departures_json" | stats dc('data.references.routes{}.id') as numRoutes`,
                queryParameters: {
                    earliest: '0',
                    latest: 'now',
                },
            },
            type: 'ds.search',
        },
        next_arrival_search: {
            options: {
                query: `| from index:main where source="arrivals_and_departures_json" | eval distanceFromStop='data.entry.arrivalsAndDepartures{}.distanceFromStop'| eval routeLongName='data.entry.arrivalsAndDepartures{}.routeLongName'| stats max(distanceFromStop) by routeLongName | rename 'max(distanceFromStop)' as 'Distance', routeLongName as 'Route Name' | sort +Distance`,
                queryParameters: {
                    earliest: '0',
                    latest: 'now',
                },
            },
            type: 'ds.search',
        },
        trip_distance_search: {
            options: {
                query: `| from index:main where source="arrivals_and_departures_json" | eval routeLongName='data.entry.arrivalsAndDepartures{}.routeLongName'| eval scheduledDistanceAlongTrip='data.entry.arrivalsAndDepartures{}.tripStatus.scheduledDistanceAlongTrip'| eval distanceAlongTrip='data.entry.arrivalsAndDepartures{}.tripStatus.distanceAlongTrip'| eval deltaDistanceAlongTrip=scheduledDistanceAlongTrip-distanceAlongTrip| stats max(distanceAlongTrip) by routeLongName| rename 'max(distanceAlongTrip)' as 'Distance Behind Schedule', routeLongName as 'Route Name'`,
                // query: `| from index:main where source="arrivals_and_departures_json" | eval routeLongName='data.entry.arrivalsAndDepartures{}.routeLongName'| eval scheduledDistanceAlongTrip='data.entry.arrivalsAndDepartures{}.tripStatus.scheduledDistanceAlongTrip'| eval distanceAlongTrip='data.entry.arrivalsAndDepartures{}.tripStatus.distanceAlongTrip'| eval deltaDistanceAlongTrip=scheduledDistanceAlongTrip-distanceAlongTrip| stats max(deltaDistanceAlongTrip) by routeLongName| rename 'max(deltaDistanceAlongTrip)' as 'Distance Behind Schedule', routeLongName as 'Route Name'`,
                queryParameters: {
                    earliest: '0',
                    latest: 'now',
                },
            },
            type: 'ds.search',
        },
        status_search: {
            options: {
                query: `| from index:main where source="arrivals_and_departures_json" | eval tripStatus='data.entry.arrivalsAndDepartures{}.tripStatus.status' | stats count(tripStatus) by tripStatus`,
                queryParameters: {
                    earliest: '0',
                    latest: 'now',
                },
            },
            type: 'ds.search',
        },
    },
    visualizations: {
        num_agencies: {
            type: 'viz.singlevalue',
            title: 'Number of Transit Agencies',
            options: {},
            dataSources: {
                primary: 'num_agencies_search',
            },
        },
        num_routes: {
            type: 'viz.singlevalue',
            title: 'Number of Transit Routes',
            options: {},
            dataSources: {
                primary: 'num_routes_search',
            },
        },
        num_stops: {
            type: 'viz.singlevalue',
            title: 'Number of Transit Stops',
            options: {},
            dataSources: {
                primary: 'num_stops_search',
            },
        },
        trip_distance_board: {
            type: 'viz.bar',
            title: 'Routes Behind Schedule',
            options: {},
            dataSources: {
                primary: 'trip_distance_search',
            },
        },
        status_pie: {
            type: 'viz.pie',
            title: 'Route Status',
            options: {},
            dataSources: {
                primary: 'status_search',
            },
        },
    },
    layout: {
        type: 'grid',
        options: {
            columns: 12,
        },
        structure: [
            {
                item: 'num_agencies',
                position: {
                    x: 1,
                    y: 1,
                    w: 4,
                    h: 2,
                },
            },
            {
                item: 'num_routes',
                position: {
                    x: 5,
                    y: 1,
                    w: 4,
                    h: 2,
                },
            },
            {
                item: 'num_stops',
                position: {
                    x: 9,
                    y: 1,
                    w: 4,
                    h: 2,
                },
            },
            {
                item: 'trip_distance_board',
                position: {
                    x: 1,
                    y: 3,
                    w: 6,
                    h: 4,
                },
            },
            {
                item: 'status_pie',
                position: {
                    x: 7,
                    y: 3,
                    w: 6,
                    h: 4,
                },
            },
        ],
    },
};
