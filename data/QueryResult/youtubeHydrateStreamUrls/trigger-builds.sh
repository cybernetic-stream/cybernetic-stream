#!/bin/bash

# trigger-builds.sh

for i in {0..10}
do
  gcloud builds submit --config=cloudbuild.yaml --substitutions=_DEPLOYMENT_NUMBER=$i
done
