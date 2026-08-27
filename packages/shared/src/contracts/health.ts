/** Response contract of `GET /health`. */
export interface HealthResponse {
  status: 'ok';
  uptime: number;
  timestamp: string;
}
