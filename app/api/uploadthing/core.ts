import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const uploadRouter = {
  referenceUploader: f({
    image: {
      maxFileCount: 8,
      maxFileSize: "8MB",
    },
  })
    .middleware(async () => ({}))
    .onUploadComplete(async ({ file }) => ({
      key: file.key,
      name: file.name,
      size: file.size,
      url: file.ufsUrl,
    })),
} satisfies FileRouter;

export type OurFileRouter = typeof uploadRouter;
