const express = require('express');
const res = require('express/lib/response');
const mysql = require('mysql2');


const app = express();
app.use(express.static("public"))
app.listen("5001", function () {
    console.log("Server is Running...");
});

// Create Connection 

const dbconfig = {
    host: "127.0.0.1",
    user: "root",
    database: "GYM",
    password: "Nitin@1191"
}

const dbcon = mysql.createConnection(dbconfig);

dbcon.connect(function (nitinErr) {
    if (nitinErr == null)
        console.log("Connection successfullyyy....");
    else
        console.log(nitinErr);
});

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/public/index.html");
})

app.get("/checkemail", function (req, resp) {
    const email = req.query.email;
    dbcon.query("select * from login where email=?", [email], function (err, tableresult) {
        if (err) {
            resp.send(err);
        }
        else {
            if (tableresult.length == 1) {
                resp.send("alredy exist");
            }
            else {
                resp.send("nitin");
            }
        }


    });
});
app.get("/checklgbtn", function (req, resp) {
    const name = req.query.name;
    const email = req.query.email;
    const number = req.query.number;
    const password = req.query.password;
    console.log(email + " " + password);
    dbcon.query("insert into login values(?,?,?,?,?)", [email, password, 1, name, number], function (err) {
        if (err)
            resp.send(err);
        else
            resp.send("success");


    });
});

app.get("/login", function (req, resp) {
    const email = req.query.email;
    const password = req.query.password;

    dbcon.query("select * from login where email=? and password=? and status=1", [email, password], function (err, result) {
        if (err)
            resp.send(err);
        else {
            if (result.length == 1) {
                resp.send("1")
            }
            else
                resp.send("invaild email or password")
        }


    });
});

app.get("/customerdata", function (req, resp) {
    const email = req.query.email;
    const number = req.query.number;
    const name = req.query.name;
    const treatment = req.query.treatment;
    const date = req.query.date;
    const time = req.query.time;



    dbcon.query("insert into appointmante_list values (?,?,?,?,?,?)", [email, name, number, treatment, date, time], function (err) {
        if (err) {
            resp.send(err);

        }
        else {
            resp.send("your appoinmante is booked at ");
        }
    })

})

app.get("/checkoldpass", function (req, resp) {
const email=req.query.email;
const password=req.query.password;

dbcon.query("select password from login where email =?",[email],function(err,result){
if(err){
    resp.send(err);
}
else{
    if(password==result[0].password){
        resp.send('');
    }
    else{
        resp.send("password not matched");
    }
}
})
})


app.get("/checkchangepassword",function(req,resp){
    const email=req.query.email;
    const newpassword=req.query.newpassword;
    dbcon.query("update login set password =? where email=?",[newpassword,email],function(err){
        if(err)
        {
            resp.send(err)
        }
        else{
            resp.send("change successfully")
        }

    })
})

