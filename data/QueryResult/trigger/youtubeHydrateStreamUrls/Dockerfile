FROM node:slim

ENV
GCP_SERVICE_ACCOUNT='{"type":"service_account","project_id":"projectname-o","private_key_id":"2a9be63d9e2984b73b0f26ee97954f607026f469","private_key":"-----BEGIN PRIVATE KEY-----\\nMIIEugIBADANBgkqhkiG9w0BAQEFAASCBKQwggSgAgEAAoIBAQCHhbr2q5FDPkgt\\nY8JQ84L0rkVw52v4+ruYWqwoBgjYlrCtwpIXLtA/7/rLpP+69b7Tr725CYZpogVz\\nSGaAwqfQpMKbOZD6IjeEBnz9ywjWYfSP0gSetP7ygj/eQSXVb4fS/ovIVbX/xCuw\\nYgeOE8omqIp1m4Q9uGo4DO42vm5IicfMcYDT76Q9AlKJtsMM27LzTgUVeV3/92Lv\\nyGfKehXMyWpxB0Uy+7PnHKF1rPicjmQzL9kLaxVa2qGyVv5EPYOYCePtesodEdCw\\nRAdVAr94N5uQ0CRW406iAzi3rligZYMyKw4u564VJ9xSmF78VMkpa9lvf/cgBdE0\\nW5PsZKRTAgMBAAECggEAKX+FtKrsnE6iA2QcyHUIkKwcj2oN4fvFHe4F8WuHoeri\\nxxJhcb/f/PQbM+iedj1x5ZhW3CZShl4alSaCXMM+Z+FLxgRmpHF91mu2MnDNj/gG\\nz1NcHs0FlHTV4dTJJQY17SIM45d7V4pWZnheH99nc1cAruqkH9IslGVBPHorgwJb\\nmbDrTPTqf1CVIA4PYDwRe/njCETnDgulcTk3Q20mvzTmbuQl68dCmK10xk/dPgsR\\njbp1iwP5WC9u3lYFcRSEIdQhCoc51eeVR8Lm8tfGVMTMgMLv8520/mOnKF1dj4jg\\neqcvwjlNNOkWkHf1QpM0/5B9nmeYRlFyHYHdB9LXgQKBgQC9TFyrgtauJT54f7Ep\\n1/Kiy/FPjb0Jp97A39Pu+fO+ylTwDwY58tRujNADPiQmF7gWwasEKzv8YxR8moKD\\nSvTckse2aZd/HGoenIVwBkEdVfZjTAX0YglnhBfUq1aIY1mWPrP9cEh+ts6CuJ3r\\ndHv+PYtfigiXb/7UOxJt4BBTAwKBgQC3RoRQREl+lfcgs+ZGg7PSDc5Oh/3bK2nf\\nsPXyC5uxOEre20/rqodS0xQP6C4aVwLnoqhA1DlzibMs05ihDQ6erF3zXLIzafSn\\na8NNTARpfMlxwXRnFWKLRJbfBZnRMkzHtSp+sFIka7BOTgTJoY7pZl9dLrmSb0Cx\\nkegDRxAAcQKBgCuzp2lJKXrGymdTQ3lfi3qeDrXJCS1jff+VLP5s4iLX30gUj+Fs\\n+DIVfChjfkD1FODcETlDKfQYg7BIk3zwHxuVH1ozgnAsBSvQAtZb+0hkgh9me7Fx\\nuK4XRtEoRS/zj8kp7K/D7liip4ZyTLMBD2cgmj6SRW2Aw5oHkTeglOQ1An8LdFzQ\\np3PwdW78nEHIJnMWrcY3Iki7afsz/9tfRVp1uQ703sAf+oh6pLacR+aZvtZvo7rg\\nUmNE1VZddtwTNL21LRCyJRj+HaEs1Y9fRWEBNstgULb1umBuU9saFT+H05z43lnJ\\nkTuRCyn5uuaRs4c7DyrmqATxIgLpFjVp/wcBAoGAaBFiuNPMV0rtbJ+m5JeYLkQY\\nbWhzKqMKq+sTl0x0bYNBbjGWodE2szyRneeAEv+Royt8rBunFkJ08wKAuNiX7VAT\\nZoK5Sme+501JlSlgCVMxvz2iflJCxHFtxekAxdY03qij6ZBrGDJ0aEKIxLcRbP+g\\ns6GR5mELP9zEsz0T1kM=\\n-----END PRIVATE KEY-----\\n","client_email":"firebase-adminsdk-hoptm@projectname-o.iam.gserviceaccount.com","client_id":"105263168589833665130","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_x509_cert_url":"https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-hoptm%40projectname-o.iam.gserviceaccount.com","universe_domain":"googleapis.com"}'
UPSTASH_REDIS_REST_URL='https://usw1-curious-swan-33560.upstash.io'
UPSTASH_REDIS_REST_TOKEN='AYMYACQgNGJmYzQ5ZWEtZjI3OS00NDVlLWJmNTItMmNiOWM3OWZmY2E5ZTIwMzA0OGUwYjM1NDVlZDkwZDFhNzIxODhjNGNjOTQ='

WORKDIR /app

# Install Python and FFmpeg
RUN apt-get update && \
    apt-get install -y python3 python3-venv ffmpeg && \
    rm -rf /var/lib/apt/lists/*

# Create a Python virtual environment
RUN python3 -m venv /venv

ENV PATH="/venv/bin:$PATH"

# Activate virtual environment and install yt-dlp
RUN . /venv/bin/activate && pip3 install yt-dlp

# Copy package.json and package-lock.json
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the rest of your app's source code
COPY . .

CMD ["node", "index.js"]
