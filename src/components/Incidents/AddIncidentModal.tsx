import { useState } from "react";
import Modal from "../ui/Modal";
import type { Incident, IncidentSeverity } from "../../types";

interface FormData {
  title: string;
  location: string;
  severity: IncidentSeverity;
  reporter: string;
  description: string;
}

const EMPTY_FORM: FormData = {
  title: "",
  location: "",
  severity: "Minor",
  reporter: "",
  description: "",
};

interface Props {
  onClose: () => void;
  onAdd: (incident: Omit<Incident, "id">) => void;
}

export default function AddIncidentModal({ onClose, onAdd }: Props) {
  const [form, setForm] = useState<FormData>(EMPTY_FORM);

  const handleSubmit = () => {
    onAdd({
      ...form,
      date: new Date().toISOString().split("T")[0],
      status: "Open",
    });
    onClose();
  };

  return (
    <Modal
      title="Report Incident"
      onClose={onClose}
      footer={
        <>
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button
            className="btn btn-primary"
            onClick={handleSubmit}
            disabled={!form.title || !form.reporter}
          >
            Submit Report
          </button>
        </>
      }
    >
      <div className="form-group">
        <label className="form-label">Title</label>
        <input
          className="form-input"
          placeholder="Brief incident title..."
          value={form.title}
          onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
        />
      </div>

      <div className="grid-2">
        <div className="form-group">
          <label className="form-label">Location</label>
          <input
            className="form-input"
            placeholder="e.g. Warehouse"
            value={form.location}
            onChange={(e) =>
              setForm((f) => ({ ...f, location: e.target.value }))
            }
          />
        </div>
        <div className="form-group">
          <label className="form-label">Severity</label>
          <select
            className="form-input"
            value={form.severity}
            onChange={(e) =>
              setForm((f) => ({
                ...f,
                severity: e.target.value as IncidentSeverity,
              }))
            }
          >
            {(
              ["Critical", "Major", "Minor", "Near Miss"] as IncidentSeverity[]
            ).map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Reporter</label>
        <input
          className="form-input"
          placeholder="Your name"
          value={form.reporter}
          onChange={(e) => setForm((f) => ({ ...f, reporter: e.target.value }))}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Description</label>
        <textarea
          className="form-input"
          placeholder="Describe what happened..."
          rows={4}
          style={{ resize: "vertical" }}
          value={form.description}
          onChange={(e) =>
            setForm((f) => ({ ...f, description: e.target.value }))
          }
        />
      </div>
    </Modal>
  );
}
