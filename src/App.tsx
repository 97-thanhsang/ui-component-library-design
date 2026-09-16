import { useState, useEffect, useRef } from "react";
import Page00Cover from "./pages/Page00Cover";
import Page01Foundations from "./pages/Page01Foundations";
import Page02Icons from "./pages/Page02Icons";
import Page03Components from "./pages/Page03Components";
import Page04Tables from "./pages/Page04Tables";
import Page05Patterns from "./pages/Page05Patterns";
import Page06Templates from "./pages/Page06Templates";
import Page07Prototype from "./pages/Page07Prototype";
import Page08Docs from "./pages/Page08Docs";

const NAV_GROUPS = [
  {
    group: "Hệ thống",
    items: [
      { id: "00", label: "Cover", icon: "⊞", sub: "Trang bìa" },
    ],
  },
  {
    group: "Thiết kế nền tảng",
    items: [
      { id: "01", label: "Foundations", icon: "◈", sub: "Màu, type, spacing" },
      { id: "02", label: "Icons", icon: "✦", sub: "Icon system 48+" },
    ],
  },
  {
    group: "Components",
    items: [
      { id: "03", label: "Components", icon: "⬡", sub: "100+ UI components" },
      { id: "04", label: "Tables & Data", icon: "▤", sub: "Data tables" },
    ],
  },
  {
    group: "Patterns & Templates",
    items: [
      { id: "05", label: "Patterns", icon: "◇", sub: "Enterprise workflows" },
      { id: "06", label: "Templates", icon: "⊟", sub: "Full-page layouts" },
    ],
  },
  {
    group: "Prototype & Docs",
    items: [
      { id: "07", label: "Prototype Flows", icon: "▷", sub: "Interactive flows" },
      { id: "08", label: "Documentation", icon: "≡", sub: "API & guidelines" },
    ],
  },
];

const NOTIFS = [
  { title: "Bảng điểm IT302 đã được duyệt", time: "5 phút trước", read: false, color: "#52c41a" },
  { title: "3 đơn từ mới cần xét duyệt", time: "20 phút trước", read: false, color: "#fa8c16" },
  { title: "Kỳ thi cuối kỳ: còn 7 ngày", time: "2 giờ trước", read: true, color: "#1677ff" },
  { title: "Nguyễn Văn An: cảnh báo nghỉ học", time: "Hôm qua", read: true, color: "#ff4d4f" },
];

export default function App() {
  const [activePage, setActivePage] = useState("00");
  const [collapsed, setCollapsed] = useState(false);
  const [showNotifs, setShowNotifs] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const [showCmd, setShowCmd] = useState(false);
  const [cmdQuery, setCmdQuery] = useState("");
  const [notifData, setNotifData] = useState(NOTIFS);
  const cmdRef = useRef<HTMLDivElement>(null);

  // Keyboard shortcut Ctrl+K
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") { e.preventDefault(); setShowCmd(c => !c); }
      if (e.key === "Escape") { setShowCmd(false); setShowNotifs(false); setShowUser(false); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const unreadCount = notifData.filter(n => !n.read).length;

  const CMD_ITEMS = [
    { label: "Trang chủ — Tổng quan", page: "06", icon: "🏠" },
    { label: "Foundations — Màu sắc, Typography", page: "01", icon: "◈" },
    { label: "Components — Buttons, Forms", page: "03", icon: "⬡" },
    { label: "Tables & Data — Bảng dữ liệu", page: "04", icon: "▤" },
    { label: "Patterns — Workflow enterprise", page: "05", icon: "◇" },
    { label: "Prototype Flows — Luồng tương tác", page: "07", icon: "▷" },
    { label: "Documentation — API & Guidelines", page: "08", icon: "≡" },
  ].filter(i => !cmdQuery || i.label.toLowerCase().includes(cmdQuery.toLowerCase()));

  const renderPage = () => {
    switch (activePage) {
      case "00": return <Page00Cover onNavigate={setActivePage} />;
      case "01": return <Page01Foundations />;
      case "02": return <Page02Icons />;
      case "03": return <Page03Components />;
      case "04": return <Page04Tables />;
      case "05": return <Page05Patterns />;
      case "06": return <Page06Templates />;
      case "07": return <Page07Prototype />;
      case "08": return <Page08Docs />;
      default: return <Page00Cover onNavigate={setActivePage} />;
    }
  };

  const pageTitle = NAV_GROUPS.flatMap(g => g.items).find(i => i.id === activePage);

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden", fontFamily: "'Be Vietnam Pro', sans-serif" }}>
      {/* ======= SIDEBAR ======= */}
      <aside style={{
        width: collapsed ? 56 : 228,
        background: "#0f1b2d",
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
        transition: "width 0.22s cubic-bezier(.4,0,.2,1)",
        overflow: "hidden",
        borderRight: "1px solid rgba(255,255,255,0.05)",
        zIndex: 10,
      }}>
        {/* Brand */}
        <div style={{ padding: "14px 12px", borderBottom: "1px solid rgba(255,255,255,0.07)", display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
          <div style={{
            width: 34, height: 34, borderRadius: 9,
            background: "linear-gradient(135deg,#1677ff 0%,#4096ff 100%)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 17, fontWeight: 800, color: "white", flexShrink: 0,
            boxShadow: "0 2px 8px rgba(22,119,255,0.4)",
          }}>A</div>
          {!collapsed && (
            <div style={{ overflow: "hidden" }}>
              <div style={{ color: "white", fontWeight: 800, fontSize: 14.5, lineHeight: 1.1, whiteSpace: "nowrap" }}>ASC.EMS</div>
              <div style={{ color: "#5a769f", fontSize: 10.5, whiteSpace: "nowrap" }}>Design System v2.0</div>
            </div>
          )}
        </div>

        {/* Search hint */}
        {!collapsed && (
          <div style={{ padding: "10px 10px 0" }}>
            <button onClick={() => setShowCmd(true)} style={{
              width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 7, padding: "7px 10px", display: "flex", alignItems: "center", gap: 8,
              color: "#5a769f", cursor: "pointer", fontSize: 12.5, transition: "all 0.15s",
            }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.09)"}
              onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}
            >
              <span>🔍</span>
              <span style={{ flex: 1, textAlign: "left" }}>Tìm kiếm...</span>
              <kbd style={{ fontSize: 10, color: "#3c5c8c", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 3, padding: "1px 4px" }}>⌘K</kbd>
            </button>
          </div>
        )}

        {/* Nav groups */}
        <nav style={{ flex: 1, padding: "8px 8px", overflowY: "auto", overflowX: "hidden" }} className="thin-scroll">
          {NAV_GROUPS.map(group => (
            <div key={group.group} style={{ marginBottom: 4 }}>
              {!collapsed && (
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#3c5c8c", padding: "8px 6px 4px", whiteSpace: "nowrap" }}>
                  {group.group}
                </div>
              )}
              {group.items.map(item => (
                <button
                  key={item.id}
                  onClick={() => setActivePage(item.id)}
                  title={collapsed ? item.label : undefined}
                  style={{
                    width: "100%", display: "flex", alignItems: "center", gap: 10,
                    padding: collapsed ? "9px 11px" : "8px 10px",
                    borderRadius: 7, cursor: "pointer", border: "none",
                    transition: "all 0.13s",
                    background: activePage === item.id ? "rgba(22,119,255,0.18)" : "transparent",
                    borderLeft: activePage === item.id && !collapsed ? "2px solid #1677ff" : "2px solid transparent",
                    paddingLeft: activePage === item.id && !collapsed ? 8 : 10,
                    marginBottom: 2,
                    justifyContent: collapsed ? "center" : "flex-start",
                  }}
                  onMouseEnter={e => { if (activePage !== item.id) e.currentTarget.style.background = "rgba(255,255,255,0.06)"; }}
                  onMouseLeave={e => { if (activePage !== item.id) e.currentTarget.style.background = "transparent"; }}
                >
                  <span style={{ fontSize: 15, flexShrink: 0, color: activePage === item.id ? "#4096ff" : "#5a769f" }}>{item.icon}</span>
                  {!collapsed && (
                    <div style={{ textAlign: "left", overflow: "hidden" }}>
                      <div style={{ fontSize: 13, fontWeight: activePage === item.id ? 600 : 500, color: activePage === item.id ? "#ffffff" : "#8aacca", whiteSpace: "nowrap" }}>{item.label}</div>
                      <div style={{ fontSize: 10.5, color: "#3c5c8c", whiteSpace: "nowrap" }}>{item.sub}</div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          ))}
        </nav>

        {/* User + collapse */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "10px 8px", flexShrink: 0 }}>
          {!collapsed && (
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 8px", borderRadius: 7, marginBottom: 6, cursor: "pointer", transition: "all 0.15s" }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.06)"}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}
            >
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg,#1677ff,#722ed1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "white", flexShrink: 0 }}>LAN</div>
              <div style={{ flex: 1, overflow: "hidden" }}>
                <div style={{ fontSize: 12.5, fontWeight: 600, color: "#c5d8e8", whiteSpace: "nowrap" }}>Nguyễn Thị Lan</div>
                <div style={{ fontSize: 10.5, color: "#3c5c8c", whiteSpace: "nowrap" }}>Trưởng khoa CNTT</div>
              </div>
            </div>
          )}
          <button
            onClick={() => setCollapsed(c => !c)}
            style={{
              width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 7, color: "#5a769f", padding: "6px", cursor: "pointer",
              fontSize: 13, transition: "all 0.15s", display: "flex", alignItems: "center", justifyContent: "center",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
            onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}
          >
            {collapsed ? "›" : "‹"} {!collapsed && <span style={{ fontSize: 11, marginLeft: 4 }}>Thu gọn</span>}
          </button>
        </div>
      </aside>

      {/* ======= MAIN AREA ======= */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* ---- HEADER ---- */}
        <header style={{
          height: 52, background: "white", borderBottom: "1px solid #e8eef5",
          display: "flex", alignItems: "center", padding: "0 20px", gap: 16,
          flexShrink: 0, boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
        }}>
          {/* Breadcrumb */}
          <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 12, color: "#b0bec8" }}>ASC.EMS</span>
            <span style={{ fontSize: 12, color: "#d1dbe8" }}>›</span>
            {pageTitle && (
              <span style={{ fontSize: 13.5, fontWeight: 600, color: "#0f1b2d" }}>
                {pageTitle.id} {pageTitle.label}
              </span>
            )}
          </div>

          {/* Header search */}
          <button onClick={() => setShowCmd(true)} style={{
            display: "flex", alignItems: "center", gap: 8,
            background: "#f5f7fa", border: "1px solid #e8eef5",
            borderRadius: 7, padding: "6px 12px", cursor: "pointer",
            color: "#7a90a8", fontSize: 13, transition: "all 0.15s",
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#1677ff"; e.currentTarget.style.color = "#1677ff"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "#e8eef5"; e.currentTarget.style.color = "#7a90a8"; }}
          >
            <span>🔍</span>
            <span>Tìm kiếm...</span>
            <kbd style={{ fontSize: 11, color: "#b0bec8", border: "1px solid #e8eef5", borderRadius: 3, padding: "1px 5px" }}>⌘K</kbd>
          </button>

          {/* Actions */}
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            {/* Notif bell */}
            <div style={{ position: "relative" }}>
              <button onClick={() => { setShowNotifs(n => !n); setShowUser(false); }} style={{
                width: 36, height: 36, borderRadius: 8, border: "1px solid #e8eef5",
                background: showNotifs ? "#e6f4ff" : "white", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17,
                transition: "all 0.15s", position: "relative",
              }}>
                🔔
                {unreadCount > 0 && (
                  <div style={{ position: "absolute", top: 4, right: 4, width: 16, height: 16, background: "#ff4d4f", borderRadius: "50%", border: "2px solid white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 700, color: "white" }}>
                    {unreadCount}
                  </div>
                )}
              </button>
              {showNotifs && (
                <>
                  <div style={{ position: "fixed", inset: 0, zIndex: 199 }} onClick={() => setShowNotifs(false)} />
                  <div style={{
                    position: "absolute", top: "calc(100% + 8px)", right: 0,
                    width: 320, background: "white", border: "1px solid #d1dbe8",
                    borderRadius: 10, boxShadow: "0 6px 24px rgba(0,0,0,0.12)", zIndex: 200, overflow: "hidden",
                  }}>
                    <div style={{ padding: "12px 16px", borderBottom: "1px solid #e8eef5", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontWeight: 700, fontSize: 14, color: "#0f1b2d" }}>Thông báo</span>
                      <button onClick={() => setNotifData(n => n.map(x => ({ ...x, read: true })))} style={{ background: "none", border: "none", color: "#1677ff", cursor: "pointer", fontSize: 12 }}>Đánh dấu đã đọc</button>
                    </div>
                    {notifData.map((n, i) => (
                      <div key={i} onClick={() => setNotifData(prev => prev.map((x, j) => j === i ? { ...x, read: true } : x))} style={{
                        padding: "12px 16px", borderBottom: "1px solid #f0f4f8",
                        background: n.read ? "white" : "#f5f9ff", cursor: "pointer",
                        display: "flex", gap: 10, alignItems: "flex-start", transition: "background 0.1s",
                      }}
                        onMouseEnter={e => e.currentTarget.style.background = "#f0f7ff"}
                        onMouseLeave={e => e.currentTarget.style.background = n.read ? "white" : "#f5f9ff"}
                      >
                        <div style={{ width: 8, height: 8, borderRadius: "50%", background: n.read ? "#d1dbe8" : n.color, marginTop: 4, flexShrink: 0 }} />
                        <div>
                          <div style={{ fontSize: 13, color: "#0f1b2d", fontWeight: n.read ? 400 : 600, lineHeight: 1.4 }}>{n.title}</div>
                          <div style={{ fontSize: 11, color: "#b0bec8", marginTop: 2 }}>{n.time}</div>
                        </div>
                      </div>
                    ))}
                    <div style={{ padding: "10px 16px", textAlign: "center" }}>
                      <button style={{ background: "none", border: "none", color: "#1677ff", cursor: "pointer", fontSize: 13 }}>Xem tất cả thông báo →</button>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Settings */}
            <button style={{
              width: 36, height: 36, borderRadius: 8, border: "1px solid #e8eef5",
              background: "white", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17, transition: "all 0.15s",
            }}
              onMouseEnter={e => e.currentTarget.style.background = "#f5f7fa"}
              onMouseLeave={e => e.currentTarget.style.background = "white"}
            >⚙</button>

            {/* User */}
            <div style={{ position: "relative" }}>
              <button onClick={() => { setShowUser(u => !u); setShowNotifs(false); }} style={{
                display: "flex", alignItems: "center", gap: 8, padding: "4px 8px 4px 4px",
                border: "1px solid #e8eef5", borderRadius: 8, background: showUser ? "#f0f7ff" : "white",
                cursor: "pointer", transition: "all 0.15s",
              }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg,#1677ff,#722ed1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: "white" }}>LAN</div>
                <div style={{ textAlign: "left" }}>
                  <div style={{ fontSize: 12.5, fontWeight: 600, color: "#0f1b2d" }}>Nguyễn Thị Lan</div>
                  <div style={{ fontSize: 10.5, color: "#7a90a8" }}>Trưởng khoa</div>
                </div>
                <span style={{ color: "#7a90a8", fontSize: 10 }}>▾</span>
              </button>
              {showUser && (
                <>
                  <div style={{ position: "fixed", inset: 0, zIndex: 199 }} onClick={() => setShowUser(false)} />
                  <div style={{
                    position: "absolute", top: "calc(100% + 8px)", right: 0,
                    width: 220, background: "white", border: "1px solid #d1dbe8",
                    borderRadius: 10, boxShadow: "0 6px 24px rgba(0,0,0,0.12)", zIndex: 200, overflow: "hidden",
                  }}>
                    <div style={{ padding: "14px 16px", borderBottom: "1px solid #e8eef5", background: "#f5f7fa" }}>
                      <div style={{ fontWeight: 700, fontSize: 14, color: "#0f1b2d" }}>Nguyễn Thị Lan</div>
                      <div style={{ fontSize: 12, color: "#7a90a8" }}>lan.nguyen@asc.edu.vn</div>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 4, marginTop: 6, fontSize: 11, background: "#e6f4ff", color: "#0958d9", padding: "2px 8px", borderRadius: 10, border: "1px solid #91caff" }}>
                        ● Trưởng khoa CNTT
                      </span>
                    </div>
                    {[
                      { icon: "👤", label: "Hồ sơ cá nhân" },
                      { icon: "⚙", label: "Cài đặt tài khoản" },
                      { icon: "🔔", label: "Tùy chỉnh thông báo" },
                      null,
                      { icon: "🚪", label: "Đăng xuất", danger: true },
                    ].map((item, i) => (
                      item === null
                        ? <div key={i} style={{ height: 1, background: "#e8eef5", margin: "4px 0" }} />
                        : (
                          <button key={(item as { label: string }).label} onClick={() => setShowUser(false)} style={{
                            width: "100%", textAlign: "left", padding: "9px 16px",
                            background: "none", border: "none", cursor: "pointer",
                            fontSize: 13.5, color: (item as { danger?: boolean }).danger ? "#cf1322" : "#0f1b2d",
                            display: "flex", alignItems: "center", gap: 10, transition: "background 0.1s",
                          }}
                            onMouseEnter={e => e.currentTarget.style.background = (item as { danger?: boolean }).danger ? "#fff2f0" : "#f5f7fa"}
                            onMouseLeave={e => e.currentTarget.style.background = "none"}
                          >
                            <span>{(item as { icon: string }).icon}</span> {(item as { label: string }).label}
                          </button>
                        )
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* ---- PAGE CONTENT ---- */}
        <main style={{ flex: 1, overflowY: "auto", background: "#f0f4f8" }} className="thin-scroll">
          {renderPage()}
        </main>
      </div>

      {/* ======= COMMAND PALETTE ======= */}
      {showCmd && (
        <>
          <div style={{ position: "fixed", inset: 0, background: "rgba(15,27,45,0.6)", zIndex: 999, backdropFilter: "blur(4px)" }} onClick={() => setShowCmd(false)} />
          <div ref={cmdRef} style={{
            position: "fixed", top: "20%", left: "50%", transform: "translateX(-50%)",
            width: 560, background: "white", borderRadius: 14,
            boxShadow: "0 24px 60px rgba(0,0,0,0.25)", zIndex: 1000, overflow: "hidden",
          }}>
            <div style={{ padding: "14px 16px", borderBottom: "1px solid #e8eef5", display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 18, color: "#7a90a8" }}>🔍</span>
              <input
                autoFocus
                value={cmdQuery}
                onChange={e => setCmdQuery(e.target.value)}
                placeholder="Tìm trang, component, pattern..."
                style={{ flex: 1, border: "none", outline: "none", fontSize: 15, color: "#0f1b2d", background: "transparent" }}
              />
              <kbd onClick={() => setShowCmd(false)} style={{ fontSize: 12, color: "#7a90a8", border: "1px solid #d1dbe8", borderRadius: 5, padding: "2px 7px", cursor: "pointer" }}>Esc</kbd>
            </div>
            <div style={{ maxHeight: 340, overflowY: "auto" }} className="thin-scroll">
              {CMD_ITEMS.length === 0 ? (
                <div style={{ padding: "32px", textAlign: "center", color: "#7a90a8", fontSize: 14 }}>Không tìm thấy kết quả</div>
              ) : (
                CMD_ITEMS.map(item => (
                  <button key={item.label} onClick={() => { setActivePage(item.page); setShowCmd(false); setCmdQuery(""); }} style={{
                    width: "100%", textAlign: "left", padding: "12px 16px",
                    background: "none", border: "none", cursor: "pointer",
                    display: "flex", alignItems: "center", gap: 12, transition: "background 0.1s",
                    borderBottom: "1px solid #f0f4f8",
                  }}
                    onMouseEnter={e => e.currentTarget.style.background = "#f0f7ff"}
                    onMouseLeave={e => e.currentTarget.style.background = "none"}
                  >
                    <div style={{ width: 36, height: 36, borderRadius: 8, background: "#f0f4f8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{item.icon}</div>
                    <div style={{ fontSize: 14, color: "#0f1b2d", fontWeight: 500 }}>{item.label}</div>
                    <span style={{ marginLeft: "auto", fontSize: 12, color: "#b0bec8" }}>→</span>
                  </button>
                ))
              )}
            </div>
            <div style={{ padding: "10px 16px", background: "#f5f7fa", borderTop: "1px solid #e8eef5", display: "flex", gap: 16, fontSize: 11, color: "#b0bec8" }}>
              <span>↑↓ điều hướng</span>
              <span>↵ mở trang</span>
              <span>Esc đóng</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
