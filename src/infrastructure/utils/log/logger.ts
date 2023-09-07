import { getEnv } from "../../config/env";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type optionsPramsType = any[];

export enum LogLevelEnum {
  'INFO' = 'info',
  'WARN' = 'warn',
  'ERROR' = 'error',
  'DEBUG' = 'debug',
  'OFF' = 'off',
}

const logLevelNumber: { [key in LogLevelEnum]: number } = {
  [LogLevelEnum.OFF]: 0,
  [LogLevelEnum.ERROR]: 1,
  [LogLevelEnum.INFO]: 2,
  [LogLevelEnum.WARN]: 3,
  [LogLevelEnum.DEBUG]: 4,
};

const DEFAULT_LEVEL_LOGS = '4';

class LoggerBase {
  private levelLogs = Number(getEnv().LEVEL_LOGS || DEFAULT_LEVEL_LOGS);

  public setLevel(newLevel: LogLevelEnum) {
    this.levelLogs = logLevelNumber[newLevel];
  }

  public debug(message: unknown, ...optionalParams: optionsPramsType): void {
    this.handleEmitLogMessage(LogLevelEnum.DEBUG, message, optionalParams);
  }

  public error(message: unknown, ...optionalParams: optionsPramsType): void {
    this.handleEmitLogMessage(LogLevelEnum.ERROR, message, optionalParams);
  }

  public warn(message: unknown, ...optionalParams: optionsPramsType): void {
    this.handleEmitLogMessage(LogLevelEnum.WARN, message, optionalParams);
  }

  public info(message: unknown, ...optionalParams: optionsPramsType): void {
    this.handleEmitLogMessage(LogLevelEnum.INFO, message, optionalParams);
  }

  private handleEmitLogMessage(levelLog: LogLevelEnum, message: unknown, optionalParams: optionsPramsType) {
    if (logLevelNumber[levelLog] > this.levelLogs) {
      return;
    }

    if (levelLog === LogLevelEnum.OFF) {
      return;
    }

    this.emitLogMessage(levelLog, message, optionalParams);
  }

  private emitLogMessage(
    levelLog: Exclude<LogLevelEnum, LogLevelEnum.OFF>,
    message: unknown,
    optionalParams: optionsPramsType,
  ): void {
    if (optionalParams?.length > 0) {
      console[levelLog](message, optionalParams);
    } else {
      console[levelLog](message);
    }
  }
}

export const Logger = new LoggerBase();