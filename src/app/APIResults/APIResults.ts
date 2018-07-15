export interface APIResult {
  success: string;
  error: string;
  payload: Object;
}

class PayloadGetAuth {
  token: string;
}

export class APIResultGetAuth implements APIResult {
  success: string;
  error: string;
  payload: PayloadGetAuth;
}
