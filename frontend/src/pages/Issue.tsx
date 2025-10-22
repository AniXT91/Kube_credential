import { useState } from "react";
import Card from "../components/Card";
import Field from "../components/Field";
import { api } from "../api/client";
import type { IssuanceResponse } from "../types";

export default function Issue() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [courseTitle, setCourseTitle] = useState("");
  const [issuer, setIssuer] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<IssuanceResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const { data } = await api.issue({ name, email, courseTitle, issuer });
      setResult(data);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Request failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card title="Issue Credential">
      <form onSubmit={onSubmit}>
        <Field label="Name" value={name} onChange={setName} required />
        <Field label="Email" value={email} onChange={setEmail} type="email" required />
        <Field label="Course Title" value={courseTitle} onChange={setCourseTitle} required />
        <Field label="Issuer" value={issuer} onChange={setIssuer} required />
        <button disabled={loading} style={{
          padding: "10px 14px", borderRadius: 10, border: "1px solid #2563eb",
          background: "#2563eb", color: "white", cursor: "pointer"
        }}>
          {loading ? "Issuing..." : "Issue"}
        </button>
      </form>

      {error && <p style={{ color: "crimson", marginTop: 12 }}>{error}</p>}

      {result && (
        <div style={{ marginTop: 16, fontSize: 14 }}>
          <pre style={{ background: "#f9fafb", padding: 12, borderRadius: 10 }}>
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </Card>
  );
}
