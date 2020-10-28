module.exports = (api) => {
  const defaultPlugins = [
    ["@babel/plugin-transform-runtime"],
    ['@babel/plugin-proposal-decorators', {legacy: true}],
    ['@babel/plugin-proposal-export-namespace-from'],
    [
      '@babel/plugin-proposal-class-properties',
      {loose: true},
    ]
  ];
  return api.env('test') ? {
    plugins: [
      ['babel-plugin-rewire-ts'],
      ...defaultPlugins
    ],
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            node: 'current'
          },
        }
      ],
      '@babel/preset-react',
      '@babel/preset-typescript'
    ]
  } : {
    plugins: defaultPlugins,
    presets: [
      [
        '@babel/preset-env',
        {
          modules: false,
          targets: {
            "browsers": ["last 2 versions", "ie >=9"]
          }
        }
      ],
      '@babel/preset-react',
      '@babel/preset-typescript'
    ]
  };
};
