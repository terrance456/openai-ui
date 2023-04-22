export interface CreditsResponseType {
  userData: CreditsType;
}

export interface CreditsType {
  userId: string;
  email: string;
  credits: number;
}
