const path = require("path");
var fs = require('fs');

exports.imageExport = async(req, res , folderpath)=>{
    try {

      let body = req.body
      // delete old file if exist
      if(body._filename != 0){

        var deleteuploadPath = path.resolve(
          __dirname,
          `../../uploads/${folderpath}/images${body._filename}`
        );
        fs.stat(deleteuploadPath, function (error, stats) {
         //here we got all information of file in stats variable
       
          if (error) {
              return  {  message: error }
          }
       
          fs.unlink(deleteuploadPath,function(error){
               if(error) return {  message: error }
          });  
       });
  
      }
     
      // upload new file 
            const file = req.files.file
            const extName = path.extname(file.name);
            const imgList = [".pdf", ".PDF"];
            if (!imgList.includes(extName)) {
              return  {message: "invalid file format"}
            }
            const image_name = Date.now() + extName;
            var uploadPath = path.resolve(
              __dirname,
              `../../uploads/${folderpath}/images`+ image_name
            );

            file.mv(uploadPath, function (error, result) {
              if (error) {
                return {  message: error } ;
              }
            });

        return image_name ;

      } catch (error) {
        return {message: error }
      }
}


