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

export class APIResultOBSSceneList {
  scenes: string[];
  active_scene: string;
}

export class APIResultOBSStatus {
  recording: boolean;
  streaming: boolean;
}
