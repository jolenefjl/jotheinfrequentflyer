# Google Sheets newsletter setup

The website sends signups to a private Google Sheet through a server-side Next.js route
and a protected Google Apps Script web app. The Sheet remains Restricted.

## One-time Google setup

1. Open the newsletter Google Sheet.
2. Choose **Extensions > Apps Script**.
3. Replace the starter code with `docs/google-sheets-newsletter.gs`.
4. At the top of the Apps Script editor, select the `setup` function and click **Run**.
5. Approve the Spreadsheet and Mail permissions.
6. Open **Execution log** and copy the value after `NEWSLETTER_SIGNUP_SECRET=`.
7. Choose **Deploy > New deployment > Web app**.
8. Set **Execute as** to **Me** and **Who has access** to **Anyone**.
9. Deploy and copy the web app URL ending in `/exec`.

The `setup` function generates the secret automatically. You do not need to invent one.

## Vercel environment variables

Add these server-only Production environment variables:

- `GOOGLE_APPS_SCRIPT_NEWSLETTER_URL`: the deployed `/exec` URL
- `NEWSLETTER_SIGNUP_SECRET`: the value printed by the `setup` function

Do not prefix either variable with `NEXT_PUBLIC_`.

After adding both variables, redeploy the site. The form remains hidden until both are
configured.

## Stored data and notifications

Each new signup records first name, email, timestamp, language, and explicit consent in
the `Signups` tab. Duplicate email addresses are ignored. New subscribers trigger an
email to `jolene.fjl@gmail.com`.

Until an automated unsubscribe endpoint is added, every newsletter must include clear
instructions to email `jolene.fjl@gmail.com` to unsubscribe. Remove that address from
the Sheet before sending another newsletter.
