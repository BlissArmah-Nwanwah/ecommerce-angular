/* eslint-disable @typescript-eslint/naming-convention */
export interface SignUpRequestData {
  email: string|null;
  firstName: string|null;
  lastName: string|null;
  password: string|null;
}

export interface SignUpResponseData {
  message: string;
}

export interface LogInRequestData {
  email: string;
  password: string;
}

export interface LogInResponseData {
  login_token: string;
  refresh_token: string;
}


export interface RefreshTokenResponseData {
  login_token: string;
  refresh_token: string;
}

export interface ValidateTokenResponseData {
  isValid: boolean;
}
