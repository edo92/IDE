const path = require('path');
const rootDir = process.cwd();

module.exports = {
  packagerConfig: {
    asar: true,
    executableName: 'Electron Monorepo Boilerplate',
    appCopyright: 'Copyright (C) 2023 eduardJacobs',
    icon: path.resolve('assets/images/appIcon.ico'),
    extraResource: ['apps/preload/src/main.ts'],
  },
  makers: [
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {},
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
    },
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-webpack',
      config: {
        devContentSecurityPolicy: `default-src 'self' 'unsafe-inline' data:; script-src 'self' 'unsafe-inline' data:`,
        port: 3000,
        loggerPort: 9000,
        mainConfig: path.join(rootDir, 'tools/webpack/webpack.main.js'),
        renderer: {
          config: path.join(rootDir, 'tools/webpack/webpack.renderer.js'),
          entryPoints: [
            {
              name: 'app_window',
              rhmr: 'react-hot-loader/patch',
              html: path.join(rootDir, 'apps/renderer/src/index.html'),
              js: path.join(rootDir, 'apps/renderer/src/main.tsx'),
              preload: {
                js: path.join(rootDir, 'apps/preload/src/main.ts'),
              },
            },
          ],
        },
        devServer: {
          liveReload: true,
        },
      },
    },
  ],
};
