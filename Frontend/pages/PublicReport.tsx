import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

type Recommendation = {
  toolName: string;
  currentPlan: string;
  suggestedPlan: string;
  savings: number;
  reason: string;
};

type ToolSpend = {
  toolName: string;
  plan: string;
  seats: number;
  monthlySpend: number;
};

type Report = {
  publicId: string;
  tools: ToolSpend[];
  totalMonthlySpend: number;
  estimatedMonthlySavings: number;
  estimatedAnnualSavings: number;
  recommendations: Recommendation[];
  summary: string;
};

const PublicReport = () => {
  const { id } = useParams();

  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReport = async () => {
      if (!id) {
        setError("Invalid report link.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`http://localhost:3000/api/reports/${id}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.msg || "Could not load report.");
        }

        setReport(data.report || data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [id]);

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-20 text-center">
        <p className="text-sm text-slate-600">Loading public report...</p>
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-20 text-center">
        <h1 className="text-2xl font-semibold text-slate-950">
          Report not found
        </h1>

        <p className="mt-3 text-sm text-slate-600">
          {error || "This report link may be invalid or expired."}
        </p>

        <Link
          to="/audit"
          className="mt-6 inline-block rounded-md bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          Run a new audit
        </Link>
      </div>
    );
  }

  const savingsRate =
    report.totalMonthlySpend > 0
      ? Math.round(
          (report.estimatedMonthlySavings / report.totalMonthlySpend) * 100
        )
      : 0;

  return (
    <div className="bg-white text-slate-950">
      <section className="mx-auto max-w-6xl px-6 py-14">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
              Public Audit Report
            </p>

            <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              AI spend audit summary.
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-600">
              This public report shows tool spend, estimated savings, and
              recommendations. Contact details and private lead information are
              not shown.
            </p>
          </div>

          <Link
            to="/audit"
            className="rounded-md bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            Run your own audit
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <div className="rounded-lg border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">Monthly spend</p>
            <p className="mt-3 text-3xl font-semibold text-slate-950">
              ${report.totalMonthlySpend}
            </p>
          </div>

          <div className="rounded-lg border border-slate-950 bg-slate-950 p-5 text-white">
            <p className="text-sm text-slate-300">Estimated savings</p>
            <p className="mt-3 text-3xl font-semibold">
              ${report.estimatedMonthlySavings}/mo
            </p>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">Annual projection</p>
            <p className="mt-3 text-3xl font-semibold text-slate-950">
              ${report.estimatedAnnualSavings}
            </p>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">Savings rate</p>
            <p className="mt-3 text-3xl font-semibold text-slate-950">
              {savingsRate}%
            </p>
          </div>
        </div>

        <div className="mt-8 rounded-lg border border-slate-200 bg-slate-50 p-5">
          <p className="text-sm font-semibold text-slate-950">Summary</p>

          <p className="mt-3 text-sm leading-7 text-slate-600">
            {report.summary}
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-semibold tracking-tight text-slate-950">
                Recommendations
              </h2>

              <span className="text-sm text-slate-500">
                {report.recommendations.length} found
              </span>
            </div>

            {report.recommendations.length === 0 ? (
              <div className="rounded-lg border border-slate-200 bg-white p-6">
                <p className="text-sm font-medium text-slate-950">
                  No major waste patterns found
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  This stack appears reasonably cost-efficient based on the
                  submitted spend and team size.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {report.recommendations.map((recommendation, index) => (
                  <div
                    key={index}
                    className="rounded-lg border border-slate-200 bg-white p-5"
                  >
                    <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                      <div>
                        <p className="text-sm font-semibold text-slate-950">
                          {recommendation.toolName}
                        </p>

                        <p className="mt-2 text-sm text-slate-600">
                          Current:{" "}
                          <span className="font-medium text-slate-950">
                            {recommendation.currentPlan}
                          </span>{" "}
                          → Suggested:{" "}
                          <span className="font-medium text-slate-950">
                            {recommendation.suggestedPlan}
                          </span>
                        </p>
                      </div>

                      <div className="rounded-md border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-950">
                        Save ${recommendation.savings}/mo
                      </div>
                    </div>

                    <p className="mt-4 text-sm leading-6 text-slate-600">
                      {recommendation.reason}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm font-semibold text-slate-950">
              Tools reviewed
            </p>

            <div className="mt-4 space-y-3">
              {report.tools.map((tool, index) => (
                <div
                  key={index}
                  className="rounded-md border border-slate-200 bg-white px-4 py-3"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-medium text-slate-950">
                      {tool.toolName}
                    </p>

                    <p className="text-sm font-semibold text-slate-950">
                      ${tool.monthlySpend}
                    </p>
                  </div>

                  <p className="mt-1 text-xs text-slate-500">
                    {tool.plan} · {tool.seats} seat
                    {tool.seats === 1 ? "" : "s"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {report.estimatedMonthlySavings >= 500 && (
          <div className="mt-10 rounded-lg border border-slate-950 bg-slate-950 p-6 text-white">
            <p className="text-sm font-semibold">
              High savings opportunity detected
            </p>

            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
              This audit shows more than $500/month in potential savings. A
              deeper review may help capture credits, reduce overlapping tools,
              and lower recurring AI spend.
            </p>
            <a
              href="https://credex.rocks"
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-block rounded-md bg-white px-5 py-3 text-sm font-medium text-slate-950 transition hover:bg-slate-200"
            >
              Book a Credex consultation
            </a>
          </div>
        )}
      </section>
    </div>
  );
};

export default PublicReport;