export interface APIResult {
  success: string;
  error: string;
  payload: Object;
}

export class APIResultAuthTokenGet {
  token: string;
}

export class APIResultUserMeDetails {
  steam_id: number;
  scopes: string[];
}
