function Activity(activity_name) {
    this.id =''
    this.name = activity_name;
};

Activity.prototype.create = function (activity_name) {
    var activities = Activity.get_activities();
    var counter = Activity.get_activity_id_generator();
    this.id=counter.toString();
    activities.push(this);
    localStorage.setItem('activities', JSON.stringify(activities));
    localStorage.current_activity = counter;
    localStorage.activity_id_generator = counter + 1;
}

Activity.get_activities = function(){
    return JSON.parse(localStorage.activities);
}

Activity.get_current_activity = function(){
    return localStorage.current_activity;
}

Activity.get_activity_id_generator = function(){
    return parseInt(localStorage.activity_id_generator);
}
Activity.get_sign_ups = function(){
    return  JSON.parse(localStorage.sign_ups)
}