var fs=require('fs');
var RiceAll=[];
var Arraynew=[];var temp={};
var obj=[];
fs.readFile("data.csv","utf8",function(err,data){
  if(err){
    return console.log(err);
  }
  else{
    var line=data.split("\r\n");
    for(var i=0;i<line.length;i++){
      Arraynew.push(line[i].split(","));
      if(Arraynew[i][0].indexOf("Agricultural Production Foodgrains Rice Volume")>-1){
        if((Arraynew[i][0].indexOf("Andhra")>-1)||
        (Arraynew[i][0].indexOf("Kerala")>-1)||
        (Arraynew[i][0].indexOf("Tamil")>-1)||
        (Arraynew[i][0].indexOf("Karnataka")>-1)
      )
          RiceAll.push(Arraynew[i]);
      }
    }
    console.log(RiceAll[0]);
    for(var j=4;j<RiceAll[0].length;j++){
          var temp={};
          temp["Andhra"]=parseFloat(RiceAll[0][j]);
          temp["Karnataka"]=parseFloat(RiceAll[1][j]);
          temp["Kerala"]=parseFloat(RiceAll[2][j]);
          temp["Tamil"]=parseFloat(RiceAll[3][j]);
          temp["year"]=Arraynew[0][j-1];
          obj.push(temp);

    }

    fs.writeFile("stackedf.json",JSON.stringify(obj,null,8),function(err){
      if(err)
      {
        console.log("error");
      }
      else{
        console.log("file saved Succesfully");
      }
    })

  }
})
