"use client";

import { useState, useEffect } from "react";
import {
  Upload,
  Loader2,
  FileText,
  FileSpreadsheet,
  X,
  CheckCircle,
  AlertTriangle,
  Info,
  Sparkles,
  Zap,
} from "lucide-react";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { DataQualityReport } from "@/lib/types/data-analysis";
import { MarkdownRenderer } from "./MarkdownRenderer";
import { Badge } from "./ui/badge";

export function FileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [report, setReport] = useState<DataQualityReport | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showReport, setShowReport] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError(null);
      setReport(null);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);
    setError(null);
    setUploadProgress(0);

    try {
      const formData = new FormData();
      formData.append("file", file);

      // Simular progresso do upload
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      const response = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });

      clearInterval(progressInterval);
      setUploadProgress(100);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erro ao analisar arquivo");
      }

      setReport(data.report);
      setTimeout(() => setShowReport(true), 100);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setTimeout(() => {
        setLoading(false);
        setUploadProgress(0);
      }, 500);
    }
  };

  useEffect(() => {
    if (!report) {
      setShowReport(false);
    }
  }, [report]);

  return (
    <div className="w-full mx-auto p-6 flex gap-8 justify-center items-start flex-col md:flex-row md:items-stretch transition-all duration-700">
      <div
        className={`border snake-border w-full md:w-[36%] h-1/2 transition-transform duration-700 ease-[cubic-bezier(0.4,0.0,0.2,1)] 
          ${showReport ? "md:-translate-x-2" : "md:translate-x-0"}
        `}
      >
        <div className="flex flex-col items-center gap-4 p-12 relative z-10 justify-center h-full">
          <Badge
            variant="default"
            className="border-primary bg-primary/20 text-primary h-7"
          >
            <Zap />
            AI-Powered by Gemini 1.5
          </Badge>
          <Upload className="w-12 h-12 text-primary" />

          <div>
            <label htmlFor="file-upload" className="cursor-pointer">
              <span className="text-primary hover:underline">
                Clique para selecionar
              </span>
              <span className="text-muted-foreground">
                {" "}
                ou arraste o arquivo aqui
              </span>
            </label>
            <input
              id="file-upload"
              type="file"
              accept=".csv,.xlsx,.xls"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {file && (
            <div className="w-full max-w-md">
              {loading ? (
                <div className="bg-background/80 border border-primary/20 rounded-lg p-4 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      {file.name.endsWith(".csv") ? (
                        <FileText className="w-5 h-5 text-primary" />
                      ) : (
                        <FileSpreadsheet className="w-5 h-5 text-primary" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">
                            {file.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {file.type ||
                              file.name.split(".").pop()?.toUpperCase()}{" "}
                            • {(file.size / 1024).toFixed(1)} KB
                          </p>
                        </div>
                        <Loader2 className="w-4 h-4 text-primary animate-spin flex-shrink-0" />
                      </div>
                      <div className="mt-3 space-y-1">
                        <Progress value={uploadProgress} className="h-1.5" />
                        <p className="text-xs text-muted-foreground text-right">
                          {uploadProgress}%
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-sm text-muted-foreground flex flex-col items-center gap-3">
                  <div className="flex items-center gap-2 bg-primary/5 px-4 py-2 rounded-lg">
                    {file.name.endsWith(".csv") ? (
                      <FileText className="w-4 h-4 text-primary" />
                    ) : (
                      <FileSpreadsheet className="w-4 h-4 text-primary" />
                    )}
                    <span className="text-foreground">{file.name}</span>
                    <button
                      onClick={() => {
                        setFile(null);
                        setReport(null);
                      }}
                      className="ml-2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <Button
                    onClick={handleUpload}
                    disabled={!file || loading}
                    className="mt-2"
                  >
                    Analisar Arquivo
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-500/10 border border-red-500 rounded-lg text-red-500">
          {error}
        </div>
      )}

      {report && (
        <div
          className={`w-full md:w-[58%] space-y-6 transition-all duration-700 ease-[cubic-bezier(0.4,0.0,0.2,1)] ${
            showReport
              ? "opacity-100 translate-y-0 md:translate-x-0"
              : "opacity-0 translate-y-4 md:translate-x-6 pointer-events-none"
          }`}
        >
          <div className="bg-background/50 border rounded-xl p-6 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-6">
              <CheckCircle className="w-6 h-6 text-primary animate-pulse" />
              <h2 className="text-2xl font-semibold">Análise Concluída</h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div
                className="text-center p-4 bg-primary/10 rounded-lg transform transition-all duration-500 hover:scale-105 hover:bg-primary/20 animate-fade-in"
                style={{ animationDelay: "0ms" }}
              >
                <div className="text-3xl font-bold text-primary">
                  {report.qualityScore.toFixed(1)}
                </div>
                <div className="text-sm text-muted-foreground">
                  Score de Qualidade
                </div>
              </div>
              <div
                className="text-center p-4 bg-blue-500/10 rounded-lg transform transition-all duration-500 hover:scale-105 hover:bg-blue-500/20 animate-fade-in"
                style={{ animationDelay: "100ms" }}
              >
                <div className="text-3xl font-bold text-blue-400">
                  {report.totalRows.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">
                  Total de Linhas
                </div>
              </div>
              <div
                className="text-center p-4 bg-purple-500/10 rounded-lg transform transition-all duration-500 hover:scale-105 hover:bg-purple-500/20 animate-fade-in"
                style={{ animationDelay: "200ms" }}
              >
                <div className="text-3xl font-bold text-purple-400">
                  {report.totalColumns}
                </div>
                <div className="text-sm text-muted-foreground">
                  Colunas Analisadas
                </div>
              </div>
              <div
                className="text-center p-4 bg-red-500/10 rounded-lg transform transition-all duration-500 hover:scale-105 hover:bg-red-500/20 animate-fade-in"
                style={{ animationDelay: "300ms" }}
              >
                <div className="text-3xl font-bold text-red-400">
                  {report.issues.length}
                </div>
                <div className="text-sm text-muted-foreground">
                  Problemas Encontrados
                </div>
              </div>
            </div>

            <div
              className="mb-6 animate-fade-in"
              style={{ animationDelay: "400ms" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-primary" />
                <h3 className="text-xl font-semibold">
                  Insights Gerados por IA
                </h3>
              </div>
              <div className="bg-gradient-to-r from-primary/5 to-purple-500/5 border border-primary/20 rounded-lg p-4">
                <MarkdownRenderer
                  content={report.aiInsights}
                  className="text-foreground/90"
                />
              </div>
            </div>

            <div
              className="mb-6 animate-fade-in"
              style={{ animationDelay: "500ms" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Info className="w-5 h-5 text-blue-400" />
                <h3 className="text-xl font-semibold">Recomendações</h3>
              </div>
              <div className="p-4 rounded-lg bg-blue-500/5 border border-blue-500/20">
                <MarkdownRenderer
                  content={report.recommendations.join("\n\n")}
                  className="text-foreground/80"
                />
              </div>
            </div>

            <div
              className="animate-fade-in"
              style={{ animationDelay: "600ms" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="w-5 h-5 text-orange-400" />
                <h3 className="text-xl font-semibold">Problemas Detectados</h3>
              </div>
              {report.issues.length === 0 ? (
                <div className="text-center p-8 bg-primary/5 rounded-lg border border-primary/20">
                  <CheckCircle className="w-12 h-12 text-primary mx-auto mb-2" />
                  <p className="text-foreground font-medium">
                    Nenhum problema detectado!
                  </p>
                  <p className="text-muted-foreground text-sm mt-1">
                    Seus dados estão em ótima qualidade.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {report.issues.map((issue, idx) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-lg border transform transition-all duration-300 hover:scale-[1.02] animate-fade-in ${
                        issue.severity === "critical"
                          ? "border-red-500 bg-red-500/10 hover:bg-red-500/20"
                          : issue.severity === "high"
                          ? "border-orange-500 bg-orange-500/10 hover:bg-orange-500/20"
                          : issue.severity === "medium"
                          ? "border-yellow-500 bg-yellow-500/10 hover:bg-yellow-500/20"
                          : "border-blue-500 bg-blue-500/10 hover:bg-blue-500/20"
                      }`}
                      style={{ animationDelay: `${700 + idx * 50}ms` }}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-medium text-foreground">
                          {issue.description}
                        </span>
                        <span
                          className={`text-xs uppercase px-2 py-1 rounded font-semibold ${
                            issue.severity === "critical"
                              ? "bg-red-500/20 text-red-400"
                              : issue.severity === "high"
                              ? "bg-orange-500/20 text-orange-400"
                              : issue.severity === "medium"
                              ? "bg-yellow-500/20 text-yellow-400"
                              : "bg-blue-500/20 text-blue-400"
                          }`}
                        >
                          {issue.severity}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {issue.recommendation}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
