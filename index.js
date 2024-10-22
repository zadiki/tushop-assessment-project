const rli = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

function input(prompt) {
  return new Promise((callbackFn, errorFn) => {
    rli.question(
      prompt,
      (uinput) => {
        callbackFn(uinput);
      },
      () => {
        errorFn();
      }
    );
  });
}
let numberOfJobs;
let inputArry = [];
const jobsObjectArray = [];
let maxEarning = 0;
let totalEarnings = 0;
const main = async () => {
  numberOfJobs = await input("Enter the number of Jobs: ");
  while (!(numberOfJobs >= 0 && numberOfJobs < 100)) {
    numberOfJobs = await input("Enter the number of Jobs: (between 0-100)");
  }

  console.log("Enter job start time, end time, and earnings: ");
  await rli.on("line", function (cmd) {
    inputArry.push(cmd);
    if (inputArry.length >= 3 * numberOfJobs) {
      rli.close();
    }
  });
  await rli.on("close", function () {
    setJobsObjectArray(inputArry);
  });
};

main();
function setJobsObjectArray(input) {
  const chunkSize = 3;
  for (let i = 0; i < input.length; i += chunkSize) {
    const chunk = input.slice(i, i + chunkSize);
    var job = {
      start_time: chunk[0],
      end_time: chunk[1],
      earning: chunk[2],
    };
    totalEarnings = totalEarnings + parseFloat(job.earning);
    if (parseFloat(job.earning) > maxEarning) {
      maxEarning = parseFloat(job.earning);
    }

    jobsObjectArray.push(job);
  }

  console.log("The number of tasks and earnings available for others:");
  console.log(`Task :${jobsObjectArray.length - 1}`);
  console.log(`Earnings: ${totalEarnings - maxEarning}`);
}
