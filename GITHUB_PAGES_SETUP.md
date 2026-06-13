# GitHub Pages Setup Guide

Follow these steps to host your portal frontend on GitHub Pages for free.

## Step 1: Initialize Git and GitHub
1. Create a new public repository on GitHub (e.g., `org-portal`).
2. Locally, in your `portal/` folder, initialize git:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```
3. Connect to your GitHub repo and push:
   ```bash
   git remote add origin https://github.com/your-username/org-portal.git
   git branch -M main
   git push -u origin main
   ```

## Step 2: Configure API URL
1. Before pushing, ensure you have updated the `API_URL` in `js/app.js` with your deployed Google Apps Script URL.

## Step 3: Enable GitHub Pages
1. Go to your repository on GitHub.com.
2. Click on the **Settings** tab.
3. In the left sidebar, under the "Code and automation" section, click **Pages**.
4. Under **Build and deployment > Branch**:
   - Select `main`.
   - Select `/(root)`.
   - Click **Save**.

## Step 4: Verify Deployment
1. GitHub will take a minute or two to build the site.
2. Once finished, you will see a bar at the top of the Pages section saying "Your site is live at...".
3. Click the link to open your portal.

## Step 5: Custom Domain (Optional)
If you have a custom domain for your organization:
1. Under **Custom domain** on the same Pages settings page, enter your domain name.
2. Configure your DNS provider as instructed by GitHub.
3. Enable "Enforce HTTPS".
