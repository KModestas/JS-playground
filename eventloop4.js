const fs = require('fs')

// This proves that the [Poll] always executes callbacks from the previous cycle.

// first time round, [Poll] phase will add the callback to the queue but then move on without executing it
fs.readFile(__filename, () => {
 console.log('readFile 1')
})

// ...this is why setImmediate is logged before readFile
setImmediate(async () => {
  console.log('setImmediate');
})

// [Timer] schedules setImmediate and readFile then does heavy work to gaurantee all callbacks will in their queues
setTimeout(() => { 
  // [Poll] phase collects the callback but doesn't execute it, instead event loop continues
  fs.readFile(__filename, () => {
  console.log('readFile 2')
  })

  // [Check] phase executes the setImmedate callback then event loop continues where readFile callback is executed in the next cycle
  setImmediate(async () => {
    console.log('setImmediate 2');
  })

  for (let i = 0; i < 2000000000; i++) {}
}, 3000);


// allow all events to be finished and added to their queue by the time the event loop runs (in reality readFile will be done even without this but this is to be concrete)
for (let i = 0; i < 2000000000; i++) {}
