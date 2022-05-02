import type { IncomingMessage } from 'http'

export function parseRequest(request: IncomingMessage) {
  console.log(`HTTP: ${request.url}`)

  const textMatch = request.url?.match(/\/(.*?).png/)
  const text = textMatch ? textMatch[1] : ''

  const parsedRequest = {
    text: decodeURIComponent(text),
  }

  return parsedRequest
}
