#!/bin/bash

# Load env variables
if [ -f .env.deploy.fe ]; then
  echo "📦 Loading frontend environment variables..."
  set -a
  source .env.deploy.fe
  set +a
else
  echo "⚠️  .env.deploy.fe not found"
  exit 1
fi

# Check required env variables
echo "🔍 Checking required environment variables..."
echo "AUTH_SECRET: $AUTH_SECRET"
echo "AUTH_GOOGLE_ID: $AUTH_GOOGLE_ID"
echo "AUTH_GOOGLE_SECRET: $AUTH_GOOGLE_SECRET"
echo "AUTH_TRUST_HOST: $AUTH_TRUST_HOST"
echo "AUTH_URL: $AUTH_URL"
echo "NEXT_PUBLIC_BACKEND_URL: $NEXT_PUBLIC_BACKEND_URL"

# Config
PROJECT_ID="burncup"
REGION="asia-southeast1"
SERVICE_NAME="burncup-frontend"
IMAGE="gcr.io/$PROJECT_ID/$SERVICE_NAME"
DIR="./burncup-fe"

# Build
echo "🔧 Building frontend Docker image..."
docker build -t $IMAGE $DIR \
  --build-arg NEXT_PUBLIC_BACKEND_URL=$NEXT_PUBLIC_BACKEND_URL \
  --build-arg AUTH_URL=$AUTH_URL || exit 1

# Push
echo "⬆️  Pushing image to GCR..."
docker push $IMAGE || exit 1

# Deploy
echo "🚀 Deploying to Cloud Run..."
gcloud run deploy $SERVICE_NAME \
  --image $IMAGE \
  --platform managed \
  --region $REGION \
  --allow-unauthenticated \
  --concurrency=60 \
  --timeout=300s \
  --set-env-vars AUTH_SECRET=$AUTH_SECRET,AUTH_GOOGLE_ID=$AUTH_GOOGLE_ID,AUTH_GOOGLE_SECRET=$AUTH_GOOGLE_SECRET,AUTH_TRUST_HOST=$AUTH_TRUST_HOST,AUTH_URL=$AUTH_URL,NEXT_PUBLIC_BACKEND_URL=$NEXT_PUBLIC_BACKEND_URL

echo "✅ Frontend deployed to Cloud Run!"
