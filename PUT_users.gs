//THIS IS A SMALL TEST SCRIPT TO PROOF USER UPDATING VIA API


var url = "https://YOUR_SUB_DOMAIN_HERE.managebac.com/api/users/";
var auth_token = "?" + "YOUR_PUBLIC_API_KEY_HERE";
var user = "11693737"; //mBac 10 digit user id

var fullUrl = url + user + auth_token;

var payloadJSON = {user : {
                            "first_name" : "OBJECT_NAME"
                            }};

var payload = JSON.stringify(payloadJSON);
              
var options = {
                "method":"PUT",
                "contentType" : "application/json",
                "payload" : payload,
                "muteHttpExceptions" : true
              };
              
//UPDATE REQUEST
function updateTest(){

  var response = UrlFetchApp.fetch(fullUrl, options);

  Logger.log("code: " + response.getResponseCode());
  Logger.log("text: " + response.getContentText());
  Logger.log(response);
 
  return response;
  
}
