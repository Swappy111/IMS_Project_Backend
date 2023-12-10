const express = require("express");
const { pool } = require("../db-config");
const nodemailer = require("nodemailer");

const imsCrud = express.Router();


imsCrud.get("/get",(req,res)=>{
  const { fname, lname, username, pass, emailId, mobileNo } = req.body;

  const insertQuery="select * from registered_users_table";
  pool.query(insertQuery,(error,result)=>{
    if(error){
      return res.status(500).send(error);
    }
    return res.status(200).send(result);
  })
})

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "swapnilmor1302@gmail.com",
      pass: "sadw dndm rwwb gesa",
    },
  });


imsCrud.post("/registration", (req, res) => {
  const { fname, lname, username, pass, emailId, mobileNo } = req.body;

  // Generate a random username and password (replace with your own logic)
  const generatedUsername = generateRandomUsername(fname);
  const generatedPassword = generateRandomPassword();

  const mailOptions = {
    from: "swapnilmor1302@gmail.com",
    to: emailId,
    subject: "Welcome to Our Website",
    text: `Hello ${fname},Thank you for registering on our website!
      Your username is ${generatedUsername} and your password is ${generatedPassword}
      `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    
    if (error) {
      console.error('Error sending email:', err);
      return res.status(500).json({ error: 'Internal server error' });
  }

  const values = [fname, lname, generatedUsername, generatedPassword, emailId, mobileNo];

  const insertQuery =
    "INSERT INTO registered_users_table (fname, lname, username, pass, emailId, mobileNo) VALUES (?, ?, ?, ?, ?, ?)";

  pool.query(insertQuery, values, (error, result) => {
    if (error) {
      console.log(error);
    } else {
      res.send(values);
    } 

  });
  });

});


// Function to generate a random username
function generateRandomUsername(firstName) {
  const randomSuffix = Math.floor(Math.random() * 10000);
  return `${firstName}${randomSuffix}`;
}

// Function to generate a random password
function generateRandomPassword() {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=';
  const passwordLength = 10;
  let password = '';
  for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset.charAt(randomIndex);
  }
  return password;
}

  

imsCrud.post("/login", (req, res) => {
  const { username, pass } = req.body;

  // const query = `SELECT username from registered_users_table WHERE EXISTS (SELECT username FROM registered_users_table WHERE registered_users_table.username = '${username}' AND registered_users_table.pass = '${pass}')`;

  // const insertQuery = `SELECT EXISTS(SELECT username FROM registered_users_table WHERE username = '${username}' AND pass = '${pass}')`;

  const query = `SELECT * FROM registered_users_table WHERE username = '${username}'`;
  pool.query(query, (error, result) => {
    console.log(result)
    const user = result[0];
    if (error) {
      res.send(error);
    } else if (result.length === 0) {
      res.send("User not found");
    } else if (user.pass !== pass) {
      res.send("Incorrect password");
    } else {
      res.send(result);
    }
  });
});

imsCrud.get("/user", (req, res) => {
  const { username } = req.query;

  const query = `SELECT * FROM registered_users_table WHERE username = '${username}'`;
  pool.query(query, (error, result) => {
    if (error) {
      res.send(error);
    } else {
      res.send(result);
    }
  });
});

imsCrud.get("/javascript", (req, res) => {
  const query = `SELECT * FROM javascript_questions`;
  pool.query(query, (error, result) => {
    if (error) {
      res.send(error);
    } else {
      res.send(result);
    }
  });
});

imsCrud.get("/react", (req, res) => {
  const query = `SELECT * FROM react_questions`;
  pool.query(query, (error, result) => {
    if (error) {
      res.send(error);
    } else {
      res.send(result);
    }
  });
});

imsCrud.get("/html", (req, res) => {
  const query = `SELECT * FROM html_questions`;
  pool.query(query, (error, result) => {
    if (error) {
      res.send(error);
    } else {
      res.send(result);
    }
  });
});

imsCrud.get("/css", (req, res) => {
  const query = `SELECT * FROM css_questions`;
  pool.query(query, (error, result) => {
    if (error) {
      res.send(error);
    } else {
      res.send(result);
    }
  });
});



imsCrud.post("/postpoints", (req, res) => {
  const { user_id, js_point, css_point, react_point, html_point } = req.body;

  const values = [user_id, js_point, css_point, react_point, html_point];

  const query = `INSERT INTO user_points (user_id, js_point, css_point, react_point, html_point) VALUES (?, ?, ?, ?, ?)`;

  pool.query(query, values, (error, result) => {
    if (error) {
      res.send(error);
    } else {
      res.send(result);
    }
  });
});

imsCrud.get("/userpoint", (req, res) => {
  const { username } = req.query;

  const query = `SELECT * FROM user_points WHERE user_id = '${username}'`;
  pool.query(query, (error, result) => {
    if (error) {
      res.send(error);
    } else {
      res.send(result);
    }
  });
});

imsCrud.put("/updatepoint", (req, res) => {
  const { username, test, point } = req.body;

  console.log(req.body);

  const query = `UPDATE user_points SET ${test} = ${point} WHERE user_id = '${username}'`;
  pool.query(query, (error, result) => {
    if (error) {
      res.send(error);
    } else {
      res.send(result);
    }
  });
});


module.exports = imsCrud; 