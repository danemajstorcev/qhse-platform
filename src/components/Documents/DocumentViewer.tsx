import { useEffect, useState, useRef } from 'react'
import { X, FileText, Loader } from 'lucide-react'
import type { Document } from '../../types'

interface Props {
  doc: Document
  onClose: () => void
}

export default function DocumentViewer({ doc, onClose }: Props) {
  const [objectUrl, setObjectUrl] = useState<string | null>(null)
  const [htmlContent, setHtmlContent] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const prevUrl = useRef<string | null>(null)

  useEffect(() => {
    if (!doc.file) {
      setError('No file attached to this document.')
      setLoading(false)
      return
    }

    if (doc.fileType === 'pdf') {
      const url = URL.createObjectURL(doc.file)
      prevUrl.current = url
      setObjectUrl(url)
      setLoading(false)
    }

    if (doc.fileType === 'docx') {
      setLoading(true)
      const reader = new FileReader()
      reader.onload = async e => {
        try {
          const arrayBuffer = e.target?.result as ArrayBuffer
          const mammoth = await import('mammoth')
          const result = await mammoth.convertToHtml({ arrayBuffer })
          setHtmlContent(result.value)
        } catch {
          setError('Failed to render document. The file may be corrupted.')
        } finally {
          setLoading(false)
        }
      }
      reader.onerror = () => {
        setError('Failed to read the file.')
        setLoading(false)
      }
      reader.readAsArrayBuffer(doc.file)
    }

    return () => {
      if (prevUrl.current) URL.revokeObjectURL(prevUrl.current)
    }
  }, [doc])

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal modal-wide"
        onClick={e => e.stopPropagation()}
        style={{ display: 'flex', flexDirection: 'column', height: '90vh', padding: 0 }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 24px', borderBottom: '1px solid var(--border)', flexShrink: 0 }}>
          <div style={{ width: 36, height: 36, borderRadius: 'var(--radius-sm)', background: 'var(--accent-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FileText size={18} style={{ color: 'var(--accent)' }} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {doc.title}
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>
              {doc.fileName} · {doc.version} · {doc.standard}
            </div>
          </div>
          <button className="icon-btn" onClick={onClose} aria-label="Close">
            <X size={16} />
          </button>
        </div>

        <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
          {loading && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', gap: 12, color: 'var(--text-muted)' }}>
              <Loader size={20} style={{ animation: 'spin 1s linear infinite' }} />
              <span style={{ fontSize: 13 }}>Loading document…</span>
              <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
            </div>
          )}

          {!loading && error && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', flexDirection: 'column', gap: 12, color: 'var(--text-muted)', padding: 32 }}>
              <FileText size={40} style={{ opacity: 0.3 }} />
              <p style={{ fontSize: 14, textAlign: 'center' }}>{error}</p>
            </div>
          )}

          {!loading && !error && doc.fileType === 'pdf' && objectUrl && (
            <iframe
              src={objectUrl}
              title={doc.title}
              style={{ width: '100%', height: '100%', border: 'none', display: 'block', background: '#fff' }}
            />
          )}

          {!loading && !error && doc.fileType === 'docx' && htmlContent !== null && (
            <div style={{ height: '100%', overflowY: 'auto', padding: '24px 40px' }}>
              <div
                className="doc-html-content"
                dangerouslySetInnerHTML={{ __html: htmlContent || '<p style="color:var(--text-muted)">Document appears to be empty.</p>' }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
