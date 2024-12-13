/* eslint-disable @typescript-eslint/naming-convention */
export interface SignUpResponseData {
  message: string;
}

export interface LogInRequestData {
  email: string;
  password: string;
}

export interface AuthResponseData {
  login_token: string;
  refresh_token: string;
}

export interface ValidateTokenResponseData {
  isValid: boolean;
}
