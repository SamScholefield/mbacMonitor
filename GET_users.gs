var baseUrl = "https://YOUR_SUB_DOMAIN_HERE.managebac.com/api/users?auth_token=";
var auth_token = "YOUR_PUBLIC_API_KEY_HERE"
var userUrl = baseUrl + auth_token;

//retrieve all users
function callManagebacUsers(){

  var response = UrlFetchApp.fetch(userUrl);
  
  return response;
  
}

//return all users as JSON object
function getJson(response){

  var object = JSON.parse(response.getContentText());
  
  return object;

}

//create report - run this function from Apps Script IDE
function processUsersObject(){

  var object = getJson(callManagebacUsers());
  
  Logger.log(object);
  
  //return;
  
  var userIdArray = [["mBac ID"]];
  var userFnameArray = [["fName"]];
  var userLnameArray = [["lName"]];
  var userEmailArray = [["email"]];
  var userStudentIdArray = [["studentId"]];
  var userUrlArray = [["profileUrl"]];
  var userTypeArray = [["type"]];
  var userGradeArray = [["grade"]];
  
  var user = [];
    
  for(var i = 0; i < object.users.length; i++){

    userIdArray.push([object.users[i].id.toString()]);

    userFnameArray.push([object.users[i].first_name]);
    
    userLnameArray.push([object.users[i].last_name]);

    userEmailArray.push([object.users[i].email]);
    
    if(object.users[i].student_id == null || undefined){
      userStudentIdArray.push([null]);
    }else{
      userStudentIdArray.push([object.users[i].student_id.toString()]);
    }
    
    userUrlArray.push(['=HYPERLINK("https://vis.managebac.com/users/' + object.users[i].id.toString() + '/portfolio/personal")']);
    
    userTypeArray.push([object.users[i].type]);
    
    userGradeArray.push([object.users[i].class_grade]);
    
  }
  
  var ssTitle = "ManageBac user report " + new Date();
  var ss = SpreadsheetApp.create(ssTitle);
  ss.getSheetByName('Sheet1').setName('Report');
    
  var sheet = ss.getSheetByName('Report');
  sheet.getRange("E:E").setNumberFormat('@STRING@');
  var total = userIdArray.length;
  
  sheet.getRange(1, 1, total, 1).setValues(userIdArray);
  sheet.getRange(1, 2, total, 1).setValues(userFnameArray);
  sheet.getRange(1, 3, total, 1).setValues(userLnameArray);
  sheet.getRange(1, 4, total, 1).setValues(userEmailArray);
  sheet.getRange(1, 5, total, 1).setValues(userStudentIdArray);
  sheet.getRange(1, 6, total, 1).setValues(userUrlArray);
  sheet.getRange(1, 7, total, 1).setValues(userTypeArray);
  sheet.getRange(1, 8, total, 1).setValues(userGradeArray);
  
}
