import { NextRequest, NextResponse } from "next/server";
import { DataAnalyzer } from "@/lib/utils/data-analyzer";
import { AIAnalysisService } from "@/lib/services/ai-service";
import { DataQualityReport } from "@/lib/types/data-analysis";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "Nenhum arquivo foi enviado" },
        { status: 400 }
      );
    }

    // Validar tamanho do arquivo (max 100MB)
    if (file.size > 100 * 1024 * 1024) {
      return NextResponse.json(
        { error: "Arquivo muito grande.  Máximo:  100MB" },
        { status: 400 }
      );
    }

    // Validar tipo de arquivo
    const validExtensions = ["csv", "xlsx", "xls"];
    const fileExtension = file.name.split(".").pop()?.toLowerCase();
    if (!fileExtension || !validExtensions.includes(fileExtension)) {
      return NextResponse.json(
        { error: "Formato de arquivo inválido. Use CSV ou Excel" },
        { status: 400 }
      );
    }

    // Converter file para buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Analisar dados
    const analyzer = new DataAnalyzer();
    await analyzer.parseFile(buffer, file.name);

    const columnAnalysis = analyzer.analyzeColumns();
    const issues = analyzer.detectIssues();
    const qualityScore = analyzer.calculateQualityScore();

    // Preparar relatório parcial
    const partialReport: Partial<DataQualityReport> = {
      fileName: file.name,
      totalRows: analyzer.getData().length,
      totalColumns: analyzer.getColumns().length,
      qualityScore,
      issues,
      summary: {
        missingValues: issues.filter((i) => i.type === "missing_values").length,
        duplicates: issues.filter((i) => i.type === "duplicates").length,
        outliers: issues.filter((i) => i.type === "outliers").length,
        inconsistencies: issues.filter((i) => i.type === "inconsistency")
          .length,
      },
    };

    // Gerar insights com IA
    const aiService = new AIAnalysisService();
    const { insights, recommendations } = await aiService.generateInsights(
      partialReport
    );

    // Relatório completo
    const fullReport: DataQualityReport = {
      ...(partialReport as DataQualityReport),
      aiInsights: insights,
      recommendations,
      processedAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      report: fullReport,
      columnAnalysis,
    });
  } catch (error: any) {
    console.error("Erro ao analisar arquivo:", error);
    return NextResponse.json(
      { error: error.message || "Erro ao processar arquivo" },
      { status: 500 }
    );
  }
}
