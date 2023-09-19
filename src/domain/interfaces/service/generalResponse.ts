import { LogLevelEnum } from "../../../infrastructure/utils/log/logger";

export interface GeneralResponse {
  data?: any;
  error?: error;
  statusCode: number;
  success: boolean;
}

interface error {
  message: string;
  errorMessage?: string;
  details?: errorDetails[];
}

export interface errorDetails {
  errorDetails: string | object;
  label?: string;
  typeError?: LogLevelEnum;
}