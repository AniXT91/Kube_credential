import { useState } from "react";
import Card from "../components/Card";
import Field from "../components/Field";
import { api } from "../api/client";
import type { VerificationResponse } from "../types";

export default function Verify() {
  const [email, setEmail] = useState("");
  const [courseTitle, setCourseTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<VerificationResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const { data } = await api.verify({ email, courseTitle });
      setResult(data);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Request failed");
    } finally {
      setLoading(false);
    }
  }

  const ok = result?.verification?.valid;

  return (
    <Card title="Verify Credential">
      <form onSubmit={onSubmit}>
        <Field label="Email" value={email} onChange={setEmail} type="email" required />
        <Field label="Course Title" value={courseTitle} onChange={setCourseTitle} required />
        <button disabled={loading} style={{
          padding: "10px 14px", borderRadius: 10, border: "1px solid #16a34a",
          background: "#16a34a", color: "white", cursor: "pointer"
        }}>
          {loading ? "Verifying..." : "Verify"}
        </button>
      </form>

      {error && <p style={{ color: "crimson", marginTop: 12 }}>{error}</p>}

      {result && (
        <div style={{ marginTop: 16 }}>
          <div style={{
            padding: 10, borderRadius: 10,
            background: ok ? "#ecfdf5" : "#fef2f2",
            color: ok ? "#065f46" : "#991b1b",
            border: `1px solid ${ok ? "#a7f3d0" : "#fecaca"}`
          }}>
            {ok ? "✅ Valid credential" : "❌ Not found"}
          </div>
          <pre style={{ background: "#f9fafb", padding: 12, borderRadius: 10, marginTop: 12 }}>
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </Card>
  );
}
