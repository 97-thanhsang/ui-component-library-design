import { useEffect, useRef, useState, type RefObject } from "react"
import Page00Cover from "./pages/Page00Cover"
import Page01Foundations from "./pages/Page01Foundations"
import Page02Icons from "./pages/Page02Icons"
import Page03Components from "./pages/Page03Components"
import Page04Tables from "./pages/Page04Tables"
import Page05Patterns from "./pages/Page05Patterns"
import Page06Templates from "./pages/Page06Templates"
import Page07Prototype from "./pages/Page07Prototype"
import Page08Docs from "./pages/Page08Docs"

const NAV_GROUPS = [
  {
    group: "Hệ thống",
    items: [{ id: "00", label: "Cover", icon: "⊞", sub: "Trang bìa" }],
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
      {
        id: "07",
        label: "Prototype Flows",
        icon: "▷",
        sub: "Interactive flows",
      },
      { id: "08", label: "Documentation", icon: "≡", sub: "API & guidelines" },
    ],
  },
]

const NOTIFS = [
  {
    id: "grade",
    title: "Bảng điểm IT302 đã được duyệt",
    time: "5 phút trước",
    read: false,
    color: "#52c41a",
  },
  {
    id: "requests",
    title: "3 đơn từ mới cần xét duyệt",
    time: "20 phút trước",
    read: false,
    color: "#fa8c16",
  },
  {
    id: "exam",
    title: "Kỳ thi cuối kỳ: còn 7 ngày",
    time: "2 giờ trước",
    read: true,
    color: "#1677ff",
  },
  {
    id: "absence",
    title: "Nguyễn Văn An: cảnh báo nghỉ học",
    time: "Hôm qua",
    read: true,
    color: "#ff4d4f",
  },
]

const CMD_ITEMS = [
  { label: "Trang chủ — Tổng quan", page: "06", icon: "⌂" },
  { label: "Foundations — Màu sắc, Typography", page: "01", icon: "◈" },
  { label: "Components — Buttons, Forms", page: "03", icon: "⬡" },
  { label: "Tables & Data — Bảng dữ liệu", page: "04", icon: "▤" },
  { label: "Patterns — Workflow enterprise", page: "05", icon: "◇" },
  { label: "Prototype Flows — Luồng tương tác", page: "07", icon: "▷" },
  { label: "Documentation — API & Guidelines", page: "08", icon: "≡" },
]

function focusRef(ref: RefObject<HTMLElement | null>) {
  window.requestAnimationFrame(() => ref.current?.focus())
}

function focusElement(element: HTMLElement | null) {
  window.requestAnimationFrame(() => element?.focus())
}

export default function App() {
  const [activePage, setActivePage] = useState("00")
  const [collapsed, setCollapsed] = useState(false)
  const [showDrawer, setShowDrawer] = useState(false)
  const [showNotifs, setShowNotifs] = useState(false)
  const [showUser, setShowUser] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showCmd, setShowCmd] = useState(false)
  const [cmdQuery, setCmdQuery] = useState("")
  const [notifData, setNotifData] = useState(NOTIFS)
  const [compactMode, setCompactMode] = useState(false)
  const [actionMessage, setActionMessage] = useState("")
  const drawerTriggerRef = useRef<HTMLButtonElement>(null)
  const cmdTriggerRef = useRef<HTMLButtonElement>(null)
  const notifTriggerRef = useRef<HTMLButtonElement>(null)
  const userTriggerRef = useRef<HTMLButtonElement>(null)
  const settingsTriggerRef = useRef<HTMLButtonElement>(null)
  const drawerCloseRef = useRef<HTMLButtonElement>(null)
  const cmdInputRef = useRef<HTMLInputElement>(null)
  const settingsCloseRef = useRef<HTMLButtonElement>(null)
  const overlayTriggerRef = useRef<HTMLElement | null>(null)

  const closeAll = (restoreFocus = false) => {
    setShowDrawer(false)
    setShowCmd(false)
    setShowNotifs(false)
    setShowUser(false)
    setShowSettings(false)
    setCmdQuery("")
    if (restoreFocus) focusElement(overlayTriggerRef.current)
  }

  const openDrawer = (trigger: HTMLElement) => {
    closeAll()
    overlayTriggerRef.current = trigger
    setShowDrawer(true)
  }
  const openCmd = () => {
    closeAll()
    overlayTriggerRef.current = cmdTriggerRef.current
    setShowCmd(true)
  }
  const openSettings = (trigger: HTMLElement) => {
    closeAll()
    overlayTriggerRef.current = trigger
    setShowSettings(true)
  }

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault()
        openCmd()
        return
      }
      if (event.key === "Escape") closeAll(true)
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [])

  useEffect(() => {
    if (showDrawer) focusRef(drawerCloseRef)
    if (showCmd) focusRef(cmdInputRef)
    if (showSettings) focusRef(settingsCloseRef)
  }, [showDrawer, showCmd, showSettings])

  const closeDrawer = () => closeAll(true)
  const closeCmd = () => closeAll(true)
  const closeNotifs = () => {
    setShowNotifs(false)
    focusRef(notifTriggerRef)
  }
  const closeUser = () => {
    setShowUser(false)
    focusRef(userTriggerRef)
  }
  const closeSettings = () => closeAll(true)
  const selectPage = (id: string) => {
    setActivePage(id)
    setShowDrawer(false)
  }

  const renderPage = () => {
    switch (activePage) {
      case "00":
        return <Page00Cover onNavigate={setActivePage} />
      case "01":
        return <Page01Foundations />
      case "02":
        return <Page02Icons />
      case "03":
        return <Page03Components />
      case "04":
        return <Page04Tables />
      case "05":
        return <Page05Patterns />
      case "06":
        return <Page06Templates />
      case "07":
        return <Page07Prototype />
      case "08":
        return <Page08Docs />
      default:
        return <Page00Cover onNavigate={setActivePage} />
    }
  }

  const pageTitle = NAV_GROUPS.flatMap((group) => group.items).find(
    (item) => item.id === activePage,
  )
  const commandItems = CMD_ITEMS.filter(
    (item) =>
      !cmdQuery || item.label.toLowerCase().includes(cmdQuery.toLowerCase()),
  )
  const unreadCount = notifData.filter(
    (notification) => !notification.read,
  ).length

  const navigation = (mobile = false) => (
    <nav aria-label="Điều hướng chính" className="app-nav thin-scroll">
      {NAV_GROUPS.map((group) => (
        <section
          key={group.group}
          className="nav-group"
          aria-label={group.group}
        >
          <h2 className="nav-group-title">{group.group}</h2>
          {group.items.map((item) => (
            <button
              type="button"
              key={item.id}
              className={`nav-item ${
                activePage === item.id ? "nav-item-active" : ""
              }`}
              onClick={() => selectPage(item.id)}
              aria-current={activePage === item.id ? "page" : undefined}
              title={collapsed && !mobile ? item.label : undefined}
            >
              <span className="nav-icon" aria-hidden="true">
                {item.icon}
              </span>
              <span className="nav-copy">
                <strong>{item.label}</strong>
                <small>{item.sub}</small>
              </span>
            </button>
          ))}
        </section>
      ))}
    </nav>
  )

  return (
    <div
      className={`app-shell ${collapsed ? "sidebar-collapsed" : ""} ${
        compactMode ? "compact-mode" : ""
      }`}
    >
      <a className="ems-sr-only ems-skip-link" href="#main-content">
        Chuyển đến nội dung chính
      </a>
      <style>{`
        .app-shell{--nav-width:228px;display:flex;height:100vh;overflow:hidden;background:#f0f4f8;font-family:'Be Vietnam Pro',sans-serif}.app-sidebar{width:var(--nav-width);display:flex;flex-direction:column;flex-shrink:0;background:#0f1b2d;color:#fff;border-right:1px solid rgba(255,255,255,.05);transition:width .22s cubic-bezier(.4,0,.2,1)}.sidebar-collapsed{--nav-width:56px}.brand{padding:14px 12px;display:flex;align-items:center;gap:10px;border-bottom:1px solid rgba(255,255,255,.07)}.brand-mark{width:34px;height:34px;display:grid;place-items:center;border-radius:9px;background:linear-gradient(135deg,#1677ff,#4096ff);font-weight:800;box-shadow:0 2px 8px rgba(22,119,255,.4)}.brand-copy strong{display:block;font-size:14.5px}.brand-copy small,.nav-copy small{display:block;color:#5a769f;font-size:10.5px}.sidebar-search{margin:10px 10px 0}.app-nav{flex:1;padding:8px;overflow:auto}.nav-group{margin-bottom:4px}.nav-group-title{padding:8px 6px 4px;margin:0;color:#3c5c8c;font-size:10px;font-weight:700;letter-spacing:.08em;text-transform:uppercase}.nav-item{width:100%;display:flex;align-items:center;gap:10px;padding:8px 10px;margin-bottom:2px;border:0;border-left:2px solid transparent;border-radius:7px;background:transparent;color:#8aacca;text-align:left;cursor:pointer}.nav-item:hover{background:rgba(255,255,255,.06)}.nav-item-active{background:rgba(22,119,255,.18);border-left-color:#1677ff;color:#fff}.nav-icon{font-size:15px;color:#5a769f}.nav-item-active .nav-icon{color:#4096ff}.nav-copy strong{display:block;font-size:13px;font-weight:500;white-space:nowrap}.nav-item-active .nav-copy strong{font-weight:600}.sidebar-footer{padding:10px 8px;border-top:1px solid rgba(255,255,255,.06)}.sidebar-collapse{width:100%}.sidebar-collapsed .brand-copy,.sidebar-collapsed .sidebar-search,.sidebar-collapsed .nav-copy,.sidebar-collapsed .nav-group-title,.sidebar-collapsed .sidebar-collapse span{display:none}.sidebar-collapsed .nav-item{justify-content:center;padding:9px 11px}.app-main{display:flex;min-width:0;flex:1;flex-direction:column;overflow:hidden}.app-header{height:52px;display:flex;align-items:center;gap:16px;padding:0 20px;background:#fff;border-bottom:1px solid #e8eef5;box-shadow:0 1px 3px rgba(0,0,0,.04);flex-shrink:0}.breadcrumb{min-width:0;display:flex;gap:8px;align-items:center;flex:1;color:#b0bec8;font-size:12px}.breadcrumb strong{overflow:hidden;color:#0f1b2d;font-size:13.5px;white-space:nowrap;text-overflow:ellipsis}.header-actions{display:flex;align-items:center;gap:6px}.header-search,.icon-button,.user-button,.sidebar-collapse{border:1px solid #e8eef5;background:#fff;color:#7a90a8;border-radius:8px;cursor:pointer}.header-search{display:flex;align-items:center;gap:8px;padding:6px 12px;font-size:13px}.icon-button{width:36px;height:36px;font-size:17px}.user-button{display:flex;align-items:center;gap:8px;padding:4px 8px 4px 4px}.avatar{width:28px;height:28px;display:grid;place-items:center;border-radius:50%;background:linear-gradient(135deg,#1677ff,#722ed1);color:#fff;font-size:10px;font-weight:700}.user-copy{text-align:left}.user-copy strong,.user-copy small{display:block}.user-copy strong{font-size:12.5px;color:#0f1b2d}.user-copy small{font-size:10.5px}.badge{position:absolute;top:2px;right:2px;min-width:16px;height:16px;display:grid;place-items:center;border:2px solid #fff;border-radius:50%;background:#ff4d4f;color:#fff;font-size:9px;font-weight:700}.relative{position:relative}.page-content{flex:1;overflow-y:auto;background:#f0f4f8}.overlay-backdrop{position:fixed;inset:0;z-index:100;background:rgba(15,27,45,.6);backdrop-filter:blur(4px);border:0;cursor:default}.drawer{position:fixed;z-index:101;inset:0 auto 0 0;width:min(300px,88vw);display:flex;flex-direction:column;background:#0f1b2d;box-shadow:8px 0 28px rgba(0,0,0,.28)}.drawer-header{display:flex;justify-content:space-between;align-items:center;padding:12px;border-bottom:1px solid rgba(255,255,255,.07)}.drawer-header .icon-button{background:transparent;border-color:rgba(255,255,255,.16);color:#fff}.menu-popover{position:absolute;z-index:102;top:calc(100% + 8px);right:0;width:min(320px,calc(100vw - 24px));background:#fff;border:1px solid #d1dbe8;border-radius:10px;box-shadow:0 6px 24px rgba(0,0,0,.12);overflow:hidden}.popover-heading{padding:12px 16px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #e8eef5;font-size:14px;color:#0f1b2d}.text-button{padding:0;border:0;background:none;color:#1677ff;cursor:pointer;font-size:12px}.notification-item,.menu-item{width:100%;display:flex;gap:10px;padding:12px 16px;border:0;border-bottom:1px solid #f0f4f8;background:#fff;color:#0f1b2d;text-align:left;cursor:pointer}.notification-item[aria-pressed='false']{background:#f5f9ff}.notification-dot{width:8px;height:8px;margin-top:5px;border-radius:50%;flex-shrink:0}.notification-item small{display:block;margin-top:2px;color:#b0bec8}.menu-item{padding:9px 16px;font-size:13.5px}.menu-item:hover,.notification-item:hover{background:#f0f7ff}.menu-item-danger{color:#cf1322}.modal{position:fixed;z-index:101;top:20%;left:50%;width:min(560px,calc(100vw - 24px));transform:translateX(-50%);background:#fff;border-radius:14px;box-shadow:0 24px 60px rgba(0,0,0,.25);overflow:hidden}.modal-head{display:flex;align-items:center;gap:10px;padding:14px 16px;border-bottom:1px solid #e8eef5}.modal-head input{min-width:0;flex:1;border:0;outline:0;color:#0f1b2d;font-size:15px}.modal-close{padding:3px 7px}.command-results{max-height:340px;overflow:auto}.command-item{width:100%;display:flex;align-items:center;gap:12px;padding:12px 16px;border:0;border-bottom:1px solid #f0f4f8;background:#fff;text-align:left;cursor:pointer}.command-item:hover{background:#f0f7ff}.command-symbol{width:36px;height:36px;display:grid;place-items:center;flex-shrink:0;border-radius:8px;background:#f0f4f8;font-size:18px}.modal-foot{padding:10px 16px;background:#f5f7fa;color:#7a90a8;font-size:11px}.settings-body{padding:16px;color:#0f1b2d}.setting-row{display:flex;justify-content:space-between;align-items:center;gap:12px;padding:12px 0;border-top:1px solid #e8eef5}.setting-row small{display:block;color:#7a90a8}.mobile-trigger{display:none}.compact-mode .page-content{font-size:.94em}@media (max-width:767px){.app-sidebar{display:none}.mobile-trigger{display:inline-grid}.app-header{padding:0 10px;gap:8px}.breadcrumb span:first-child,.header-search span:not(:first-child),.header-search kbd,.user-copy,.user-button>span:last-child{display:none}.header-search{padding:8px}.header-actions{gap:4px}.user-button{padding:4px}.modal{top:12%}}@media (max-width:420px){.breadcrumb strong{font-size:12px}.header-search{display:none}.icon-button{width:34px;height:34px}.app-header{height:50px}.modal{top:8%}}
      `}</style>
      <aside className="app-sidebar" aria-label="Thanh điều hướng desktop">
        <div className="brand">
          <span className="brand-mark" aria-hidden="true">
            A
          </span>
          <div className="brand-copy">
            <strong>ASC.EMS</strong>
            <small>Design System v2.0</small>
          </div>
        </div>
        <div className="sidebar-search">
          <button
            type="button"
            className="header-search"
            onClick={openCmd}
            aria-haspopup="dialog"
          >
            <span aria-hidden="true">⌕</span>
            <span>Tìm kiếm...</span>
            <kbd>⌘K</kbd>
          </button>
        </div>
        {navigation()}
        <div className="sidebar-footer">
          <button
            type="button"
            className="sidebar-collapse"
            onClick={() => setCollapsed((value) => !value)}
            aria-label={
              collapsed
                ? "Mở rộng thanh điều hướng"
                : "Thu gọn thanh điều hướng"
            }
          >
            {collapsed ? "›" : "‹"} <span>Thu gọn</span>
          </button>
        </div>
      </aside>
      <div className="app-main">
        <header className="app-header">
          <button
            ref={drawerTriggerRef}
            type="button"
            className="icon-button mobile-trigger"
            onClick={(event) => openDrawer(event.currentTarget)}
            aria-label="Mở điều hướng"
            aria-haspopup="dialog"
            aria-expanded={showDrawer}
          >
            ☰
          </button>
          <div className="breadcrumb">
            <span>ASC.EMS</span>
            <span aria-hidden="true">›</span>
            {pageTitle && (
              <strong>
                {pageTitle.id} {pageTitle.label}
              </strong>
            )}
          </div>
          <button
            ref={cmdTriggerRef}
            type="button"
            className="header-search"
            onClick={openCmd}
            aria-label="Mở tìm kiếm lệnh"
            aria-haspopup="dialog"
          >
            <span aria-hidden="true">⌕</span>
            <span>Tìm kiếm...</span>
            <kbd>⌘K</kbd>
          </button>
          <div className="header-actions">
            <div className="relative">
              <button
                ref={notifTriggerRef}
                type="button"
                className="icon-button"
                onClick={() => {
                  const next = !showNotifs
                  closeAll()
                  setShowNotifs(next)
                }}
                aria-label={`Thông báo, ${unreadCount} chưa đọc`}
                aria-haspopup="menu"
                aria-expanded={showNotifs}
              >
                ♧
                {unreadCount > 0 && (
                  <span className="badge">{unreadCount}</span>
                )}
              </button>
              {showNotifs && (
                <>
                  <button
                    type="button"
                    className="overlay-backdrop"
                    aria-label="Đóng thông báo"
                    onClick={closeNotifs}
                  />
                  <section
                    className="menu-popover"
                    role="menu"
                    aria-label="Thông báo"
                  >
                    <div className="popover-heading">
                      <strong>Thông báo</strong>
                      <button
                        type="button"
                        className="text-button"
                        onClick={() =>
                          setNotifData((items) =>
                            items.map((item) => ({ ...item, read: true })),
                          )
                        }
                      >
                        Đánh dấu đã đọc
                      </button>
                    </div>
                    {notifData.map((item) => (
                      <button
                        type="button"
                        role="menuitem"
                        className="notification-item"
                        aria-pressed={item.read}
                        key={item.id}
                        onClick={() =>
                          setNotifData((items) =>
                            items.map((entry) =>
                              entry.id === item.id
                                ? { ...entry, read: true }
                                : entry,
                            ),
                          )
                        }
                      >
                        <span
                          className="notification-dot"
                          style={{
                            background: item.read ? "#d1dbe8" : item.color,
                          }}
                        />
                        <span>
                          <strong>{item.title}</strong>
                          <small>{item.time}</small>
                        </span>
                      </button>
                    ))}
                    <div className="popover-heading">
                      <button
                        type="button"
                        className="text-button"
                        onClick={() => {
                          setActionMessage(
                            "Đang hiển thị thông báo trong phiên này.",
                          )
                          closeNotifs()
                        }}
                      >
                        Xem tất cả thông báo
                      </button>
                    </div>
                  </section>
                </>
              )}
            </div>
            <button
              ref={settingsTriggerRef}
              type="button"
              className="icon-button"
              onClick={(event) => openSettings(event.currentTarget)}
              aria-label="Mở cài đặt hiển thị"
              aria-haspopup="dialog"
            >
              ⚙
            </button>
            <div className="relative">
              <button
                ref={userTriggerRef}
                type="button"
                className="user-button"
                onClick={() => {
                  const next = !showUser
                  closeAll()
                  setShowUser(next)
                }}
                aria-label="Mở menu người dùng của Nguyễn Thị Lan"
                aria-haspopup="menu"
                aria-expanded={showUser}
              >
                <span className="avatar" aria-hidden="true">
                  LAN
                </span>
                <span className="user-copy">
                  <strong>Nguyễn Thị Lan</strong>
                  <small>Trưởng khoa</small>
                </span>
                <span aria-hidden="true">▾</span>
              </button>
              {showUser && (
                <>
                  <button
                    type="button"
                    className="overlay-backdrop"
                    aria-label="Đóng menu người dùng"
                    onClick={closeUser}
                  />
                  <section
                    className="menu-popover"
                    role="menu"
                    aria-label="Menu người dùng"
                  >
                    <div className="popover-heading">
                      <span>
                        <strong>Nguyễn Thị Lan</strong>
                        <small>lan.nguyen@asc.edu.vn</small>
                      </span>
                    </div>
                    {[
                      "Hồ sơ cá nhân",
                      "Cài đặt tài khoản",
                      "Tùy chỉnh thông báo",
                    ].map((label) => (
                      <button
                        type="button"
                        role="menuitem"
                        className="menu-item"
                        key={label}
                        onClick={() => {
                          setActionMessage(`${label} được mở trong phiên này.`)
                          closeUser()
                        }}
                      >
                        {label}
                      </button>
                    ))}
                    <button
                      type="button"
                      role="menuitem"
                      className="menu-item menu-item-danger"
                      onClick={() => {
                        setActionMessage(
                          "Đăng xuất là thao tác mô phỏng cục bộ.",
                        )
                        closeUser()
                      }}
                    >
                      Đăng xuất
                    </button>
                  </section>
                </>
              )}
            </div>
          </div>
        </header>
        <main
          id="main-content"
          className="page-content thin-scroll"
          tabIndex={-1}
        >
          {actionMessage && (
            <div
              role="status"
              style={{
                padding: "10px 20px",
                background: "#e6f4ff",
                color: "#0958d9",
                fontSize: 13,
              }}
            >
              {actionMessage}
            </div>
          )}
          {renderPage()}
        </main>
      </div>
      {showDrawer && (
        <>
          <button
            type="button"
            className="overlay-backdrop"
            aria-label="Đóng điều hướng"
            onClick={closeDrawer}
          />
          <aside
            className="drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Điều hướng"
          >
            <div className="drawer-header">
              <div className="brand">
                <span className="brand-mark" aria-hidden="true">
                  A
                </span>
                <div className="brand-copy">
                  <strong>ASC.EMS</strong>
                  <small>Design System v2.0</small>
                </div>
              </div>
              <button
                ref={drawerCloseRef}
                type="button"
                className="icon-button"
                onClick={closeDrawer}
                aria-label="Đóng điều hướng"
              >
                ×
              </button>
            </div>
            <div className="sidebar-search">
              <button
                type="button"
                className="header-search"
                onClick={openCmd}
                aria-label="Mở tìm kiếm lệnh"
              >
                <span aria-hidden="true">⌕</span>
                <span>Tìm kiếm...</span>
              </button>
            </div>
            {navigation(true)}
          </aside>
        </>
      )}
      {showCmd && (
        <>
          <button
            type="button"
            className="overlay-backdrop"
            aria-label="Đóng bảng lệnh"
            onClick={closeCmd}
          />
          <section
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-label="Tìm kiếm lệnh"
            aria-labelledby="command-title"
          >
            <div className="modal-head">
              <span aria-hidden="true">⌕</span>
              <label
                id="command-title"
                htmlFor="command-search"
                className="sr-only"
              >
                Tìm kiếm lệnh
              </label>
              <input
                ref={cmdInputRef}
                id="command-search"
                value={cmdQuery}
                onChange={(event) => setCmdQuery(event.target.value)}
                placeholder="Tìm trang, component, pattern..."
              />
              <button
                type="button"
                className="icon-button modal-close"
                onClick={closeCmd}
                aria-label="Đóng bảng lệnh"
              >
                ×
              </button>
            </div>
            <div className="command-results thin-scroll">
              {commandItems.length === 0 ? (
                <p
                  style={{ padding: 32, textAlign: "center", color: "#7a90a8" }}
                >
                  Không tìm thấy kết quả
                </p>
              ) : (
                commandItems.map((item) => (
                  <button
                    type="button"
                    className="command-item"
                    key={item.label}
                    onClick={() => {
                      selectPage(item.page)
                      closeCmd()
                    }}
                  >
                    <span className="command-symbol" aria-hidden="true">
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                    <span
                      style={{ marginLeft: "auto", color: "#b0bec8" }}
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </button>
                ))
              )}
            </div>
            <div className="modal-foot">Esc đóng · Enter mở trang</div>
          </section>
        </>
      )}
      {showSettings && (
        <>
          <button
            type="button"
            className="overlay-backdrop"
            aria-label="Đóng cài đặt"
            onClick={closeSettings}
          />
          <section
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="settings-title"
          >
            <div className="modal-head">
              <strong id="settings-title">Cài đặt hiển thị</strong>
              <button
                ref={settingsCloseRef}
                type="button"
                className="icon-button modal-close"
                onClick={closeSettings}
                aria-label="Đóng cài đặt"
              >
                ×
              </button>
            </div>
            <div className="settings-body">
              <p>Những thay đổi này chỉ áp dụng cho phiên hiện tại.</p>
              <label className="setting-row">
                <span>
                  <strong>Mật độ gọn</strong>
                  <small>Thu gọn khoảng cách trong nội dung.</small>
                </span>
                <input
                  type="checkbox"
                  checked={compactMode}
                  onChange={(event) => setCompactMode(event.target.checked)}
                />
              </label>
              <button
                type="button"
                className="header-search"
                onClick={() => {
                  setActionMessage("Cài đặt cục bộ đã được áp dụng.")
                  closeSettings()
                }}
              >
                Áp dụng cài đặt
              </button>
            </div>
          </section>
        </>
      )}
    </div>
  )
}
