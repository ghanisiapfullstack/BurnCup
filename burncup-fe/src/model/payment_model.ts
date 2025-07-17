export interface QRPaymentResponse {
  qrLink: string;
  expiryTime: string; // ISO 8601 format (RFC3339)
}