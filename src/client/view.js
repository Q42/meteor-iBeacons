var prev = null;
Template.hello.helpers({

    region: function() {
        var regions = Regions.find({ state : 'CLRegionStateInside' }).fetch();
        console.log(regions);
        if (regions.length == 1)
            return regions[0];

        return { data : { identifier: '?' }};
    },
    allRegions: function() {
        return  Regions.find().fetch();
    },

    here: function() {
        return this && this.state == 'CLRegionStateInside';
    }
});
