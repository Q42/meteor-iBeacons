if (Meteor.isCordova) {
    Meteor.startup(function(){
        var logToDom = function (message) {
            console.log(message);
        };

        var delegate = new cordova.plugins.locationManager.Delegate();

        delegate.didDetermineStateForRegion = function (pluginResult) {

            logToDom('[DOM] didDetermineStateForRegion: ' + JSON.stringify(pluginResult));

            cordova.plugins.locationManager.appendToDeviceLog('[DOM] didDetermineStateForRegion: '
                                                              + JSON.stringify(pluginResult));
        };

        delegate.didStartMonitoringForRegion = function (pluginResult) {
            console.log('didStartMonitoringForRegion:', pluginResult);

            logToDom('didStartMonitoringForRegion:' + JSON.stringify(pluginResult));
        };

        delegate.didRangeBeaconsInRegion = function (pluginResult) {
            logToDom('[DOM] didRangeBeaconsInRegion: ' + JSON.stringify(pluginResult));
            // update beacons
        };

        // see: https://github.com/petermetz/cordova-plugin-ibeacon

        var uuid = 'B9407F30-F5F8-466E-AFF9-25556B57FE6D';
        var identifier = 'beaconOnTheMacBooksShelf';
        var major = 4215;
        var minor = 1;
        beacons.forEach(function(b) {
        var beaconRegion = new cordova.plugins.locationManager.BeaconRegion(b.identifier,uuid, b.major, b.minor);

            cordova.plugins.locationManager.setDelegate(delegate);

            // required in iOS 8+
            cordova.plugins.locationManager.requestWhenInUseAuthorization();
            // or cordova.plugins.locationManager.requestAlwaysAuthorization()

            cordova.plugins.locationManager.startRangingBeaconsInRegion(beaconRegion)
              .fail(console.error)
              .done();

        })


    })
}
