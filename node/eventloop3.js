// This example is complicated! The output will change if you run it a few times but it's a good exercise to go through the flow
// Read each step in the numbered order (This does NOT necessarily denote the order of execution)

// NOTE: "Poll - setTimeout" denotes that it's triggered in [Poll phase] but ofcourse its always EXECUTED in the [Timer Phase] etc.

// IMPORTANT: only run this one at a time and go through the flow, if you have too many logs in the console you will get distracted and confused.
const fs = require("fs");

// 1. [Timer phase] - processed first, however if race condition happens then setImmediate below may be logged first (global)
setTimeout(() => {
  console.log("setTimeout");
}, 0);

// 2. [Poll Phase] - callback is added to the queue but doesn't run until next cycle
fs.readFile(__filename, () => {
  // 6. this I/O call back is run
  console.log("Poll - readFile");
  // 7. setImmediate will always run next [Check Phase]
  setImmediate(() => console.log("Poll - setImmediate"));
  // 8. This is the only thing left to execute while the Promise below is waiting so it will always log second to last
  setTimeout(() => console.log("Poll - setTimeout"), 0);
});

// 3. [Check Phase] - callback is executed next:
setImmediate(async () => {
  console.log("setImmediate");

  // 4. After [Check] is [Timer] phase again but due to race condition, this callback might not run next but instead After [Poll]
  setTimeout(() => console.log("Check - setTimeout"), 0);

  // 5. Promise is executed which schedules the setTimeout, this entire aysnc function will be popped off the execution stack and will resume when then promise resolves inside the setTimeout callback
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // 9. After 1 second has elapsed this finally gets executed:
  setImmediate(() => console.log("Check - setImmediate"));
});
