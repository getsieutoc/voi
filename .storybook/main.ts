import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
  stories: [
    // Still dont know why putting stories into 'stories' folder at root
    // will make it lose the global styles, but put inside components folder is OK.
    '../components/**/*.mdx',
    '../components/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@storybook/addon-interactions',
    '@storybook/addon-styling-webpack',
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  webpackFinal: async (config, { configType }) => {
    // @ts-expect-error
    config.resolve.plugins = [new TsconfigPathsPlugin()];
    return config;
  },
};

export default config;
