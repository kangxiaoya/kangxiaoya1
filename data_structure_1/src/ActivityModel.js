function Activity(activity_name){
    this.name=activity_name;
    this.sign_ups=[];
    this.bids=[];
    this.sign_ups.name='';
    this.sign_ups.phone='';
}

Activity.prototype.create=function(){
  var activities=JSON.parse(localStorage.getItem('activities'))
    activities.unshift(this)
    localStorage.setItem("activities",JSON.stringify(activities))
}

Activity.prototype.active=function(){
    localStorage.current_activity=this.name

}
