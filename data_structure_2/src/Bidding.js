function Bidding(sms_json) {

}

Bidding.create_new_bid = function (activity_id) {
    var activities = Activity.get_activities();
    var current_activity = Activity.get_the_activity(activity_id)
    var counter = current_activity.bids.length + 1;
    var bid_name = "竞价" + counter;
    _.map(activities, function (value, key) {
        if (key == activity_id) {
            value.bids.push(bid_name);
            value.biddings[bid_name] = [];
        }
    });
    localStorage.setItem("activities", JSON.stringify(activities));
};


Bidding.sign_up_sms = function (sms_json) {
    if (localStorage.is_bidding == "true") {
        if (_.find(Activity.get_the_activity(Activity.get_current_activity()).sign_ups, function (sign_up_people) {
            return sign_up_people.phone == sms_json.messages[0].phone;
        }) !== undefined) {
            return Bidding.judge_same(sms_json)
        }
    }
};


Bidding.judge_same = function (sms_json) {
    var current_activity = Activity.get_currently_active_biddings();
    var current_bid = Activity.get_current_bid();
    var bidding = Bidding.apply(sms_json)
    if (_.find(current_activity, function (the_bidding) {
        return the_bidding.phone == bidding.phone
    }) == undefined) {
        return Bidding.save(sms_json);
    }
}


Bidding.apply = function (sms_json) {
    var bidding = {}
    bidding.phone = sms_json.messages[0].phone;
    bidding.price = sms_json.messages[0].message.substr(2).replace(/^\s+/g, '');
    return bidding
}


Bidding.save = function (sms_json) {
    var activities = Activity.get_activities();
    var current_bid = Activity.get_current_bid();
    var bidding = Bidding.apply(sms_json)
    _.each(activities, function (value, key) {
        if (key == Activity.get_current_activity()) {
            value.biddings[current_bid].push(bidding);
        }
    });
    localStorage.setItem('activities', JSON.stringify(activities));
}

function transform_bids_to_view_model(activity_id) {
    return  Activity.get_the_activity(activity_id).bids;
}


function transform_biddings_to_view_model(activity_id,bid_name){
    var activities = Activity.get_activities();
    var current_activity = Activity.get_the_activity(activity_id);
    var biddings = current_activity.biddings;
    console.log(biddings[bid_name],'biddings')
    var bid_price = _.chain(biddings[bid_name])
        .groupBy(function (bidding) {
            return parseInt(bidding.price);
        })
        .map(function(value,key){
            return{"price":key,"count":value.length}
        })
        .find(function(bidding){
            return bidding.count == 1;
        })
        .value();
    console.log(bid_price,'bid_price')
    var winner =_.find(biddings[bid_name],function(bidding){
        return bidding.price == bid_price.price
    })
    console.log(winner,'winner')
    var sign_up = _.find(Activity.get_the_activity(activity_id).sign_ups,function(sign_up){
        return sign_up.phone == winner.phone;
    })
    var winner_infos = [];
    var winner_info = {"name":sign_up.name,"phone":winner.phone,"price":winner.price}
    winner_infos.push(winner_info);
    return winner_infos;

}

























