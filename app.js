const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");


const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){
  var firstName = req.body.fName;
  var lastName = req.body.lName;
  var email = req.body.email;

  var data = {
    members: [
      {
        email_address: email,
        status: "subscribe",
        merge_field: {
          FNAME: firstName,
          LNAME: lastName,

        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);
  const url = "https://us7.api.mailchimp.com/3.0/lists/4dcb3205f7";
  const options = {
    method: "POST",
    auth: "abhay:78e74955070c765bc921eccf408420b8-us7"
  }
  const request = https.request(url, options, function(response){
    response.on("data", function(data){
      console.log(JSON.parse(data));
    })
  })
  request.write(jsonData);
  request.end();

})

app.listen(3000, function(){
  console.log("Server is running on port 3000");
})

// 78e74955070c765bc921eccf408420b8-us7
//
