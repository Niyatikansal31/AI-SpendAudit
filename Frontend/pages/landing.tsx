import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="bg-[#f8fafc] text-slate-950">
      <section className="mx-auto grid max-w-6xl grid-cols-1 gap-14 px-6 py-20 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
            Founder Finance Tool
          </p>

          <h1 className="max-w-xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            Audit AI spend before it becomes another quiet burn line.
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-slate-600">
            SpendScope reviews subscriptions, API usage, plan fit, and team
            size to estimate practical savings across ChatGPT, Claude, Cursor,
            Copilot, OpenAI, Anthropic, Gemini, and v0.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/audit"
              className="rounded-md bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              Start Audit →
            </Link>

            <a
              href="#workflow"
              className="rounded-md border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-950 transition hover:bg-slate-50"
            >
              See workflow
            </a>
          </div>

          <div className="mt-10 grid max-w-xl grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="border-t border-slate-200 pt-4">
              <p className="text-sm font-semibold text-slate-950">No login</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Start with rough spend numbers and refine later.
              </p>
            </div>

            <div className="border-t border-slate-200 pt-4">
              <p className="text-sm font-semibold text-slate-950">Shareable</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Generate a public report URL for advisors or teammates.
              </p>
            </div>

            <div className="border-t border-slate-200 pt-4">
              <p className="text-sm font-semibold text-slate-950">
                Rule-based
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Transparent recommendations with plain-English reasoning.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
          <div className="mb-5 flex items-start justify-between border-b border-slate-200 pb-4">
            <div>
              <p className="text-sm font-semibold text-slate-950">
                Sample audit
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Seed stage engineering team
              </p>
            </div>

            <span className="rounded-full border border-slate-300 px-3 py-1 text-xs text-slate-600">
              8 min
            </span>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-md border border-slate-200 bg-white px-4 py-3">
              <span className="text-sm text-slate-500">Monthly AI spend</span>
              <span className="text-sm font-semibold text-slate-950">
                $1,284
              </span>
            </div>

            <div className="flex items-center justify-between rounded-md border border-slate-200 bg-white px-4 py-3">
              <span className="text-sm text-slate-500">Estimated savings</span>
              <span className="text-sm font-semibold text-slate-950">
                $326/mo
              </span>
            </div>

            <div className="flex items-center justify-between rounded-md border border-slate-200 bg-white px-4 py-3">
              <span className="text-sm text-slate-500">Annual projection</span>
              <span className="text-sm font-semibold text-slate-950">
                $3,912
              </span>
            </div>
          </div>

          <div className="mt-6">
            <p className="text-sm font-semibold text-slate-950">
              Top findings
            </p>

            <ul className="mt-3 space-y-3 text-sm leading-6 text-slate-600">
              <li>
                Cursor Business may be downgraded while the developer team is
                under three people.
              </li>
              <li>
                OpenAI API spend is above the expected range for the current
                team size.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section
        id="workflow"
        className="border-y border-slate-200 bg-slate-50"
      >
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 py-12 md:grid-cols-3">
          <div>
            <p className="text-sm font-semibold text-slate-950">Enter spend</p>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Add tools, plans, seats, team size, and the main use case.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-950">Review logic</p>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              The audit engine checks plan mismatch, API intensity, and team
              scale.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-950">Share report</p>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Save the result, capture a lead, and publish a read-only report
              page.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;