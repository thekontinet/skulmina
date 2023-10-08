import pino from "pino";
import pinoPretty from "pino-pretty";

// Log to the console with pretty-printing for development
const logger = pino({
  transport: { target: "./app.log" },
  level: "info", // Set the log level
});

export default logger;
