import chalk from 'chalk';

import { Logger, LogLevel, VendureLogger } from './ecomentor-logger';

const DEFAULT_CONTEXT = 'Vendure Server';

/**
 * @description
 * The default logger, which logs to the console (stdout) with optional timestamps. Since this logger is part of the
 * default Vendure configuration, you do not need to specify it explicitly in your server config. You would only need
 * to specify it if you wish to change the log level (which defaults to `LogLevel.Info`) or remove the timestamp.
 *
 * @example
 * ```ts
 * import { DefaultLogger, LogLevel, EcomentorConfig } from '\@vendure/core';
 *
 * export config: EcomentorConfig = {
 *     // ...
 *     logger: new DefaultLogger({ level: LogLevel.Debug, timestamp: false }),
 * }
 * ```
 *
 * @docsCategory Logger
 */
export class DefaultLogger implements VendureLogger {
    /** @internal */
    level: LogLevel = LogLevel.Info;
    private readonly timestamp: boolean;
    private defaultContext = DEFAULT_CONTEXT;
    private readonly localeStringOptions = {
        year: '2-digit',
        hour: 'numeric',
        minute: 'numeric',
        day: 'numeric',
        month: 'numeric',
    } as const;
    private static originalLogLevel: LogLevel;

    constructor(options?: { level?: LogLevel; timestamp?: boolean }) {
        this.level = options && options.level != null ? options.level : LogLevel.Info;
        this.timestamp = options && options.timestamp !== undefined ? options.timestamp : true;
    }

    /**
     * @description
     * A work-around to hide the info-level logs generated by Nest when bootstrapping the AppModule.
     * To be run directly before the `NestFactory.create()` call in the `bootstrap()` function.
     *
     * See https://github.com/nestjs/nest/issues/1838
     * @internal
     */
    static hideNestBoostrapLogs(): void {
        const { logger } = Logger;
        if (logger instanceof DefaultLogger) {
            if (logger.level === LogLevel.Info) {
                this.originalLogLevel = LogLevel.Info;
                logger.level = LogLevel.Warn;
            }
        }
    }

    /**
     * @description
     * If the log level was changed by `hideNestBoostrapLogs()`, this method will restore the
     * original log level. To be run directly after the `NestFactory.create()` call in the
     * `bootstrap()` function.
     *
     * See https://github.com/nestjs/nest/issues/1838
     * @internal
     */
    static restoreOriginalLogLevel(): void {
        const { logger } = Logger;
        if (logger instanceof DefaultLogger && DefaultLogger.originalLogLevel !== undefined) {
            logger.level = DefaultLogger.originalLogLevel;
        }
    }

    setDefaultContext(defaultContext: string) {
        this.defaultContext = defaultContext;
    }

    error(message: string, context?: string, trace?: string | undefined): void {
        if (context === 'ExceptionsHandler' && this.level < LogLevel.Verbose) {
            // In Nest v7, there is an ExternalExceptionFilter which catches *all*
            // errors and logs them, no matter the LogLevel attached to the error.
            // This results in overly-noisy logger output (e.g. a failed login attempt
            // will log a full stack trace). This check means we only let it log if
            // we are in Verbose or Debug mode.
            return;
        }
        if (this.level >= LogLevel.Error) {
            this.logMessage(
                chalk.red(`error`),
                chalk.red(this.ensureString(message) + (trace ? `\n${trace}` : '')),
                context,
            );
        }
    }
    warn(message: string, context?: string): void {
        if (this.level >= LogLevel.Warn) {
            this.logMessage(chalk.yellow(`warn`), chalk.yellow(this.ensureString(message)), context);
        }
    }
    info(message: string, context?: string): void {
        if (this.level >= LogLevel.Info) {
            this.logMessage(chalk.blue(`info`), this.ensureString(message), context);
        }
    }
    verbose(message: string, context?: string): void {
        if (this.level >= LogLevel.Verbose) {
            this.logMessage(chalk.magenta(`verbose`), this.ensureString(message), context);
        }
    }
    debug(message: string, context?: string): void {
        if (this.level >= LogLevel.Debug) {
            this.logMessage(chalk.magenta(`debug`), this.ensureString(message), context);
        }
    }

    private logMessage(prefix: string, message: string, context?: string) {
        process.stdout.write(
            [prefix, this.logTimestamp(), this.logContext(context), message, '\n'].join(' '),
        );
    }

    private logContext(context?: string) {
        return chalk.cyan(`[${context || this.defaultContext}]`);
    }

    private logTimestamp() {
        if (this.timestamp) {
            const timestamp = new Date(Date.now()).toLocaleString(undefined, this.localeStringOptions);
            return chalk.gray(timestamp + ' -');
        } else {
            return '';
        }
    }

    private ensureString(message: string | object | any[]): string {
        return typeof message === 'string' ? message : JSON.stringify(message, null, 2);
    }
}
