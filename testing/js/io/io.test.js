import { it, expect, vi } from 'vitest'
// fs/promises:
import { promises as fs } from 'fs'

import writeData from './io'

// we mock the fs module to just return an empty promise. This removes the side effect of actually writing a file
vi.mock('fs')
// since we wont actually write a file anywhere in our tests, we want to simplify the path that the file is written to so that we can make an easy assertion in our tests.
vi.mock('path', () => {
  return {
    // NOTE: any modules that are imported as defaults needs to have the default key as the parent
    default: {
      // when join is called we will just return the last argument passed in (this will be the filename) rather than the entire path
      join: (...args) => {
        return args[args.length - 1]
      }
    }
  }
})

it('should execute the writeFile method', () => {
  const testData = 'Test'
  const testFilename = 'test.txt'

  writeData(testData, testFilename)

  expect(fs.writeFile).toBeCalledWith(testFilename, testData)
})

it('should return a promise that resolves to no value if called correctly', () => {
  const testData = 'Test'
  const testFilename = 'test.txt'

  writeData(testData, testFilename)

  return expect(writeData(testData, testFilename)).resolves.toBeUndefined()
})
