#!/bin/bash

# Load env variables
if [ -f .env.prod.be ]; then
  echo "📦 Loading backend environment variables..."
  set -a
  source .env.prod.be
  set +a
else
  echo "⚠️  .env.prod.be not found"
  exit 1
fi

# Check required env variables
echo "🔍 Checking required environment variables..."
echo "POSTGRES_DSN: $POSTGRES_DSN"
echo "JWT_SECRET_KEY: $JWT_SECRET_KEY"
echo "MIDTRANS_SERVER_KEY: $MIDTRANS_SERVER_KEY"

# Config
PROJECT_ID="burncup"
REGION="asia-southeast1"
SERVICE_NAME="burncup-backend"
IMAGE="gcr.io/$PROJECT_ID/$SERVICE_NAME"
DIR="./burncup-be"

# Build
echo "🔧 Building backend Docker image..."
docker build -t $IMAGE $DIR || exit 1

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
  --concurrency=80 \
  --timeout=300s \
  --set-env-vars POSTGRES_DSN=$POSTGRES_DSN,JWT_SECRET_KEY=$JWT_SECRET_KEY,MIDTRANS_SERVER_KEY=$MIDTRANS_SERVER_KEY

echo "✅ Backend deployed to Cloud Run!"
