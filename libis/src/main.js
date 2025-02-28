import { createApp } from "vue";
import { createPinia } from "pinia"; // Import Pinia
import App from "./App.vue";
import router from "./router";
import "mdb-vue-ui-kit/css/mdb.min.css";
import "./style.css";

import * as Sentry from "@sentry/vue";

const app = createApp(App);
const pinia = createPinia(); // Create Pinia instance

Sentry.init({
  app,
  dsn: "https://7580663620e64ad69018690f555572b8@o4508824465637376.ingest.de.sentry.io/4508897783709776",
  integrations: [
    Sentry.browserTracingIntegration({ router }),
    Sentry.replayIntegration(),
  ],
  // Tracing
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

app.use(pinia); // Use Pinia before router
app.use(router);
app.mount("#app");
