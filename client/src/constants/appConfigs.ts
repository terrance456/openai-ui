export const CommonConfigs = {
  baseUrl: process.env.NODE_ENV === "production" ? process.env.NEXT_PUBLIC_CLIENT_ENDPOINT_URL : "http://localhost:3022",
  imagesHostUrl: process.env.NEXT_PUBLIC_CLIENT_IMAGE_HOST_URL,
};
