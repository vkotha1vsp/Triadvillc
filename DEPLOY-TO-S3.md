# Deploying the TRIADVI Website to Amazon S3

This folder contains the complete, production-ready static website — plain HTML, CSS, and JavaScript. No build step or server is required to run it.

## 1. Upload to your S3 bucket

Sync the contents of this `dist/` folder (not the folder itself) to your bucket root:

```
aws s3 sync . s3://YOUR-BUCKET-NAME --delete
```

## 2. Configure static website hosting

In the S3 console, on your bucket: **Properties → Static website hosting → Enable**
- Index document: `index.html`
- Error document: `404.html` (optional — you can point this to `index.html` or create a custom 404 page)

## 3. Set correct content types (if needed)

`aws s3 sync` generally sets correct MIME types automatically. If you see CSS/JS not applying, confirm:
- `.html` → `text/html`
- `.css` → `text/css`
- `.js` → `application/javascript`
- `.xml` → `application/xml`

## 4. Update URLs before going live

Search-and-replace `https://www.triadvi.com` with your actual production domain across:
- `sitemap.xml`
- `robots.txt`
- Every page's `<meta property="og:url">`, `<link rel="canonical">`, and Open Graph image tag

(These were set to the intended production domain; update if you use a different one.)

## 5. CloudFront (recommended)

For HTTPS, custom domain support, and better performance, front the S3 bucket with a CloudFront distribution pointing at the S3 static website endpoint (not the REST endpoint), and attach an ACM certificate for your domain.

## 6. Contact form note

The contact form on `/contact.html` is client-side only (it opens a pre-filled `mailto:` to admin@triadvi.com). If you'd like real form submissions captured server-side, connect it to a service like AWS SES via API Gateway + Lambda, Formspree, or a similar form backend — the form's `id="contact-form"` and field names are ready to wire up in `assets/js/contact.js`.

## Structure

```
/index.html                Home
/services.html              Services
/microsoft-365.html
/power-platform.html        (interactive Canvas App + Power Automate demo)
/azure-ai.html               (interactive Copilot / RAG chat demo)
/devops.html
/sap-attp.html               (interactive supply-chain, track-and-trace, counterfeit demos)
/industries.html + /industries/*.html
/projects.html + /projects/*.html   (7 project detail pages)
/blog.html + /blog/*.html            (16 articles)
/about.html
/contact.html                (contact form + Leaflet map)
/privacy.html
/terms.html
/sitemap.xml, /robots.txt
/assets/css/styles.css
/assets/js/*.js
/assets/img/*
```
