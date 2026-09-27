import React, { useState } from 'react';
import {
  X,
  Download,
  Printer,
  Copy,
  Check,
  FileCheck,
  ShieldCheck,
  FileText,
  Loader2,
  Sparkles
} from 'lucide-react';
import { jsPDF } from 'jspdf';
import { EvaluationResult, Language, ProjectFormData } from '../types';
import { formatCurrencyAmount } from '../utils/formatters';
import { FinepreneurLogo } from './FinepreneurLogo';

interface ExportDossierModalProps {
  isOpen: boolean;
  project: ProjectFormData;
  result: EvaluationResult;
  language: Language;
  onClose: () => void;
}

export const ExportDossierModal: React.FC<ExportDossierModalProps> = ({
  isOpen,
  project,
  result,
  language,
  onClose
}) => {
  const [copied, setCopied] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [pdfSuccess, setPdfSuccess] = useState(false);

  if (!isOpen) return null;

  const currency = project.currency || 'FCFA';
  const formattedAmount = formatCurrencyAmount(project.amount, currency);
  const isEn = language === 'en';

  // Client-side PDF Generation with jsPDF
  const handleGeneratePDF = async () => {
    setIsGeneratingPDF(true);
    setPdfSuccess(false);

    try {
      // Allow UI to render loading state
      await new Promise((r) => setTimeout(r, 150));

      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const pageWidth = 210;
      const pageHeight = 297;
      const margin = 15;
      const contentWidth = pageWidth - margin * 2; // 180mm

      let y = 18;

      const checkPageBreak = (neededHeight: number) => {
        if (y + neededHeight > pageHeight - 22) {
          doc.addPage();
          y = 20;
        }
      };

      // --- HEADER & BRANDING ---
      // Brand Logo mark: Circle + F
      doc.setFillColor(31, 78, 121); // #1F4E79
      doc.circle(margin + 5, y + 4, 6, 'F');
      doc.setFillColor(232, 155, 60); // Orange dot
      doc.circle(margin + 9, y + 1, 1.5, 'F');

      // Brand Wordmark
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(16);
      doc.setTextColor(38, 50, 56);
      doc.text('finepreneur', margin + 14, y + 6);
      // Orange underline under "fine"
      doc.setFillColor(232, 155, 60);
      doc.rect(margin + 14, y + 7.5, 12, 0.8, 'F');

      // Tagline
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(91, 155, 213);
      doc.text(
        isEn ? 'AI Financial Coach & Turnkey Investment Memo' : 'Coach Financier & Dossier d’Investissement Structuré',
        margin + 14,
        y + 11.5
      );

      // Readiness Badge (Right aligned)
      doc.setFillColor(247, 245, 239);
      doc.setDrawColor(91, 140, 90);
      doc.roundedRect(pageWidth - margin - 52, y - 2, 52, 14, 2, 2, 'FD');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(91, 140, 90);
      doc.text(isEn ? 'READINESS SCORE' : 'NIVEAU PRÉPARATION', pageWidth - margin - 26, y + 2.5, { align: 'center' });

      doc.setFontSize(11);
      doc.setTextColor(31, 78, 121);
      doc.text(`${result.readinessScore}% • ${result.readinessLevel}`, pageWidth - margin - 26, y + 8, { align: 'center' });

      y += 18;

      // Divider line
      doc.setDrawColor(31, 78, 121);
      doc.setLineWidth(0.8);
      doc.line(margin, y, pageWidth - margin, y);

      y += 8;

      // --- PROJECT PROFILE BANNER ---
      doc.setFillColor(247, 245, 239);
      doc.setDrawColor(220, 220, 220);
      doc.roundedRect(margin, y, contentWidth, 24, 3, 3, 'FD');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.setTextColor(31, 78, 121);
      doc.text(project.name || (isEn ? 'Business Project' : 'Projet d’Entreprise'), margin + 6, y + 7);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(70, 80, 90);
      const metaLine = `${project.sector} • ${project.stage === 'idea' ? (isEn ? 'Idea' : 'Idée') : project.stage === 'seed' ? (isEn ? 'Startup' : 'Démarrage') : (isEn ? 'Active' : 'En activité')} • ${project.location || (isEn ? 'Local Market' : 'Marché local')}`;
      doc.text(metaLine, margin + 6, y + 13);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(38, 50, 56);
      doc.text(isEn ? 'Target Funding Envelope:' : 'Objectif de Financement :', margin + 6, y + 19);

      doc.setFontSize(11);
      doc.setTextColor(232, 155, 60); // Orange emphasis
      doc.text(formattedAmount, margin + 54, y + 19);

      // Date of issue on the right
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(120, 130, 140);
      const today = new Date().toLocaleDateString(isEn ? 'en-US' : 'fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      doc.text(`${isEn ? 'Certified on' : 'Généré le'} : ${today}`, pageWidth - margin - 6, y + 19, { align: 'right' });

      y += 30;

      // --- SECTION 1: SYNTHÈSE EXÉCUTIVE ---
      checkPageBreak(35);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(31, 78, 121);
      doc.text(isEn ? '1. EXECUTIVE SUMMARY & VALUE PROPOSITION' : '1. SYNTHÈSE EXÉCUTIVE & PROPOSITION DE VALEUR', margin, y);
      y += 4;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(38, 50, 56);

      const summaryText = result.structuredDossier.executiveSummary || result.summary;
      const splitSummary = doc.splitTextToSize(summaryText, contentWidth - 4);
      doc.text(splitSummary, margin + 2, y + 2);
      y += splitSummary.length * 4.5 + 4;

      if (result.structuredDossier.valueProposition) {
        checkPageBreak(20);
        doc.setFillColor(247, 245, 239);
        doc.roundedRect(margin, y, contentWidth, 14, 2, 2, 'F');
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8.5);
        doc.setTextColor(31, 78, 121);
        doc.text(isEn ? 'Core Value Proposition:' : 'Proposition de valeur centrale :', margin + 4, y + 5);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8.5);
        doc.setTextColor(60, 70, 80);
        const splitVP = doc.splitTextToSize(result.structuredDossier.valueProposition, contentWidth - 8);
        doc.text(splitVP, margin + 4, y + 10);
        y += 18;
      }

      // --- SECTION 2: VENTILATION DES FONDS ---
      checkPageBreak(40);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(31, 78, 121);
      doc.text(isEn ? '2. FUND ALLOCATION & MILESTONE DEPLOYMENT' : '2. VENTILATION DU FINANCEMENT & PLAN PAR JALONS', margin, y);
      y += 5;

      // Table Header
      doc.setFillColor(31, 78, 121);
      doc.rect(margin, y, contentWidth, 7, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(255, 255, 255);
      doc.text(isEn ? 'CATEGORY' : 'CATÉGORIE DE DÉPENSE', margin + 4, y + 4.8);
      doc.text(isEn ? 'SHARE' : 'PART', margin + 70, y + 4.8);
      doc.text(isEn ? 'ESTIMATED AMOUNT' : 'MONTANT ESTIMÉ', margin + 95, y + 4.8);
      doc.text(isEn ? 'STRATEGIC PURPOSE' : 'JUSTIFICATION STRATÉGIQUE', margin + 135, y + 4.8);

      y += 7;

      const numericAmount = project.amount || 200000;
      const allocations = result.structuredDossier.fundAllocation && result.structuredDossier.fundAllocation.length > 0
        ? result.structuredDossier.fundAllocation
        : [
            { category: isEn ? 'Equipment & Setup' : 'Équipements & Installation', percentage: 45, description: isEn ? 'Operational tools' : 'Outil de travail et aménagement' },
            { category: isEn ? 'Commercial & Stock' : 'Stock & Commercialisation', percentage: 35, description: isEn ? 'Initial traction' : 'Stock de départ et ventes' },
            { category: isEn ? 'Runway Reserve' : 'Trésorerie de précaution', percentage: 20, description: isEn ? 'Buffer' : 'Matelas de sécurité opérationnel' }
          ];

      allocations.forEach((alloc, index) => {
        checkPageBreak(10);
        const rowBg = index % 2 === 0 ? 255 : 247;
        doc.setFillColor(rowBg, rowBg, index % 2 === 0 ? 255 : 239);
        doc.rect(margin, y, contentWidth, 8, 'F');

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8);
        doc.setTextColor(38, 50, 56);
        doc.text(alloc.category, margin + 4, y + 5.2);

        doc.setFont('helvetica', 'bold');
        doc.setTextColor(91, 140, 90);
        doc.text(`${alloc.percentage}%`, margin + 70, y + 5.2);

        doc.setFont('helvetica', 'normal');
        doc.setTextColor(31, 78, 121);
        const catAmount = formatCurrencyAmount(Math.round((numericAmount * alloc.percentage) / 100), currency);
        doc.text(catAmount, margin + 95, y + 5.2);

        doc.setTextColor(90, 100, 110);
        doc.text(alloc.description, margin + 135, y + 5.2);

        y += 8;
      });

      y += 6;

      // --- SECTION 3: FORCES & SOLUTIONS DE MITIGATION ---
      checkPageBreak(50);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(31, 78, 121);
      doc.text(isEn ? '3. CREDIT COMMITTEE DEFENSE & RISK MITIGATION' : '3. ANALYSE DU RISQUE & ARGUMENTS COMITÉS', margin, y);
      y += 5;

      const strengths = result.diagnostic?.strengths || result.strengths || [];
      const weaknesses = result.diagnostic?.weaknesses || [];

      // Strengths box
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(91, 140, 90);
      doc.text(isEn ? '✓ Certified Operational Strengths:' : '✓ Points Forts Reconnus par le Coach :', margin, y + 3);
      y += 6;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(38, 50, 56);
      strengths.slice(0, 3).forEach((str) => {
        checkPageBreak(8);
        doc.text(`• ${str}`, margin + 3, y);
        y += 4.5;
      });

      y += 3;

      // Weaknesses & Action Plan box
      checkPageBreak(30);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(232, 155, 60);
      doc.text(isEn ? '! Key Hurdle & Strategic Neutralization:' : '! Verrou Identifié & Solution Corrective :', margin, y + 2);
      y += 5;

      weaknesses.slice(0, 2).forEach((w) => {
        checkPageBreak(12);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8);
        doc.setTextColor(38, 50, 56);
        doc.text(`- Point de vigilance : ${w.issue}`, margin + 3, y);
        y += 4.2;

        doc.setFont('helvetica', 'normal');
        doc.setTextColor(31, 78, 121);
        const actionLines = doc.splitTextToSize(`Action recommandée : ${w.action}`, contentWidth - 8);
        doc.text(actionLines, margin + 6, y);
        y += actionLines.length * 4 + 2;
      });

      y += 4;

      // --- SECTION 4: FINANCEURS RECOMMANDÉS ---
      checkPageBreak(45);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(31, 78, 121);
      doc.text(isEn ? '4. MATCHED FUNDING INSTITUTIONS' : '4. FINANCEURS IDENTIFIÉS & CRITÈRES D’ÉLIGIBILITÉ', margin, y);
      y += 5;

      const funders = result.recommendedFunders || [];
      funders.slice(0, 3).forEach((funder) => {
        checkPageBreak(16);
        doc.setFillColor(247, 245, 239);
        doc.setDrawColor(220, 220, 220);
        doc.roundedRect(margin, y, contentWidth, 14, 2, 2, 'FD');

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8.5);
        doc.setTextColor(31, 78, 121);
        doc.text(funder.name, margin + 4, y + 4.5);

        // Match chip
        doc.setFillColor(91, 140, 90);
        doc.roundedRect(pageWidth - margin - 32, y + 2, 28, 5, 1, 1, 'F');
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(7);
        doc.setTextColor(255, 255, 255);
        doc.text(`${funder.matchPercentage}% MATCH`, pageWidth - margin - 18, y + 5.5, { align: 'center' });

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7.5);
        doc.setTextColor(70, 80, 90);
        doc.text(
          `${isEn ? 'Ticket' : 'Enveloppe'} : ${funder.ticketRange}  |  ${isEn ? 'Processing' : 'Délai'} : ${funder.averageProcessingTime}`,
          margin + 4,
          y + 8.5
        );

        doc.text(
          `${isEn ? 'Requirements' : 'Prérequis'} : ${funder.prerequisites.slice(0, 90)}...`,
          margin + 4,
          y + 12
        );

        y += 17;
      });

      // --- PAGE FOOTERS ---
      const totalPages = doc.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        doc.setDrawColor(210, 215, 225);
        doc.setLineWidth(0.4);
        doc.line(margin, pageHeight - 14, pageWidth - margin, pageHeight - 14);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7.5);
        doc.setTextColor(110, 120, 130);
        doc.text(
          isEn
            ? 'Finepreneur AI Coach • 100% Free for Founders • Verified for Bank & Microfinance Committees'
            : 'Finepreneur Coach • 100% Gratuit pour l’Entrepreneur (Modèle Success Fee) • Format Banque & Microfinance',
          margin,
          pageHeight - 9
        );

        doc.setFont('helvetica', 'bold');
        doc.text(
          `${isEn ? 'Page' : 'Page'} ${i} / ${totalPages}`,
          pageWidth - margin,
          pageHeight - 9,
          { align: 'right' }
        );
      }

      // Download triggered automatically
      const cleanFileName = (project.name || 'Dossier')
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '_')
        .slice(0, 30);
      doc.save(`finepreneur_dossier_${cleanFileName}.pdf`);

      setPdfSuccess(true);
      setTimeout(() => setPdfSuccess(false), 3500);
    } catch (err) {
      console.error('Failed to generate PDF:', err);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  // Build self-contained HTML document with inline styles
  const generateStandaloneHTML = () => {
    return `<!DOCTYPE html>
<html lang="${language}">
<head>
  <meta charset="UTF-8">
  <title>Dossier de Financement - ${project.name} (Finepreneur)</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      line-height: 1.6;
      color: #263238;
      background: #F7F5EF;
      margin: 0;
      padding: 30px 20px;
    }
    .container {
      max-width: 820px;
      margin: 0 auto;
      background: #ffffff;
      padding: 40px;
      border-radius: 14px;
      border: 1px solid #E5DFD3;
      box-shadow: 0 4px 16px rgba(31, 78, 121, 0.08);
    }
    .header {
      border-bottom: 2px solid #1F4E79;
      padding-bottom: 20px;
      margin-bottom: 25px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .badge {
      background: #5B8C5A;
      color: #ffffff;
      padding: 6px 14px;
      border-radius: 20px;
      font-size: 13px;
      font-weight: 700;
    }
    h1 { color: #1F4E79; margin: 0 0 8px 0; font-size: 26px; }
    h2 { color: #1F4E79; font-size: 18px; margin-top: 25px; border-bottom: 1px solid #E5DFD3; padding-bottom: 8px; }
    .score-box {
      background: #F7F5EF;
      border: 1px solid #5B9BD5;
      padding: 18px;
      border-radius: 10px;
      margin: 20px 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .score-val {
      font-size: 32px;
      font-weight: 900;
      color: #1F4E79;
    }
    .tag {
      display: inline-block;
      background: rgba(91, 140, 90, 0.15);
      color: #1F4E79;
      border: 1px solid rgba(91, 140, 90, 0.3);
      padding: 4px 10px;
      border-radius: 6px;
      margin: 3px;
      font-size: 12px;
      font-weight: 600;
    }
    .table-container {
      width: 100%;
      border-collapse: collapse;
      margin-top: 15px;
    }
    th, td {
      padding: 12px;
      text-align: left;
      border-bottom: 1px solid #E5DFD3;
      font-size: 13px;
    }
    th {
      background-color: #1F4E79;
      color: white;
    }
    .footer {
      margin-top: 40px;
      padding-top: 20px;
      border-top: 1px solid #E5DFD3;
      font-size: 12px;
      color: #78909C;
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div>
        <h1 style="color:#1F4E79;">finepreneur</h1>
        <p style="margin:0; font-size:13px; color:#5B9BD5; font-weight:600;">Coach Financier & Dossier de Financement Structuré</p>
      </div>
      <div class="badge">${result.readinessScore}% - ${result.readinessLevel}</div>
    </div>

    <h1>${project.name}</h1>
    <p><strong>Secteur :</strong> ${project.sector} | <strong>Stade :</strong> ${project.stage} | <strong>Besoin :</strong> <span style="color:#E89B3C; font-weight:bold;">${formattedAmount}</span></p>

    <div class="score-box">
      <div>
        <div style="font-size:12px; text-transform:uppercase; color:#78909C; font-weight:700;">Score de Préparation aux Comités</div>
        <div style="font-size:14px; font-weight:700; color:#1F4E79;">${result.readinessLevel}</div>
      </div>
      <div class="score-val">${result.readinessScore}/100</div>
    </div>

    <h2>1. Synthèse Exécutive</h2>
    <p>${result.structuredDossier.executiveSummary || result.summary}</p>
    ${result.structuredDossier.valueProposition ? `<p><strong>Proposition de valeur :</strong> ${result.structuredDossier.valueProposition}</p>` : ''}

    <h2>2. Ventilation du Financement</h2>
    <table class="table-container">
      <thead>
        <tr>
          <th>Poste de Dépense</th>
          <th>Part (%)</th>
          <th>Montant Estimé</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        ${(result.structuredDossier.fundAllocation || []).map(item => `
          <tr>
            <td><strong>${item.category}</strong></td>
            <td>${item.percentage}%</td>
            <td>${formatCurrencyAmount(Math.round(((project.amount || 200000) * item.percentage) / 100), currency)}</td>
            <td>${item.description}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>

    <h2>3. Points Forts Identifiés</h2>
    <ul>
      ${(result.diagnostic?.strengths || result.strengths || []).map(s => `<li>${s}</li>`).join('')}
    </ul>

    <h2>4. Financeurs Cibles Adaptés</h2>
    ${(result.recommendedFunders || []).map(f => `
      <div style="margin-bottom:15px; padding:12px; background:#F7F5EF; border-radius:8px;">
        <h4 style="margin:0 0 5px 0; color:#1F4E79;">${f.name} <span style="font-size:12px; color:#5B8C5A;">(${f.matchPercentage}% match)</span></h4>
        <p style="margin:0 0 4px 0; font-size:12px;"><strong>Ticket :</strong> ${f.ticketRange} | <strong>Délai :</strong> ${f.averageProcessingTime}</p>
        <p style="margin:0; font-size:11px; color:#555;">${f.whyMatched}</p>
      </div>
    `).join('')}

    <div class="footer">
      Document généré le ${new Date().toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US')} via Finepreneur • Modèle 100% gratuit pour l’entrepreneur (0 FCFA facturé).
    </div>
  </div>
</body>
</html>`;
  };

  const handleDownloadHTML = () => {
    const htmlContent = generateStandaloneHTML();
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const cleanName = (project.name || 'dossier').toLowerCase().replace(/[^a-z0-9]/g, '_');
    link.download = `finepreneur_dossier_${cleanName}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopySummary = () => {
    const text = `DOSSIER FINEPRENEUR - ${project.name}
Niveau de préparation : ${result.readinessScore}% (${result.readinessLevel})
Enveloppe : ${formattedAmount} (${currency}) | Secteur : ${project.sector}

SYNTHÈSE :
${result.structuredDossier.executiveSummary}

FINANCEURS IDENTIFIÉS :
${result.recommendedFunders.map((f) => `- ${f.name} (${f.matchPercentage}% match) : ${f.ticketRange}`).join('\n')}

Généré via Finepreneur • Le coach financier des entrepreneurs`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1F4E79]/50 backdrop-blur-xs">
      <div className="bg-white rounded-2xl border border-[#1F4E79]/20 shadow-xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-6 bg-[#F7F5EF] border-b border-[#1F4E79]/10 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <FinepreneurLogo iconOnly size="md" />
            <div>
              <span className="text-[11px] font-bold text-[#5B9BD5] uppercase tracking-wider block">
                {language === 'fr' ? 'Dossier Clé en Main' : 'Ready Investment Memo'}
              </span>
              <h3 className="font-bold text-base text-[#1F4E79]">
                {language === 'fr' ? 'Exportation du Dossier de Financement' : 'Financing Dossier Export'}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#263238]/60 hover:text-[#1F4E79] hover:bg-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body preview */}
        <div className="p-6 overflow-y-auto space-y-5 text-left text-xs sm:text-sm">
          {/* Readiness confirmation pill */}
          <div className="p-4 rounded-xl bg-[#5B8C5A]/10 border border-[#5B8C5A]/25 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-[#1F4E79]">
              <ShieldCheck className="w-4 h-4 text-[#5B8C5A] shrink-0" />
              <span>
                {language === 'fr'
                  ? 'Dossier structuré prêt pour transmission aux comités de crédit'
                  : 'Structured dossier ready for credit committee submission'}
              </span>
            </div>
            <span className="font-extrabold text-[#5B8C5A] text-xs shrink-0 pl-2">
              {result.readinessScore}% {language === 'fr' ? 'Prêt' : 'Ready'}
            </span>
          </div>

          {/* Project Summary Card */}
          <div className="p-4 rounded-xl bg-[#F7F5EF] border border-[#1F4E79]/10 space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-[#1F4E79] text-sm">
                {project.name} • {project.sector}
              </h4>
              <span className="font-black text-[#1F4E79] text-sm bg-white px-2.5 py-1 rounded-lg border border-[#1F4E79]/15">
                {formattedAmount}
              </span>
            </div>
            <p className="text-xs text-[#263238]/85 leading-relaxed">
              {result.structuredDossier.executiveSummary}
            </p>
          </div>

          {/* PDF Generation Success message */}
          {pdfSuccess && (
            <div className="p-3 rounded-xl bg-[#5B8C5A]/15 border border-[#5B8C5A]/30 text-xs text-[#1F4E79] font-bold flex items-center gap-2 animate-in fade-in duration-200">
              <Check className="w-4 h-4 text-[#5B8C5A]" />
              <span>
                {language === 'fr'
                  ? 'Document PDF généré et téléchargé avec succès !'
                  : 'PDF document successfully generated and downloaded!'}
              </span>
            </div>
          )}

          {/* ACTION BUTTONS */}
          <div className="space-y-3 pt-1">
            {/* PRIMARY ACTION: Client-side PDF Generation (Orange réservé) */}
            <button
              onClick={handleGeneratePDF}
              disabled={isGeneratingPDF}
              className="w-full p-4 rounded-xl bg-[#E89B3C] hover:bg-[#d88d30] text-white font-extrabold text-sm shadow-md shadow-[#E89B3C]/20 transition-all flex items-center justify-center gap-2.5 cursor-pointer active:scale-98 disabled:opacity-75"
            >
              {isGeneratingPDF ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{language === 'fr' ? 'Génération du PDF bancaire...' : 'Generating Bank PDF...'}</span>
                </>
              ) : (
                <>
                  <FileText className="w-4 h-4" />
                  <span>{language === 'fr' ? `Télécharger le Dossier PDF Officiel (${currency})` : `Download Official PDF Dossier (${currency})`}</span>
                </>
              )}
            </button>

            {/* Secondary Formats: HTML & Direct Print */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <button
                onClick={handleDownloadHTML}
                className="p-3 rounded-xl bg-white border border-[#1F4E79]/20 text-[#1F4E79] font-bold text-xs hover:bg-[#F7F5EF] transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <Download className="w-3.5 h-3.5 text-[#5B9BD5]" />
                <span>{language === 'fr' ? 'Fichier .HTML Autonome' : 'Standalone .HTML file'}</span>
              </button>

              <button
                onClick={handlePrint}
                className="p-3 rounded-xl bg-white border border-[#1F4E79]/20 text-[#1F4E79] font-bold text-xs hover:bg-[#F7F5EF] transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <Printer className="w-3.5 h-3.5 text-[#5B9BD5]" />
                <span>{language === 'fr' ? 'Imprimer directement' : 'Direct Print'}</span>
              </button>
            </div>

            {/* Copy Summary text button */}
            <button
              onClick={handleCopySummary}
              className="w-full py-2.5 px-4 rounded-xl bg-[#F7F5EF] border border-[#1F4E79]/15 text-[#1F4E79] text-xs font-semibold hover:bg-white transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#5B8C5A]" />
                  <span className="text-[#5B8C5A]">
                    {language === 'fr' ? 'Synthèse copiée dans le presse-papiers !' : 'Summary copied to clipboard!'}
                  </span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#5B9BD5]" />
                  <span>
                    {language === 'fr' ? 'Copier le résumé texte pour email ou WhatsApp' : 'Copy text summary for email/WhatsApp'}
                  </span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
