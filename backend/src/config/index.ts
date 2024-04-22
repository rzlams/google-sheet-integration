import * as dotenv from "dotenv";

dotenv.config();

export const config = {
  app: {
    logLevel: process.env.APP_LOG_LEVEL as string,
    googleSheetApiKey: process.env.GOOGLE_API_KEY as string,
  },
  retryOptions: {
    delay: 200,
    factor: 2,
    maxAttempts: 5,
    minDelay: 100,
    maxDelay: 500,
    jitter: true,
  },
};
