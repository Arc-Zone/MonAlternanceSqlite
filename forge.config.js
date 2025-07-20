const { FusesPlugin } = require('@electron-forge/plugin-fuses');
const { FuseV1Options, FuseVersion } = require('@electron/fuses');

module.exports = {
  // -------------------------------------------------------------------
  // CHEMIN D’ACCÈS PRINCIPAL
  // -------------------------------------------------------------------
  // Correspond à ton "main" dans package.json (index.js)
  // Forge lira et packagera ce fichier comme point d’entrée Electron.
  main: 'index.js',

  // -------------------------------------------------------------------
  // PACKAGER CONFIGURATION (Electron Packager)
  // -------------------------------------------------------------------
// forge.config.js
packagerConfig: {
    asar: {
      // Tout ce qui matche sous public/docs/cv sera dépaqueté
      unpack: 'public/docs/cv/**/*'
    },
    extraResource: [
      'views',   // tes templates EJS
      'public'   // ton CSS/JS, images, etc.
    ],
    // icon: './assets/icon'
  },
  // -------------------------------------------------------------------
  // REBUILD CONFIGURATION
  // -------------------------------------------------------------------
  rebuildConfig: {
    // Laisse vide, ou ajoute ici tes modules natifs à rebuild
  },

  // -------------------------------------------------------------------
  // MAKERS — création des installeurs / archives
  // -------------------------------------------------------------------
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        // Config spécifique à Windows Squirrel (optionnel)
      }
    },
    {
      name: '@electron-forge/maker-zip',
      // Génère un .zip pour macOS
      platforms: ['darwin']
    },
    {
      name: '@electron-forge/maker-deb',
      config: {
        // Config Debian/Ubuntu
      }
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {
        // Config RedHat/Fedora
      }
    }
  ],

  // -------------------------------------------------------------------
  // PLUGINS — fuses & unpack natives
  // -------------------------------------------------------------------
  plugins: [
    {
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {
        // Permet de gérer les dépendances natives hors de l’ASAR
      }
    },
    new FusesPlugin({
      version: FuseVersion.V1,
      // Désactive le mode Node intégré (on utilise Express via server.js)
      [FuseV1Options.RunAsNode]: false,
      // Active la validation d’intégrité de l’ASAR
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      // Forcer le chargement du code uniquement depuis l’ASAR
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
      // Les autres options peuvent rester sur false
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false
    })
  ]
};
