function Bidding(sms_json) {
    this.phone = sms_json.messages[0].phone;
    this.price = sms_json.messages[0].message.substr(2).replace(/^\s+/g, '');

};

Bidding.sign_up_sms = function (sms_json) {
    if (localStorage.is_bidding == "true") {
        Bidding.have_signing_up(sms_json);
    }
};

Bidding.have_signing_up = function (sms_json) {
    if (_.find(Activity.get_sign_ups(), function (sign_up_people) {
        return sign_up_people.phone == sms_json.messages[0].phone && sign_up_people.activity_id == Activity.get_current_activity();
    }) !== undefined) {
        return Bidding.judge_same(sms_json)
    }
};

Bidding.judge_same = function (sms_json) {
    var biddings = Bid.get_current_biddings();
    var phone = sms_json.messages[0].phone
    if (_.find(biddings, function (the_bidding) {
        return the_bidding.phone == phone
    }) == undefined) {
        return Bidding.save(sms_json);
    }
};


Bidding.save = function (sms_json) {
    var bids = Bid.get_bids();
    var bidding = new Bidding(sms_json);
    _.map(bids, function (the_bid) {
        if (the_bid.name == Bid.get_current_bid() && the_bid.activity_id == Activity.get_current_activity()) {
            the_bid.biddings.push(bidding);
        }
    });
    localStorage.setItem('bids', JSON.stringify(bids));
};


Bidding.render_biddings = function (activity_id, bid_name) {
    var biddings = Bid.get_the_biddings(activity_id,bid_name)
    var bid_price = _.chain(biddings)
        .groupBy(function (bidding) {
            return (bidding.price);
        })
        .map(function (value, key) {
            return{"price": key, "count": value.length}
        })
        .find(function (bidding) {
            return bidding.count == 1;
        })
        .value();
    var winner =_.find(biddings,function(bidding){
        return bidding.price == bid_price.price
    })
    var sign_up = _.find(Activity.get_current_activity_sign_ups(), function (sign_up) {
        return sign_up.phone ==winner .phone;
    })
    var winner_infos = [];
    var winner_info = {"name": sign_up.name, "phone": winner.phone, "price": winner.price}
    winner_infos.push(winner_info);
    return winner_infos;
}




















