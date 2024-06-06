function main() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Birthday Calendar");
  var numRows = sheet.getLastRow();
  var range = sheet.getRange(2, 1, numRows - 1, 6).getValues();
  var today = new Date();
  
  for (var i = 0; i < range.length; i++) {
    var row = range[i];
    var name = row[0];
    var birthday = new Date(row[1]);
    var email = row[5];
    
    if (email && isBirthdayToday(birthday, today)) {
      var ageTurning = calculateAge(birthday, today);
      sendBirthdayEmail(name, email, ageTurning);
      sendReminderEmails(name, ageTurning, range);
    }
  }
}

function sendBirthdayEmail(name, email, ageTurning) {
  var subject = "🎉 Happy Birthday, " + name + "!";
  var body = `
    <html>
      <body style="font-family: Arial, sans-serif; text-align: center; background-color: #f9f9f9; padding: 20px;">
        <div style="background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
          <h1 style="color: #ff4081;">🎂 Happy Birthday, ${name}! 🎂</h1>
          <p style="font-size: 18px;">It's your special day! 🥳🥳🥳</p>
          <img src="https://media.tenor.com/cuUAvXLE9WYAAAAd/happy-birthday.gif" alt="Birthday" style="width: 200px; margin-top: 20px;">
          <p style="font-size: 16px; color: #888888; margin-top: 20px;">Yayyy make a wish!!!</p>
        </div>
      </body>
    </html>
  `;
  MailApp.sendEmail({
    to: email,
    subject: subject,
    htmlBody: body
  });
}

function sendReminderEmails(name, ageTurning, range) {
  var subject = "🎉 Reminder: " + name + "'s Birthday Today!";
  var body = `
    <html>
      <body style="font-family: Arial, sans-serif; text-align: center; background-color: #f9f9f9; padding: 20px;">
        <div style="background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
          <h1 style="color: #ff4081;">🎂 It's ${name}'s Birthday Today! 🎂</h1>
          <p style="font-size: 18px;">${name} is turning <strong>${ageTurning}</strong> years old today! 🥳🥳🥳</p>
          <img src="https://media2.giphy.com/media/OMIZOAXjgTatG/200.gif?cid=790b7611d0vqf270x2pfrmottje0jmv3ay15r9514cme9gal&rid=200.gif&ct=g" alt="Birthday Cake" style="width: 200px; margin-top: 20px;">
          <p style="font-size: 16px; color: #888888; margin-top: 20px;">Don't forget to wish them a happy birthday!</p>
        </div>
      </body>
    </html>
  `;
  
  for (var i = 0; i < range.length; i++) {
    var row = range[i];
    var email = row[5];
    
    if (email && row[0] !== name) {
      MailApp.sendEmail({
        to: email,
        subject: subject,
        htmlBody: body
      });
    }
  }
}

function calculateAge(birthday, today) {
  var age = today.getFullYear() - birthday.getFullYear();
  var m = today.getMonth() - birthday.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthday.getDate())) {
    age--;
  }
  return age;
}

function isBirthdayToday(birthday, today) {
  return today.getMonth() === birthday.getMonth() && today.getDate() === birthday.getDate();
}
