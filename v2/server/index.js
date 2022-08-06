const express = require("express");
const path = require("path");

let app = express();
app.use(express.json());

let reminders = ["eggs", "detergent", "milk", "do hw"]

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
})

app.get("/ret", (req, res) => {
  //console.log(req);
  res.send(JSON.stringify(reminders));
})


app.post("/push", (req, res) => {

  console.log(req.body.n);

  if (reminders.includes(req.body.n)) {res.send(reminders); return;}
  else {
    reminders.push(req.body.n);
    res.send(reminders);
  }
})

app.post("/remove", (req, res) => {
  console.log("remove: " + req.body.n);

  if (reminders.includes(req.body.n)) {
    for (let i=0;i<reminders.length;i++) {
      if (reminders[i] == req.body.n) reminders.splice(i,1);
    }
  }
  res.send(reminders);
})

app.listen(3000, () => console.log("running"));