function remind() {
  let response = UrlFetchApp.fetch("https://remindserver.ryangu23.repl.co/ret");
  let reminders = JSON.parse(response.getContentText());
  Logger.log(reminders);

  GmailApp.sendEmail("3081100220@k12.hi.us", "REMINDERS", reminders.join(",\n"));
}
