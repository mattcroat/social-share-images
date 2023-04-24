//@ts-nocheck

import chrome from 'chrome-aws-lambda'
import puppeteer from 'puppeteer-core'

export async function getScreenshot(html: string) {
  const browser = await puppeteer.launch({
    args: chrome.args,
    executablePath: await chrome.executablePath,
    headless: chrome.headless,
  })
  const page = await browser.newPage()

  await page.setViewport({ width: 1200, height: 630 })
  await page.setContent(html)
  const image = await page.screenshot({ type: 'png' })

  return image
}
