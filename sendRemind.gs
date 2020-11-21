function sendRemindMessage() {
  var accessToken = PropertiesService.getScriptProperties().getProperty('LINE_TOKEN_TOME');
  var cal = CalendarApp.getCalendarById('5i1qf9t1pqaedan59ueaf4bcu4@group.calendar.google.com');  
  var today = Utilities.formatDate(new Date(), 'JST', 'M/d');
  var weightData = getweight(cal);
  
  //LINEbotで通知
  if (cal = '本日の記録がありません。') {
      var sendToLineMessage =
       {
         'method'  : 'post'
        ,'payload' : 'message=' + '\n' + today + '今日の体重記録忘れてるよ～'
        ,'headers' : {'Authorization' : 'Bearer '+ accessToken}
        ,muteHttpExceptions:true
       };
      UrlFetchApp.fetch('https://notify-api.line.me/api/notify', sendToLineMessage);
  };
}