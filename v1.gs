function remind() {
  let scriptProperties = PropertiesService.getScriptProperties();
  //scriptProperties.setProperty("reminders", JSON.stringify([]));
  
  let reminders = [];
  reminders = JSON.parse(scriptProperties.getProperty("reminders"));
  console.log(reminders);

  let ureadMessageCount = GmailApp.getInboxUnreadCount();
  if (ureadMessageCount > 0) {
    let threads = GmailApp.getInboxThreads();

    let repeat = false;

    for (let i=0;i<50;i++) {
      let message = threads[i].getMessages()[0];
      if (message.getSubject() == "add_remind:") {
        for (let z=0;z<reminders.length;z++) {
          if (message.getPlainBody() == reminders[z]) {console.log("repeat input");repeat=true;break;}
        }

        if (!repeat) {
          console.log("add to todo: " + message.getPlainBody());
          reminders.push(message.getPlainBody());
        }
        repeat = false;
      }

      else if (message.getSubject() == "remove_remind:") {
        for (let z=0;z<reminders.length;z++) {
          //compare query with reminder list and remove if match
          if (message.getPlainBody() == reminders[z]) {
            console.log("removing: " + reminders[z]);
            reminders.splice(z, 1);
          }
        }
      }
    }
  }

  //TO CLEAR
  //scriptProperties.setProperty("reminders", JSON.stringify(""));

  if (!reminders.length) {return 0}
  console.log("continue: " + reminders.join(", "));
  //for (let i=0;i<reminders.length;i++) {
    //GmailApp.sendEmail("ryangu23@roosevelths.k12.hi.us", "pending reminder: ", reminders[i]);
  //}

  //OR
  GmailApp.sendEmail("3081100220@k12.hi.us", "pending reminders", reminders.join(",\n"));

  scriptProperties.setProperty("reminders", JSON.stringify(reminders));
}
