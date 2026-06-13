# Comprehensive Deployment Guide

This guide outlines the step-by-step process to get your Organizational Web Portal up and running.

## Prerequisites
1. A Google Account (for Google Sheets and Apps Script).
2. A GitHub Account (for hosting the frontend).
3. The source code provided in the `portal/` folder.

## Order of Operations
1. **Prepare Database:** Create the Google Sheet and populate it.
2. **Deploy Backend:** Use Google Apps Script to create the API.
3. **Configure Frontend:** Link the frontend to your new API.
4. **Deploy Frontend:** Push to GitHub and enable GitHub Pages.

## Troubleshooting Common Issues
- **CORS Errors:** Ensure your GAS Web App is deployed with "Who has access: Anyone".
- **Data Not Loading:** Check if your sheet name is exactly "Links".
- **Empty Dashboard:** Ensure at least one row has the status "active".
- **Dark Mode Not Saving:** Ensure your browser allows LocalStorage for your GitHub Pages domain.

For detailed steps on specific platforms, refer to:
- `GAS_DEPLOYMENT.md`
- `GITHUB_PAGES_SETUP.md`
