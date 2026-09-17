import { useState } from "react"

const TABS = ["Dashboard", "Danh sách", "Chi tiết", "Báo cáo", "Import/Export"]

function DashboardTemplate() {
  const stats = [
    {
      label: "Tổng sinh viên",
      val: "4,821",
      delta: "+124",
      pos: true,
      icon: "👥",
      color: "#1677ff",
      bg: "#e6f4ff",
    },
    {
      label: "Học phần mở",
      val: "186",
      delta: "+12",
      pos: true,
      icon: "📚",
      color: "#722ed1",
      bg: "#f9f0ff",
    },
    {
      label: "Điểm TB toàn trường",
      val: "7.42",
      delta: "-0.08",
      pos: false,
      icon: "📊",
      color: "#52c41a",
      bg: "#f6ffed",
    },
    {
      label: "Tỷ lệ chuyên cần",
      val: "87.3%",
      delta: "-1.2%",
      pos: false,
      icon: "✅",
      color: "#fa8c16",
      bg: "#fff7e6",
    },
  ]

  const recentActions = [
    {
      name: "Nguyễn Thị Lan",
      action: "đã công bố điểm IT302",
      time: "5 phút trước",
      dot: "#52c41a",
    },
    {
      name: "Trần Văn Nam",
      action: "nộp đơn bảo lưu học kỳ",
      time: "23 phút trước",
      dot: "#1677ff",
    },
    {
      name: "Hệ thống",
      action: "gửi nhắc nhở nộp bài 42 SV",
      time: "1 giờ trước",
      dot: "#fa8c16",
    },
    {
      name: "Lê Minh Hải",
      action: "cập nhật thời khóa biểu IT303",
      time: "2 giờ trước",
      dot: "#722ed1",
    },
    {
      name: "Admin",
      action: "khóa tài khoản SV2021005",
      time: "3 giờ trước",
      dot: "#ff4d4f",
    },
  ]

  const topCourses = [
    { code: "IT302", name: "Lập trình Web", enrolled: 42, completion: 92 },
    { code: "IT303", name: "Cơ sở dữ liệu", enrolled: 38, completion: 87 },
    { code: "IT401", name: "Trí tuệ nhân tạo", enrolled: 35, completion: 78 },
    { code: "KT201", name: "Kinh tế vi mô", enrolled: 55, completion: 94 },
    {
      code: "ENG201",
      name: "Tiếng Anh chuyên ngành",
      enrolled: 60,
      completion: 91,
    },
  ]

  return (
    <div>
      {/* Top bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <div>
          <h2
            style={{
              margin: 0,
              fontSize: 20,
              fontWeight: 800,
              color: "#0f1b2d",
            }}
          >
            Tổng quan hệ thống
          </h2>
          <p style={{ margin: 0, fontSize: 13, color: "#7a90a8" }}>
            Học kỳ 1 — 2024–2025 • Cập nhật lúc 14:35
          </p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <select
            id="dashboard-semester"
            aria-label="Chọn học kỳ"
            className="ems-select"
            style={{ width: 160 }}
          >
            <option>HK1 — 2024–2025</option>
          </select>
          <button className="ems-btn ems-btn-secondary ems-btn-sm">
            ↻ Làm mới
          </button>
          <button className="ems-btn ems-btn-primary ems-btn-sm">
            ⬇ Báo cáo
          </button>
        </div>
      </div>

      {/* Stats grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: 16,
          marginBottom: 20,
        }}
      >
        {stats.map((s) => (
          <div key={s.label} className="ems-stat-card">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 12,
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  background: s.bg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 20,
                }}
              >
                {s.icon}
              </div>
              <span
                style={{
                  fontSize: 12,
                  color: s.pos ? "#389e0d" : "#cf1322",
                  fontWeight: 600,
                }}
              >
                {s.pos ? "↑" : "↓"} {s.delta}
              </span>
            </div>
            <div
              style={{
                fontSize: 28,
                fontWeight: 800,
                color: "#0f1b2d",
                marginBottom: 4,
              }}
            >
              {s.val}
            </div>
            <div style={{ fontSize: 13, color: "#7a90a8" }}>{s.label}</div>
            <div className="ems-progress-bar" style={{ marginTop: 10 }}>
              <div
                className="ems-progress-fill"
                style={{ width: "65%", background: s.color }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: 16,
          marginBottom: 20,
        }}
      >
        {/* Bar chart placeholder */}
        <div className="ems-card">
          <div className="ems-card-header">
            <span style={{ fontWeight: 700, fontSize: 14 }}>
              Thống kê điểm theo khoa
            </span>
            <div style={{ display: "flex", gap: 4 }}>
              <button className="ems-btn ems-btn-ghost ems-btn-xs">GPA</button>
              <button className="ems-btn ems-btn-primary ems-btn-xs">
                Tín chỉ
              </button>
            </div>
          </div>
          <div className="ems-card-body">
            {[
              { label: "CNTT", val: 78, color: "#1677ff" },
              { label: "Kinh tế", val: 64, color: "#722ed1" },
              { label: "Ngoại ngữ", val: 55, color: "#52c41a" },
              { label: "Tài chính", val: 45, color: "#fa8c16" },
              { label: "Kỹ thuật", val: 39, color: "#ff4d4f" },
            ].map((bar) => (
              <div
                key={bar.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 10,
                }}
              >
                <div
                  style={{
                    width: 72,
                    fontSize: 13,
                    color: "#4a5e78",
                    textAlign: "right",
                  }}
                >
                  {bar.label}
                </div>
                <div
                  style={{
                    flex: 1,
                    height: 24,
                    background: "#f0f4f8",
                    borderRadius: 4,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${bar.val}%`,
                      background: bar.color,
                      borderRadius: 4,
                      display: "flex",
                      alignItems: "center",
                      paddingLeft: 8,
                    }}
                  >
                    <span
                      style={{ fontSize: 11, color: "white", fontWeight: 600 }}
                    >
                      {bar.val}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Donut placeholder */}
        <div className="ems-card">
          <div className="ems-card-header">
            <span style={{ fontWeight: 700, fontSize: 14 }}>
              Trạng thái sinh viên
            </span>
          </div>
          <div className="ems-card-body">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: "50%",
                  background:
                    "conic-gradient(#52c41a 0% 68%, #fa8c16 68% 82%, #ff4d4f 82% 88%, #b0bec8 88% 100%)",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: "20%",
                    borderRadius: "50%",
                    background: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div style={{ textAlign: "center" }}>
                    <div
                      style={{
                        fontSize: 20,
                        fontWeight: 800,
                        color: "#0f1b2d",
                      }}
                    >
                      4,821
                    </div>
                    <div style={{ fontSize: 10, color: "#7a90a8" }}>Tổng</div>
                  </div>
                </div>
              </div>
            </div>
            {[
              { label: "Đang học", count: 3278, color: "#52c41a" },
              { label: "Cảnh báo", count: 679, color: "#fa8c16" },
              { label: "Đình chỉ", count: 289, color: "#ff4d4f" },
              { label: "Bảo lưu", count: 575, color: "#b0bec8" },
            ].map((d) => (
              <div
                key={d.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 8,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: 2,
                      background: d.color,
                    }}
                  />
                  <span style={{ fontSize: 13, color: "#4a5e78" }}>
                    {d.label}
                  </span>
                </div>
                <span
                  style={{ fontSize: 13, fontWeight: 600, color: "#0f1b2d" }}
                >
                  {d.count.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {/* Top courses */}
        <div className="ems-card">
          <div className="ems-card-header">
            <span style={{ fontWeight: 700, fontSize: 14 }}>
              Học phần được đăng ký nhiều
            </span>
            <button className="ems-btn ems-btn-ghost ems-btn-xs">
              Xem tất cả →
            </button>
          </div>
          <div>
            {topCourses.map((c, i) => (
              <div
                key={c.code}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "10px 16px",
                  borderBottom:
                    i < topCourses.length - 1 ? "1px solid #e8eef5" : "none",
                }}
              >
                <div
                  style={{
                    fontSize: 12,
                    color: "#b0bec8",
                    width: 16,
                    textAlign: "center",
                  }}
                >
                  {i + 1}
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{ fontSize: 13, fontWeight: 600, color: "#0f1b2d" }}
                  >
                    {c.code} — {c.name}
                  </div>
                  <div style={{ fontSize: 11, color: "#7a90a8" }}>
                    {c.enrolled} sinh viên
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: c.completion >= 90 ? "#389e0d" : "#d46b08",
                    }}
                  >
                    {c.completion}%
                  </div>
                  <div style={{ fontSize: 11, color: "#b0bec8" }}>
                    hoàn thành
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent activity */}
        <div className="ems-card">
          <div className="ems-card-header">
            <span style={{ fontWeight: 700, fontSize: 14 }}>
              Hoạt động gần đây
            </span>
            <button className="ems-btn ems-btn-ghost ems-btn-xs">
              Xem tất cả →
            </button>
          </div>
          <div className="ems-card-body">
            {recentActions.map((a) => (
              <div key={a.action} className="timeline-item">
                <div
                  className="timeline-dot"
                  style={{
                    width: 28,
                    height: 28,
                    background: a.dot + "22",
                    border: `1.5px solid ${a.dot}`,
                  }}
                >
                  <span style={{ fontSize: 11 }}>●</span>
                </div>
                <div>
                  <div style={{ fontSize: 13, color: "#0f1b2d" }}>
                    <strong>{a.name}</strong> {a.action}
                  </div>
                  <div style={{ fontSize: 11, color: "#b0bec8", marginTop: 2 }}>
                    {a.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function ListTemplate() {
  const [viewMode, setViewMode] = useState<"list" | "card">("list")
  const courses = [
    {
      code: "IT302",
      name: "Lập trình Web",
      credits: 3,
      teacher: "Nguyễn Thị Lan",
      dept: "CNTT",
      enrolled: 42,
      max: 50,
      status: "Đang mở",
      semester: "HK1-2024",
    },
    {
      code: "IT303",
      name: "Cơ sở dữ liệu nâng cao",
      credits: 3,
      teacher: "Lê Minh Hải",
      dept: "CNTT",
      enrolled: 38,
      max: 45,
      status: "Đang mở",
      semester: "HK1-2024",
    },
    {
      code: "IT401",
      name: "Trí tuệ nhân tạo và ML",
      credits: 4,
      teacher: "Trần Văn Khoa",
      dept: "CNTT",
      enrolled: 35,
      max: 40,
      status: "Gần đầy",
      semester: "HK1-2024",
    },
    {
      code: "KT201",
      name: "Kinh tế vi mô đại cương",
      credits: 2,
      teacher: "Hoàng Văn Sơn",
      dept: "Kinh tế",
      enrolled: 55,
      max: 60,
      status: "Đang mở",
      semester: "HK1-2024",
    },
    {
      code: "ENG201",
      name: "Tiếng Anh chuyên ngành IT",
      credits: 2,
      teacher: "Hoàng Thu Hà",
      dept: "Ngoại ngữ",
      enrolled: 60,
      max: 60,
      status: "Đã đầy",
      semester: "HK1-2024",
    },
    {
      code: "TC301",
      name: "Kế toán doanh nghiệp",
      credits: 3,
      teacher: "Bùi Thị Tâm",
      dept: "Tài chính",
      enrolled: 28,
      max: 50,
      status: "Đang mở",
      semester: "HK1-2024",
    },
  ]

  const statusCls: Record<string, string> = {
    "Đang mở": "ems-badge-green",
    "Gần đầy": "ems-badge-orange",
    "Đã đầy": "ems-badge-red",
  }

  return (
    <div>
      {/* List/detail layout header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <div>
          <h2
            style={{
              margin: 0,
              fontSize: 20,
              fontWeight: 800,
              color: "#0f1b2d",
            }}
          >
            Quản lý học phần
          </h2>
          <nav className="ems-breadcrumb" style={{ marginTop: 4 }}>
            <a href="#">Trang chủ</a>
            <span className="sep">›</span>
            <a href="#">Quản lý học vụ</a>
            <span className="sep">›</span>
            <span className="current">Học phần</span>
          </nav>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <button
            className="ems-btn ems-btn-secondary ems-btn-sm"
            onClick={() => setViewMode((v) => (v === "list" ? "card" : "list"))}
          >
            {viewMode === "list" ? "⊞ Thẻ" : "≡ Danh sách"}
          </button>
          <button className="ems-btn ems-btn-secondary ems-btn-sm">
            ⬇ Xuất
          </button>
          <button className="ems-btn ems-btn-primary ems-btn-sm">
            ＋ Thêm học phần
          </button>
        </div>
      </div>

      {/* Search row */}
      <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
        <div style={{ position: "relative", flex: 1 }}>
          <span
            style={{
              position: "absolute",
              left: 10,
              top: "50%",
              transform: "translateY(-50%)",
              color: "#7a90a8",
            }}
          >
            🔍
          </span>
          <input
            id="course-search"
            aria-label="Tìm học phần"
            className="ems-input"
            style={{ paddingLeft: 32 }}
            placeholder="Tìm theo mã, tên học phần, giảng viên..."
          />
        </div>
        <select
          id="course-department"
          aria-label="Lọc theo khoa"
          className="ems-select"
          style={{ width: 120 }}
        >
          <option>Tất cả khoa</option>
          <option>CNTT</option>
          <option>Kinh tế</option>
          <option>Ngoại ngữ</option>
        </select>
        <select
          id="course-status"
          aria-label="Lọc theo trạng thái"
          className="ems-select"
          style={{ width: 130 }}
        >
          <option>Tất cả trạng thái</option>
          <option>Đang mở</option>
          <option>Gần đầy</option>
          <option>Đã đầy</option>
        </select>
      </div>

      {viewMode === "list" ? (
        <div className="ems-card" style={{ overflow: "hidden" }}>
          <table className="ems-table">
            <thead>
              <tr>
                <th>Mã HP</th>
                <th>Tên học phần</th>
                <th>Tín chỉ</th>
                <th>Giảng viên</th>
                <th>Khoa</th>
                <th>Số SV</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((c) => (
                <tr key={c.code}>
                  <td>
                    <span
                      style={{
                        fontFamily: "JetBrains Mono,monospace",
                        fontSize: 12,
                        color: "#1677ff",
                        fontWeight: 600,
                      }}
                    >
                      {c.code}
                    </span>
                  </td>
                  <td style={{ fontWeight: 500 }}>{c.name}</td>
                  <td style={{ textAlign: "center" }}>
                    <span style={{ fontWeight: 600 }}>{c.credits}</span> TC
                  </td>
                  <td>{c.teacher}</td>
                  <td>
                    <span
                      className="ems-tag"
                      style={{
                        background: "#f5f7fa",
                        color: "#4a5e78",
                        border: "1px solid #e8eef5",
                      }}
                    >
                      {c.dept}
                    </span>
                  </td>
                  <td>
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 6 }}
                    >
                      <span style={{ fontSize: 13, fontWeight: 500 }}>
                        {c.enrolled}/{c.max}
                      </span>
                      <div
                        style={{
                          width: 40,
                          height: 4,
                          background: "#e8eef5",
                          borderRadius: 2,
                        }}
                      >
                        <div
                          style={{
                            width: `${(c.enrolled / c.max) * 100}%`,
                            height: "100%",
                            background:
                              c.enrolled === c.max
                                ? "#ff4d4f"
                                : c.enrolled / c.max > 0.8
                                  ? "#fa8c16"
                                  : "#52c41a",
                            borderRadius: 2,
                          }}
                        />
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={`ems-badge ${statusCls[c.status]}`}>
                      {c.status}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: 4 }}>
                      <button className="ems-btn ems-btn-ghost ems-btn-xs">
                        👁
                      </button>
                      <button className="ems-btn ems-btn-ghost ems-btn-xs">
                        ✎
                      </button>
                      <button className="ems-btn ems-btn-ghost ems-btn-xs">
                        ⋯
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: 16,
          }}
        >
          {courses.map((c) => (
            <div
              key={c.code}
              className="ems-card"
              style={{ cursor: "pointer", transition: "all 0.15s" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.1)")
              }
              onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "")}
            >
              <div className="ems-card-header">
                <div>
                  <div
                    style={{
                      fontSize: 12,
                      color: "#1677ff",
                      fontWeight: 700,
                      fontFamily: "JetBrains Mono,monospace",
                    }}
                  >
                    {c.code}
                  </div>
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: "#0f1b2d",
                      marginTop: 2,
                    }}
                  >
                    {c.name}
                  </div>
                </div>
                <span className={`ems-badge ${statusCls[c.status]}`}>
                  {c.status}
                </span>
              </div>
              <div className="ems-card-body">
                <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
                  <span className="ems-badge ems-badge-blue">
                    {c.credits} TC
                  </span>
                  <span className="ems-badge ems-badge-gray">{c.dept}</span>
                </div>
                <div
                  style={{ fontSize: 13, color: "#4a5e78", marginBottom: 4 }}
                >
                  👤 {c.teacher}
                </div>
                <div
                  style={{ fontSize: 13, color: "#4a5e78", marginBottom: 10 }}
                >
                  📅 {c.semester}
                </div>
                <div
                  style={{ fontSize: 12, color: "#7a90a8", marginBottom: 4 }}
                >
                  {c.enrolled}/{c.max} sinh viên
                </div>
                <div className="ems-progress-bar">
                  <div
                    className="ems-progress-fill"
                    style={{
                      width: `${(c.enrolled / c.max) * 100}%`,
                      background:
                        c.enrolled === c.max
                          ? "#ff4d4f"
                          : c.enrolled / c.max > 0.8
                            ? "#fa8c16"
                            : "#1677ff",
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function DetailTemplate() {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <div>
      {/* Header with actions */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 20,
        }}
      >
        <div>
          <nav className="ems-breadcrumb" style={{ marginBottom: 6 }}>
            <a href="#">Trang chủ</a>
            <span className="sep">›</span>
            <a href="#">Sinh viên</a>
            <span className="sep">›</span>
            <span className="current">Nguyễn Văn An</span>
          </nav>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              className="ems-avatar"
              style={{ width: 56, height: 56, fontSize: 20 }}
            >
              AN
            </div>
            <div>
              <h2
                style={{
                  margin: 0,
                  fontSize: 22,
                  fontWeight: 800,
                  color: "#0f1b2d",
                }}
              >
                Nguyễn Văn An
              </h2>
              <div
                style={{
                  display: "flex",
                  gap: 8,
                  alignItems: "center",
                  marginTop: 4,
                }}
              >
                <span
                  style={{
                    fontSize: 13,
                    color: "#7a90a8",
                    fontFamily: "JetBrains Mono,monospace",
                  }}
                >
                  SV2021001
                </span>
                <span style={{ color: "#d1dbe8" }}>•</span>
                <span style={{ fontSize: 13, color: "#7a90a8" }}>
                  Khoa CNTT
                </span>
                <span className="ems-badge ems-badge-green">● Đang học</span>
              </div>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="ems-btn ems-btn-secondary ems-btn-sm">
            ✉ Gửi email
          </button>
          <button className="ems-btn ems-btn-secondary ems-btn-sm">
            📄 Xuất hồ sơ
          </button>
          <button className="ems-btn ems-btn-primary ems-btn-sm">
            ✎ Chỉnh sửa
          </button>
        </div>
      </div>

      {/* Quick stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: 12,
          marginBottom: 20,
        }}
      >
        {[
          { label: "GPA", val: "3.62 / 4.00", color: "#52c41a" },
          { label: "Tín chỉ tích lũy", val: "95 / 135", color: "#1677ff" },
          { label: "Chuyên cần HK", val: "95%", color: "#52c41a" },
          { label: "Cảnh báo học vụ", val: "0 lần", color: "#52c41a" },
        ].map((s) => (
          <div
            key={s.label}
            style={{
              background: "white",
              border: "1px solid #d1dbe8",
              borderRadius: 8,
              padding: "14px 16px",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 22, fontWeight: 800, color: s.color }}>
              {s.val}
            </div>
            <div style={{ fontSize: 12, color: "#7a90a8", marginTop: 4 }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="ems-card" style={{ overflow: "hidden" }}>
        <div
          className="ems-tabs-nav"
          role="tablist"
          aria-label="Hồ sơ sinh viên"
          style={{ paddingLeft: 16 }}
        >
          {[
            "Thông tin cá nhân",
            "Học phần đăng ký",
            "Kết quả học tập",
            "Điểm danh",
            "Đơn từ",
          ].map((t, i) => (
            <button
              key={t}
              type="button"
              role="tab"
              id={`student-detail-tab-${i}`}
              aria-selected={activeTab === i}
              aria-controls={`student-detail-panel-${i}`}
              className={`ems-tab-item ${activeTab === i ? "active" : ""}`}
              onClick={() => setActiveTab(i)}
            >
              {t}
            </button>
          ))}
        </div>
        <div
          className="ems-card-body"
          role="tabpanel"
          id={`student-detail-panel-${activeTab}`}
          aria-labelledby={`student-detail-tab-${activeTab}`}
        >
          {activeTab === 0 && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 16,
              }}
            >
              {[
                ["Họ và tên", "Nguyễn Văn An"],
                ["Mã sinh viên", "SV2021001"],
                ["Ngày sinh", "15/05/2002"],
                ["Giới tính", "Nam"],
                ["CCCD", "079202012345"],
                ["Dân tộc", "Kinh"],
                ["Email trường", "nguyenvana@student.edu.vn"],
                ["Điện thoại", "0912 345 678"],
                ["Địa chỉ thường trú", "123 Đường Lê Lợi, Q.1, TP.HCM"],
                ["Người liên hệ khẩn", "Nguyễn Văn Bình (Cha) — 0912 111 222"],
                ["Khoa / Ngành", "CNTT / Công nghệ thông tin"],
                ["Niên khóa", "2021–2025 (K46)"],
              ].map(([k, v]) => (
                <div
                  key={k as string}
                  style={{
                    display: "flex",
                    padding: "10px 0",
                    borderBottom: "1px solid #e8eef5",
                  }}
                >
                  <div
                    style={{
                      width: 160,
                      fontSize: 13,
                      color: "#7a90a8",
                      flexShrink: 0,
                    }}
                  >
                    {k as string}
                  </div>
                  <div
                    style={{ fontSize: 13, fontWeight: 500, color: "#0f1b2d" }}
                  >
                    {v as string}
                  </div>
                </div>
              ))}
            </div>
          )}
          {activeTab === 1 && (
            <div
              style={{
                textAlign: "center",
                padding: "48px 20px",
                color: "#7a90a8",
              }}
            >
              <div style={{ fontSize: 32, marginBottom: 10 }}>📚</div>
              Danh sách 6 học phần đang đăng ký học kỳ 1 — 2024–2025
            </div>
          )}
          {activeTab === 2 && (
            <div
              style={{
                textAlign: "center",
                padding: "48px 20px",
                color: "#7a90a8",
              }}
            >
              <div style={{ fontSize: 32, marginBottom: 10 }}>📊</div>
              Bảng điểm tổng kết 8 học kỳ
            </div>
          )}
          {activeTab >= 3 && (
            <div
              style={{
                textAlign: "center",
                padding: "48px 20px",
                color: "#7a90a8",
              }}
            >
              <div style={{ fontSize: 32, marginBottom: 10 }}>📋</div>
              Dữ liệu tab này đang được tải...
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function ReportTemplate() {
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <div>
          <h2
            style={{
              margin: 0,
              fontSize: 20,
              fontWeight: 800,
              color: "#0f1b2d",
            }}
          >
            Báo cáo học vụ
          </h2>
          <p style={{ margin: 0, fontSize: 13, color: "#7a90a8" }}>
            Học kỳ 1 — 2024–2025 • Khoa Công nghệ thông tin
          </p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="ems-btn ems-btn-secondary ems-btn-sm">
            🖨 In báo cáo
          </button>
          <button className="ems-btn ems-btn-primary ems-btn-sm">
            ⬇ Xuất PDF
          </button>
        </div>
      </div>

      {/* Report header */}
      <div
        className="ems-card"
        style={{ marginBottom: 16, borderTop: "3px solid #1677ff" }}
      >
        <div className="ems-card-body" style={{ textAlign: "center" }}>
          <div style={{ fontSize: 13, color: "#7a90a8", marginBottom: 4 }}>
            TRƯỜNG ĐẠI HỌC ASC VIỆT NAM
          </div>
          <div
            style={{
              fontSize: 18,
              fontWeight: 800,
              color: "#0f1b2d",
              marginBottom: 4,
            }}
          >
            BÁO CÁO KẾT QUẢ HỌC TẬP
          </div>
          <div style={{ fontSize: 13, color: "#4a5e78" }}>
            Học kỳ 1 — Năm học 2024–2025 | Khoa Công nghệ thông tin
          </div>
        </div>
      </div>

      {/* Summary table */}
      <div
        className="ems-card"
        style={{ marginBottom: 16, overflow: "hidden" }}
      >
        <div className="ems-card-header">
          <span style={{ fontWeight: 700, fontSize: 14 }}>
            I. Tổng hợp kết quả học tập theo học phần
          </span>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table className="ems-table">
            <thead>
              <tr>
                <th>Mã HP</th>
                <th>Tên học phần</th>
                <th>TC</th>
                <th style={{ textAlign: "center" }}>Số SV</th>
                <th style={{ textAlign: "center" }}>Điểm TB</th>
                <th style={{ textAlign: "center" }}>A (≥8.5)</th>
                <th style={{ textAlign: "center" }}>B (7.0–8.4)</th>
                <th style={{ textAlign: "center" }}>C (5.5–6.9)</th>
                <th style={{ textAlign: "center" }}>D (4.0–5.4)</th>
                <th style={{ textAlign: "center" }}>F (&lt;4.0)</th>
                <th style={{ textAlign: "center" }}>Qua môn</th>
              </tr>
            </thead>
            <tbody>
              {[
                [
                  "IT302",
                  "Lập trình Web",
                  3,
                  42,
                  "7.4",
                  8,
                  18,
                  12,
                  3,
                  1,
                  "97.6%",
                ],
                [
                  "IT303",
                  "Cơ sở dữ liệu",
                  3,
                  38,
                  "7.1",
                  5,
                  16,
                  13,
                  3,
                  1,
                  "97.4%",
                ],
                [
                  "IT401",
                  "Trí tuệ nhân tạo",
                  4,
                  35,
                  "6.8",
                  4,
                  12,
                  14,
                  4,
                  1,
                  "97.1%",
                ],
                [
                  "KT201",
                  "Kinh tế vi mô",
                  2,
                  55,
                  "7.6",
                  12,
                  22,
                  15,
                  5,
                  1,
                  "98.2%",
                ],
              ].map(([code, name, tc, sv, avg, a, b, c, d, f, pass]) => (
                <tr key={code as string}>
                  <td>
                    <span
                      style={{
                        fontFamily: "JetBrains Mono,monospace",
                        fontSize: 12,
                        color: "#1677ff",
                        fontWeight: 600,
                      }}
                    >
                      {code as string}
                    </span>
                  </td>
                  <td style={{ fontWeight: 500 }}>{name as string}</td>
                  <td style={{ textAlign: "center" }}>{tc}</td>
                  <td style={{ textAlign: "center" }}>{sv}</td>
                  <td style={{ textAlign: "center", fontWeight: 700 }}>
                    {avg as string}
                  </td>
                  <td style={{ textAlign: "center", color: "#389e0d" }}>{a}</td>
                  <td style={{ textAlign: "center", color: "#1677ff" }}>{b}</td>
                  <td style={{ textAlign: "center", color: "#d46b08" }}>
                    {c as number}
                  </td>
                  <td style={{ textAlign: "center", color: "#cf1322" }}>{d}</td>
                  <td style={{ textAlign: "center", color: "#cf1322" }}>{f}</td>
                  <td style={{ textAlign: "center" }}>
                    <span style={{ color: "#389e0d", fontWeight: 600 }}>
                      {pass as string}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Section II */}
      <div className="ems-card" style={{ overflow: "hidden" }}>
        <div className="ems-card-header">
          <span style={{ fontWeight: 700, fontSize: 14 }}>
            II. Thống kê tình trạng học tập
          </span>
        </div>
        <div className="ems-card-body">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4,1fr)",
              gap: 16,
            }}
          >
            {[
              {
                label: "Tỷ lệ chuyên cần bình quân",
                val: "87.3%",
                trend: "▼ 1.2% so với HK trước",
              },
              {
                label: "SV cảnh báo học vụ",
                val: "142 SV",
                trend: "▲ 23 SV so với HK trước",
              },
              {
                label: "SV có GPA > 3.5",
                val: "680 SV",
                trend: "▲ 45 SV so với HK trước",
              },
              {
                label: "Tỷ lệ đậu bình quân",
                val: "96.8%",
                trend: "▲ 0.4% so với HK trước",
              },
            ].map((s) => (
              <div
                key={s.label}
                style={{
                  background: "#f5f7fa",
                  borderRadius: 8,
                  padding: "16px",
                }}
              >
                <div
                  style={{
                    fontSize: 22,
                    fontWeight: 800,
                    color: "#0f1b2d",
                    marginBottom: 4,
                  }}
                >
                  {s.val}
                </div>
                <div
                  style={{ fontSize: 12, color: "#4a5e78", marginBottom: 6 }}
                >
                  {s.label}
                </div>
                <div style={{ fontSize: 11, color: "#7a90a8" }}>{s.trend}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function ImportExportTemplate() {
  const [step, setStep] = useState(0)
  const [uploaded, setUploaded] = useState(false)

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <div>
          <h2
            style={{
              margin: 0,
              fontSize: 20,
              fontWeight: 800,
              color: "#0f1b2d",
            }}
          >
            Import / Export dữ liệu
          </h2>
          <p style={{ margin: 0, fontSize: 13, color: "#7a90a8" }}>
            Nhập dữ liệu hàng loạt hoặc xuất báo cáo
          </p>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {/* Import */}
        <div className="ems-card">
          <div className="ems-card-header">
            <span style={{ fontWeight: 700, fontSize: 14 }}>
              ⬆ Nhập dữ liệu (Import)
            </span>
          </div>
          <div className="ems-card-body">
            {/* Steps */}
            <div style={{ display: "flex", marginBottom: 20, gap: 0 }}>
              {["Tải file", "Xem trước", "Nhập"].map((s, i) => (
                <div
                  key={s}
                  style={{ display: "flex", alignItems: "center", flex: 1 }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        width: 26,
                        height: 26,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 12,
                        fontWeight: 700,
                        background: i <= step ? "#1677ff" : "#f0f4f8",
                        color: i <= step ? "white" : "#b0bec8",
                      }}
                    >
                      {i < step ? "✓" : i + 1}
                    </div>
                    <div
                      style={{
                        fontSize: 11,
                        marginTop: 4,
                        color: i <= step ? "#1677ff" : "#b0bec8",
                      }}
                    >
                      {s}
                    </div>
                  </div>
                  {i < 2 && (
                    <div
                      style={{
                        flex: 1,
                        height: 1,
                        background: i < step ? "#1677ff" : "#d1dbe8",
                        marginTop: -14,
                      }}
                    />
                  )}
                </div>
              ))}
            </div>

            {step === 0 && (
              <>
                <div style={{ marginBottom: 12 }}>
                  <label className="ems-label" htmlFor="import-data-type">
                    Loại dữ liệu
                  </label>
                  <select id="import-data-type" className="ems-select">
                    <option>Danh sách sinh viên</option>
                    <option>Kết quả học tập</option>
                    <option>Dữ liệu điểm danh</option>
                    <option>Thời khóa biểu</option>
                  </select>
                </div>
                <div style={{ marginBottom: 12 }}>
                  <label className="ems-label" htmlFor="import-semester">
                    Học kỳ
                  </label>
                  <select id="import-semester" className="ems-select">
                    <option>HK1 — 2024–2025</option>
                  </select>
                </div>
                <input
                  id="import-file"
                  type="file"
                  accept=".xlsx,.csv"
                  onChange={(event) =>
                    setUploaded(Boolean(event.currentTarget.files?.length))
                  }
                  style={{
                    position: "absolute",
                    width: 1,
                    height: 1,
                    overflow: "hidden",
                    clip: "rect(0 0 0 0)",
                  }}
                />
                <label
                  htmlFor="import-file"
                  style={{
                    display: "block",
                    border: `2px dashed ${uploaded ? "#52c41a" : "#d1dbe8"}`,
                    borderRadius: 8,
                    padding: "28px",
                    textAlign: "center",
                    background: uploaded ? "#f6ffed" : "#f5f7fa",
                    marginBottom: 12,
                    cursor: "pointer",
                  }}
                >
                  {uploaded ? (
                    <>
                      <div style={{ fontSize: 28, marginBottom: 8 }}>✅</div>
                      <div style={{ fontWeight: 600, color: "#389e0d" }}>
                        danh_sach_sv_k46.xlsx
                      </div>
                      <div
                        style={{ fontSize: 12, color: "#7a90a8", marginTop: 4 }}
                      >
                        245 KB • Nhấn để thay đổi
                      </div>
                    </>
                  ) : (
                    <>
                      <div style={{ fontSize: 28, marginBottom: 8 }}>📂</div>
                      <div style={{ fontWeight: 500, color: "#4a5e78" }}>
                        Kéo thả hoặc{" "}
                        <span style={{ color: "#1677ff" }}>chọn file</span>
                      </div>
                      <div
                        style={{ fontSize: 12, color: "#b0bec8", marginTop: 4 }}
                      >
                        XLSX, CSV — tối đa 10MB
                      </div>
                    </>
                  )}
                </label>
                <div style={{ marginBottom: 12 }}>
                  <button
                    className="ems-btn ems-btn-ghost ems-btn-sm"
                    style={{ width: "100%" }}
                  >
                    ⬇ Tải file mẫu (Template)
                  </button>
                </div>
                <button
                  className="ems-btn ems-btn-primary ems-btn-md"
                  style={{ width: "100%" }}
                  disabled={!uploaded}
                  onClick={() => uploaded && setStep(1)}
                >
                  Tiếp tục →
                </button>
              </>
            )}

            {step === 1 && (
              <>
                <div
                  className="ems-alert ems-alert-info"
                  style={{ marginBottom: 12 }}
                >
                  <span>ℹ</span>
                  <span>
                    Tìm thấy <strong>247 bản ghi</strong> hợp lệ,{" "}
                    <strong>3 lỗi</strong> cần xem xét
                  </span>
                </div>
                <div
                  style={{
                    background: "#f5f7fa",
                    borderRadius: 6,
                    overflow: "hidden",
                    marginBottom: 12,
                  }}
                >
                  <table className="ems-table" style={{ fontSize: 12 }}>
                    <thead>
                      <tr>
                        <th>Dòng</th>
                        <th>Họ tên</th>
                        <th>Mã SV</th>
                        <th>Trạng thái</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        {
                          row: 2,
                          name: "Nguyễn Văn An",
                          id: "SV2024001",
                          status: "OK",
                        },
                        {
                          row: 3,
                          name: "Trần Thị Bình",
                          id: "SV2024002",
                          status: "OK",
                        },
                        {
                          row: 15,
                          name: "Lê ???",
                          id: "SV2024015",
                          status: "Lỗi: thiếu tên",
                        },
                        {
                          row: 23,
                          name: "Phạm Đức",
                          id: "",
                          status: "Lỗi: thiếu mã SV",
                        },
                      ].map((r) => (
                        <tr key={r.row}>
                          <td style={{ color: "#7a90a8" }}>{r.row}</td>
                          <td>{r.name}</td>
                          <td
                            style={{ fontFamily: "JetBrains Mono,monospace" }}
                          >
                            {r.id}
                          </td>
                          <td>
                            <span
                              className={`ems-badge ${
                                r.status === "OK"
                                  ? "ems-badge-green"
                                  : "ems-badge-red"
                              }`}
                            >
                              {r.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button
                    className="ems-btn ems-btn-secondary ems-btn-sm"
                    onClick={() => setStep(0)}
                  >
                    ← Quay lại
                  </button>
                  <button
                    className="ems-btn ems-btn-primary ems-btn-sm"
                    style={{ flex: 1 }}
                    onClick={() => setStep(2)}
                  >
                    Nhập 244 bản ghi hợp lệ
                  </button>
                </div>
              </>
            )}

            {step === 2 && (
              <div style={{ textAlign: "center", padding: "20px" }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>🎉</div>
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: 18,
                    color: "#389e0d",
                    marginBottom: 8,
                  }}
                >
                  Nhập dữ liệu thành công!
                </div>
                <div
                  style={{ fontSize: 14, color: "#7a90a8", marginBottom: 20 }}
                >
                  Đã nhập <strong>244</strong> bản ghi sinh viên vào hệ thống
                </div>
                <button
                  className="ems-btn ems-btn-secondary ems-btn-sm"
                  onClick={() => {
                    setStep(0)
                    setUploaded(false)
                  }}
                >
                  Nhập file mới
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Export */}
        <div className="ems-card">
          <div className="ems-card-header">
            <span style={{ fontWeight: 700, fontSize: 14 }}>
              ⬇ Xuất dữ liệu (Export)
            </span>
          </div>
          <div className="ems-card-body">
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                {
                  label: "Danh sách sinh viên",
                  icon: "👥",
                  format: ["XLSX", "CSV", "PDF"],
                  desc: "Xuất toàn bộ hoặc theo bộ lọc",
                },
                {
                  label: "Bảng điểm tổng kết",
                  icon: "📊",
                  format: ["XLSX", "PDF"],
                  desc: "Theo học kỳ hoặc toàn khóa",
                },
                {
                  label: "Báo cáo điểm danh",
                  icon: "✅",
                  format: ["XLSX", "PDF"],
                  desc: "Theo học phần và thời gian",
                },
                {
                  label: "Thời khóa biểu",
                  icon: "📅",
                  format: ["PDF", "iCal"],
                  desc: "Xuất lịch cá nhân hoặc lớp học",
                },
                {
                  label: "Đơn từ & Hồ sơ",
                  icon: "📄",
                  format: ["PDF", "DOCX"],
                  desc: "Biểu mẫu in ấn chính thức",
                },
              ].map((e) => (
                <div
                  key={e.label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "12px",
                    borderRadius: 8,
                    border: "1px solid #e8eef5",
                    background: "#fafbfc",
                  }}
                >
                  <div style={{ fontSize: 24, width: 40, textAlign: "center" }}>
                    {e.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontWeight: 600,
                        fontSize: 14,
                        color: "#0f1b2d",
                      }}
                    >
                      {e.label}
                    </div>
                    <div style={{ fontSize: 12, color: "#7a90a8" }}>
                      {e.desc}
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 4 }}>
                    {e.format.map((f) => (
                      <button
                        key={f}
                        className="ems-btn ems-btn-secondary ems-btn-xs"
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Page06Templates() {
  const [activeTab, setActiveTab] = useState(0)
  const renderContent = () => {
    switch (activeTab) {
      case 0:
        return <DashboardTemplate />
      case 1:
        return <ListTemplate />
      case 2:
        return <DetailTemplate />
      case 3:
        return <ReportTemplate />
      case 4:
        return <ImportExportTemplate />
      default:
        return null
    }
  }

  return (
    <div style={{ padding: 32, maxWidth: 1200, margin: "0 auto" }}>
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
          06
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
          Templates
        </h1>
        <p style={{ fontSize: 14, color: "#7a90a8", margin: 0 }}>
          Mẫu trang hoàn chỉnh: dashboard, danh sách, chi tiết, báo cáo,
          import/export
        </p>
      </div>
      <div
        className="ems-tabs-nav"
        role="tablist"
        aria-label="Mẫu trang"
        style={{ marginBottom: 28 }}
      >
        {TABS.map((t, i) => (
          <button
            key={t}
            type="button"
            role="tab"
            id={`templates-tab-${i}`}
            aria-selected={activeTab === i}
            aria-controls={`templates-panel-${i}`}
            className={`ems-tab-item ${activeTab === i ? "active" : ""}`}
            onClick={() => setActiveTab(i)}
          >
            {t}
          </button>
        ))}
      </div>
      <div
        role="tabpanel"
        id={`templates-panel-${activeTab}`}
        aria-labelledby={`templates-tab-${activeTab}`}
      >
        {renderContent()}
      </div>
    </div>
  )
}
