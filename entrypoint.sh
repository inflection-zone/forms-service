#!/bin/sh

aws s3 cp s3://$S3_CONFIG_BUCKET/$S3_CONFIG_PATH/env.config /app/.env
pm2-runtime dist/src/index.js --name forms-service
