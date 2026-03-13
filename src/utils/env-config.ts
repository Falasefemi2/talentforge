/** @format */

interface AppImportMetaEnv {
  readonly VITE_API_BASE_URL?: string;
  readonly VITE_API_URL?: string;
  readonly DEV?: boolean;
}

const env = (import.meta as ImportMeta & { env: AppImportMetaEnv }).env;

export const ENV_CONFIG = {
  baseUrl:
    env.VITE_API_BASE_URL ?? env.VITE_API_URL ?? "https://talentforge.runasp.net/api/",
  isDev: Boolean(env.DEV),
} as const;
