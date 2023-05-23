// user registration and log in request data
export interface UserAuthorization {
  username: string;
  password: string;
  password_confirm?: string;
}

// used for user registration response and makeorder response
export interface StandartResponse {
  message: string;
}

// log in response
export interface ResponseLogIn {
  access: string;
  refresh: string;
}

export interface RefreshToken {
  refresh: string;
}

export interface AccessToken {
  access: string;
}
