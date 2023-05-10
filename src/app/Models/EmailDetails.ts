export interface EmailDetails {
  recipient: string;
  subject: string;
  msgBody: string;
  attachment?: File | null;
}
