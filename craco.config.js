const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              'primary-color': '#31AAB7',
              'link-color': '#0078CE',
              'menu-dark-bg': '#2D3142',
              'menu-dark-item-active-bg': '#00000040',
              'menu-dark-item-hover-bg': '#FFFFFF0F',
              'font-size-base': '16px',
              'text-color': '#415060',
              'dropdown-font-size': '1.4rem',
              'typography-title-margin-top': '0.4em',
              'checkbox-check-bg': '#fff',
              'checkbox-check-color': '#fff',
              'checkbox-color': 'rgb(0, 120, 206)',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
