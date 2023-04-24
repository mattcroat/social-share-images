# Social Share Images

![Example of a social share image](./images/social-share-image.png)

Social share images are a must to grab the attention of readers when sharing your content on social media.

## 🤨 What is an Open Graph image?

The [Open Graph protocol](https://ogp.me/) is extra metadata about your site social media sites can use. One of the meta tags you can include is `og:image` which is a link to a **1200x630** pixels image that's going to be used as the preview image for your content.

```html
<head>
  <!-- ... -->
  <meta property="og:image" content="og-image.png" />
  <!-- ... -->
</head>
```

If you have a blog creating a social share image for every post is tedious so I created this to automate it.

## 🤔 How does it work?

This is based on [vercel/og-image](https://github.com/vercel/og-image).

- It uses an `api` folder that's going to be a serverless function on Vercel
- Using [Puppeteer](https://github.com/puppeteer/puppeteer) and visiting the API endpoint at `http://localhost:3000/[any text including emojis].png` it uses the HTML template and takes a screenshot and caches it forever on Vercel's CDN (you can purge the cache by doing a redeploy)
- The HTML template is inside `api/_lib/template.ts` and it takes a text parameter that's parsed from the URL inside `api/_lib/parse.ts` while the screenshot logic is inside `api/_lib/screenshot.ts`
- Inside `vercel.json` there's a simple URL rewrite that treats the `/` path as `/api`

**Because serverless functions are limited to 50 MB the Chromium binary has to be small enough to not exceed that limit** that's why [chrome-aws-lambda](https://github.com/alixaxel/chrome-aws-lambda) and [puppeteer-core](https://github.com/puppeteer/puppeteer) is used.

In development you have to uncomment `process.env.AWS_LAMBDA_FUNCTION_NAME = true` line so `chrome-aws-lambda` thinks it's in a serverless environment and uses the Chromium binary which is easier than the original example.

If you ever go over the 50 MB size limit because of the size of the Chromium binary you can use an older version of `chrome-aws-lambda` to reduce the size so be careful when updating packages.

## 📜 Setup

The project uses 📦️ [pnpm](https://pnpm.io/) but you can use any package manager.

### 👬 Clone the project

```sh
git clone https://github.com/mattcroat/social-share-images.git
```

### 📦️ Install the dependencies

```sh
pnpm i
```

### 📜 You can use the Vercel development environment with `vercel dev` which requires you to connect GitHub to Vercel and links the project on Vercel

```sh
pnpx vercel dev
```
