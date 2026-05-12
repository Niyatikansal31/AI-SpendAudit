import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";

type ToolSpend = {
  toolName: string;
  plan: string;
  seats: number;
  monthlySpend: number;
};

const toolPlans: Record<string, string[]> = {
  ChatGPT: ["plus", "team", "enterprise", "api"],
  Claude: ["free", "pro", "max", "team", "enterprise", "api"],
  Cursor: ["hobby", "pro", "business", "enterprise"],
  GitHubCopilot: ["individual", "business", "enterprise"],
  OpenAIAPI: ["usage"],
  AnthropicAPI: ["usage"],
  Gemini: ["pro", "ultra", "api"],
  v0: ["free", "premium", "team"],
};

const AuditForm = () => {
  const defaultFormData = {
    teamSize: 1,
    useCase: "coding",
    tools: [
      {
        toolName: "ChatGPT",
        plan: "team",
        seats: 1,
        monthlySpend: 30,
      },
    ],
  };
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const savedData = localStorage.getItem("audit-form-data");
  const initialData = savedData ? JSON.parse(savedData) : defaultFormData;

  const [teamSize, setTeamSize] = useState<number>(initialData.teamSize);
  const [useCase, setUseCase] = useState<string>(initialData.useCase);
  const [tools, setTools] = useState<ToolSpend[]>(initialData.tools);

  useEffect(() => {
    localStorage.setItem(
      "audit-form-data",
      JSON.stringify({ tools, teamSize, useCase })
    );
  }, [tools, teamSize, useCase]);
  const addTool = () => {
    setTools([
      ...tools,
      {
        toolName: "ChatGPT",
        plan: "plus",
        seats: 1,
        monthlySpend: 20,
      },
    ]);
  };

  const removeTool = (index: number) => {
    setTools(tools.filter((_, i) => i !== index));
  };

  const updateTool = (
    index: number,
    field: keyof ToolSpend,
    value: string | number
  ) => {
    const updatedTools = [...tools];

    updatedTools[index] = {
      ...updatedTools[index],
      [field]: value,
    };

    if (field === "toolName") {
      const selectedTool = value as string;
      updatedTools[index].plan = toolPlans[selectedTool][0];
    }

    setTools(updatedTools);
  };

  const handleGenerateAudit = async () => {
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/reports`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tools,
          teamSize,
          useCase,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.msg || "Failed to generate audit");
      }
      localStorage.removeItem("audit-form-data");
      navigate("/results", {
        state: {
          report: data.report,
        },
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-white text-slate-950">
      <section className="mx-auto max-w-5xl px-6 py-14">
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
            Spend Input
          </p>

          <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            Tell us what AI tools your team pays for.
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-600">
            Add your current AI tools, plans, seats, and monthly spend. The audit
            will estimate where your stack may be over-provisioned.
          </p>
        </div>

        <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <label className="block">
              <span className="text-sm font-medium text-slate-700">
                Team size
              </span>
              <input
                type="number"
                min={1}
                value={teamSize === 0 ? "" : teamSize}
                onChange={(e) => setTeamSize(Number(e.target.value))}
                className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-slate-950"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-slate-700">
                Primary use case
              </span>
              <select
                value={useCase}
                onChange={(e) => setUseCase(e.target.value)}
                className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-slate-950"
              >
                <option value="coding">Coding</option>
                <option value="writing">Writing</option>
                <option value="data">Data</option>
                <option value="research">Research</option>
                <option value="mixed">Mixed</option>
              </select>
            </label>
          </div>
        </div>

        <div className="mt-8 space-y-4">
          {tools.map((tool, index) => (
            <div
              key={index}
              className="rounded-lg border border-slate-200 bg-white p-5"
            >
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm font-semibold text-slate-950">
                  Tool #{index + 1}
                </p>

                {tools.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeTool(index)}
                    className="text-sm text-slate-500 transition hover:text-red-600"
                  >
                    Remove
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                <label className="block">
                  <span className="text-sm font-medium text-slate-700">
                    Tool
                  </span>
                  <select
                    value={tool.toolName}
                    onChange={(e) =>
                      updateTool(index, "toolName", e.target.value)
                    }
                    className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-slate-950"
                  >
                    {Object.keys(toolPlans).map((toolName) => (
                      <option key={toolName} value={toolName}>
                        {toolName}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <span className="text-sm font-medium text-slate-700">
                    Plan
                  </span>
                  <select
                    value={tool.plan}
                    onChange={(e) => updateTool(index, "plan", e.target.value)}
                    className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-slate-950"
                  >
                    {toolPlans[tool.toolName].map((plan) => (
                      <option key={plan} value={plan}>
                        {plan}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <span className="text-sm font-medium text-slate-700">
                    Seats
                  </span>
                  <input
                    type="number"
                    min={1}
                    value={tool.seats === 0 ? "" : tool.seats} 
                    onChange={(e) =>
                      updateTool(index, "seats", Number(e.target.value))
                    }
                    className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-slate-950"
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-medium text-slate-700">
                    Monthly spend ($)
                  </span>
                  <input
                    type="number"
                    min={0}
                    value={tool.monthlySpend === 0 ? "" : tool.monthlySpend}
                    onChange={(e) =>
                      updateTool(
                        index,
                        "monthlySpend",
                        e.target.value === "" ? 0 : Number(e.target.value)
                      )
                    }
                    className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-slate-950"
                  />
                </label>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={addTool}
            className="rounded-md border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-950 transition hover:bg-slate-50"
          >
            + Add Tool
          </button>

          {error && (
            <p className="mt-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </p>
          )}
          <button
            type="button"
            onClick={handleGenerateAudit}
            disabled={loading}
            className="rounded-md bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {loading ? "Generating..." : "Generate Audit"}
        </button>
        </div>
      </section>
    </div>
  );
};

export default AuditForm;