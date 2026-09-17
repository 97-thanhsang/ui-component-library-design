import { useEffect, useRef, useState } from "react"

// SVG icon set — inline for zero dependencies
const ICONS: Record<string, string> = {
  home: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10",
  users:
    "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75",
  "book-open":
    "M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z",
  calendar:
    "M8 2v4 M16 2v4 M3 10h18 M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z",
  clock: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M12 6v6l4 2",
  check: "M20 6L9 17l-5-5",
  "check-circle": "M22 11.08V12a10 10 0 1 1-5.93-9.14 M22 4L12 14.01l-3-3",
  "x-circle": "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M15 9l-6 6 M9 9l6 6",
  "alert-triangle":
    "M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z M12 9v4 M12 17h.01",
  info: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M12 8h.01 M11 12h1v4h1",
  search: "M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z M21 21l-4.35-4.35",
  filter: "M22 3H2l8 9.46V19l4 2v-8.54z",
  plus: "M12 5v14 M5 12h14",
  minus: "M5 12h14",
  edit: "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7 M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z",
  trash: "M3 6h18 M8 6V4h8v2 M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6",
  download: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4 M7 10l5 5 5-5 M12 15V3",
  upload: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4 M17 8l-5-5-5 5 M12 3v12",
  "file-text":
    "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8",
  bell: "M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9 M13.73 21a2 2 0 0 1-3.46 0",
  settings:
    "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z",
  logout: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4 M16 17l5-5-5-5 M21 12H9",
  menu: "M3 12h18 M3 6h18 M3 18h18",
  "chevron-right": "M9 18l6-6-6-6",
  "chevron-down": "M6 9l6 6 6-6",
  "chevron-left": "M15 18l-6-6 6-6",
  eye: "M1 12S5 4 12 4s11 8 11 8-4 8-11 8S1 12 1 12z M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
  "eye-off":
    "M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94 M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24 M1 1l22 22",
  lock: "M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2z M7 11V7a5 5 0 0 1 10 0v4",
  user: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  "bar-chart": "M12 20V10 M18 20V4 M6 20v-4",
  "pie-chart": "M21.21 15.89A10 10 0 1 1 8 2.83 M22 12A10 10 0 0 0 12 2v10z",
  grid: "M3 3h7v7H3z M14 3h7v7h-7z M14 14h7v7h-7z M3 14h7v7H3z",
  layers: "M12 2L2 7l10 5 10-5-10-5z M2 17l10 5 10-5 M2 12l10 5 10-5",
  tag: "M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z M7 7h.01",
  "refresh-cw":
    "M23 4v6h-6 M1 20v-6h6 M3.51 9a9 9 0 0 1 14.85-3.36L23 10 M1 14l4.64 4.36A9 9 0 0 0 20.49 15",
  copy: "M20 9h-9a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2z M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1",
  printer:
    "M6 9V2h12v7 M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2 M6 14h12v8H6z",
  send: "M22 2L11 13 M22 2L15 22 9 13 2 9l20-7z",
  mail: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6",
  phone:
    "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.72 13 19.79 19.79 0 0 1 1.65 4.35 2 2 0 0 1 3.62 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91A16 16 0 0 0 13 14.85l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21 16.92z",
  "map-pin":
    "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z M12 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
  database:
    "M12 2C6.48 2 2 4.48 2 8s4.48 6 10 6 10-2.68 10-6-4.48-6-10-6z M2 8v4c0 3.32 4.48 6 10 6s10-2.68 10-6V8 M2 12v4c0 3.32 4.48 6 10 6s10-2.68 10-6v-4",
  "trending-up": "M23 6l-9.5 9.5-5-5L1 18 M17 6h6v6",
  award:
    "M12 15a7 7 0 1 0 0-14 7 7 0 0 0 0 14z M8.21 13.89L7 23l5-3 5 3-1.21-9.12",
}

const CATEGORIES = {
  "Điều hướng": [
    "home",
    "menu",
    "chevron-right",
    "chevron-down",
    "chevron-left",
    "grid",
    "layers",
  ],
  "Hành động": [
    "plus",
    "minus",
    "edit",
    "trash",
    "copy",
    "refresh-cw",
    "send",
    "download",
    "upload",
  ],
  "Trạng thái": [
    "check",
    "check-circle",
    "x-circle",
    "alert-triangle",
    "info",
    "eye",
    "eye-off",
    "lock",
  ],
  "Thông tin": ["user", "users", "bell", "mail", "phone", "map-pin", "tag"],
  "Học vụ": [
    "book-open",
    "calendar",
    "clock",
    "file-text",
    "award",
    "bar-chart",
    "pie-chart",
    "trending-up",
  ],
  "Hệ thống": ["search", "filter", "settings", "logout", "database", "printer"],
}

function Icon({
  path,
  size = 16,
  color = "currentColor",
}: {
  path: string
  size?: number
  color?: string
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {path.split(" M").map((d, i) => (
        <path key={i} d={i === 0 ? d : "M" + d} />
      ))}
    </svg>
  )
}

export default function Page02Icons() {
  const [search, setSearch] = useState("")
  const [size, setSize] = useState(20)
  const [copied, setCopied] = useState<string | null>(null)
  const [copyStatus, setCopyStatus] = useState("")
  const copyTimeout = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(copyTimeout.current), [])

  const handleCopy = async (name: string) => {
    window.clearTimeout(copyTimeout.current)
    try {
      await navigator.clipboard.writeText(name)
      setCopied(name)
      setCopyStatus(`Đã sao chép ${name} vào clipboard.`)
      copyTimeout.current = window.setTimeout(() => {
        setCopied(null)
        setCopyStatus("")
      }, 1500)
    } catch {
      setCopied(null)
      setCopyStatus(`Không thể sao chép ${name}. Hãy sao chép thủ công.`)
    }
  }

  const filtered = search.toLowerCase().trim()

  return (
    <div style={{ padding: 32, maxWidth: 1100, margin: "0 auto" }}>
      <div style={{ marginBottom: 28 }}>
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#7a90a8",
            marginBottom: 6,
          }}
        >
          02
        </div>
        <h1
          style={{
            fontSize: 28,
            fontWeight: 800,
            color: "#0f1b2d",
            margin: 0,
            marginBottom: 6,
          }}
        >
          Icon System
        </h1>
        <p style={{ fontSize: 14, color: "#7a90a8", margin: 0 }}>
          Bộ icon SVG stroke 2px • Feather Icons style • 24×24 viewBox
        </p>
      </div>

      {/* Controls */}
      <div
        style={{
          display: "flex",
          gap: 16,
          marginBottom: 28,
          alignItems: "center",
        }}
      >
        <div style={{ position: "relative", flex: 1, maxWidth: 320 }}>
          <span
            style={{
              position: "absolute",
              left: 10,
              top: "50%",
              transform: "translateY(-50%)",
              color: "#7a90a8",
            }}
          >
            <Icon path={ICONS.search} size={15} color="#7a90a8" />
          </span>
          <input
            id="icon-search"
            aria-label="Tìm icon"
            className="ems-input"
            style={{ paddingLeft: 34 }}
            placeholder="Tìm icon..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div
          role="group"
          aria-label="Kích thước icon"
          style={{ display: "flex", alignItems: "center", gap: 10 }}
        >
          <span style={{ fontSize: 13, color: "#7a90a8" }}>Kích thước:</span>
          {[16, 20, 24, 32].map((s) => (
            <button
              key={s}
              type="button"
              aria-pressed={size === s}
              onClick={() => setSize(s)}
              className={`ems-btn ems-btn-xs ${
                size === s ? "ems-btn-primary" : "ems-btn-secondary"
              }`}
            >
              {s}px
            </button>
          ))}
        </div>
      </div>

      {Object.entries(CATEGORIES).map(([cat, iconNames]) => {
        const visible = iconNames.filter(
          (n) => !filtered || n.includes(filtered),
        )
        if (visible.length === 0) return null
        return (
          <div key={cat} className="page-section">
            <div className="section-label">{cat}</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              {visible.map((name) => (
                <button
                  key={name}
                  type="button"
                  onClick={() => void handleCopy(name)}
                  aria-label={`Sao chép tên icon ${name}`}
                  title={`Sao chép: ${name}`}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 8,
                    padding: "12px 14px",
                    borderRadius: 8,
                    background: copied === name ? "#e6f4ff" : "white",
                    border: `1px solid ${
                      copied === name ? "#91caff" : "#d1dbe8"
                    }`,
                    cursor: "pointer",
                    transition: "all 0.15s",
                    minWidth: 80,
                  }}
                >
                  <Icon
                    path={ICONS[name]}
                    size={size}
                    color={copied === name ? "#1677ff" : "#2d4a78"}
                  />
                  <span
                    style={{
                      fontSize: 11,
                      color: "#7a90a8",
                      textAlign: "center",
                      lineHeight: 1.3,
                    }}
                  >
                    {name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )
      })}
      <p
        aria-live="polite"
        style={{ minHeight: 20, margin: 0, fontSize: 13, color: "#4a5e78" }}
      >
        {copyStatus}
      </p>

      {/* Icon sizes demo */}
      <div className="page-section">
        <div className="section-label">Kích thước icon chuẩn</div>
        <div className="ems-card">
          <div className="ems-card-body">
            <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
              {[
                { s: 12, label: "12 — Badge" },
                { s: 14, label: "14 — Inline" },
                { s: 16, label: "16 — Button SM" },
                { s: 18, label: "18 — Button MD" },
                { s: 20, label: "20 — Nav icon" },
                { s: 24, label: "24 — Heading" },
                { s: 32, label: "32 — Empty state" },
                { s: 48, label: "48 — Modal" },
              ].map(({ s, label }) => (
                <div key={s} style={{ textAlign: "center" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginBottom: 8,
                    }}
                  >
                    <Icon path={ICONS.bell} size={s} color="#1677ff" />
                  </div>
                  <div style={{ fontSize: 11, color: "#7a90a8" }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Usage in context */}
      <div className="page-section">
        <div className="section-label">Sử dụng trong context</div>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <button
            className="ems-btn ems-btn-primary ems-btn-md"
            style={{ display: "flex", alignItems: "center", gap: 8 }}
          >
            <Icon path={ICONS.plus} size={15} color="white" /> Thêm sinh viên
          </button>
          <button
            className="ems-btn ems-btn-secondary ems-btn-md"
            style={{ display: "flex", alignItems: "center", gap: 8 }}
          >
            <Icon path={ICONS.download} size={15} color="#4a5e78" /> Xuất Excel
          </button>
          <button
            className="ems-btn ems-btn-danger ems-btn-md"
            style={{ display: "flex", alignItems: "center", gap: 8 }}
          >
            <Icon path={ICONS.trash} size={15} color="white" /> Xóa bản ghi
          </button>
          <div
            className="ems-badge ems-badge-green"
            style={{ display: "flex", alignItems: "center", gap: 6 }}
          >
            <Icon path={ICONS["check-circle"]} size={12} color="#389e0d" /> Đã
            duyệt
          </div>
          <div
            className="ems-badge ems-badge-orange"
            style={{ display: "flex", alignItems: "center", gap: 6 }}
          >
            <Icon path={ICONS.clock} size={12} color="#d46b08" /> Chờ xử lý
          </div>
          <div
            className="ems-badge ems-badge-red"
            style={{ display: "flex", alignItems: "center", gap: 6 }}
          >
            <Icon path={ICONS["x-circle"]} size={12} color="#cf1322" /> Từ chối
          </div>
        </div>
      </div>
    </div>
  )
}
