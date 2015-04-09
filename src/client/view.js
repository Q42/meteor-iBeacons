var prev = null;
Template.hello.helpers({

  beacons: function() {
    return beacons.get();
  },

  currentRoom : function() {
    var localBeacons = beacons.get();
    var currentRoom = { rssi: -Infinity };
    localBeacons.forEach(function(b){
      if (b.rssi > currentRoom.rssi)
        currentRoom = b;
    })

    return currentRoom;
  },

  width: function() {
    return 100 + this.rssi;
  }
});
