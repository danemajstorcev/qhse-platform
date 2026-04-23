import { useState, useRef } from "react";
import { Plus, Upload, Download } from "lucide-react";
import { documents as initialDocuments } from "../data/mockData";
import type { Document, DocStatus, FileType } from "../types";
import DocStats from "../components/Documents/DocStats";
import DocTable from "../components/Documents/DocTable";
import AddDocModal from "../components/Documents/AddDocModal";
import DocumentViewer from "../components/Documents/DocumentViewer";
import FilterBar from "../components/ui/FilterBar";
import { useToast } from "../context/ToastContext";

function detectFileType(file: File): FileType | null {
  if (file.type === "application/pdf" || file.name.endsWith(".pdf"))
    return "pdf";
  if (
    file.type ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    file.name.endsWith(".docx") ||
    file.name.endsWith(".doc")
  )
    return "docx";
  return null;
}

function downloadCSV(rows: (string | number)[][], filename: string) {
  const csv = rows
    .map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(","))
    .join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export default function DocumentControl() {
  const { toast } = useToast();
  const [documents, setDocuments] = useState(initialDocuments);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [standardFilter, setStandardFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [viewingDoc, setViewingDoc] = useState<Document | null>(null);
  const uploadInputRef = useRef<HTMLInputElement>(null);

  const filtered = documents.filter(
    (d) =>
      (statusFilter === "All" || d.status === statusFilter) &&
      (standardFilter === "All" || d.standard === standardFilter) &&
      (d.title.toLowerCase().includes(search.toLowerCase()) ||
        d.id.toLowerCase().includes(search.toLowerCase())),
  );

  const handleAdd = (data: Omit<Document, "id">) => {
    const newDoc: Document = {
      id: `DOC${String(documents.length + 1).padStart(3, "0")}`,
      ...data,
    };
    setDocuments((prev) => [newDoc, ...prev]);
    toast(`Document "${newDoc.title}" created as Draft`);
  };

  const handleQuickUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const fileType = detectFileType(file);
    if (!fileType) {
      alert("Only PDF and Word (.docx) files are supported.");
      return;
    }
    const title = file.name.replace(/\.[^.]+$/, "").replace(/[-_]/g, " ");
    const newDoc: Document = {
      id: `DOC${String(documents.length + 1).padStart(3, "0")}`,
      title,
      standard: "ISO 9001",
      version: "v1.0",
      status: "Draft",
      owner: "",
      lastModified: new Date().toISOString().split("T")[0],
      category: "Document",
      file,
      fileType,
      fileName: file.name,
    };
    setDocuments((prev) => [newDoc, ...prev]);
    toast(`File "${file.name}" uploaded as Draft`);
    e.target.value = "";
  };

  const handleBumpVersion = (id: string) => {
    const doc = documents.find((d) => d.id === id);
    setDocuments((prev) =>
      prev.map((d) => {
        if (d.id !== id) return d;
        const match = d.version.match(/v(\d+)\.(\d+)/);
        if (!match) return d;
        return {
          ...d,
          version: `v${match[1]}.${parseInt(match[2]) + 1}`,
          lastModified: new Date().toISOString().split("T")[0],
          status: "Pending Review" as DocStatus,
        };
      }),
    );
    toast(`${doc?.title} revised — submitted for review`, "info");
  };

  const handleChangeStatus = (id: string, status: DocStatus) => {
    const doc = documents.find((d) => d.id === id);
    setDocuments((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status } : d)),
    );
    const msgs: Record<DocStatus, [string, "success" | "warning" | "info"]> = {
      Approved: [`${doc?.title} approved`, "success"],
      "Pending Review": [`${doc?.title} submitted for review`, "info"],
      Draft: [`${doc?.title} moved to Draft`, "info"],
      Obsolete: [`${doc?.title} marked obsolete`, "warning"],
    };
    toast(...msgs[status]);
  };

  const handleExportCSV = () => {
    const headers = [
      "ID",
      "Title",
      "Standard",
      "Category",
      "Version",
      "Status",
      "Owner",
      "Last Modified",
    ];
    const rows = documents.map((d) => [
      d.id,
      d.title,
      d.standard,
      d.category,
      d.version,
      d.status,
      d.owner,
      d.lastModified,
    ]);
    downloadCSV([headers, ...rows], "document-register.csv");
  };

  return (
    <div>
      <div className="page-header">
        <div className="page-header-left">
          <h1>Document Control</h1>
          <p>Version-controlled ISO documentation with approval workflows</p>
        </div>
        <div className="page-header-actions">
          <button className="btn btn-ghost btn-sm" onClick={handleExportCSV}>
            <Download size={15} /> Export
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => uploadInputRef.current?.click()}
          >
            <Upload size={15} /> Upload File
          </button>
          <input
            ref={uploadInputRef}
            type="file"
            accept=".pdf,.doc,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            style={{ display: "none" }}
            onChange={handleQuickUpload}
          />
          <button
            className="btn btn-primary"
            onClick={() => setShowModal(true)}
          >
            <Plus size={15} /> New Document
          </button>
        </div>
      </div>

      <DocStats documents={documents} />

      <div className="card">
        <div className="card-header">
          <div className="card-title">Document Register</div>
          <span style={{ fontSize: 12, color: "var(--text-muted)" }}>
            {filtered.length} documents
          </span>
        </div>

        <FilterBar
          search={search}
          onSearch={setSearch}
          placeholder="Search documents..."
        >
          <select
            className="form-input"
            value={standardFilter}
            onChange={(e) => setStandardFilter(e.target.value)}
            style={{ width: 150 }}
          >
            {["All", "ISO 9001", "ISO 14001", "ISO 45001", "ISO 27001"].map(
              (s) => (
                <option key={s}>{s}</option>
              ),
            )}
          </select>
          <select
            className="form-input"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{ width: 160 }}
          >
            {["All", "Approved", "Pending Review", "Draft", "Obsolete"].map(
              (s) => (
                <option key={s}>{s}</option>
              ),
            )}
          </select>
        </FilterBar>

        <DocTable
          documents={filtered}
          onBumpVersion={handleBumpVersion}
          onChangeStatus={handleChangeStatus}
          onView={setViewingDoc}
        />
      </div>

      {showModal && (
        <AddDocModal onClose={() => setShowModal(false)} onAdd={handleAdd} />
      )}

      {viewingDoc && (
        <DocumentViewer doc={viewingDoc} onClose={() => setViewingDoc(null)} />
      )}
    </div>
  );
}
