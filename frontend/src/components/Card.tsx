import type { ReactNode } from "react";

export default function Card({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div style={{
      maxWidth: 640, margin: "24px auto", padding: 20,
      border: "1px solid #e5e7eb", borderRadius: 16, boxShadow: "0 10px 15px -3px rgba(0,0,0,0.05)"
    }}>
      <h2 style={{ margin: 0, marginBottom: 12 }}>{title}</h2>
      {children}
    </div>
  );
}
