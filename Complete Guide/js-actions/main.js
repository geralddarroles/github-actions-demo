/*
you have to add 
npm install @actions/core @actions/github @actions/exec
The installation of the node modules should be in this directory, this is needed by github to run the scripts

*/

const core = require("@actions/core");
const github = require("@actions/github");
const exec = require("@actions/exec");

const inputList = ["bucket", "bucket-region", "dist-folder"];

const extractInputs = (inputsParam) => {
  return inputsParam.map((item) => {
    return core.getInput(item, { required: true });
  });
};

function run() {
  // Inputs from the yaml file caller
  const [bucket, bucketRegion, distFolder] = extractInputs();
  const s3Uri = `s3://${bucket}`;

  //  This does not have secret and keys, but if the caller can specify those keys on the environtment
  // This function, that has built in AWS access, reaches out to the env file
  // Then access those keys from there.
  // Check main-workflow.yaml on where these keys are inserted or imported from the current env.
  exec.exec(`aws s3 sync ${distFolder} ${s3Uri} --region ${bucketRegion}`);
  // github.getOctokit -- provide rest api to github actions
  // github.context -- get current data of the repo

  core.notice("Hello from my custom javascript action!");

  // creating an output from this action:
  const websiteUrl = `http://${bucketName}.s3-website-${bucketRegion}.amazonaws.com`;
  core.setOutput("website-url", websiteUrl);
}

run();
