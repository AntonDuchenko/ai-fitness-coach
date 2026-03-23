export interface WeightLogResponse {
  id: string;
  weight: number;
  date: string;
  notes: string | null;
  createdAt: string;
}

export interface WeightHistoryResponse {
  logs: WeightLogResponse[];
  startWeight: number | null;
  currentWeight: number | null;
  change: number | null;
  changePercent: number | null;
}

export interface CreateWeightLogPayload {
  weight: number;
  date?: string;
  notes?: string;
}
