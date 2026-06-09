# Google Sheets newsletter setup

1. Create a Google Sheet for newsletter signups.
2. In the sheet, open **Extensions > Apps Script**.
3. Replace the starter code with `docs/google-sheets-newsletter.gs`.
4. Open **Project Settings > Script properties** and add:
   - Property: `NEWSLETTER_SECRET`
   - Value: a long random private string
5. Click **Deploy > New deployment**.
6. Choose **Web app**.
7. Execute as: **Me**.
8. Who has access: **Anyone**.
9. Deploy and approve the requested Spreadsheet and Mail permissions.
10. Copy the `/exec` web app URL.

The Vercel project needs these Production environment variables:

- `GOOGLE_SHEETS_NEWSLETTER_WEBHOOK_URL`: the deployed `/exec` URL
- `NEWSLETTER_WEBHOOK_SECRET`: the same secret stored in Apps Script

After adding them, redeploy the site and test one signup. New addresses are appended to the
`Signups` tab and a notification is sent to `jolene.fjl@gmail.com`.
