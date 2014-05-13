function notify_sms_received(sms_json){
    var message_keyword = sms_json.messages[0].message.substr(0,2);
    var check_sms = {
        BM: function () {
            SignUp.active_sms(sms_json);
        },
        JJ: function () {
        }
    };
    if (check_sms[message_keyword]) {
        check_sms[message_keyword]()
    };
};
