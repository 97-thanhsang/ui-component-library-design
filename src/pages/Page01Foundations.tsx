import { useState } from "react"

const COLORS = {
  "Navy — Sidebar & Brand": [
    { name: "navy-950", hex: "#080f1a", label: "950" },
    { name: "navy-900", hex: "#0f1b2d", label: "900 — Sidebar BG" },
    { name: "navy-800", hex: "#152845", label: "800" },
    { name: "navy-700", hex: "#1e3561", label: "700" },
    { name: "navy-600", hex: "#2d4a78", label: "600" },
    { name: "navy-500", hex: "#3c5c8c", label: "500" },
    { name: "navy-400", hex: "#5a769f", label: "400" },
    { name: "navy-300", hex: "#7890b2", label: "300" },
    { name: "navy-200", hex: "#9fb0c9", label: "200" },
    { name: "navy-100", hex: "#c5d0e0", label: "100" },
    { name: "navy-50", hex: "#e8edf4", label: "50" },
  ],
  "Blue — Primary Actions": [
    { name: "blue-900", hex: "#001d66", label: "900" },
    { name: "blue-800", hex: "#002c8c", label: "800" },
    { name: "blue-700", hex: "#003eb3", label: "700" },
    { name: "blue-600", hex: "#0958d9", label: "600" },
    { name: "blue-500", hex: "#1677ff", label: "500 — Primary" },
    { name: "blue-400", hex: "#4096ff", label: "400" },
    { name: "blue-300", hex: "#69b1ff", label: "300" },
    { name: "blue-200", hex: "#91caff", label: "200" },
    { name: "blue-100", hex: "#bae0ff", label: "100" },
    { name: "blue-50", hex: "#e6f4ff", label: "50 — Info BG" },
  ],
  "Semantic — Status": [
    { name: "success", hex: "#52c41a", label: "Success" },
    { name: "success-bg", hex: "#f6ffed", label: "Success BG" },
    { name: "warning", hex: "#fa8c16", label: "Warning" },
    { name: "warning-bg", hex: "#fff7e6", label: "Warning BG" },
    { name: "error", hex: "#ff4d4f", label: "Error" },
    { name: "error-bg", hex: "#fff2f0", label: "Error BG" },
    { name: "info", hex: "#1677ff", label: "Info" },
    { name: "info-bg", hex: "#e6f4ff", label: "Info BG" },
    { name: "purple", hex: "#722ed1", label: "Purple" },
    { name: "purple-bg", hex: "#f9f0ff", label: "Purple BG" },
  ],
  "Neutral — Text & Surface": [
    { name: "text-primary", hex: "#0f1b2d", label: "Text Primary" },
    { name: "text-secondary", hex: "#4a5e78", label: "Text Secondary" },
    { name: "text-tertiary", hex: "#7a90a8", label: "Text Tertiary" },
    { name: "text-disabled", hex: "#b0bec8", label: "Text Disabled" },
    { name: "border", hex: "#d1dbe8", label: "Border Default" },
    { name: "border-light", hex: "#e8eef5", label: "Border Light" },
    { name: "bg-alt", hex: "#e8eef5", label: "BG Alt" },
    { name: "bg", hex: "#f0f4f8", label: "BG App" },
    { name: "bg-hover", hex: "#f5f7fa", label: "BG Hover" },
    { name: "surface", hex: "#ffffff", label: "Surface / Card" },
  ],
}

const SPACING = [0, 2, 4, 6, 8, 10, 12, 16, 20, 24, 28, 32, 40, 48, 56, 64]
const RADIUS = [
  { label: "sm", px: 4 },
  { label: "md", px: 6 },
  { label: "lg", px: 8 },
  { label: "xl", px: 12 },
  { label: "2xl", px: 16 },
  { label: "full", px: 9999 },
]
const SHADOWS = [
  { label: "xs", css: "0 1px 2px 0 rgb(0 0 0 / 0.04)" },
  { label: "sm", css: "0 1px 4px 0 rgb(0 0 0 / 0.08)" },
  { label: "md", css: "0 2px 8px 0 rgb(0 0 0 / 0.10)" },
  { label: "lg", css: "0 4px 16px 0 rgb(0 0 0 / 0.12)" },
  { label: "xl", css: "0 8px 24px 0 rgb(0 0 0 / 0.14)" },
]

const TYPE_SCALE = [
  {
    label: "Display XL",
    size: "40px",
    weight: "800",
    lh: "1.1",
    usage: "Tiêu đề trang chính",
  },
  {
    label: "Display LG",
    size: "32px",
    weight: "800",
    lh: "1.2",
    usage: "Tiêu đề section lớn",
  },
  {
    label: "Heading 1",
    size: "24px",
    weight: "700",
    lh: "1.3",
    usage: "Tiêu đề trang",
  },
  {
    label: "Heading 2",
    size: "20px",
    weight: "700",
    lh: "1.4",
    usage: "Tiêu đề card / modal",
  },
  {
    label: "Heading 3",
    size: "18px",
    weight: "600",
    lh: "1.4",
    usage: "Tiêu đề sub-section",
  },
  {
    label: "Heading 4",
    size: "16px",
    weight: "600",
    lh: "1.5",
    usage: "Tiêu đề nội dung",
  },
  {
    label: "Body LG",
    size: "15px",
    weight: "400",
    lh: "1.6",
    usage: "Văn bản chính lớn",
  },
  {
    label: "Body MD",
    size: "14px",
    weight: "400",
    lh: "1.6",
    usage: "Văn bản chính (mặc định)",
  },
  {
    label: "Body SM",
    size: "13px",
    weight: "400",
    lh: "1.5",
    usage: "Văn bản phụ / helper",
  },
  {
    label: "Caption",
    size: "12px",
    weight: "500",
    lh: "1.4",
    usage: "Nhãn nhỏ / timestamp",
  },
  {
    label: "Label",
    size: "11px",
    weight: "700",
    lh: "1.3",
    usage: "Section label / uppercase",
  },
  {
    label: "Code",
    size: "13px",
    weight: "400",
    lh: "1.6",
    usage: "Code / token name (JetBrains Mono)",
  },
]

export default function Page01Foundations() {
  const [activeTab, setActiveTab] = useState("colors")

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
          01
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
          Foundations
        </h1>
        <p style={{ fontSize: 14, color: "#7a90a8", margin: 0 }}>
          Nền tảng thiết kế: màu sắc, typography, spacing, shadow, radius và
          design tokens
        </p>
      </div>

      {/* Tabs */}
      <div
        className="ems-tabs-nav"
        role="tablist"
        aria-label="Nền tảng thiết kế"
        style={{ marginBottom: 28 }}
      >
        {["colors", "typography", "spacing", "shadows", "tokens"].map((t) => (
          <button
            key={t}
            type="button"
            role="tab"
            id={`foundations-tab-${t}`}
            aria-selected={activeTab === t}
            aria-controls={`foundations-panel-${t}`}
            className={`ems-tab-item ${activeTab === t ? "active" : ""}`}
            onClick={() => setActiveTab(t)}
            style={{ textTransform: "capitalize" }}
          >
            {t === "colors"
              ? "Màu sắc"
              : t === "typography"
                ? "Typography"
                : t === "spacing"
                  ? "Khoảng cách"
                  : t === "shadows"
                    ? "Đổ bóng & Radius"
                    : "Design Tokens"}
          </button>
        ))}
      </div>

      {activeTab === "colors" && (
        <div
          role="tabpanel"
          id="foundations-panel-colors"
          aria-labelledby="foundations-tab-colors"
        >
          {Object.entries(COLORS).map(([group, colors]) => (
            <div key={group} className="page-section">
              <div className="section-label">{group}</div>
              <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                {colors.map((c) => {
                  const isDark = parseInt(c.hex.slice(1), 16) < 0x888888
                  return (
                    <div key={c.name} style={{ textAlign: "center" }}>
                      <div
                        style={{
                          width: 72,
                          height: 56,
                          borderRadius: 6,
                          background: c.hex,
                          border: "1px solid rgba(0,0,0,0.08)",
                          marginBottom: 6,
                          display: "flex",
                          alignItems: "flex-end",
                          justifyContent: "flex-end",
                          padding: 4,
                        }}
                      >
                        <span
                          style={{
                            fontSize: 10,
                            color: isDark
                              ? "rgba(255,255,255,0.5)"
                              : "rgba(0,0,0,0.4)",
                          }}
                        >
                          {c.hex}
                        </span>
                      </div>
                      <div
                        style={{
                          fontSize: 11,
                          color: "#4a5e78",
                          fontWeight: 500,
                        }}
                      >
                        {c.label}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}

          {/* Semantic usage */}
          <div className="page-section">
            <div className="section-label">
              Semantic Usage — Trạng thái hệ thống
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))",
                gap: 12,
              }}
            >
              {[
                {
                  label: "Thành công",
                  bg: "#f6ffed",
                  border: "#b7eb8f",
                  color: "#389e0d",
                  dot: "#52c41a",
                  usage: "Nộp bài, duyệt, hoàn thành",
                },
                {
                  label: "Cảnh báo",
                  bg: "#fff7e6",
                  border: "#ffd591",
                  color: "#d46b08",
                  dot: "#fa8c16",
                  usage: "Gần đến hạn, cần xem xét",
                },
                {
                  label: "Lỗi / Từ chối",
                  bg: "#fff2f0",
                  border: "#ffccc7",
                  color: "#cf1322",
                  dot: "#ff4d4f",
                  usage: "Sai, quá hạn, từ chối",
                },
                {
                  label: "Thông tin",
                  bg: "#e6f4ff",
                  border: "#91caff",
                  color: "#0958d9",
                  dot: "#1677ff",
                  usage: "Hướng dẫn, trạng thái chờ",
                },
                {
                  label: "Tím / Phụ",
                  bg: "#f9f0ff",
                  border: "#d3adf7",
                  color: "#531dab",
                  dot: "#722ed1",
                  usage: "Đặc biệt, VIP, phân quyền",
                },
              ].map((s) => (
                <div
                  key={s.label}
                  style={{
                    background: s.bg,
                    border: `1px solid ${s.border}`,
                    borderRadius: 8,
                    padding: "14px 16px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      marginBottom: 8,
                    }}
                  >
                    <div
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        background: s.dot,
                      }}
                    />
                    <span
                      style={{ fontSize: 13, fontWeight: 600, color: s.color }}
                    >
                      {s.label}
                    </span>
                  </div>
                  <p style={{ margin: 0, fontSize: 12, color: "#4a5e78" }}>
                    {s.usage}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "typography" && (
        <div className="page-section">
          <div className="section-label">Type Scale — Be Vietnam Pro</div>
          <div
            style={{
              background: "white",
              border: "1px solid #d1dbe8",
              borderRadius: 8,
              overflow: "hidden",
            }}
          >
            {TYPE_SCALE.map((t, i) => (
              <div
                key={t.label}
                style={{
                  display: "grid",
                  gridTemplateColumns: "140px 1fr auto",
                  alignItems: "center",
                  padding: "14px 20px",
                  borderBottom:
                    i < TYPE_SCALE.length - 1 ? "1px solid #e8eef5" : "none",
                  gap: 20,
                }}
              >
                <div>
                  <div
                    style={{ fontSize: 11, fontWeight: 700, color: "#7a90a8" }}
                  >
                    {t.label}
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      color: "#b0bec8",
                      fontFamily: "JetBrains Mono,monospace",
                    }}
                  >
                    {t.size} / {t.weight} / {t.lh}
                  </div>
                </div>
                <div
                  style={{
                    fontSize: t.size,
                    fontWeight: parseInt(t.weight),
                    lineHeight: t.lh,
                    color: "#0f1b2d",
                    fontFamily:
                      t.label === "Code"
                        ? "JetBrains Mono,monospace"
                        : undefined,
                  }}
                >
                  {t.label === "Code"
                    ? "const giangVien = 'Nguyễn Văn An';"
                    : "Quản lý học phần và thời khóa biểu"}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: "#7a90a8",
                    textAlign: "right",
                    whiteSpace: "nowrap",
                  }}
                >
                  {t.usage}
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 24 }}>
            <div className="section-label">Font Families</div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3,1fr)",
                gap: 16,
              }}
            >
              {[
                {
                  name: "Be Vietnam Pro",
                  role: "Display, Heading, Body (Tiếng Việt)",
                  sample: "Aa Bb Cc Đ Ê Ơ Ư",
                  weights: "300 400 500 600 700 800",
                },
                {
                  name: "Inter",
                  role: "Fallback, Numbers, UI Labels",
                  sample: "Aa Bb Cc 1234567890",
                  weights: "300 400 500 600 700",
                },
                {
                  name: "JetBrains Mono",
                  role: "Code, Tokens, Timestamps",
                  sample: "const x = 123;",
                  weights: "400 500",
                },
              ].map((f) => (
                <div key={f.name} className="ems-card">
                  <div className="ems-card-header">
                    <div>
                      <div
                        style={{
                          fontWeight: 700,
                          fontSize: 14,
                          color: "#0f1b2d",
                        }}
                      >
                        {f.name}
                      </div>
                      <div style={{ fontSize: 12, color: "#7a90a8" }}>
                        {f.role}
                      </div>
                    </div>
                  </div>
                  <div className="ems-card-body">
                    <div
                      style={{
                        fontSize: 24,
                        fontFamily:
                          f.name === "JetBrains Mono"
                            ? "JetBrains Mono,monospace"
                            : f.name,
                        color: "#0f1b2d",
                        marginBottom: 12,
                      }}
                    >
                      {f.sample}
                    </div>
                    <div style={{ fontSize: 11, color: "#b0bec8" }}>
                      Weights: {f.weights}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "spacing" && (
        <div>
          <div className="page-section">
            <div className="section-label">Spacing Scale — Bội số 4px</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {SPACING.map((s) => (
                <div
                  key={s}
                  style={{ display: "flex", alignItems: "center", gap: 16 }}
                >
                  <div
                    style={{
                      width: 60,
                      textAlign: "right",
                      fontSize: 12,
                      color: "#7a90a8",
                      fontFamily: "JetBrains Mono,monospace",
                    }}
                  >
                    {s}px
                  </div>
                  <div
                    style={{
                      width: s,
                      height: 20,
                      background: "#1677ff",
                      borderRadius: 3,
                      minWidth: s > 0 ? s : 1,
                      opacity: 0.7,
                    }}
                  />
                  <div style={{ fontSize: 12, color: "#b0bec8" }}>
                    space-{s / 4}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="page-section">
            <div className="section-label">Control Heights</div>
            <div style={{ display: "flex", gap: 20, alignItems: "flex-end" }}>
              {[
                { label: "XS", h: 24 },
                { label: "SM", h: 32 },
                { label: "MD", h: 36 },
                { label: "LG", h: 40 },
                { label: "XL", h: 48 },
              ].map((c) => (
                <div key={c.label} style={{ textAlign: "center" }}>
                  <div
                    style={{
                      width: 80,
                      height: c.h,
                      background: "white",
                      border: "1.5px solid #1677ff",
                      borderRadius: 6,
                      marginBottom: 8,
                    }}
                  />
                  <div
                    style={{ fontSize: 12, fontWeight: 600, color: "#4a5e78" }}
                  >
                    {c.label}
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      color: "#b0bec8",
                      fontFamily: "JetBrains Mono,monospace",
                    }}
                  >
                    {c.h}px
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="page-section">
            <div className="section-label">Grid System</div>
            <div
              style={{
                background: "white",
                border: "1px solid #d1dbe8",
                borderRadius: 8,
                padding: 20,
              }}
            >
              {[
                { label: "Mobile", cols: 4, gutter: 16, breakpoint: "< 768px" },
                {
                  label: "Tablet",
                  cols: 8,
                  gutter: 20,
                  breakpoint: "768–1199px",
                },
                {
                  label: "Desktop",
                  cols: 12,
                  gutter: 24,
                  breakpoint: "≥ 1200px",
                },
                { label: "Wide", cols: 12, gutter: 32, breakpoint: "≥ 1600px" },
              ].map((g) => (
                <div
                  key={g.label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    marginBottom: 16,
                  }}
                >
                  <div
                    style={{
                      width: 80,
                      fontSize: 13,
                      fontWeight: 600,
                      color: "#4a5e78",
                    }}
                  >
                    {g.label}
                  </div>
                  <div style={{ display: "flex", gap: 3, flex: 1 }}>
                    {Array.from({ length: g.cols }).map((_, i) => (
                      <div
                        key={i}
                        style={{
                          flex: 1,
                          height: 24,
                          background: "rgba(22,119,255,0.12)",
                          borderRadius: 3,
                          border: "1px solid rgba(22,119,255,0.2)",
                        }}
                      />
                    ))}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: "#7a90a8",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {g.cols} cols / {g.gutter}px / {g.breakpoint}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "shadows" && (
        <div>
          <div className="page-section">
            <div className="section-label">Border Radius</div>
            <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
              {RADIUS.map((r) => (
                <div key={r.label} style={{ textAlign: "center" }}>
                  <div
                    style={{
                      width: 80,
                      height: 80,
                      background: "white",
                      border: "1.5px solid #1677ff",
                      borderRadius: r.px,
                      marginBottom: 8,
                      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    }}
                  />
                  <div
                    style={{ fontSize: 12, fontWeight: 600, color: "#4a5e78" }}
                  >
                    {r.label}
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      color: "#b0bec8",
                      fontFamily: "JetBrains Mono,monospace",
                    }}
                  >
                    {r.px === 9999 ? "50%" : `${r.px}px`}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="page-section">
            <div className="section-label">Box Shadows</div>
            <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
              {SHADOWS.map((s) => (
                <div key={s.label} style={{ textAlign: "center" }}>
                  <div
                    style={{
                      width: 100,
                      height: 80,
                      background: "white",
                      borderRadius: 8,
                      boxShadow: s.css,
                      marginBottom: 12,
                      border: "1px solid #e8eef5",
                    }}
                  />
                  <div
                    style={{ fontSize: 12, fontWeight: 600, color: "#4a5e78" }}
                  >
                    shadow-{s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="page-section">
            <div className="section-label">Border Width</div>
            <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
              {[
                { px: 1, label: "Default (1px)" },
                { px: 1.5, label: "Medium (1.5px)" },
                { px: 2, label: "Thick (2px)" },
              ].map((b) => (
                <div
                  key={b.label}
                  style={{ display: "flex", alignItems: "center", gap: 12 }}
                >
                  <div
                    style={{
                      width: 80,
                      height: 40,
                      borderRadius: 6,
                      border: `${b.px}px solid #1677ff`,
                      background: "white",
                    }}
                  />
                  <span style={{ fontSize: 12, color: "#4a5e78" }}>
                    {b.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="page-section">
            <div className="section-label">Motion / Animation Tokens</div>
            <div
              style={{
                background: "white",
                border: "1px solid #d1dbe8",
                borderRadius: 8,
                overflow: "hidden",
              }}
            >
              {[
                {
                  token: "duration-fast",
                  val: "100ms",
                  usage: "Hover, focus ring",
                },
                {
                  token: "duration-base",
                  val: "150ms",
                  usage: "Button, badge, switch",
                },
                {
                  token: "duration-slow",
                  val: "200ms",
                  usage: "Dropdown, tooltip, fade",
                },
                {
                  token: "duration-drawer",
                  val: "280ms",
                  usage: "Drawer, slide-in panel",
                },
                {
                  token: "duration-modal",
                  val: "220ms",
                  usage: "Modal open/close",
                },
                {
                  token: "easing-standard",
                  val: "cubic-bezier(.4,0,.2,1)",
                  usage: "Standard transitions",
                },
                {
                  token: "easing-decelerate",
                  val: "cubic-bezier(0,0,.2,1)",
                  usage: "Enter screen",
                },
                {
                  token: "easing-accelerate",
                  val: "cubic-bezier(.4,0,1,1)",
                  usage: "Exit screen",
                },
              ].map((m, i, arr) => (
                <div
                  key={m.token}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "200px 220px 1fr",
                    padding: "10px 20px",
                    borderBottom:
                      i < arr.length - 1 ? "1px solid #e8eef5" : "none",
                    gap: 20,
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "JetBrains Mono,monospace",
                      fontSize: 12,
                      color: "#531dab",
                    }}
                  >
                    --{m.token}
                  </div>
                  <div
                    style={{
                      fontFamily: "JetBrains Mono,monospace",
                      fontSize: 12,
                      color: "#4a5e78",
                    }}
                  >
                    {m.val}
                  </div>
                  <div style={{ fontSize: 13, color: "#7a90a8" }}>
                    {m.usage}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "tokens" && (
        <div>
          <div className="page-section">
            <div className="section-label">Design Token Reference</div>
            <div
              style={{
                background: "#0f1b2d",
                borderRadius: 10,
                padding: "20px 24px",
                fontFamily: "JetBrains Mono,monospace",
                fontSize: 12,
                color: "#9db8d0",
                lineHeight: 2,
              }}
            >
              <div style={{ color: "#69b1ff" }}>/* Color tokens */</div>
              {[
                ["--color-navy-900", "#0f1b2d", "Sidebar background"],
                ["--color-blue-500", "#1677ff", "Primary action"],
                ["--color-success", "#52c41a", "Success state"],
                ["--color-warning", "#fa8c16", "Warning state"],
                ["--color-error", "#ff4d4f", "Error / danger"],
                ["--color-purple", "#722ed1", "Special / VIP"],
                ["--color-surface", "#ffffff", "Card surface"],
                ["--color-bg", "#f0f4f8", "App background"],
                ["--color-border", "#d1dbe8", "Default border"],
                ["--color-text-primary", "#0f1b2d", "Primary text"],
              ].map(([name, val, comment]) => (
                <div key={name as string}>
                  <span style={{ color: "#9db8d0" }}>{name as string}: </span>
                  <span style={{ color: "#52c41a" }}>{val as string};</span>
                  <span style={{ color: "#4a5e78" }}>
                    {" "}
                    /* {comment as string} */
                  </span>
                </div>
              ))}
              <br />
              <div style={{ color: "#69b1ff" }}>/* Spacing */</div>
              {[4, 8, 12, 16, 20, 24, 32].map((n) => (
                <div key={n}>
                  <span style={{ color: "#9db8d0" }}>--space-{n / 4}: </span>
                  <span style={{ color: "#ffd591" }}>{n}px;</span>
                </div>
              ))}
              <br />
              <div style={{ color: "#69b1ff" }}>/* Radius */</div>
              {["sm: 4px", "md: 6px", "lg: 8px", "xl: 12px"].map((r) => (
                <div key={r}>
                  <span style={{ color: "#9db8d0" }}>
                    --radius-{r.split(":")[0]}:{" "}
                  </span>
                  <span style={{ color: "#ffd591" }}>{r.split(": ")[1]};</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
