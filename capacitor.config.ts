import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.obaid.store",
  appName: "متجر عبيد",
  webDir: "out",
  bundledWebRuntime: false,
  server: {
    androidScheme: "https"
  }
};

export default config;
