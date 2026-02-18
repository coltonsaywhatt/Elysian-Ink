This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Instagram Gallery Setup

The gallery page is already wired to Instagram and reads from:

- `INSTAGRAM_ACCESS_TOKEN` (required)
- `NEXT_PUBLIC_INSTAGRAM_PROFILE_URL` (optional, used for the "Follow on Instagram" button)

1. Create your local env file:

```bash
cp env.example .env.local
```

2. Put your token and profile URL in `.env.local`.
3. Restart dev server if it was already running.
4. Open `http://localhost:3000/gallery`.

### Getting the token

Use Meta's Instagram Graph API flow to generate a user token, then exchange it for a long-lived token.  
Set that long-lived value as `INSTAGRAM_ACCESS_TOKEN`.

Useful docs:
- https://developers.facebook.com/docs/instagram-platform/getting-started
- https://developers.facebook.com/docs/instagram-platform/reference/ig-user/media
- https://developers.facebook.com/docs/facebook-login/guides/access-tokens/get-long-lived

## Formspree + UploadThing (Recommended)

Use Formspree for form delivery and UploadThing for file uploads.

1. Create two Formspree forms:
- one for contact
- one for booking

2. Copy each form endpoint into `.env.local`:

```env
NEXT_PUBLIC_FORMSPREE_CONTACT_ENDPOINT=https://formspree.io/f/your_contact_form_id
NEXT_PUBLIC_FORMSPREE_BOOKING_ENDPOINT=https://formspree.io/f/your_booking_form_id
```

3. Create UploadThing app and copy token:

```env
UPLOADTHING_TOKEN=your_uploadthing_token
```

4. Install dependencies:

```bash
npm install uploadthing @uploadthing/react
```

5. Restart dev server and test:
- submit `/contact` (goes to Formspree)
- submit `/booking` with files (uploads to UploadThing, then submits links to Formspree)

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
