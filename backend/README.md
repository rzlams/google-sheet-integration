# Google APIs Authentication

## Create Service Account Credentials:

**NOTE:** Service Account Credentials auth is a more secure option than an API key, because the latter can only access public sheets

- In the GCP Console, go to **APIs & Services -> Credentials**
- Click **Create credentials -> Service account key**
- Choose a name for the service account and select the role Sheets API Editor to restrict the access
- Click **Create and download** the JSON key filem and move it to the root of your project with the name **credentials.json**
- Share the spreadsheet with the Service Account usign its email
