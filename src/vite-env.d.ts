/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_PORT: number;
	readonly VITE_NODE_ENV: string;
	readonly VITE_TIMEOUT: number;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
