import { useLocation, Link } from "react-router-dom";
import { useState } from "react";

type Recommendation = {
  toolName: string;
  currentPlan: string;
  suggestedPlan: string;
  savings: number;
  reason: string;
};

type Report = {
  publicId: string;
  totalMonthlySpend: number;
  estimatedMonthlySavings: number;
  estimatedAnnualSavings: number;
  recommendations: Recommendation[];
  summary: string;
  optimizedMessage: string;
};

const Results = () => {
  const location = useLocation();

  const report = location.state?.report as Report | undefined;
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [website, setWebsite] = useState("");
  const [leadStatus, setLeadStatus] = useState("");
  const [leadLoading, setLeadLoading] = useState(false);
  const [sendEmail, setSendEmail] = useState(true);

  if (!report) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-20 text-center">
        <h1 className="text-2xl font-semibold text-slate-950">
          No audit result found
        </h1>
        <p className="mt-3 text-sm text-slate-600">
          Please run an audit first to view your results.
        </p>

        <Link
          to="/audit"
          className="mt-6 inline-block rounded-md bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          Start Audit
        </Link>
      </div>
    );
  }

  const reportLink = `${window.location.origin}/report/${report.publicId}`;

  const submitLead = async () => {
    setLeadStatus("");
    setLeadLoading(true);
    if (!email) {
      setLeadStatus("Please enter your email.")
      setLeadLoading(false);
      return
    }
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/leads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          company,
          role,
          teamSize: teamSize ? Number(teamSize) : undefined,
          reportId: report.publicId,
          website,
          sendEmail,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.msg || "Could not save lead");
      }

      setLeadStatus("Report captured successfully.");
    } catch (err) {
      setLeadStatus(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLeadLoading(false);
    }
  };
  const copyReportLink = async () => {
    await navigator.clipboard.writeText(reportLink);
    alert("Report link copied!");
  };

  return (
    <div className="bg-white text-slate-950">
      <section className="mx-auto max-w-6xl px-6 py-14">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
              Audit Results
            </p>

            <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Your AI spend audit is ready.
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-600">
              Review your current spend, estimated savings, and plan-level
              recommendations.
            </p>
          </div>

          <button
            type="button"
            onClick={copyReportLink}
            className="rounded-md border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-950 transition hover:bg-slate-50"
          >
            Copy report link
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
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
        </div>

        <div className="mt-8 rounded-lg border border-slate-200 bg-slate-50 p-5">
          <p className="text-sm font-semibold text-slate-950">
            Summary
          </p>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            {report.summary || report.optimizedMessage}
          </p>
        </div>

        <div className="mt-10">
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
                {report.optimizedMessage}
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                We did not find clear downgrade opportunities based on your
                current stack.
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

        {report.estimatedMonthlySavings >= 500 && (
          <div className="mt-10 rounded-lg border border-slate-950 bg-slate-950 p-6 text-white">
            <p className="text-sm font-semibold">
              High savings opportunity detected
            </p>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
              Your audit shows more than $500/month in potential savings. This
              may be worth a deeper review to capture discounted AI credits and
              reduce recurring tooling costs.
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
        <div className="mt-10 rounded-lg border border-slate-200 bg-slate-50 p-6">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold text-slate-950">
            Capture this audit
          </p>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            Enter your email to save this report and get notified when new AI spend
            optimizations apply to your stack.
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-slate-950"
          />

          <input
            type="text"
            placeholder="Company name"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-slate-950"
          />

          <input
            type="text"
            placeholder="Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-slate-950"
          />

          <input
            type="number"
            placeholder="Team size"
            value={teamSize}
            onChange={(e) => setTeamSize(e.target.value)}
            className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-slate-950"
          />

          <input
            type="text"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>
        <label className="flex items-center gap-2 text-sm text-slate-600">
          <input
            type="checkbox"
            checked={sendEmail}
            onChange={(e) => setSendEmail(e.target.checked)}
          />

          Email me this audit report
        </label>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={submitLead}
            disabled={leadLoading}
            className="rounded-md bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {leadLoading ? "Saving..." : "Save report"}
          </button>

          {leadStatus && (
            <p className="text-sm text-slate-600">
              {leadStatus}
            </p>
          )}
        </div>
      </div>
      </section>
    </div>
  );
};

export default Results;