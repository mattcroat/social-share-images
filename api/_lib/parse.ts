// import type { IncomingMessage } from 'http'

// @ts-ignore
export function parseRequest(request) {
  console.log(`HTTP: ${request.url}`)

  const textMatch = request.url?.match(/\/(.*?).png/)
  const text = textMatch ? textMatch[1] : ''

  const parsedRequest = {
    text: decodeURIComponent(text),
  }

  return parsedRequest
}
