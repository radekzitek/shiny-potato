import * as Sentry from "@sentry/vue";

const SentryService = {
  debug(message, ...optionalParams) {
    this.captureMessage(message, "debug", ...optionalParams);
  },

  info(message, ...optionalParams) {
    this.captureMessage(message, "info", ...optionalParams);
  },

  warning(message, ...optionalParams) {
    this.captureMessage(message, "warning", ...optionalParams);
  },

  error(message, ...optionalParams) {
    this.captureMessage(message, "error", ...optionalParams);
  },

  log(message, ...optionalParams) {
    this.captureMessage(message, "log", ...optionalParams);
  },

  captureMessage(message, level = "info", optionalParams = {}) {
    Sentry.captureMessage(message, {
      level: level,
      ...optionalParams, // Add any additional context (tags, extra)
    });
  },
};

export default SentryService;