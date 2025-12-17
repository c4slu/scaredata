export interface DataQualityIssue {
  type:
    | "missing_values"
    | "duplicates"
    | "outliers"
    | "inconsistency"
    | "format_error"
    | "data_type_mismatch";
  severity: "low" | "medium" | "high" | "critical";
  column?: string;
  row?: number;
  description: string;
  affectedRecords: number;
  recommendation: string;
}

export interface DataQualityReport {
  fileName: string;
  totalRows: number;
  totalColumns: number;
  qualityScore: number; // 0-100
  issues: DataQualityIssue[];
  summary: {
    missingValues: number;
    duplicates: number;
    outliers: number;
    inconsistencies: number;
  };
  aiInsights: string;
  recommendations: string[];
  processedAt: string;
}

export interface ColumnAnalysis {
  name: string;
  type: "string" | "number" | "date" | "boolean" | "mixed";
  uniqueValues: number;
  nullCount: number;
  nullPercentage: number;
  sampleValues: any[];
}
