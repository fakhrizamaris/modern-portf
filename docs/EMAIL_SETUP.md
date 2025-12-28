# Email Configuration for Contact Form

To set up the contact form email functionality:

## 1. Gmail Setup

1. Enable 2-Factor Authentication on your Google account
2. Go to https://myaccount.google.com/apppasswords
3. Create a new App Password for "Mail" > "Other (Custom name)"
4. Copy the 16-character password

## 2. Create `.env.local` file

Create a file named `.env.local` in the root of your project with:

```
GMAIL_USER=djamarisfakhri@gmail.com
GMAIL_APP_PASSWORD=xxxx-xxxx-xxxx-xxxx
```

Replace `xxxx-xxxx-xxxx-xxxx` with your actual 16-character App Password.

## 3. Install Nodemailer

Run: `npm install nodemailer @types/nodemailer`

## 4. Test

Submit the contact form and check your email!
