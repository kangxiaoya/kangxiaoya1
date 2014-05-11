function notify_sms_received(sms_json){
    var message_keyword = sms_json.messages[0].message.substr(0,2);
    var check_json = {
        BM: function () {
            SignUp.activity_sign_up_sms(sms_json)
        },
        JJ: function () {
            Bidding.bid_sign_up_sms(sms_json)
        }
    }
    if (check_json[message_keyword]) {
        check_json[message_keyword]()
    }



}





