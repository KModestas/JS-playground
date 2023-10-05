import { vi } from 'vitest'

// mocking entire modules is useful if dependency injection isn’t a fit for your use case.

export const promises = {
  writeFile: vi.fn((path, data) => {
    return new Promise((resolve, reject) => {
      resolve()
    })
  })
}
