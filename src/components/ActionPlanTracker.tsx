import React, { useState } from 'react';
import {
  CheckCircle2,
  Circle,
  Sparkles,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
  ChevronDown,
  ChevronUp,
  Award,
  ShieldCheck,
  Target
} from 'lucide-react';
import { ActionTask, DiagnosticInsight, Language } from '../types';

interface ActionPlanTrackerProps {
  tasks: ActionTask[];
  diagnostic: DiagnosticInsight;
  nextStepTitle: string;
  nextStepDescription: string;
  initialScore: number;
  readinessLevel: string;
  targetAmountFormatted: string;
  language: Language;
  onOpenDossier: () => void;
  onOpenFunders: () => void;
}

export const ActionPlanTracker: React.FC<ActionPlanTrackerProps> = ({
  tasks: initialTasks,
  diagnostic,
  nextStepTitle,
  nextStepDescription,
  initialScore,
  readinessLevel,
  targetAmountFormatted,
  language,
  onOpenDossier,
  onOpenFunders
}) => {
  const [tasks, setTasks] = useState<ActionTask[]>(initialTasks);
  const [expandedTaskId, setExpandedTaskId] = useState<string | null>(null);

  // Dynamic score based on completed tasks
  const completedCount = tasks.filter((t) => t.completed).length;
  const totalCount = tasks.length;
  const currentScore = Math.min(100, Math.round(initialScore + (completedCount * 4)));

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const toggleExpand = (id: string) => {
    setExpandedTaskId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="space-y-6">
      {/* PRIMARY ACTION CARD: "QU'EST-CE QUE JE DOIS FAIRE MAINTENANT ?" */}
      <div className="bg-white rounded-2xl border-2 border-[#1F4E79]/20 p-6 sm:p-8 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1F4E79]/10 pb-5">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E89B3C]/15 text-[#1F4E79] text-xs font-bold border border-[#E89B3C]/30">
              <Sparkles className="w-3.5 h-3.5 text-[#E89B3C]" />
              <span>{language === 'fr' ? 'Votre priorité immédiate' : 'Immediate Next Action'}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-[#1F4E79]">
              « Qu’est-ce que je dois faire maintenant ? »
            </h2>
          </div>

          {/* Goal & Readiness Badge */}
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-[#F7F5EF] border border-[#1F4E79]/10 text-right">
              <span className="text-[10px] uppercase font-bold text-[#263238]/60 block">
                {language === 'fr' ? 'Objectif Financement' : 'Target Goal'}
              </span>
              <span className="text-base font-black text-[#1F4E79]">
                {targetAmountFormatted}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-[#5B8C5A]/15 border border-[#5B8C5A]/30 text-center">
              <span className="text-[10px] uppercase font-bold text-[#5B8C5A] block">
                {language === 'fr' ? 'Niveau Préparation' : 'Readiness'}
              </span>
              <span className="text-lg font-black text-[#1F4E79]">
                {currentScore}%
              </span>
            </div>
          </div>
        </div>

        {/* Highlighted next step callout */}
        <div className="p-4 sm:p-5 rounded-xl bg-[#F7F5EF] border-l-4 border-[#E89B3C] space-y-2">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-[#E89B3C] shrink-0" />
            <h3 className="font-extrabold text-sm sm:text-base text-[#1F4E79]">
              {nextStepTitle}
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-[#263238]/85 leading-relaxed pl-6">
            {nextStepDescription}
          </p>
        </div>

        {/* Progress bar of the roadmap */}
        <div className="space-y-1.5 pt-1">
          <div className="flex items-center justify-between text-xs font-bold text-[#1F4E79]">
            <span>{language === 'fr' ? 'Progression de votre finançabilité :' : 'Financing readiness progress:'}</span>
            <span>{completedCount} / {totalCount} {language === 'fr' ? 'actions validées' : 'actions validated'}</span>
          </div>
          <div className="w-full h-3 bg-[#F0ECE1] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#5B8C5A] rounded-full transition-all duration-500"
              style={{ width: `${(completedCount / totalCount) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* PLAN D'AMÉLIORATION INTERACTIF */}
      <div className="bg-white rounded-2xl border border-[#1F4E79]/15 p-6 sm:p-8 shadow-sm space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-[#1F4E79]">
              {language === 'fr' ? 'Plan d’Amélioration pour Devenir Finançable' : 'Improvement Roadmap to Become Financing-Ready'}
            </h3>
            <p className="text-xs text-[#263238]/70 mt-0.5">
              {language === 'fr'
                ? 'Cochez chaque action réalisée pour élever votre niveau de préparation aux comités.'
                : 'Check each completed action to elevate your credit readiness level.'}
            </p>
          </div>
          <span className="text-xs font-bold text-[#5B8C5A] bg-[#5B8C5A]/15 px-3 py-1 rounded-full border border-[#5B8C5A]/25">
            {readinessLevel}
          </span>
        </div>

        {/* Task List */}
        <div className="space-y-3">
          {tasks.map((task) => {
            const isExpanded = expandedTaskId === task.id;

            return (
              <div
                key={task.id}
                className={`p-4 rounded-xl border transition-all ${
                  task.completed
                    ? 'border-[#5B8C5A]/30 bg-[#5B8C5A]/5'
                    : 'border-[#1F4E79]/15 bg-white hover:border-[#5B9BD5]'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => toggleTask(task.id)}
                    className="flex items-start gap-3 text-left cursor-pointer group flex-1"
                  >
                    <div className="mt-0.5 shrink-0">
                      {task.completed ? (
                        <CheckCircle2 className="w-5 h-5 text-[#5B8C5A]" />
                      ) : (
                        <Circle className="w-5 h-5 text-[#263238]/40 group-hover:text-[#1F4E79]" />
                      )}
                    </div>
                    <div>
                      <h4
                        className={`text-sm font-bold ${
                          task.completed
                            ? 'line-through text-[#263238]/50'
                            : 'text-[#1F4E79]'
                        }`}
                      >
                        {task.title}
                      </h4>
                      <p className="text-xs text-[#263238]/70 mt-0.5">
                        <strong className="text-[#1F4E79]">{language === 'fr' ? 'Impact financeur :' : 'Lender impact:'}</strong> {task.impact}
                      </p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => toggleExpand(task.id)}
                    className="text-[#263238]/50 hover:text-[#1F4E79] p-1 cursor-pointer shrink-0"
                    title={language === 'fr' ? 'Détails & conseils du coach' : 'Details & coach advice'}
                  >
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>

                {/* Collapsible Coach Advice */}
                {isExpanded && (
                  <div className="mt-3 pt-3 border-t border-[#1F4E79]/10 text-xs text-[#263238]/85 pl-8 space-y-1 bg-[#F7F5EF]/60 p-3 rounded-lg">
                    <div className="flex items-center gap-1.5 font-bold text-[#1F4E79]">
                      <Lightbulb className="w-3.5 h-3.5 text-[#5B8C5A]" />
                      <span>{language === 'fr' ? 'Conseil du Coach Finepreneur :' : 'Finepreneur Coach Advice:'}</span>
                    </div>
                    <p className="leading-relaxed">
                      {task.advice}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* DIAGNOSTIC FORCES / FAIBLESSES SANS JARGON */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Forces */}
        <div className="bg-white rounded-2xl border border-[#5B8C5A]/30 p-6 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-[#5B8C5A] uppercase tracking-wider">
            <CheckCircle2 className="w-4 h-4 text-[#5B8C5A]" />
            <span>{language === 'fr' ? 'Vos Points Forts à Valoriser' : 'Core Strengths to Highlight'}</span>
          </div>
          <ul className="space-y-2 text-xs sm:text-sm text-[#263238]/85">
            {diagnostic.strengths.map((str, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#5B8C5A] mt-2 shrink-0" />
                <span>{str}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Faiblesses et actions correctives */}
        <div className="bg-white rounded-2xl border border-[#1F4E79]/15 p-6 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-[#1F4E79] uppercase tracking-wider">
            <AlertTriangle className="w-4 h-4 text-[#E89B3C]" />
            <span>{language === 'fr' ? 'Points Faibles & Solutions Immédiates' : 'Hurdles & Immediate Fixes'}</span>
          </div>
          <div className="space-y-2.5">
            {diagnostic.weaknesses.map((w, i) => (
              <div key={i} className="p-3 rounded-xl bg-[#F7F5EF] border border-[#1F4E79]/10 text-xs space-y-1">
                <div className="font-bold text-[#263238]">{w.issue}</div>
                <p className="text-[#1F4E79] pl-2 border-l-2 border-[#5B8C5A]">
                  <strong>{language === 'fr' ? 'Action recommandée :' : 'Action:'}</strong> {w.action}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* QUICK PASS-THROUGH BUTTONS TO PREPARED MEMO & FUNDERS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        <button
          onClick={onOpenFunders}
          className="p-4 rounded-xl bg-white border border-[#1F4E79]/20 hover:border-[#5B9BD5] transition-all flex items-center justify-between shadow-2xs group cursor-pointer text-left"
        >
          <div>
            <span className="text-[11px] font-bold text-[#5B9BD5] uppercase block">
              {language === 'fr' ? 'Étape suivante' : 'Next Step'}
            </span>
            <span className="text-sm font-bold text-[#1F4E79] block mt-0.5">
              {language === 'fr' ? 'Explorer les opportunités adaptées' : 'View matched funding options'}
            </span>
          </div>
          <ArrowRight className="w-4 h-4 text-[#1F4E79] group-hover:translate-x-1 transition-transform" />
        </button>

        <button
          onClick={onOpenDossier}
          className="p-4 rounded-xl bg-[#1F4E79] text-white hover:bg-[#163857] transition-all flex items-center justify-between shadow-2xs group cursor-pointer text-left"
        >
          <div>
            <span className="text-[11px] font-bold text-[#5B9BD5] uppercase block">
              {language === 'fr' ? 'Généré automatiquement' : 'Auto-generated'}
            </span>
            <span className="text-sm font-bold text-white block mt-0.5">
              {language === 'fr' ? 'Consulter le dossier d’investissement prêt' : 'View committee investment memo'}
            </span>
          </div>
          <ArrowRight className="w-4 h-4 text-[#5B9BD5] group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
