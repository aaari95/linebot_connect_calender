function todayWeight() {
  var accessToken = PropertiesService.getScriptProperties().getProperty('LINE_TOKEN');
  var cal = CalendarApp.getCalendarById('5i1qf9t1pqaedan59ueaf4bcu4@group.calendar.google.com');  
  var today = Utilities.formatDate(new Date(), 'JST', 'M/d');
  var weightData = getweight(cal);
  
  //LINEbotで通知
  var sendToLineMessage =
   {
     'method'  : 'post'
    ,'payload' : 'message=' + '\n' + today + 'の体重報告：' + weightData
    ,'headers' : {'Authorization' : 'Bearer '+ accessToken}
    ,muteHttpExceptions:true
   };
  UrlFetchApp.fetch('https://notify-api.line.me/api/notify', sendToLineMessage);
  
  //スプレッドシートに追記する処理
  var sheet =　SpreadsheetApp.openById("1KSGTBwn_z3YXS3jEwqJl5DmwGZ25hkA_QKz_i09b8ek").getSheetByName("体重管理シート");
  var lastRow = sheet.getLastRow() + 1;
    for(let i = 2; i <= lastRow; i++) {
      if(!sheet.getRange(i, 1).getValue()){
        sheet.getRange(i, 1).setValue(today);
        sheet.getRange(i, 2).setValue(weightData);
      }
    }
}

/**
* カレンダーからイベント取得し体重を返す
* @param {number} 今日起算の日数
* @return {string} メッセージ内容
*/
function getweight(prmCal) {
  var strWeight = '';
  var arrWeight = prmCal.getEventsForDay(new Date());
  if ( _isNull(arrWeight) ) strWeight = '本日の記録がありません。';
     for (var i=0; i<arrWeight.length; i++) {
           strWeight += arrWeight[i].getTitle();
     }
  return strWeight;
}

/**
* NULL判定
* @param {object} 判定対象
* @return {bool} NULLの場合TRUE
*/
function _isNull(prm) {
  if ( prm=='' || prm===null || prm===undefined ) {
    return true;
  } else {
    return false;
  }
}
