interface Props {
  onNavigate: (page: string) => void
}

const PAGES = [
  {
    id: "01",
    label: "01 Foundations",
    desc: "Màu sắc, typography, spacing, shadow, radius",
    color: "#1677ff",
  },
  {
    id: "02",
    label: "02 Icons",
    desc: "Bộ icon system và kích thước",
    color: "#0958d9",
  },
  {
    id: "03",
    label: "03 Components",
    desc: "Button, form, navigation, feedback, overlay",
    color: "#722ed1",
  },
  {
    id: "04",
    label: "04 Tables & Data",
    desc: "Bảng dữ liệu, trạng thái, phân trang",
    color: "#08979c",
  },
  {
    id: "05",
    label: "05 Patterns",
    desc: "Workflow, filter, approval, schedule",
    color: "#389e0d",
  },
  {
    id: "06",
    label: "06 Templates",
    desc: "Dashboard, danh sách, chi tiết, báo cáo",
    color: "#d46b08",
  },
  {
    id: "07",
    label: "07 Prototype Flows",
    desc: "Luồng tương tác có kết nối prototype",
    color: "#cf1322",
  },
  {
    id: "08",
    label: "08 Documentation",
    desc: "Tokens, API, accessibility, do & don't",
    color: "#531dab",
  },
]

export default function Page00Cover({ onNavigate }: Props) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f1b2d",
        color: "white",
        padding: "60px 48px",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 64 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 32,
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "linear-gradient(135deg,#1677ff,#69b1ff)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              fontWeight: 800,
            }}
          >
            A
          </div>
          <div>
            <div
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: "#4096ff",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: 2,
              }}
            >
              ASC Vietnam
            </div>
            <div style={{ fontSize: 24, fontWeight: 800, lineHeight: 1 }}>
              ASC.EMS Design System
            </div>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 60,
            maxWidth: 960,
          }}
        >
          <div>
            <h1
              style={{
                fontSize: 48,
                fontWeight: 800,
                lineHeight: 1.1,
                margin: "0 0 20px",
                color: "#ffffff",
              }}
            >
              Hệ thống thiết kế
              <br />
              <span style={{ color: "#4096ff" }}>doanh nghiệp</span>
              <br />
              <span style={{ color: "#69b1ff", fontSize: 36 }}>
                quản lý giáo dục
              </span>
            </h1>
            <p
              style={{
                fontSize: 16,
                color: "#9db8d0",
                lineHeight: 1.7,
                marginBottom: 28,
                maxWidth: 420,
              }}
            >
              Thư viện component đầy đủ và prototype tương tác cho nền tảng quản
              lý giáo dục ASC.EMS — từ nền tảng thiết kế đến mẫu workflow hoàn
              chỉnh.
            </p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {[
                "WCAG 2.1 AA",
                "Tiếng Việt",
                "Dark Mode Ready",
                "8 Pages",
                "100+ Components",
              ].map((tag) => (
                <span
                  key={tag}
                  style={{
                    padding: "4px 10px",
                    borderRadius: 4,
                    background: "rgba(22,119,255,0.15)",
                    border: "1px solid rgba(22,119,255,0.3)",
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#91caff",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div>
            {/* Stats */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 16,
              }}
            >
              {[
                { val: "8", label: "Trang hệ thống" },
                { val: "100+", label: "Components" },
                { val: "40+", label: "Pattern mẫu" },
                { val: "200+", label: "Design tokens" },
              ].map((s) => (
                <div
                  key={s.label}
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 10,
                    padding: "20px",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontSize: 36,
                      fontWeight: 800,
                      color: "#4096ff",
                      lineHeight: 1,
                    }}
                  >
                    {s.val}
                  </div>
                  <div style={{ fontSize: 13, color: "#9db8d0", marginTop: 6 }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Version info */}
      <div
        style={{
          display: "flex",
          gap: 32,
          marginBottom: 48,
          fontSize: 13,
          color: "#7a90a8",
        }}
      >
        <span>
          Phiên bản: <strong style={{ color: "#9db8d0" }}>2.0.0</strong>
        </span>
        <span>
          Cập nhật: <strong style={{ color: "#9db8d0" }}>09/2026</strong>
        </span>
        <span>
          Figma:{" "}
          <strong style={{ color: "#9db8d0" }}>
            Variables + Auto Layout 5
          </strong>
        </span>
        <span>
          Framework:{" "}
          <strong style={{ color: "#9db8d0" }}>React + Tailwind CSS v4</strong>
        </span>
      </div>

      {/* Page index */}
      <div>
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#4a5e78",
            marginBottom: 16,
          }}
        >
          Nội dung hệ thống
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 16,
          }}
        >
          {PAGES.map((p) => (
            <button
              key={p.id}
              onClick={() => onNavigate(p.id)}
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 10,
                padding: "18px 20px",
                textAlign: "left",
                cursor: "pointer",
                transition: "all 0.15s",
                color: "inherit",
                borderLeft: `3px solid ${p.color}`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.08)"
                e.currentTarget.style.borderColor = p.color
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.04)"
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"
                e.currentTarget.style.borderLeftColor = p.color
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: p.color,
                  marginBottom: 6,
                  letterSpacing: "0.05em",
                }}
              >
                {p.label}
              </div>
              <div style={{ fontSize: 13, color: "#9db8d0", lineHeight: 1.5 }}>
                {p.desc}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          marginTop: 64,
          paddingTop: 24,
          borderTop: "1px solid rgba(255,255,255,0.06)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: 12,
          color: "#4a5e78",
        }}
      >
        <span>© 2026 ASC Vietnam Co., Ltd. — ascvn.com.vn</span>
        <span>Thiết kế bởi ASC Design Team</span>
      </div>
    </div>
  )
}
