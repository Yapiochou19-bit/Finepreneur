import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface ProjectData {
  name: string;
  sector: string;
  stage: 'idea' | 'seed' | 'growth';
  description: string;
  amount: number;
  currency?: 'FCFA' | 'EUR' | 'USD';
  revenue?: string;
  location?: string;
  fundingPurpose?: string;
  mainHurdle?: string;
  language?: 'fr' | 'en';
}

function formatAmountWithCurrency(amount: number, currency: string = 'FCFA'): string {
  const formatted = Math.round(amount).toLocaleString('fr-FR');
  if (currency === 'FCFA') return `${formatted} FCFA`;
  if (currency === 'EUR') return `${formatted} €`;
  if (currency === 'USD') return `$${formatted}`;
  return `${formatted} ${currency}`;
}

function generateLocalCoachEvaluation(data: ProjectData) {
  const isEn = data.language === 'en';
  const currency = data.currency || 'FCFA';
  const amount = Number(data.amount) || (currency === 'FCFA' ? 20000000 : 35000);
  const formattedTarget = formatAmountWithCurrency(amount, currency);

  let baseScore = 65;
  if (data.stage === 'growth') baseScore += 16;
  else if (data.stage === 'seed') baseScore += 9;
  else baseScore += 2;

  if (data.revenue && !data.revenue.includes('(0') && !data.revenue.includes('0 FCFA')) baseScore += 6;
  if (data.description && data.description.length > 80) baseScore += 4;

  const readinessScore = Math.min(Math.max(baseScore, 58), 92);
  const readinessLevel = readinessScore >= 80 ? (isEn ? 'Financing-Ready (Stage 3/3)' : 'Prêt pour Comité (Niveau 3/3)') :
                        readinessScore >= 70 ? (isEn ? 'Active Consolidation (Stage 2/3)' : 'En Consolidation Active (Niveau 2/3)') :
                        (isEn ? 'Structural Grounding (Stage 1/3)' : 'Phase de Structuration (Niveau 1/3)');

  const actionTasks = isEn ? [
    {
      id: 'task-1',
      title: 'Formalize 2 client letters of intent or pre-orders',
      priority: 'haute' as const,
      impact: 'Neutralizes the absence of 3-year historical balance sheets',
      advice: 'Credit analysts prioritize future cash collection evidence over old audited books.',
      completed: false
    },
    {
      id: 'task-2',
      title: `Break down the ${formattedTarget} capital into 3 phased operational milestones`,
      priority: 'haute' as const,
      impact: 'Reduces perceived default risk by 40%',
      advice: 'Never ask for a lump sum without specifying month-by-month fund usage (equipment, initial inventory, working capital buffer).',
      completed: false
    },
    {
      id: 'task-3',
      title: 'Request a public co-guarantee (DER, Guichet PME, France Active)',
      priority: 'moyenne' as const,
      impact: 'Covers up to 70-80% of lender principal risk',
      advice: 'Public guarantee schemes reassure local financial institutions by sharing default risk.',
      completed: false
    },
    {
      id: 'task-4',
      title: 'Separate founder personal accounts from commercial cash-flow',
      priority: 'tactique' as const,
      impact: 'Essential hygiene for credit committee compliance',
      advice: 'Even a simple dedicated business sub-account proves financial discipline to lenders.',
      completed: true
    }
  ] : [
    {
      id: 'task-1',
      title: 'Obtenir 2 lettres d’intention clients ou précommandes écrites',
      priority: 'haute' as const,
      impact: 'Neutralise l’absence de bilans historiques sur 3 exercices',
      advice: 'Les analystes de crédit privilégient la preuve d’encaissements futurs réels plutôt que de vieux états comptables.',
      completed: false
    },
    {
      id: 'task-2',
      title: `Ventiler l’enveloppe de ${formattedTarget} en 3 jalons d’utilisation précis`,
      priority: 'haute' as const,
      impact: 'Réduit de 40% le risque perçu par les comités',
      advice: 'Ne demandez jamais un montant global sans justifier le calendrier des décaissements (outillage de départ, stock initial, trésorerie de précaution).',
      completed: false
    },
    {
      id: 'task-3',
      title: 'Activer un mécanisme de contre-garantie publique (Guichet PME, DER, Bpifrance)',
      priority: 'moyenne' as const,
      impact: 'Couvre 70% à 80% du risque pour le prêteur',
      advice: 'Ces fonds institutionnels débloquent les prêts bancaires en garantissant le remboursement en cas de coup dur.',
      completed: false
    },
    {
      id: 'task-4',
      title: 'Séparer rigoureusement les comptes personnels des flux de l’activité',
      priority: 'tactique' as const,
      impact: 'Condition indispensable de conformité bancaire',
      advice: 'Même un compte dédié ou un registre clair des recettes/dépenses démontre votre rigueur de gestionnaire.',
      completed: true
    }
  ];

  const isMicroTicket = currency === 'FCFA' ? amount <= 1500000 : amount <= 5000;

  const funders = currency === 'FCFA' ? (
    isMicroTicket ? [
      {
        id: 'funder-1',
        name: 'Microfinance de Proximité & Nano-Crédit (Baobab / Advans / ACEP / Fin’Elle)',
        category: 'microfinance' as const,
        categoryLabel: 'Micro-Crédit Express & Fonds de Roulement',
        matchPercentage: 95,
        ticketRange: '100 000 FCFA - 3 000 000 FCFA',
        whyMatched: 'Spécifiquement conçu pour les besoins d’amorçage rapides de 200 000 FCFA, décaissable sur flux d’activité sans exiger 3 ans de bilans.',
        prerequisites: 'Pièce d’identité, registre de commerce ou attestation d’activité locale, preuve de flux (reçus de caisse / Mobile Money).',
        limitations: 'Taux de microcrédit standard (1,2% à 1,8% mensuel), remboursement par mensualités courtes (6 à 18 mois).',
        averageProcessingTime: '5 à 10 jours ouvrés'
      },
      {
        id: 'funder-2',
        name: 'Guichet Public d’Inclusion & Micro-Projets (DER/FJ, Guichet PME, APEJ)',
        category: 'subvention' as const,
        categoryLabel: 'Micro-Financement Public & Prêt Bonifié',
        matchPercentage: 91,
        ticketRange: '200 000 FCFA - 3 000 000 FCFA',
        whyMatched: 'Dispositif d’État soutenant les micro-entrepreneurs et jeunes entreprises pour l’achat de petit outillage et stock initial.',
        prerequisites: 'Nationalité ou résidence locale, fiche de projet complétée, engagement de suivi.',
        limitations: 'Instruction par commissions locales périodiques.',
        averageProcessingTime: '2 à 3 semaines'
      },
      {
        id: 'funder-3',
        name: 'Coopérative de Caution Solidaire & Prêt d’Honneur Local',
        category: 'pret_honneur' as const,
        categoryLabel: 'Crédit Solidaire & Taux 0%',
        matchPercentage: 88,
        ticketRange: '150 000 FCFA - 1 500 000 FCFA',
        whyMatched: 'Prêt à 0% reposant sur la caution morale de deux commerçants ou pairs, évitant tout blocage bancaire.',
        prerequisites: 'Parrainage par un membre actif ou artisan certifié du réseau.',
        limitations: 'Montant plafonné pour les premiers cycles d’activité.',
        averageProcessingTime: '7 à 12 jours'
      }
    ] : [
      {
        id: 'funder-1',
        name: 'Microfinance PME Régionale (Baobab / Cofina / Advans / ACEP)',
        category: 'microfinance' as const,
        categoryLabel: 'Microfinance & Ligne de Crédit PME',
        matchPercentage: 92,
        ticketRange: '3 000 000 FCFA - 35 000 000 FCFA',
        whyMatched: 'Accompagne les entrepreneurs sans exiger 3 ans de bilans grâce à l’analyse des flux de trésorerie réels.',
        prerequisites: 'Registre de commerce (RCCM) à jour, compte d’exploitation prévisionnel, factures proforma.',
        limitations: 'Taux d’intérêt standard microfinance (12% à 18%), nécessite un historique d’activité d’au moins 6 mois.',
        averageProcessingTime: '10 à 20 jours ouvrés'
      },
      {
        id: 'funder-2',
        name: 'Fonds d’Appui Publics & Prêts Bonifiés (DER/FJ, Guichet Unique PME, APEJ)',
        category: 'subvention' as const,
        categoryLabel: 'Dispositif Public Non Dilutif & Prêt Bonifié',
        matchPercentage: 88,
        ticketRange: '5 000 000 FCFA - 45 000 000 FCFA',
        whyMatched: 'Programmes d’État finançant la transformation locale, l’emploi des jeunes et l’agro-industrie à taux réduit (5%).',
        prerequisites: 'Nationalité ou statut résident, projet créateur d’emplois locaux, dossier de candidature complet.',
        limitations: 'Comités de sélection périodiques, délais administratifs variables selon les sessions d’appel à projets.',
        averageProcessingTime: '3 à 6 semaines'
      },
      {
        id: 'funder-3',
        name: 'Réseau Entreprendre Afrique & Fonds d’Amorçage (WIC / Teranga)',
        category: 'pret_honneur' as const,
        categoryLabel: 'Prêt d’Honneur à Taux 0% & Mentorat',
        matchPercentage: 90,
        ticketRange: '5 000 000 FCFA - 25 000 000 FCFA',
        whyMatched: 'Prêt à 0% sans garantie personnelle renforçant vos fonds propres pour débloquer un effet de levier bancaire de 1 pour 3.',
        prerequisites: 'Soutenance orale devant un jury bénévole composé de chefs d’entreprise en exercice.',
        limitations: 'Sélection exigeante basée sur la posture entrepreneuriale et l’engagement du porteur.',
        averageProcessingTime: '3 à 4 semaines'
      },
      {
        id: 'funder-4',
        name: 'Réseaux de Business Angels Régionaux (ABAN / Ivoire Angels / Dakar Angels)',
        category: 'business_angels' as const,
        categoryLabel: 'Business Angels & Smart Money',
        matchPercentage: amount >= 20000000 ? 84 : 72,
        ticketRange: '15 000 000 FCFA - 100 000 000 FCFA',
        whyMatched: 'Investisseurs privés apportant capital d’amorçage, carnet d’adresses institutionnel et gouvernance.',
        prerequisites: 'Pitch deck percutant, modèle d’affaires scalable, équipe complémentaire.',
        limitations: 'Entrée au capital (prise de participation minoritaire 10% - 25%), processus de due diligence.',
        averageProcessingTime: '4 à 8 semaines'
      }
    ]
  ) : [
    {
      id: 'funder-1',
      name: 'France Active & Microcrédit PME',
      category: 'microfinance' as const,
      categoryLabel: 'Microcrédit & Garantie Solidaire',
      matchPercentage: 92,
      ticketRange: formatAmountWithCurrency(5000, currency) + ' - ' + formatAmountWithCurrency(65000, currency),
      whyMatched: 'Facilite l’accès au crédit sans caution personnelle grâce à la contre-garantie jusqu’à 80%.',
      prerequisites: 'Compte prévisionnel formalisé, immatriculation Kbis.',
      limitations: 'Plafond d’emprunt limité au démarrage.',
      averageProcessingTime: '10 à 15 jours'
    },
    {
      id: 'funder-2',
      name: 'Bpifrance Bourse French Tech & Aides Régionales',
      category: 'subvention' as const,
      categoryLabel: 'Subvention Non Dilutive',
      matchPercentage: 88,
      ticketRange: formatAmountWithCurrency(15000, currency) + ' - ' + formatAmountWithCurrency(90000, currency),
      whyMatched: 'Aide directe finançant les dépenses de lancement et d’études.',
      prerequisites: 'Structure de moins d’un an, composante innovante ou d’usage.',
      limitations: 'Dépenses éligibles encadrées, remboursement de frais sur justificatifs.',
      averageProcessingTime: '3 à 4 semaines'
    }
  ];

  return {
    readinessScore,
    readinessLevel,
    nextStepTitle: isEn
      ? `Step 1 of 4: Document 2 proofs of commercial traction to unlock financing`
      : `Étape 1 sur 4 : Documenter 2 preuves de traction pour sécuriser votre dossier`,
    nextStepDescription: isEn
      ? `Lenders do not ask for 3 years of audited reports when you show signed pre-orders or intent letters covering the first operational cycle.`
      : `Les analystes ne bloquent pas sur l’absence de bilans historiques quand vous présentez des lettres d’intention signées ou des précommandes couvrant votre premier cycle d’activité.`,
    summary: isEn
      ? `Finepreneur analyzed ${data.name}. The business model in ${data.sector} has solid potential. The ${formattedTarget} target can be financed progressively once core operational milestones are documented.`
      : `Finepreneur a analysé « ${data.name} ». L'activité dans ${data.sector} présente un potentiel réel. L'enveloppe de ${formattedTarget} est finançable de manière échelonnée dès lors que vos jalons opérationnels sont clarifiés.`,
    keyTags: isEn
      ? ['Progressive Financing Path', 'Microfinance Fit', 'Actionable Roadmap Active', '0 Cost for Founder']
      : ['Parcours de Finançabilité Actif', 'Éligible Microfinance & Fonds PME', 'Plan d’Actions Structuré', '0 Frais Entrepreneur'],
    actionTasks,
    diagnostic: {
      strengths: isEn ? [
        'Clear value proposition addressing an immediate market demand',
        'Realistic budget sizing compatible with alternative seed co-financing'
      ] : [
        'Offre concrète répondant à un besoin immédiat et vérifiable sur votre marché',
        'Dimensionnement budgétaire réaliste compatible avec les guichets d’amorçage'
      ],
      weaknesses: isEn ? [
        {
          issue: 'No multi-year certified financial track record',
          action: 'Compensate with client pre-commitments, letters of intent, and structured milestone budgeting.'
        },
        {
          issue: 'Need for working capital visibility',
          action: 'Dedicate a 20% safety runway reserve to absorb initial invoice collection lag.'
        }
      ] : [
        {
          issue: 'Absence de bilans comptables certifiés sur plusieurs années',
          action: 'Compensez par des précommandes écrites, des lettres d’intention et un étalement des investissements par jalons.'
        },
        {
          issue: 'Risque de décalage de trésorerie au lancement',
          action: 'Sanctuarisez une réserve de précaution de 20% pour absorber le temps d’encaissement des premiers clients.'
        }
      ]
    },
    structuredDossier: {
      executiveSummary: isEn
        ? `${data.name} is an active initiative in the ${data.sector} sector. Seeking ${formattedTarget} to scale operations without requiring prior banking balance sheets.`
        : `« ${data.name} » est une entreprise opérant dans le secteur « ${data.sector} ». En recherche de ${formattedTarget}, ce dossier d'investissement a été structuré par Finepreneur pour répondre aux critères des comités de financement sans bloquer sur l'absence d'antécédents bancaires.`,
      valueProposition: isEn
        ? `Resolves critical friction in ${data.sector} through agile local operations and low overhead structure.`
        : `Apporte une solution concrète et opérationnelle sur le marché local avec une gestion des coûts rigoureuse.`,
      fundAllocation: [
        {
          category: isEn ? 'Production & Equipment' : 'Équipements & Outil de travail',
          percentage: 45,
          description: isEn ? 'Tools, equipment and initial facility setup' : 'Matériel de production, aménagement et outillage'
        },
        {
          category: isEn ? 'Commercial Traction & Sales' : 'Commercialisation & Acquisition',
          percentage: 35,
          description: isEn ? 'Marketing launch, client distribution and sales outreach' : 'Lancement commercial, distribution et prospection'
        },
        {
          category: isEn ? 'Runway Reserve (Working Capital)' : 'Trésorerie de précaution (BFR)',
          percentage: 20,
          description: isEn ? 'Safety buffer ensuring 6-9 months operational runway' : 'Matelas de sécurité assurant au moins 6 mois de visibilité'
        }
      ],
      financialHighlights: {
        targetAmount: formattedTarget,
        estimatedRunway: isEn ? '6 to 9 months phased runway' : '6 à 9 mois selon les jalons opérationnels',
        recommendedInstrument: currency === 'FCFA'
          ? (isEn ? 'Microfinance Credit Line + Public Guarantee' : 'Ligne de Crédit Microfinance PME + Garantie Publique')
          : (isEn ? 'Honor Loan + Public Guarantee' : 'Prêt d’Honneur + Garantie Solidaire')
      },
      actionPlan: isEn ? [
        'Complete the 3 priority checklist tasks on your Finepreneur dashboard',
        'Present the structured Finepreneur memo to the 2 primary matched institutions',
        'Prepare your committee pitch using the coach interview defenses'
      ] : [
        'Valider les 3 actions prioritaires recommandées dans votre plan de finançabilité',
        'Transmettre le dossier structuré Finepreneur aux 2 premiers financeurs compatibles',
        'S’entraîner aux questions de sélection grâce aux arguments préparés par le coach'
      ]
    },
    recommendedFunders: funders,
    investorQA: isEn ? [
      {
        question: `How do you justify ${formattedTarget} without 3 years of audited balance sheets?`,
        context: 'Lenders evaluate default risk when historical track records are absent.',
        recommendedAnswer: `Explain that the requested capital is phased into 3 milestones (45% equipment, 35% customer acquisition, 20% safety runway) backed by public risk-sharing mechanisms.`
      },
      {
        question: 'When will your sales generate positive operating cash-flow?',
        context: 'Lenders check repayment sustainability.',
        recommendedAnswer: `Highlight your initial pre-orders and signed intent letters, showing that marketing funds translate into direct cash collections from month 2.`
      },
      {
        question: 'What is your safety buffer if sales ramp up 3 months late?',
        context: 'Risk analysts test cash stress endurance.',
        recommendedAnswer: `Demonstrate that the 20% runway reserve included in this plan is calibrated to absorb a 4-to-6 month lag without endangering operations.`
      }
    ] : [
      {
        question: `Comment justifiez-vous le besoin de ${formattedTarget} sans 3 ans de bilans certifiés ?`,
        context: 'Le comité de crédit évalue le risque de non-remboursement d’une structure récente.',
        recommendedAnswer: `Appuyez-vous sur le découpage par jalons (45% outil de production, 35% commercialisation, 20% réserve de trésorerie). Soulignez que votre dossier s'appuie sur une contre-garantie ou un prêt d'honneur à taux 0%, ce qui sécurise la position de l'établissement.`
      },
      {
        question: `À quelle vitesse votre activité générera-t-elle des encaissements réguliers ?`,
        context: 'Le financeur veut vérifier la capacité à honorer les premières mensualités.',
        recommendedAnswer: `Présentez vos précommandes, lettres d’intérêt et votre réseau de clients déjà identifiés. Montrez que le budget commercial est directement relié à des ventes fermes dès les premières semaines.`
      },
      {
        question: `Que se passe-t-il si les ventes prennent 3 mois de retard ?`,
        context: 'L’analyste teste la résilience de votre trésorerie.',
        recommendedAnswer: `Démontrez que la réserve de sécurité de 20% a été précisément calculée pour couvrir 4 à 6 mois de charges fixes sans bloquer le remboursement de la dette.`
      }
    ],
    transparencyNotice: isEn
      ? `Finepreneur Transparency: Funding is never automatically guaranteed. Final approval depends on fulfilling prerequisites, committee review, and loan disbursement.`
      : `Transparence Finepreneur : L'accès au financement n'est jamais garanti automatiquement par une IA. L'acceptation finale dépend du respect des prérequis, de l'instruction de votre dossier et de votre passage devant le comité de crédit.`
  };
}

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  app.use(express.json({ limit: '10mb' }));

  const apiKey = process.env.GEMINI_API_KEY;
  const ai = apiKey
    ? new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      })
    : null;

  // Analysis endpoint
  app.post('/api/analyze', async (req, res) => {
    try {
      const data: ProjectData = req.body;
      if (!data || !data.name || !data.description) {
        return res.status(400).json({ error: 'Project name and description are required.' });
      }

      const currency = data.currency || 'FCFA';
      const isEn = data.language === 'en';
      const formattedAmount = formatAmountWithCurrency(data.amount || 20000000, currency);

      if (!ai) {
        const fallbackResult = generateLocalCoachEvaluation(data);
        return res.json({ result: fallbackResult, source: 'finepreneur_coach_fallback' });
      }

      const prompt = `
Tu es le Coach Financier en chef de Finepreneur, une application d'accompagnement qui aide concrètement les entrepreneurs à comprendre leur situation et à devenir progressivement finançables.
Devise du projet : ${currency} (Tous les montants et tickets doivent impérativement être exprimés en ${currency}).
RÈGLE IMPORTANTE DE TRANSPARENCE : Ne jamais affirmer qu'un utilisateur est garanti d'être éligible. Expliquer avec honnêteté les prérequis à valider.

Données collectées lors de l'onboarding conversationnel :
- Nom du projet: ${data.name}
- Secteur: ${data.sector}
- Stade: ${data.stage}
- Description: ${data.description}
- Montant sollicité: ${formattedAmount}
- Traction / Chiffre d'affaires: ${data.revenue || 'Non précisé'}
- Obstacle principal mentionné par l'entrepreneur: ${data.mainHurdle || 'Absence d’historique bancaire'}
- Localisation: ${data.location || 'Afrique de l’Ouest / Centrale (Zone FCFA)'}
- Langue: ${isEn ? 'English' : 'Français'}

Tâche :
1. Calcule un indice de préparation au financement (readinessScore entre 55 et 92) et son niveau (readinessLevel: 'Phase de Structuration' / 'En Consolidation Active' / 'Prêt pour Comité').
2. Définis la prochaine étape prioritaire claire : "Qu'est-ce que je dois faire maintenant ?" (nextStepTitle et nextStepDescription concrète).
3. Construis un plan d'actions interactif (actionTasks) composé de 4 tâches précises et actionnables pour rendre l'entreprise finançable (id, title, priority, impact, advice, completed: false).
4. Établis un diagnostic honnête sans jargon : strengths (2 forces) et weaknesses (2 points faibles avec l'action concrète corrective associée).
5. Génère le dossier structuré d'investissement (executiveSummary, valueProposition, fundAllocation avec pourcentages totalisant 100%, financialHighlights avec targetAmount en ${currency}, actionPlan de 3 étapes).
6. Propose 4 financeurs adaptés au profil (Microfinance, Fonds publics d'amorçage, Prêts d'honneur, Business Angels) avec une transparence totale sur les critères (id, name, category, categoryLabel, matchPercentage, ticketRange en ${currency}, whyMatched, prerequisites, limitations, averageProcessingTime).
7. Fournis 3 questions d'entretien de sélection avec contexte et réponse recommandée par le coach.
8. Ajoute le rappel de transparence (transparencyNotice).
`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              readinessScore: { type: Type.INTEGER },
              readinessLevel: { type: Type.STRING },
              nextStepTitle: { type: Type.STRING },
              nextStepDescription: { type: Type.STRING },
              summary: { type: Type.STRING },
              keyTags: { type: Type.ARRAY, items: { type: Type.STRING } },
              actionTasks: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING },
                    title: { type: Type.STRING },
                    priority: { type: Type.STRING },
                    impact: { type: Type.STRING },
                    advice: { type: Type.STRING },
                    completed: { type: Type.BOOLEAN }
                  },
                  required: ['id', 'title', 'priority', 'impact', 'advice', 'completed']
                }
              },
              diagnostic: {
                type: Type.OBJECT,
                properties: {
                  strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
                  weaknesses: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        issue: { type: Type.STRING },
                        action: { type: Type.STRING }
                      },
                      required: ['issue', 'action']
                    }
                  }
                },
                required: ['strengths', 'weaknesses']
              },
              structuredDossier: {
                type: Type.OBJECT,
                properties: {
                  executiveSummary: { type: Type.STRING },
                  valueProposition: { type: Type.STRING },
                  fundAllocation: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        category: { type: Type.STRING },
                        percentage: { type: Type.INTEGER },
                        description: { type: Type.STRING }
                      },
                      required: ['category', 'percentage', 'description']
                    }
                  },
                  financialHighlights: {
                    type: Type.OBJECT,
                    properties: {
                      targetAmount: { type: Type.STRING },
                      estimatedRunway: { type: Type.STRING },
                      recommendedInstrument: { type: Type.STRING }
                    },
                    required: ['targetAmount', 'estimatedRunway', 'recommendedInstrument']
                  },
                  actionPlan: { type: Type.ARRAY, items: { type: Type.STRING } }
                },
                required: ['executiveSummary', 'valueProposition', 'fundAllocation', 'financialHighlights', 'actionPlan']
              },
              recommendedFunders: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING },
                    name: { type: Type.STRING },
                    category: { type: Type.STRING },
                    categoryLabel: { type: Type.STRING },
                    matchPercentage: { type: Type.INTEGER },
                    ticketRange: { type: Type.STRING },
                    whyMatched: { type: Type.STRING },
                    prerequisites: { type: Type.STRING },
                    limitations: { type: Type.STRING },
                    averageProcessingTime: { type: Type.STRING }
                  },
                  required: ['id', 'name', 'category', 'categoryLabel', 'matchPercentage', 'ticketRange', 'whyMatched', 'prerequisites', 'limitations', 'averageProcessingTime']
                }
              },
              investorQA: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    question: { type: Type.STRING },
                    context: { type: Type.STRING },
                    recommendedAnswer: { type: Type.STRING }
                  },
                  required: ['question', 'context', 'recommendedAnswer']
                }
              },
              transparencyNotice: { type: Type.STRING }
            },
            required: [
              'readinessScore',
              'readinessLevel',
              'nextStepTitle',
              'nextStepDescription',
              'summary',
              'keyTags',
              'actionTasks',
              'diagnostic',
              'structuredDossier',
              'recommendedFunders',
              'investorQA',
              'transparencyNotice'
            ]
          }
        }
      });

      const responseText = response.text;
      if (!responseText) {
        throw new Error('Empty response from AI engine');
      }

      const parsed = JSON.parse(responseText);
      return res.json({ result: parsed, source: 'gemini-3.8-flash' });
    } catch (err: any) {
      console.error('Error during AI analysis, using coach fallback:', err);
      const fallback = generateLocalCoachEvaluation(req.body);
      return res.json({ result: fallback, source: 'finepreneur_coach_fallback' });
    }
  });

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', service: 'Finepreneur AI Coach Engine', timestamp: new Date().toISOString() });
  });

  // Setup Vite dev server or static serving
  const isProd = process.env.NODE_ENV === 'production';
  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Finepreneur server listening on port ${PORT}`);
  });
}

startServer();
