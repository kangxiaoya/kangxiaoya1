function Bid(activity_id) {
    this.activity_id = activity_id;
    this.name = "竞价" + Bid.get_current_activity_bids(activity_id).length + 1;
    this.biddings = [];
}

Bid.create_new_bid = function (activity_id) {
    var bids = JSON.parse(localStorage.bids)
    var bid = new Bid(activity_id);
    bids.push(bid);
    localStorage.setItem('bids', JSON.stringify(bids));
};

Bid.get_bids = function () {
    return JSON.parse(localStorage.bids);
};

Bid.get_current_bid = function () {
    return localStorage.current_bid;
};

Bid.get_current_biddings = function () {
    var bid = _.find(Bid.get_bids(), function (the_bid) {
        return the_bid.name == Bid.get_current_bid() && the_bid.activity_id == Activity.get_current_activity()
    })
    return bid.biddings;
};


Bid.get_the_biddings = function (activity_id,bid_name) {
    var bid = _.find(Bid.get_bids(), function (the_bid) {
        return the_bid.name == bid_name && the_bid.activity_id == activity_id
    })
    return bid.biddings;
};

Bid.get_current_activity_bids = function (activity_id) {
    return _.filter(Bid.get_bids(), function (bid) {
        return bid.activity_id == activity_id;
    });
};

Bid.render_bids = function (activity_id) {
    return _.filter(Bid.get_bids(), function (bid) {
        return bid.activity_id == activity_id;
    })
}