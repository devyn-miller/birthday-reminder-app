# Birthday Reminder Script

This Google Scripts application is designed to work with a Google Sheets document to automate birthday reminders. The script sends personalized birthday wishes to the person celebrating their birthday and sends reminder emails to others, informing them about the birthdays on that day.

## Table of Contents

- [Setup](#setup)
- [Google Sheets Setup](#google-sheets-setup)
- [Google Scripts Setup](#google-scripts-setup)
- [Usage](#usage)
- [Example](#example)
- [Contributing](#contributing)
- [License](#license)

## Setup

### Google Sheets Setup

- Create a Google Sheets document, or save `BirthdayCalendar.xlsx` to a Google Sheet.

If creating your own Google Sheet:
1. Add a sheet named `Birthday Calendar`.
2. In the sheet, set up the columns as follows:
   - Column A: Name (e.g., `person1`)
   - Column B: Birthday (e.g., `6/6/2003`)
   - Column C: (unused, placeholder for `daysUntilNextBirthday`, which will autopopulate when value entered to Column B)
   - Column D: (unused, placeholder for `age`, which will autopopulate when value entered to Column B)
   - Column E: Notes
   - Column F: Email (e.g., `person1@aol.com`)

3. Add your data starting from row 2 (headers in row 1).

### Google Scripts Setup

1. Open the Google Sheets document.
2. Go to `Extensions` > `Apps Script`.
3. Delete any code in the script editor and replace it with the following script:

    ```javascript
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
    ```

4. Save the script file and name it `BirthdayReminder`.

## Usage

1. Make sure the Google Sheets document is open.
2. Run the `main` function from the Google Scripts editor to execute the script.
3. The script will send emails based on the data in the Google Sheets document.

### Set Up a Trigger

1. **Go to the Triggers**:
   - In the Apps Script editor, click on the clock icon on the left sidebar to open the triggers page.
2. **Add a new trigger**:
   - Click on `+ Add Trigger`.
   - Choose `main` function to run.
   - Select `Time-driven` and set it to run `Daily`.

### Test the Script

1. **Run the script manually** from the Apps Script editor to ensure it works correctly.
2. **Authorize the script** to access your Google account data when prompted.

## Example

Given the following example data in the `Birthday Calendar` sheet:

| Name    | Birthday  | Days Until Next Birthday | Age | Notes | Email           |
|---------|-----------|--------------------------|-----|-------|-----------------|
| person1 | 6/6/2003  |                          |     |       | person1@aol.com |
| person2 | 6/6/2005  |                          |     |       | person2@aol.com |
| person3 | 6/7/2005  |                          |     |       | person3@aol.com |

If today's date is June 6, 2024:
- `person1@aol.com` will receive:
  - "Happy Birthday, person1!"
  - "Reminder: person2's birthday is today!"
- `person2@aol.com` will receive:
  - "Happy Birthday, person2!"
  - "Reminder: person1's birthday is today!"
- `person3@aol.com` will receive:
  - "Reminder: person1's birthday is today!"
  - "Reminder: person2's birthday is today!"

## Contributing

If you would like to contribute to this project, please fork the repository and submit a pull request. For major changes, please open an issue to discuss what you would like to change.

## License

This project is licensed under the MIT License.
