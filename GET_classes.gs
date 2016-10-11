var baseUrl = "https://YOUR_SUB_DOMAIN_HERE.managebac.com/api/classes?auth_token=";
var auth_token = "YOUR_PUBLIC_API_KEY_HERE"
var classUrl = baseUrl + auth_token;

//retrieve all classes
function callManagebacClasses(){

  var response = UrlFetchApp.fetch(classUrl);
  
  return response;
  
}

//return all classes as JSON object
function getJson(response){

  var object = JSON.parse(response.getContentText());
  
  return object;

}

function processClassObject(){

  var object = getJson(callManagebacClasses());
  
  Logger.log(object);

  var classTypeArray = [["class_type"]];
  var classUniqArray = [["uniq_id"]];
  var classNameArray = [["name"]];
  var classGradeArray = [["grade"]];
  var classIdArray = [["id"]];
  
  var class = [];
    
  for(var i = 0; i < object.classes.length; i++){

    classTypeArray.push([object.classes[i].class_type]);

    classUniqArray.push([object.classes[i].uniq_id]);
    
    classNameArray.push([object.classes[i].name]);

    classGradeArray.push([object.classes[i].grade]);
    
    classIdArray.push([object.classes[i].id.toString()]);
    
  }
  
  var ssTitle = "ManageBac class report " + new Date();
  var ss = SpreadsheetApp.create(ssTitle);
  ss.getSheetByName('Sheet1').setName('Report');
    
  var sheet = ss.getSheetByName('Report');
  //sheet.getRange("E:E").setNumberFormat('@STRING@');
  var total = classIdArray.length;
  
  sheet.getRange(1, 1, total, 1).setValues(classTypeArray);
  sheet.getRange(1, 2, total, 1).setValues(classUniqArray);
  sheet.getRange(1, 3, total, 1).setValues(classNameArray);
  sheet.getRange(1, 4, total, 1).setValues(classGradeArray);
  sheet.getRange(1, 5, total, 1).setValues(classIdArray);
  
}
