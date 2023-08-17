// this script will first be executed synchronously from top to bottom and only then when the callstack is empty, the event loop's phases will begin (checking each queue based on the the current phase and executing the callback added by your synchronous script)
const fs = require('fs');
const dns = require('dns');

// Macro tasks:
const timersQueue = []; // Timer callbacks, setTimeout, setInterval
const checkQueue = []; // setImmediate callbacks 
const pollQueue = []; // I/O related callbacks (Most of your Node.js events e.g. file reads)
const pendingCallbacksQueue = [];
const closeEventsQueue = []; // callbacks from close events
// Micro tasks:
const microtasksQueue = []; // Promise callbacks
const nextTickQueue = [] // process.nextTick() callbacks

// if you had a server listening to a port, such active handlers would be tracked by node.js and aslong as there are any, node will not terminate the process, (until they are closed)
const activeHandlers = []

// process.nextTick gets the highest priority, followed by Promise callbacks. Both of these are executed before entering any phase of the event loop
process.nextTick(() => {
    console.log('1. Next Tick');
});

// Microtasks for Promises
Promise.resolve().then(() => {
    console.log('2. Promise callback');
    microtasksQueue.push();
});

// *** EVENT LOOP PHASES BEGIN ***

// [Timers Phase]
// Takes timer callbacks from queue and execute them
setTimeout(() => {
    console.log('3. Timer callback');
    timersQueue.push();
}, 0);

// [Idle/Prepare Phase] 
// (used internally and never something you have to deal with)

// [Poll Phase] 
// Takes I/O callbacks from the queue and executes them
// NOTE: if there are setImmediate callbacks scheduled, and there are no more I/O callbacks to be processed (which is the case here), Node.js will end the 
fs.readFile(__filename, () => {
    console.log('4. File read callback');
    pollQueue.push();
});

// [Check Phase]
// NOTE: setImmediate will always run before setTimeout 0 if inside another callback.
setImmediate(() => {
    console.log('5. Check (setImmediate) callback');
    checkQueue.push();
});

// [Pending Callbacks Phase] - simulated using dns.lookup which might defer some system level errors
// in most common scenarios, you might not encounter this phase.
dns.lookup('nonexistentdomain', (err, address) => {
    if (err) {
        console.log('6. DNS error callback');
        pendingCallbacksQueue.push();
    } else {
        console.log('Address:', address);
    }
});

// [Close events Phase] 
process.on('exit', () => {
    console.log('7. Close event (process exit)');
    closeEventsQueue.push();
});

// End of Script: now go over it again from top to bottom keeping in mind that the callstack is empty but event queues are now populated.


// We used dns.lookup to simulate a scenario where a system error could be deferred to the "Pending Callbacks" phase. In practice, the specifics of when a callback is considered pending are internal details and might vary across different Node.js versions and platforms.
// We added a close event using process.on('exit', callback). This event is emitted when the Node.js process is about to exit, giving you an opportunity to perform any synchronous cleanup tasks.

// Note: This order is typical for the provided code, but remember that in complex applications or different scenarios, the exact order can vary based on various factors like I/O operation completion times. The sequence provided assumes that the fs.readFile operation will complete after the microtask queue has been processed but before the next setImmediate callback is executed.