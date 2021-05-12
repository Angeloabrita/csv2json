

function csvJSON(csv){

  var lines=csv.split("\n");

  var result = [];

  // NOTE: If your columns contain commas in their values, you'll need
  // to deal with those before doing the next step 
  // (you might convert them to &&& or something, then covert them back later)
  // jsfiddle showing the issue https://jsfiddle.net/
  var headers=lines[0].split(",");

  for(var i=1;i<lines.length;i++){

      var obj = {};
      var currentline=lines[i].split(",");

      for(var j=0;j<headers.length;j++){
          obj[headers[j]] = currentline[j];
      }

      result.push(obj);

  }
 
  //return result; //JavaScript object
  return JSON.stringify(result); //JSON
}

//read and show file 
function readSingleFile(e) {
  var file =  e.target.files[0];
  var extension = file.name.split('.').pop().toLowerCase();
 
 //check extension
 if(extension == 'csv'){

   if (!file) {
     return;
   }
   var reader = new FileReader();
   reader.onload = function(e) {
     var contents = e.target.result;
     displayContents(contents);
     $dataJson = csvJSON(contents);
   };
   reader.readAsText(file);
 }
 else{
   alert("Ops! use uma extenção .CSV para ser convertido. Wololo!")
 }


}


  

//check estension 



function displayContents(contents) {
  var element = document.getElementById('file-content');
  element.textContent = contents;
}

document.getElementById('file-upload')
  .addEventListener('change', readSingleFile, false);


//list of inout and variables
var $input    = document.getElementById("file-upload"),
    $fileName = document.getElementById('file-name');
    $fileOut = document.getElementById('file-out');
    $dataJson = [];
    $btnSelect = document.getElementById('btn-converter')
    $btnReset = document.getElementById('btn-reset');
    

$input.addEventListener('change', function(){
  $fileName.textContent = this.value;
});


//onclick action in converter button
$btnSelect.onclick = function(){
  formato = document.getElementById('formato')
  if(formato.value == 'JSON'){
    $fileOut.textContent = $dataJson;
    //create input dowload
    document.getElementById('form1').innerHTML = '<input type="submit" value="baixar" id="dwn-btn"></input>'
    
    // Start file download.
    document.getElementById("dwn-btn").addEventListener("click", function(){
    // Generate download of hello.txt file with some content
    var text = $dataJson;
    var filename = "converted.json";
    download(filename, text);
  }, false);

  }
  else if(formato.value=='CSV'){
    alert('https://www.youtube.com/watch?v=Xr4ZB4FANMA')
  }

  else{
    alert('Ainda não estou convertendo para esse formato. Wololo!')
  }
}

//onclick btn donwload
function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
  
}

//onclick reset data
$btnReset.onclick = function(){
  location.reload();
  return false;
}







