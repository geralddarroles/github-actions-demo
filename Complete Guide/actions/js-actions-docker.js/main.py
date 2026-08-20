import os
import boto3  # NOT INSTALLED INITIALLY, DOCKER HANDLES THIS
from botocore.config import Config

## when using docker, github actions stores the inputs in the environment variables
## must add the INPUT_ prefix


def run_py():
    bucket = os.environ["INPUT_BUCKET"]
    bucket_region = os.environ["INPUT_BUCKET_REGION"]
    dist_folder = os.environ["INPUT_DIST_FOLDER"]

    configuration = Config(region_name=bucket_region)

    s3_client = boto3.client("s3", config=configuration)

    for root, subdirs, files in os.walk(dist_folder):
        for file in files:
            s3_client.upload_file(os.path.join(root, file), bucket, file)

    website_url = f"https://{bucket}.s3.{bucket_region}.amazonaws.com/index.html"
    print(  ## setoutput returns the value to the action
        f"::set-output name=website_url::{website_url}"
    )  # set the output variable for the workflow


if __name__ == "__main__":
    run_py()
