export const env = {
   appEnv:
      process.env.NODE_ENV ??
      ("development" as "development" | "production" | "test"),
   appName: process.env.APP_NAME ?? "Uploadany",
   appTagline: process.env.APP_TAGLINE ?? "A powerful file uploading service",
   appUrl: process.env.APP_URL ?? "http://localhost:3000",
   apiUrl: process.env.API_URL ?? "http://localhost:3333",
   nextPublicApiUrl: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3333",
   jwtSecret: process.env.JWT_SECRET ?? "your_jwt_secret",
   jwtExpiration: process.env.JWT_EXPIRATION ?? "1d",
   jwtExpirationNumber: process.env.JWT_EXPIRATION_NUMBER ?? 86400,
};