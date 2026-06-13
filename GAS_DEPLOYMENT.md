# Google Apps Script Deployment Guide

Follow these steps to deploy your backend API.

## Step 1: Prepare the Google Sheet
1. Create a new Google Sheet.
2. Rename the first tab (sheet) to **Links**.
3. Create the header row (A1 to K1):
   `id`, `name`, `description`, `url`, `icon`, `category`, `role`, `color`, `sort_order`, `status`, `created_at`
4. Add some sample data (ensure `status` is `active`).

## Step 2: Add the Script
1. In your Google Sheet, go to **Extensions > Apps Script**.
2. Delete any existing code in `Code.gs`.
3. Paste the contents of the `portal/Code.gs` file into the editor.
4. Click the **Save** (disk icon) and name the project (e.g., "Portal API").

## Step 3: Deploy as Web App
1. Click the **Deploy** button at the top right.
2. Select **New deployment**.
3. Click the gear icon (**Select type**) and choose **Web app**.
4. Fill in the configuration:
   - **Description:** Portal API v1
   - **Execute as:** Me (your-email@gmail.com)
   - **Who has access:** Anyone (This is crucial for public API access)
5. Click **Deploy**.
6. You might need to **Authorize access**. Follow the prompts, click "Advanced", and then "Go to Portal API (unsafe)" to grant permissions.

## Step 4: Get your API URL
1. Once deployed, a window will show the **Web App URL**.
2. Copy this URL (it should end in `/exec`).
3. You will need this URL for the `portal/js/app.js` file.

## Step 5: Update the Script (If needed)
If you make changes to `Code.gs` later:
1. Click **Deploy > Manage deployments**.
2. Click the **Edit** (pencil icon).
3. Change the **Version** to "New version".
4. Click **Deploy**.
   - *Note:* Always use "New version" to ensure the Web App URL reflects your latest code changes.
