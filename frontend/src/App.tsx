import { useState } from "react";
import Issue from "./pages/Issue";
import Verify from "./pages/Verify";

export default function App() {
  const [tab, setTab] = useState<"issue"|"verify">("issue");

  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ textAlign: "center" }}>Kube Credential</h1>
      <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 12 }}>
        <button onClick={() => setTab("issue")} style={{ padding: "8px 12px" }}>
          Issue
        </button>
        <button onClick={() => setTab("verify")} style={{ padding: "8px 12px" }}>
          Verify
        </button>
      </div>

      {tab === "issue" ? <Issue /> : <Verify />}
    </div>
  );
}
