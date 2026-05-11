import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const sendAuditEmail = async (
  email,
  reportId,
  estimatedMonthlySavings
) => {
  try {
    const reportLink = `${process.env.FRONTEND_URL}/report/${reportId}`;

    const response = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Your AI Spend Audit Report are Ready",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>Your AI Spend Audit is Ready</h2>

          <p>
            Thanks for using AI Spend Audit.
          </p>

          <p>
            We identified approximately <strong>$${estimatedMonthlySavings}/month</strong>
            in potential savings opportunities based on your submitted tooling stack.
          </p>

          <p>
            View your full report here:
          </p>

          <a
            href="${reportLink}"
            style="
              display:inline-block;
              margin-top:10px;
              padding:12px 18px;
              background:black;
              color:white;
              text-decoration:none;
              border-radius:6px;
            "
          >
            Open Audit Report
          </a>

          <p style="margin-top:30px;">
            If your savings opportunity is significant, Credex may be able to help reduce your AI infrastructure costs further through discounted credits.
          </p>
        </div>
      `,
    });
    return true;
  } catch (err) {
    console.log("Email Error:", err.message);
    return false;
  }
};

export default sendAuditEmail;