// the main module (this script) will first be executed synchronously from top to bottom and only then when the callstack is empty, the event loop will begin checking each queue and processing each callback)
const fs = require('fs');

// Macro tasks:
const timersQueue = []; // setTimeout, setInterval
const checkQueue = []; // setImmediate callbacks 
const pollQueue = []; // I/O related callbacks (Most of your Node.js events e.g. file reads, req handler cb's)
const closeEventsQueue = []; // callbacks from close / exit events
// Micro tasks:
const microtasksQueue = []; // Promise callbacks
const nextTickQueue = [] // process.nextTick() callbacks

// Any Active handlers or requests would be tracked by node.js, node will not terminate the process (until they are closed)
const activeHandlers = [] // Open sockets, listening to servers or timers that are scheduled to run but their time hasn't come yet.
const activeRequests = [] // Async operations such as reading from a file which are in progress and haven't completed yet.

// *** MICROTASKS PROCESSED ***

process.nextTick(() => {
  console.log('1. Next Tick callback');
  nextTickQueue.push()
});

Promise.resolve().then(() => {
    console.log('2. Promise callback');
    microtasksQueue.push();
});

// *** EVENT LOOP PHASES BEGIN ***

// [Timers Phase]
setTimeout(() => {
    console.log('3. Timer callback');
    timersQueue.push();
}, 0);

// [Poll Phase] 
// Initially when poll queue is checked, it will be empty even if callback has completed, the event loop will Poll the system to check if the callback has completed, add it to the queue and then move on to the [Check Phase], before executing in the next [Poll Phase]
fs.readFile(__filename, () => {
    console.log('5. Poll (File read) callback');
    pollQueue.push();
});

// [Check Phase]
// NOTE: setImmediate will always run before setTimeout 0 if inside another callback.
setImmediate(() => {
    console.log('4. Check (setImmediate) callback');
    checkQueue.push();
});


// [Close events Phase] 
process.on('exit', () => {
    console.log('6. Close event callback (process exit)');
    closeEventsQueue.push();
});

// End of Script: now go over it again from top to bottom keeping in mind that the callstack is empty but event queues are now populated.

// check whats keeping your event loop from exiting the process:
// process._getActiveHandles()
// process._getActiveRequests()

// NOTE: in reality most of these functions will be invoked as part of another callback E.g:
// if using a cron library you will likely write your code which is ultimately the callback of a setInterval [Timer]
// if creating a web server you will write code to handle request callbacks [I/O Poll]
// ...Even inside these callbacks will be other callbacks e.g. inside your cron you may read a File (I/O Poll) and then trigger some Promise (microtask)