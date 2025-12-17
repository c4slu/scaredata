import * as XLSX from "xlsx";
import Papa from "papaparse";
import { ColumnAnalysis, DataQualityIssue } from "../types/data-analysis";

export class DataAnalyzer {
  private data: any[] = [];
  private columns: string[] = [];

  async parseFile(buffer: Buffer, filename: string): Promise<void> {
    const ext = filename.split(".").pop()?.toLowerCase();

    if (ext === "csv") {
      await this.parseCSV(buffer);
    } else if (["xlsx", "xls"].includes(ext!)) {
      await this.parseExcel(buffer);
    } else {
      throw new Error("Formato de arquivo não suportado");
    }
  }

  private async parseCSV(buffer: Buffer): Promise<void> {
    const text = buffer.toString("utf-8");
    const result = Papa.parse(text, { header: true, skipEmptyLines: true });
    this.data = result.data;
    this.columns = result.meta.fields || [];
  }

  private async parseExcel(buffer: Buffer): Promise<void> {
    const workbook = XLSX.read(buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    this.data = XLSX.utils.sheet_to_json(worksheet);
    this.columns = Object.keys(this.data[0] || {});
  }

  getData(): any[] {
    return this.data;
  }

  getColumns(): string[] {
    return this.columns;
  }

  analyzeColumns(): ColumnAnalysis[] {
    return this.columns.map((col) => {
      const values = this.data.map((row) => row[col]);
      const nonNullValues = values.filter((v) => v != null && v !== "");
      const uniqueValues = new Set(nonNullValues);
      const nullCount = values.length - nonNullValues.length;

      return {
        name: col,
        type: this.inferType(nonNullValues),
        uniqueValues: uniqueValues.size,
        nullCount,
        nullPercentage: (nullCount / values.length) * 100,
        sampleValues: Array.from(uniqueValues).slice(0, 5),
      };
    });
  }

  private inferType(values: any[]): ColumnAnalysis["type"] {
    if (values.length === 0) return "mixed";

    const types = new Set(
      values.map((v) => {
        if (typeof v === "number") return "number";
        if (typeof v === "boolean") return "boolean";
        if (!isNaN(Date.parse(v))) return "date";
        return "string";
      })
    );

    if (types.size > 1) return "mixed";
    const firstType = types.values().next().value;
    return (firstType ?? "mixed") as ColumnAnalysis["type"];
  }

  detectIssues(): DataQualityIssue[] {
    const issues: DataQualityIssue[] = [];

    // Detectar valores faltantes
    issues.push(...this.detectMissingValues());

    // Detectar duplicatas
    issues.push(...this.detectDuplicates());

    // Detectar outliers
    issues.push(...this.detectOutliers());

    // Detectar inconsistências
    issues.push(...this.detectInconsistencies());

    return issues;
  }

  private detectMissingValues(): DataQualityIssue[] {
    const issues: DataQualityIssue[] = [];
    const columnAnalysis = this.analyzeColumns();

    columnAnalysis.forEach((col) => {
      if (col.nullPercentage > 5) {
        issues.push({
          type: "missing_values",
          severity:
            col.nullPercentage > 50
              ? "critical"
              : col.nullPercentage > 20
              ? "high"
              : "medium",
          column: col.name,
          description: `Coluna "${col.name}" tem ${col.nullPercentage.toFixed(
            1
          )}% de valores faltantes`,
          affectedRecords: col.nullCount,
          recommendation:
            col.nullPercentage > 50
              ? "Considere remover esta coluna ou coletar mais dados"
              : "Preencha os valores faltantes com média/mediana ou remova as linhas",
        });
      }
    });

    return issues;
  }

  private detectDuplicates(): DataQualityIssue[] {
    const issues: DataQualityIssue[] = [];
    const seen = new Set();
    let duplicateCount = 0;

    this.data.forEach((row, index) => {
      const key = JSON.stringify(row);
      if (seen.has(key)) {
        duplicateCount++;
      } else {
        seen.add(key);
      }
    });

    if (duplicateCount > 0) {
      issues.push({
        type: "duplicates",
        severity: duplicateCount > this.data.length * 0.1 ? "high" : "medium",
        description: `Foram encontradas ${duplicateCount} linhas duplicadas`,
        affectedRecords: duplicateCount,
        recommendation:
          "Remova as linhas duplicadas para evitar análises enviesadas",
      });
    }

    return issues;
  }

  private detectOutliers(): DataQualityIssue[] {
    const issues: DataQualityIssue[] = [];
    const columnAnalysis = this.analyzeColumns();

    columnAnalysis.forEach((col) => {
      if (col.type === "number") {
        const values = this.data
          .map((row) => Number(row[col.name]))
          .filter((v) => !isNaN(v));

        if (values.length > 0) {
          const sorted = values.sort((a, b) => a - b);
          const q1 = sorted[Math.floor(sorted.length * 0.25)];
          const q3 = sorted[Math.floor(sorted.length * 0.75)];
          const iqr = q3 - q1;
          const lowerBound = q1 - 1.5 * iqr;
          const upperBound = q3 + 1.5 * iqr;

          const outliers = values.filter(
            (v) => v < lowerBound || v > upperBound
          );

          if (outliers.length > 0) {
            issues.push({
              type: "outliers",
              severity:
                outliers.length > values.length * 0.1 ? "high" : "medium",
              column: col.name,
              description: `Coluna "${col.name}" contém ${outliers.length} outliers`,
              affectedRecords: outliers.length,
              recommendation:
                "Investigue se esses valores são erros ou dados legítimos",
            });
          }
        }
      }
    });

    return issues;
  }

  private detectInconsistencies(): DataQualityIssue[] {
    const issues: DataQualityIssue[] = [];
    const columnAnalysis = this.analyzeColumns();

    columnAnalysis.forEach((col) => {
      if (col.type === "mixed") {
        issues.push({
          type: "inconsistency",
          severity: "medium",
          column: col.name,
          description: `Coluna "${col.name}" contém tipos de dados misturados`,
          affectedRecords: this.data.length,
          recommendation: "Padronize o tipo de dados nesta coluna",
        });
      }
    });

    return issues;
  }

  calculateQualityScore(): number {
    const issues = this.detectIssues();
    const totalCells = this.data.length * this.columns.length;

    let penaltyPoints = 0;
    issues.forEach((issue) => {
      const severityWeight = {
        low: 1,
        medium: 2,
        high: 5,
        critical: 10,
      };
      penaltyPoints +=
        (issue.affectedRecords / totalCells) *
        100 *
        severityWeight[issue.severity];
    });

    return Math.max(0, Math.min(100, 100 - penaltyPoints));
  }
}
