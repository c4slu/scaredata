import { GoogleGenAI } from "@google/genai";
import { DataQualityReport } from "../types/data-analysis";

export class AIAnalysisService {
  private ai: GoogleGenAI;

  constructor() {
    const apiKey = process.env.GOOGLE_API_KEY;

    if (!apiKey) {
      console.error("❌ GOOGLE_API_KEY não encontrada no . env. local");
      throw new Error(
        "Configuração de IA não encontrada.  Adicione GOOGLE_API_KEY no .env.local"
      );
    }

    console.log("✅ Usando Google Gemini 2.5 (gratuito)");
    this.ai = new GoogleGenAI({ apiKey });
  }

  async generateInsights(report: Partial<DataQualityReport>): Promise<{
    insights: string;
    recommendations: string[];
  }> {
    const prompt = this.buildPrompt(report);

    try {
      console.log("🤖 Gerando insights com Google Gemini 2.5 Flash...");

      const response = await this.ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

      const text = response.text || "";

      console.log("✅ Insights gerados com sucesso pela IA!");
      return this.parseAIResponse(text);
    } catch (error: any) {
      // Verificar se é erro de quota
      if (error.message?.includes("429") || error.message?.includes("quota")) {
        console.warn(
          "⚠️ Limite de API do Gemini atingido. Usando análise automatizada."
        );
      } else if (error.message?.includes("404")) {
        console.warn(
          "⚠️ Modelo não encontrado. Tentando modelo alternativo..."
        );
        return this.tryAlternativeModel(prompt);
      } else {
        console.error("❌ Erro ao gerar insights com Gemini:", error.message);
      }

      // Fallback:  retornar análise automatizada (SEM IA)
      console.log("🔄 Gerando análise automatizada (sem IA)...");
      return {
        insights: this.generateFallbackInsights(report),
        recommendations: this.generateFallbackRecommendations(report),
      };
    }
  }

  // Tentar modelos alternativos
  private async tryAlternativeModel(prompt: string): Promise<{
    insights: string;
    recommendations: string[];
  }> {
    const modelsToTry = [
      "gemini-2.0-flash",
      "gemini-1.5-flash",
      "gemini-1.5-pro",
    ];

    for (const modelName of modelsToTry) {
      try {
        console.log(`🔄 Tentando modelo:  ${modelName}...`);
        const response = await this.ai.models.generateContent({
          model: modelName,
          contents: prompt,
        });

        const text = response.text || "";
        console.log(`✅ Sucesso com modelo: ${modelName}`);
        return this.parseAIResponse(text);
      } catch (err: any) {
        console.log(`❌ ${modelName} falhou:  ${err.message}`);
      }
    }

    throw new Error("Todos os modelos falharam");
  }

  private buildPrompt(report: Partial<DataQualityReport>): string {
    return `Você é um especialista em qualidade de dados. Analise este relatório e forneça insights práticos em PORTUGUÊS: 

**Arquivo:** ${report.fileName}
**Total de Linhas:** ${report.totalRows?.toLocaleString()}
**Total de Colunas:** ${report.totalColumns}
**Score de Qualidade:** ${report.qualityScore?.toFixed(1)}/100

**Resumo de Problemas:**
- Valores Faltantes: ${report.summary?.missingValues || 0} colunas afetadas
- Duplicatas:  ${report.summary?.duplicates || 0} registros
- Outliers: ${report.summary?.outliers || 0} colunas com anomalias
- Inconsistências: ${report.summary?.inconsistencies || 0} problemas de tipo

**Principais Problemas Detectados:**
${
  report.issues
    ?.slice(0, 5)
    .map(
      (issue, i) =>
        `${i + 1}. [${issue.severity.toUpperCase()}] ${issue.description}`
    )
    .join("\n") || "Nenhum problema detectado"
}

Forneça em formato estruturado: 

INSIGHTS: 
[Análise geral em 2-3 parágrafos sobre: 
- Avaliação da qualidade geral dos dados
- Impactos potenciais dos problemas encontrados no negócio
- Prioridades de correção recomendadas]

RECOMMENDATIONS:
- [Recomendação específica e acionável 1]
- [Recomendação específica e acionável 2]
- [Recomendação específica e acionável 3]
- [Recomendação específica e acionável 4]
- [Recomendação específica e acionável 5]

Seja direto, prático e técnico. `;
  }

  private parseAIResponse(response: string): {
    insights: string;
    recommendations: string[];
  } {
    const parts = response.split("RECOMMENDATIONS:");
    const insights = parts[0].replace("INSIGHTS:", "").trim();

    const recommendationsText = parts[1] || "";
    const recommendations = recommendationsText
      .split("\n")
      .filter((line) => line.trim().match(/^[-•*]\s/))
      .map((line) => line.replace(/^[-•*]\s*/, "").trim())
      .filter((line) => line.length > 0);

    // Garantir pelo menos 3 recomendações
    if (recommendations.length < 3) {
      recommendations.push(
        "Estabeleça processos de validação de dados na origem",
        "Implemente monitoramento contínuo de qualidade",
        "Documente as regras de negócio para os dados"
      );
    }

    return {
      insights: insights || "Análise completa dos dados realizada com sucesso.",
      recommendations: recommendations.slice(0, 7),
    };
  }

  // Análise automática melhorada (SEM IA)
  private generateFallbackInsights(report: Partial<DataQualityReport>): string {
    const score = report.qualityScore || 0;
    const totalIssues = report.issues?.length || 0;

    // Classificação de qualidade
    let level: string;
    let emoji: string;
    let description: string;

    if (score >= 90) {
      level = "excelente";
      emoji = "🌟";
      description =
        "Os dados estão em ótimo estado, com poucas correções necessárias.";
    } else if (score >= 75) {
      level = "boa";
      emoji = "✅";
      description =
        "A qualidade é satisfatória, mas existem melhorias recomendadas.";
    } else if (score >= 60) {
      level = "moderada";
      emoji = "⚠️";
      description =
        "Diversos problemas foram identificados que podem afetar análises.";
    } else if (score >= 40) {
      level = "baixa";
      emoji = "🔴";
      description =
        "Problemas significativos que exigem atenção antes do uso em produção.";
    } else {
      level = "crítica";
      emoji = "❌";
      description =
        "Qualidade inadequada para uso.  Requer revisão completa dos dados.";
    }

    let analysis = `${emoji} **Análise do arquivo "${report.fileName}"**\n\n`;
    analysis += `O dataset apresenta qualidade **${level}** com score de **${score.toFixed(
      1
    )}/100**.  `;
    analysis += `${description} `;
    analysis += `Foram identificados **${totalIssues} problema${
      totalIssues !== 1 ? "s" : ""
    }** distribuídos em diferentes categorias.\n\n`;

    // Análise por tipo de problema
    const issues = report.issues || [];
    const criticalCount = issues.filter(
      (i) => i.severity === "critical"
    ).length;
    const highCount = issues.filter((i) => i.severity === "high").length;

    if (criticalCount > 0) {
      analysis += `🚨 **${criticalCount} problema${
        criticalCount !== 1 ? "s" : ""
      } crítico${criticalCount !== 1 ? "s" : ""}** requer${
        criticalCount === 1 ? "" : "em"
      } ação imediata.  `;
    }
    if (highCount > 0) {
      analysis += `⚠️ **${highCount} problema${
        highCount !== 1 ? "s" : ""
      } de alta severidade** deve${highCount === 1 ? "" : "m"} ser tratado${
        highCount === 1 ? "" : "s"
      } em breve.`;
    }

    // Análise específica por categoria
    if (report.summary?.missingValues) {
      analysis += `\n\n**Valores Faltantes:** Detectados em ${
        report.summary.missingValues
      } coluna${
        report.summary.missingValues !== 1 ? "s" : ""
      }.  Isso reduz a completude dos dados e pode enviesar análises estatísticas.`;
    }
    if (report.summary?.duplicates) {
      analysis += `\n\n**Duplicatas:** ${report.summary.duplicates} registro${
        report.summary.duplicates !== 1 ? "s duplicados" : " duplicado"
      } encontrado${
        report.summary.duplicates !== 1 ? "s" : ""
      }. Pode causar contagem incorreta e resultados enviesados.`;
    }
    if (report.summary?.outliers) {
      analysis += `\n\n**Outliers:** ${report.summary.outliers} coluna${
        report.summary.outliers !== 1 ? "s" : ""
      } com valores atípicos.  Requer investigação para determinar se são erros ou dados legítimos.`;
    }
    if (report.summary?.inconsistencies) {
      analysis += `\n\n**Inconsistências:** ${
        report.summary.inconsistencies
      } coluna${
        report.summary.inconsistencies !== 1 ? "s" : ""
      } com tipos de dados misturados. Pode causar erros em processamento e análises. `;
    }

    analysis += `\n\n**Recomendação:** ${
      score < 60
        ? "Não utilize estes dados em produção sem as correções necessárias."
        : "Trate os problemas identificados antes de análises críticas. "
    }`;

    return analysis;
  }

  private generateFallbackRecommendations(
    report: Partial<DataQualityReport>
  ): string[] {
    const recs: string[] = [];
    const issues = report.issues || [];

    // Recomendações baseadas em severidade
    const criticalIssues = issues.filter((i) => i.severity === "critical");

    if (criticalIssues.length > 0) {
      recs.push(
        `🚨 URGENTE: Corrija os ${criticalIssues.length} problema${
          criticalIssues.length !== 1 ? "s" : ""
        } crítico${
          criticalIssues.length !== 1 ? "s" : ""
        } imediatamente antes de qualquer análise`
      );
    }

    // Recomendações específicas por tipo
    if (report.summary?.missingValues) {
      const pct =
        (report.summary.missingValues / (report.totalColumns || 1)) * 100;
      if (pct > 50) {
        recs.push(
          "Revise o processo de coleta de dados - mais de 50% das colunas têm valores faltantes"
        );
      } else {
        recs.push(
          "Implemente estratégias de imputação (média, mediana, forward-fill) para valores faltantes ou remova registros incompletos"
        );
      }
    }

    if (report.summary?.duplicates) {
      recs.push(
        `Remova as ${report.summary.duplicates} linha${
          report.summary.duplicates !== 1 ? "s" : ""
        } duplicada${
          report.summary.duplicates !== 1 ? "s" : ""
        } usando agregação ou deduplicação baseada em chave primária`
      );
    }

    if (report.summary?.outliers) {
      recs.push(
        "Investigue outliers com análise visual (boxplots, scatter plots) para distinguir erros de valores extremos legítimos"
      );
    }

    if (report.summary?.inconsistencies) {
      recs.push(
        "Padronize tipos de dados:  converta colunas para o tipo correto (string, number, date) e documente o schema esperado"
      );
    }

    // Recomendações gerais
    recs.push(
      "Estabeleça validações de dados na origem (input validation) para prevenir problemas futuros"
    );
    recs.push(
      "Implemente testes automatizados de qualidade de dados no pipeline ETL"
    );
    recs.push(
      "Documente as regras de negócio, formatos aceitos e valores válidos para cada campo"
    );

    return recs.slice(0, 7);
  }
}
