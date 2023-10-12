import { setupServer } from 'msw/node'
import { rest } from 'msw'

export function createServer(handlerConfig) {
  // Create the handlers based on the the config passed in by each test
  const handlers = handlerConfig.map(config => {
    return rest[config.method || 'get'](config.path, (req, res, ctx) => {
      return res(ctx.json(config.res(req, res, ctx)))
    })
  })
  const server = setupServer(...handlers)

  // these lifecycle hooks are required by msw
  beforeAll(() => {
    server.listen()
  })
  afterEach(() => {
    server.resetHandlers()
  })
  afterAll(() => {
    server.close()
  })
}
