import type{ HTMLInputTypeAttribute } from "react";

export default function Field({
  label, value, onChange, type = "text", required
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: HTMLInputTypeAttribute;
  required?: boolean;
}) {
  return (
    <label style={{ display: "block", marginBottom: 12 }}>
      <div style={{ fontSize: 14, marginBottom: 6 }}>{label}</div>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type={type}
        required={required}
        style={{
          width: "100%", padding: "10px 12px", borderRadius: 10,
          border: "1px solid #d1d5db"
        }}
      />
    </label>
  );
}
