import { vi } from 'vitest'

// mock fs.promises
export const promises = {
  writeFile: vi.fn((path, data) => {
    return new Promise((resolve, reject) => {
      resolve()
    })
  })
}
