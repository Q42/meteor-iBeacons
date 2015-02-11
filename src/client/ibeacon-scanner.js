if (Meteor.isCordova) {
    Meteor.startup(function(){

        var log = function (message) {
            console.log(JSON.stringify(message));
            message.date = new Date();
            RegionEvents.insert(message);
        };

        var delegate = new cordova.plugins.locationManager.Delegate();

        delegate.didDetermineStateForRegion = function (pluginResult) {

            log(pluginResult);

            Regions.upsert(pluginResult.region.identifier, {
                _id: pluginResult.region.identifier,
                lastModified : new Date(),
                data : pluginResult.region,
                state: pluginResult.state
            })

            cordova.plugins.locationManager
                .appendToDeviceLog('[DOM] didDetermineStateForRegion: '+ JSON.stringify(pluginResult));
        };

        delegate.didStartMonitoringForRegion = function (pluginResult) {
            console.log('didStartMonitoringForRegion:', pluginResult);

            log(pluginResult);
        };

        delegate.didRangeBeaconsInRegion = function (pluginResult) {
            log(pluginResult);
        };


        cordova.plugins.locationManager.setDelegate(delegate);

        // required in iOS 8+
        cordova.plugins.locationManager.requestWhenInUseAuthorization();
        // or cordova.plugins.locationManager.requestAlwaysAuthorization()

        var uuid = 'B9407F30-F5F8-466E-AFF9-25556B57FE6D';

        var beacons = [{
                identifier: 'Europa',
                major: 27097,
                minor: 11337
            },
            {
                identifier: 'Amerika',
                major: 9460,
                minor: 36229
            },
            {
                identifier: 'Azië',
                major: 38895,
                minor: 20861
            }
        ];

        beacons.forEach(function(b) {
            var beaconRegion = new cordova.plugins.locationManager.BeaconRegion(b.identifier, uuid, b.major, b.minor);

            cordova.plugins.locationManager.startMonitoringForRegion(beaconRegion)
                .fail(console.error)
                .done();
        })

    })
}
