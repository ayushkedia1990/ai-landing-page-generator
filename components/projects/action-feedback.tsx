import type { ReactNode } from "react";

type ActionFeedbackTone = "error" | "neutral" | "success";

type ActionFeedbackProps = {
  children: ReactNode;
  title: string;
  tone: ActionFeedbackTone;
};

const toneClassNames: Record<ActionFeedbackTone, string> = {
  error: "border-danger/20 bg-danger/8",
  neutral: "border-border/80 bg-card-strong",
  success: "border-success/20 bg-success/8",
};

const titleClassNames: Record<ActionFeedbackTone, string> = {
  error: "text-danger",
  neutral: "text-foreground",
  success: "text-success",
};

export function ActionFeedback({ children, title, tone }: ActionFeedbackProps) {
  return (
    <div
      aria-live="polite"
      role={tone === "error" ? "alert" : "status"}
      className={`rounded-3xl border px-4 py-4 ${toneClassNames[tone]}`}
    >
      <p className={`text-sm font-semibold ${titleClassNames[tone]}`}>{title}</p>
      <div className="mt-2 text-sm leading-7 text-muted-foreground">{children}</div>
    </div>
  );
}