import * as Winston from "winston";

export type Logger = ReturnType<typeof createLogger>;

const { combine, timestamp, json } = Winston.format;

const baseFields = (module: string, processId = "") =>
  Winston.format((info) => {
    return {
      ...info,
      module,
      ...(processId ? { processId } : {}),
    } as Winston.Logform.TransformableInfo;
  })();

export function createLogger(
  module: string,
  {
    processId = "",
    logLevel = "debug",
  }: { processId?: string; logLevel?: string } = {},
) {
  const logger = Winston.createLogger({
    transports: [
      new Winston.transports.Console({
        level: logLevel,
        handleExceptions: true,
        format: combine(timestamp(), baseFields(module, processId), json()),
      }),
    ],
  });

  return {
    log: (message: string, structure?: Record<string, unknown>) => {
      logger.info(message, structure);
    },

    error: (message: string, structure?: Record<string, unknown>) => {
      logger.error(message, structure);
    },

    warn: (message: string, structure?: Record<string, unknown>) => {
      logger.warn(message, structure);
    },

    debug: (message: string, structure?: Record<string, unknown>) => {
      logger.debug(message, structure);
    },

    verbose: (message: string, structure?: Record<string, unknown>) => {
      logger.verbose(message, structure);
    },
  };
}

export function createUserLogger(
  logger: Logger,
  clientData: Record<string, string>,
) {
  return {
    log: (message: string, structure?: Record<string, unknown>) => {
      logger.log(message, { ...structure, ...clientData });
    },

    error: (message: string, structure?: Record<string, unknown>) => {
      logger.error(message, { ...structure, ...clientData });
    },

    warn: (message: string, structure?: Record<string, unknown>) => {
      logger.warn(message, { ...structure, ...clientData });
    },

    debug: (message: string, structure?: Record<string, unknown>) => {
      logger.debug(message, { ...structure, ...clientData });
    },

    verbose: (message: string, structure?: Record<string, unknown>) => {
      logger.verbose(message, { ...structure, ...clientData });
    },
  };
}
