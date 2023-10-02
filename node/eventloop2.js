const fs = require("fs");

// when the event loop kicks in after executing your code, it starts with timers phase so setTimeout callsbacks are processed before setImmediate.
// However this is not gauranteed because the execution is so fast that by the time the timer is added to the callback, the event loop may have already kicked in and passed the 1st timer phase.
// running this a few times may lead to their position being swapped.
setTimeout(() => {
  console.log("setTimeout");
}, 0);

setImmediate(async () => {
  console.log("setImmediate");
});

// This callback will be executed in the [Poll phase] which means that setImmediate will always be attended to next [Check phase]
// and is gauranteed to run before any timer in the [Timer Phase].
fs.readFile(__filename, () => {
  setTimeout(() => console.log("setTimeout 2"), 0);
  setImmediate(() => console.log("setImmediate 2"));
});

// NOTE: in eventloop.js on my current machine, setTimeout 0 seems to always run before setImmediate (globally) because the microtasks seem to give setTimeout enough time to be added to the timer callback before it enters the [Timer Phase]
