import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.erastack.pos',
  appName: 'ERASTACK POS',
  webDir: 'out',
  server: {
    androidScheme: 'https',
  },
  android: {
    backgroundColor: '#FAFCFF',
    allowMixedContent: false,
  },
};

export default config;
