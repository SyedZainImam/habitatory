# Habitatory — Deployment Guide

## Option A: Temporary Deployment on GCP (3-4 days, minimal cost)

Uses a single Compute Engine VM. Estimated cost: ~$1-2 for 3-4 days.

### 1. Create a VM

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Navigate to **Compute Engine → VM instances → Create Instance**
3. Settings:
   - **Name:** `habitatory-temp`
   - **Region:** Pick the closest to your users (e.g., `asia-south1` for India)
   - **Machine type:** `e2-small` (2 vCPU, 2 GB RAM) — cheapest that works
   - **Boot disk:** Click "Change" → Ubuntu 22.04 LTS, 20 GB standard disk
   - **Firewall:** Check both "Allow HTTP traffic" and "Allow HTTPS traffic"
4. Click **Create**

### 2. SSH into the VM

Click the **SSH** button next to your VM in the console, or use:
```bash
gcloud compute ssh habitatory-temp
```

### 3. Install Node.js & Yarn

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs git
sudo npm install -g yarn
```

### 4. Clone and Build

```bash
git clone https://github.com/YOUR_USERNAME/habitatory.git
cd habitatory
yarn install
yarn build
```

### 5. Run on Port 80

```bash
sudo PORT=80 yarn start
```

Your site is now live at `http://YOUR_VM_EXTERNAL_IP`.

To find the IP: Go to Compute Engine → VM instances → look at the "External IP" column.

### 6. Keep it Running (optional)

To keep the server running after you close SSH:
```bash
sudo nohup bash -c "PORT=80 yarn start" > /dev/null 2>&1 &
```

### 7. Clean Up (after 3-4 days)

Go to Compute Engine → VM instances → Select your VM → Click **Delete**.
This stops all billing immediately.

---

## Option B: Permanent Deployment on Vercel (Recommended, Free)

Vercel is the easiest and cheapest way to deploy Next.js permanently. The free hobby plan handles most small business sites.

### 1. Push Code to GitHub

Make sure your latest code is pushed to your GitHub repository.

### 2. Connect to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **"Add New Project"**
3. Select your `habitatory` repository
4. Vercel auto-detects Next.js — no config needed

### 3. Add Environment Variables

Before clicking "Deploy", add these in the **Environment Variables** section:

| Name | Value |
|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `heqhq5w1` |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` |
| `NEXT_PUBLIC_SANITY_API_VERSION` | `2024-01-01` |
| `SANITY_API_WRITE_TOKEN` | Your Sanity write token |

### 4. Deploy

Click **Deploy**. Vercel builds and deploys automatically.

You get a free URL like `habitatory.vercel.app`. To use a custom domain:
1. Go to your project → Settings → Domains
2. Add your domain (e.g., `habitatory.com`)
3. Update your domain's DNS as instructed by Vercel

### 5. Auto-Deploys

Every time you push to GitHub, Vercel automatically rebuilds and deploys.

---

## Sanity CORS Setup (Required for Both)

After deploying, add your live URL as a CORS origin:

1. Go to [sanity.io/manage](https://www.sanity.io/manage) → your project → **API**
2. Under **CORS Origins**, click **Add CORS origin**
3. Add your deployment URL (e.g., `https://habitatory.vercel.app` or `http://YOUR_VM_IP`)
4. Check "Allow credentials"
5. Save
