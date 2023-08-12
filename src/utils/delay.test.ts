import { delay } from './delay'

describe('delay.ts', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('delay of 200 milliseconds', async () => {
    const fn = jest.fn()

    delay(200).then(fn)

    await jest.advanceTimersByTimeAsync(100)
    expect(fn).not.toHaveBeenCalled()

    await jest.advanceTimersByTimeAsync(100)
    expect(fn).toHaveBeenCalled()
  })

  it('delay of 0 milliseconds', async () => {
    const fn = jest.fn()

    delay(0).then(fn)

    await jest.advanceTimersByTimeAsync(0)
    expect(fn).toHaveBeenCalled()
  })

  it('delay of 1 second', async () => {
    const fn = jest.fn()

    delay(1000).then(fn)

    jest.advanceTimersByTime(1000)
    await Promise.resolve()
    expect(fn).toHaveBeenCalled()
  })
})
