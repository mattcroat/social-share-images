import { IncomingMessage, ServerResponse } from 'http'

import { parseRequest } from './_lib/parse'
import { getScreenshot } from './_lib/screenshot'
import { getHtml } from './_lib/template'

const isHtmlDebug = process.env.OG_HTML_DEBUG === '1'

// @ts-ignore
// process.env.AWS_LAMBDA_FUNCTION_NAME = true

export default async function handler(
  request: IncomingMessage,
  response: ServerResponse
) {
  try {
    const parsedRequest = parseRequest(request)
    const html = getHtml(parsedRequest)

    if (isHtmlDebug) {
      response.setHeader('Content-Type', 'text/html')
      response.end(html)
      return
    }

    const image = await getScreenshot(html)

    response.statusCode = 200
    response.setHeader('Content-Type', `image/png`)
    response.setHeader(
      'Cache-Control',
      `public, immutable, no-transform, s-maxage=31536000, max-age=31536000`
    )
    response.end(image)
  } catch (error) {
    response.statusCode = 500
    response.setHeader('Content-Type', 'text/html')
    response.end('<h1>Something goofed up!</h1>')
    console.error(error)
  }
}
