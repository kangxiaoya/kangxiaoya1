function Activity(activity_name){
    this.name=activity_name;
    this.sign_ups=[];
    this.bids=[];
    this.sign_ups.name='';
    this.sign_ups.phone='';
};

Activity.prototype.create = function () {
    var activities = Activity.get_activities();
    activities.unshift(this)
    localStorage.setItem("activities", JSON.stringify(activities))
};

Activity.prototype.active=function(){
    localStorage.current_activity= this.name;
};


Activity.get_activities = function(){
    return JSON.parse(localStorage.activities);
};

Activity.get_current_activity = function(){
    return localStorage.current_activity;
};

Activity.get_the_activity = function(activity_name){
    var activities = Activity.get_activities();
    return _.find(activities, function(the_activity){
        return the_activity['name'] == activity_name;
    });

};

