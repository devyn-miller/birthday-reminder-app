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
3. Delete any code in the script editor and replace it with the script in `BirthdayReminder.js`.


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
