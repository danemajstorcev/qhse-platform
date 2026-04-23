import { FileText, Eye, Download } from "lucide-react";
import type { Document, DocStatus } from "../../types";
import ISOChip from "../ui/ISOChip";

const STATUS_BADGE: Record<DocStatus, string> = {
  Approved: "badge badge-compliant",
  "Pending Review": "badge badge-warning",
  Draft: "badge badge-muted",
  Obsolete: "badge badge-na",
};

const FILE_TYPE_COLOR: Record<string, string> = {
  pdf: "#EF4444",
  docx: "#60A5FA",
};

interface Props {
  documents: Document[];
  onBumpVersion: (id: string) => void;
  onChangeStatus: (id: string, status: DocStatus) => void;
  onView: (doc: Document) => void;
}

export default function DocTable({
  documents,
  onBumpVersion,
  onChangeStatus,
  onView,
}: Props) {
  const handleDownload = (doc: Document) => {
    if (!doc.file) return;
    const url = URL.createObjectURL(doc.file);
    const a = document.createElement("a");
    a.href = url;
    a.download = doc.fileName ?? doc.title;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Standard</th>
            <th>Category</th>
            <th>Version</th>
            <th>Status</th>
            <th>Owner</th>
            <th>Modified</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((doc) => (
            <tr key={doc.id}>
              <td>
                <span className="cell-mono">{doc.id}</span>
              </td>

              <td>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div className="doc-icon">
                    <FileText
                      size={15}
                      style={{
                        color: doc.fileType
                          ? FILE_TYPE_COLOR[doc.fileType]
                          : "var(--text-muted)",
                      }}
                    />
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div
                      className="cell-primary"
                      style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxWidth: 200,
                      }}
                    >
                      {doc.title}
                    </div>
                    {doc.fileType && (
                      <div
                        style={{
                          fontSize: 10,
                          color: FILE_TYPE_COLOR[doc.fileType],
                          fontWeight: 700,
                          marginTop: 1,
                        }}
                      >
                        {doc.fileType.toUpperCase()}
                      </div>
                    )}
                  </div>
                </div>
              </td>

              <td>
                <ISOChip standard={doc.standard} />
              </td>
              <td style={{ fontSize: 12 }}>{doc.category}</td>

              <td>
                <span
                  style={{
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: 12,
                    color: "var(--accent)",
                    fontWeight: 700,
                  }}
                >
                  {doc.version}
                </span>
              </td>

              <td>
                <span className={STATUS_BADGE[doc.status]}>{doc.status}</span>
              </td>
              <td style={{ fontSize: 12, whiteSpace: "nowrap" }}>
                {doc.owner}
              </td>
              <td
                style={{
                  fontSize: 12,
                  fontFamily: "JetBrains Mono, monospace",
                  whiteSpace: "nowrap",
                }}
              >
                {doc.lastModified}
              </td>

              <td>
                <div
                  style={{
                    display: "flex",
                    gap: 5,
                    flexWrap: "wrap",
                    alignItems: "center",
                  }}
                >
                  {doc.file && (
                    <>
                      <button
                        className="btn btn-sm btn-ghost"
                        onClick={() => onView(doc)}
                        style={{
                          color: "var(--accent)",
                          borderColor: "var(--accent-dim)",
                        }}
                        title="View document"
                      >
                        <Eye size={12} /> View
                      </button>
                      <button
                        className="btn btn-sm btn-ghost"
                        onClick={() => handleDownload(doc)}
                        title="Download file"
                      >
                        <Download size={12} />
                      </button>
                    </>
                  )}

                  {doc.status === "Draft" && (
                    <button
                      className="btn btn-sm btn-secondary"
                      onClick={() => onChangeStatus(doc.id, "Pending Review")}
                    >
                      Submit
                    </button>
                  )}

                  {doc.status === "Pending Review" && (
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => onChangeStatus(doc.id, "Approved")}
                    >
                      Approve
                    </button>
                  )}

                  {doc.status === "Approved" && (
                    <button
                      className="btn btn-sm btn-secondary"
                      onClick={() => onBumpVersion(doc.id)}
                    >
                      Revise
                    </button>
                  )}

                  {doc.status !== "Obsolete" && (
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => onChangeStatus(doc.id, "Obsolete")}
                      title="Mark obsolete"
                    >
                      Obsolete
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}

          {documents.length === 0 && (
            <tr>
              <td
                colSpan={9}
                style={{
                  textAlign: "center",
                  padding: "32px 0",
                  color: "var(--text-muted)",
                  fontSize: 13,
                }}
              >
                No documents match the current filters.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
