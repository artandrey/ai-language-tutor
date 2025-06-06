import { defaultPlugins, defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  input: './ultravox-api-schema.json',
  output: {
    path: './src/lib/ultravox/client',
    clean: true,
  },
  plugins: [
    ...defaultPlugins,
    { name: '@hey-api/client-axios' },
    {
      asClass: true,
      name: '@hey-api/sdk',
    },
  ],
});
