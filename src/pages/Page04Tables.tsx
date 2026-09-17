import { useState } from "react"

const STUDENTS = [
  {
    id: "SV2021001",
    name: "Nguyễn Văn An",
    class: "IT2021A",
    gpa: 3.62,
    credits: 95,
    status: "Đang học",
    attendance: 95,
    dept: "CNTT",
  },
  {
    id: "SV2021002",
    name: "Trần Thị Bình",
    class: "IT2021A",
    gpa: 3.45,
    credits: 90,
    status: "Đang học",
    attendance: 88,
    dept: "CNTT",
  },
  {
    id: "SV2021003",
    name: "Lê Minh Cường",
    class: "KT2021B",
    gpa: 2.91,
    credits: 72,
    status: "Cảnh báo",
    attendance: 62,
    dept: "Kinh tế",
  },
  {
    id: "SV2021004",
    name: "Phạm Thị Dung",
    class: "NN2021A",
    gpa: 3.8,
    credits: 98,
    status: "Đang học",
    attendance: 98,
    dept: "Ngoại ngữ",
  },
  {
    id: "SV2021005",
    name: "Hoàng Văn Em",
    class: "TC2021C",
    gpa: 2.45,
    credits: 54,
    status: "Đình chỉ",
    attendance: 42,
    dept: "Tài chính",
  },
  {
    id: "SV2021006",
    name: "Vũ Thị Phương",
    class: "IT2021B",
    gpa: 3.21,
    credits: 84,
    status: "Đang học",
    attendance: 79,
    dept: "CNTT",
  },
  {
    id: "SV2021007",
    name: "Đặng Văn Quân",
    class: "KT2021A",
    gpa: 3.55,
    credits: 91,
    status: "Đang học",
    attendance: 92,
    dept: "Kinh tế",
  },
  {
    id: "SV2021008",
    name: "Bùi Thị Lan",
    class: "NN2021B",
    gpa: 2.75,
    credits: 65,
    status: "Bảo lưu",
    attendance: 0,
    dept: "Ngoại ngữ",
  },
]

const STATUS_CONFIG: Record<string, { cls: string dot: string }> = {
  "Đang học": { cls: "ems-badge-green", dot: "#52c41a" },
  "Cảnh báo": { cls: "ems-badge-orange", dot: "#fa8c16" },
  "Đình chỉ": { cls: "ems-badge-red", dot: "#ff4d4f" },
  "Bảo lưu": { cls: "ems-badge-gray", dot: "#b0bec8" },
}

const TABS = [
  "Cơ bản",
  "Có thể chọn",
  "Có thể sắp xếp",
  "Compact",
  "Trạng thái",
  "Nhập điểm",
]

export default function Page04Tables() {
  const [activeTab, setActiveTab] = useState(0)
  const [selected, setSelected] = useState<string[]>([])
  const [sortCol, setSortCol] = useState<string | null>("name")
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc")
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [page, setPage] = useState(1)
  const [grades, setGrades] =
    useState<Record<string, [number, number, number]>>(() =>
      Object.fromEntries(
        STUDENTS.slice(0, 6).map((student) => [student.id, [8.5, 7, 6.5]]),
      ),
    )

  const toggleSelect = (id: string) => {
    setSelected((s) =>
      s.includes(id) ? s.filter((x) => x !== id) : [...s, id],
    )
  }
  const toggleAll = () => {
    setSelected((s) =>
      s.length === STUDENTS.length ? [] : STUDENTS.map((s) => s.id),
    )
  }

  const handleSort = (col: string) => {
    if (sortCol === col) setSortDir((d) => (d === "asc" ? "desc" : "asc"))
    else {
      setSortCol(col)
      setSortDir("asc")
    }
  }

  const filtered = STUDENTS.filter((s) => {
    const matchSearch =
      !search ||
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.id.includes(search)
    const matchStatus = statusFilter === "all" || s.status === statusFilter
    return matchSearch && matchStatus
  })

  const sorted = [...filtered].sort((a, b) => {
    if (!sortCol) return 0
    const av = (a as Record<string, unknown>)[sortCol] as string | number
    const bv = (b as Record<string, unknown>)[sortCol] as string | number
    if (av < bv) return sortDir === "asc" ? -1 : 1
    if (av > bv) return sortDir === "asc" ? 1 : -1
    return 0
  })
  const pageSize = 3
  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize))
  const currentPage = Math.min(page, totalPages)
  const pageRows = sorted.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  )
  const updateGrade = (studentId: string, index: number, value: string) => {
    const numericValue = Number(value)
    if (!Number.isFinite(numericValue)) return
    setGrades((current) => {
      const next = [
        ...(current[studentId] ?? [0, 0, 0]),
      ] as [number, number, number]
      next[index] = Math.max(0, Math.min(10, numericValue))
      return { ...current, [studentId]: next }
    })
  }

  const SortIcon = ({ col }: { col: string }) => (
    <span
      style={{
        fontSize: 10,
        marginLeft: 4,
        color: sortCol === col ? "#1677ff" : "#b0bec8",
      }}
    >
      {sortCol === col ? (sortDir === "asc" ? "↑" : "↓") : "↕"}
    </span>
  )

  const GpaBar = ({ val }: { val: number }) => {
    const color =
      val >= 3.5
        ? "#52c41a"
        : val >= 3.0
          ? "#1677ff"
          : val >= 2.5
            ? "#fa8c16"
            : "#ff4d4f"
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontWeight: 600, color, minWidth: 32 }}>
          {val.toFixed(2)}
        </span>
        <div
          style={{
            flex: 1,
            height: 4,
            background: "#e8eef5",
            borderRadius: 2,
            minWidth: 60,
          }}
        >
          <div
            style={{
              width: `${(val / 4) * 100}%`,
              height: "100%",
              background: color,
              borderRadius: 2,
            }}
          />
        </div>
      </div>
    )
  }

  const AttBar = ({ val }: { val: number }) => {
    const color = val >= 80 ? "#52c41a" : val >= 60 ? "#fa8c16" : "#ff4d4f"
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontWeight: 500, color, minWidth: 34, fontSize: 13 }}>
          {val}%
        </span>
        <div
          style={{
            width: 48,
            height: 4,
            background: "#e8eef5",
            borderRadius: 2,
          }}
        >
          <div
            style={{
              width: `${val}%`,
              height: "100%",
              background: color,
              borderRadius: 2,
            }}
          />
        </div>
      </div>
    )
  }

  const renderTable = () => {
    const compact = activeTab === 3
    const selectable = activeTab === 1

    return (
      <div className="ems-card" style={{ overflow: "hidden" }}>
        {/* Toolbar */}
        <div
          style={{
            padding: "14px 16px",
            borderBottom: "1px solid #e8eef5",
            display: "flex",
            alignItems: "center",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          {selected.length > 0 ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                flex: 1,
              }}
            >
              <span className="ems-badge ems-badge-blue">
                {selected.length} đã chọn
              </span>
              <button className="ems-btn ems-btn-secondary ems-btn-sm">
                📄 Xuất Excel
              </button>
              <button className="ems-btn ems-btn-secondary ems-btn-sm">
                🔔 Gửi thông báo
              </button>
              <button className="ems-btn ems-btn-danger ems-btn-sm">
                🗑 Xóa
              </button>
            </div>
          ) : (
            <>
              <div style={{ position: "relative" }}>
                <span
                  style={{
                    position: "absolute",
                    left: 8,
                    top: "50%",
                    transform: "translateY(-50%)",
                    fontSize: 13,
                    color: "#7a90a8",
                  }}
                >
                  🔍
                </span>
                <input
                  aria-label="Tìm sinh viên"
                  className="ems-input"
                  style={{ paddingLeft: 28, width: 240 }}
                  placeholder="Tìm sinh viên..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <select
                aria-label="Lọc theo trạng thái"
                className="ems-select"
                style={{ width: 140 }}
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">Tất cả trạng thái</option>
                <option value="Đang học">Đang học</option>
                <option value="Cảnh báo">Cảnh báo</option>
                <option value="Đình chỉ">Đình chỉ</option>
                <option value="Bảo lưu">Bảo lưu</option>
              </select>
              <select
                aria-label="Lọc theo khoa"
                className="ems-select"
                style={{ width: 130 }}
              >
                <option>Tất cả khoa</option>
                <option>CNTT</option>
                <option>Kinh tế</option>
                <option>Ngoại ngữ</option>
              </select>
              <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
                <button className="ems-btn ems-btn-secondary ems-btn-sm">
                  ⬇ Xuất
                </button>
                <button className="ems-btn ems-btn-primary ems-btn-sm">
                  ＋ Thêm sinh viên
                </button>
              </div>
            </>
          )}
        </div>

        {/* Table */}
        <div style={{ overflowX: "auto" }}>
          <table className="ems-table">
            <thead>
              <tr>
                {selectable && (
                  <th style={{ width: 40 }}>
                    <input
                      type="checkbox"
                      className="ems-checkbox"
                      checked={selected.length === STUDENTS.length}
                      onChange={toggleAll}
                    />
                  </th>
                )}
                <th
                  style={{ cursor: "pointer" }}
                  onClick={() => handleSort("id")}
                >
                  Mã SV <SortIcon col="id" />
                </th>
                <th
                  style={{ cursor: "pointer" }}
                  onClick={() => handleSort("name")}
                >
                  Họ và tên <SortIcon col="name" />
                </th>
                {!compact && <th>Lớp</th>}
                {!compact && <th>Khoa</th>}
                <th
                  style={{ cursor: "pointer" }}
                  onClick={() => handleSort("gpa")}
                >
                  GPA <SortIcon col="gpa" />
                </th>
                {!compact && (
                  <th
                    style={{ cursor: "pointer" }}
                    onClick={() => handleSort("attendance")}
                  >
                    Chuyên cần <SortIcon col="attendance" />
                  </th>
                )}
                <th
                  style={{ cursor: "pointer" }}
                  onClick={() => handleSort("credits")}
                >
                  TC tích lũy <SortIcon col="credits" />
                </th>
                <th>Trạng thái</th>
                <th style={{ width: 120 }}>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {pageRows.map((s) => {
                const cfg = STATUS_CONFIG[s.status]
                const isSelected = selected.includes(s.id)
                return (
                  <tr
                    key={s.id}
                    style={{ background: isSelected ? "#f0f7ff" : undefined }}
                  >
                    {selectable && (
                      <td>
                        <input
                          type="checkbox"
                          className="ems-checkbox"
                          checked={isSelected}
                          onChange={() => toggleSelect(s.id)}
                        />
                      </td>
                    )}
                    <td>
                      <span
                        style={{
                          fontFamily: "JetBrains Mono,monospace",
                          fontSize: 12,
                          color: "#4a5e78",
                        }}
                      >
                        {s.id}
                      </span>
                    </td>
                    <td>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                        }}
                      >
                        <div
                          className="ems-avatar"
                          style={{
                            width: compact ? 24 : 28,
                            height: compact ? 24 : 28,
                            fontSize: compact ? 9 : 10,
                            background: [
                              "#1677ff",
                              "#722ed1",
                              "#52c41a",
                              "#fa8c16",
                              "#ff4d4f",
                            ][parseInt(s.id.slice(-1)) % 5],
                          }}
                        >
                          {s.name.split(" ").slice(-1)[0][0]}
                          {s.name.split(" ").slice(-2, -1)[0]?.[0] || ""}
                        </div>
                        <span style={{ fontWeight: 500 }}>{s.name}</span>
                      </div>
                    </td>
                    {!compact && (
                      <td style={{ color: "#4a5e78", fontSize: 13 }}>
                        {s.class}
                      </td>
                    )}
                    {!compact && (
                      <td>
                        <span
                          className="ems-tag"
                          style={{
                            background: "#f5f7fa",
                            color: "#4a5e78",
                            border: "1px solid #e8eef5",
                            fontSize: 12,
                          }}
                        >
                          {s.dept}
                        </span>
                      </td>
                    )}
                    <td>
                      <GpaBar val={s.gpa} />
                    </td>
                    {!compact && (
                      <td>
                        <AttBar val={s.attendance} />
                      </td>
                    )}
                    <td style={{ fontWeight: 500, color: "#0f1b2d" }}>
                      {s.credits} TC
                    </td>
                    <td>
                      <span className={`ems-badge ${cfg.cls}`}>
                        <span
                          style={{
                            width: 6,
                            height: 6,
                            borderRadius: "50%",
                            background: cfg.dot,
                            display: "inline-block",
                          }}
                        />
                        {s.status}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: "flex", gap: 4 }}>
                        <button
                          aria-label={`Xem chi tiết ${s.name}`}
                          className="ems-btn ems-btn-ghost ems-btn-xs"
                          title="Xem chi tiết"
                          type="button"
                        >
                          👁
                        </button>
                        <button
                          aria-label={`Chỉnh sửa ${s.name}`}
                          className="ems-btn ems-btn-ghost ems-btn-xs"
                          title="Chỉnh sửa"
                          type="button"
                        >
                          ✎
                        </button>
                        <button
                          className="ems-btn ems-btn-ghost ems-btn-xs"
                          title="Thêm tùy chọn"
                        >
                          ⋯
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div
          style={{
            padding: "12px 16px",
            borderTop: "1px solid #e8eef5",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "#fafbfc",
          }}
        >
          <div style={{ fontSize: 13, color: "#7a90a8" }}>
            Hiển thị {pageRows.length ? (currentPage - 1) * pageSize + 1 : 0}–
            {Math.min(currentPage * pageSize, sorted.length)} / {sorted.length}{" "}
            bản ghi
            {selected.length > 0 && (
              <span>
                {" "}
                • <strong>{selected.length}</strong> đã chọn
              </span>
            )}
          </div>
          <div style={{ display: "flex", gap: 4 }}>
            <button
              aria-label="Trang trước"
              className="ems-btn ems-btn-secondary ems-btn-xs"
              disabled={currentPage === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              type="button"
            >
              ‹
            </button>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (pageNumber) => (
                <button
                  key={pageNumber}
                  aria-current={currentPage === pageNumber ? "page" : undefined}
                  aria-label={`Trang ${pageNumber}`}
                  className={`ems-btn ems-btn-${
                    currentPage === pageNumber ? "primary" : "secondary"
                  } ems-btn-xs`}
                  onClick={() => setPage(pageNumber)}
                  style={{ minWidth: 28 }}
                  type="button"
                >
                  {pageNumber}
                </button>
              ),
            )}
            <button
              aria-label="Trang sau"
              className="ems-btn ems-btn-secondary ems-btn-xs"
              disabled={currentPage === totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              type="button"
            >
              ›
            </button>
          </div>
        </div>
      </div>
    )
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
          04
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
          Tables & Data
        </h1>
        <p style={{ fontSize: 14, color: "#7a90a8", margin: 0 }}>
          Bảng dữ liệu với đầy đủ tính năng: lọc, sắp xếp, chọn, phân trang,
          hành động hàng loạt
        </p>
      </div>

      <div className="ems-tabs-nav" style={{ marginBottom: 24 }}>
        {TABS.map((t, i) => (
          <button
            key={t}
            aria-selected={activeTab === i}
            className={`ems-tab-item ${activeTab === i ? "active" : ""}`}
            onClick={() => {
              setActiveTab(i)
              setPage(1)
              setSelected([])
            }}
            role="tab"
            type="button"
          >
            {t}
          </button>
        ))}
      </div>

      {/* State examples */}
      {activeTab === 4 ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Loading */}
          <div>
            <div className="section-label">Đang tải dữ liệu</div>
            <div className="ems-card" style={{ overflow: "hidden" }}>
              <div
                style={{
                  padding: "14px 16px",
                  borderBottom: "1px solid #e8eef5",
                  display: "flex",
                  gap: 12,
                }}
              >
                <div
                  className="ems-skeleton"
                  style={{ height: 32, width: 200 }}
                />
                <div
                  className="ems-skeleton"
                  style={{ height: 32, width: 120 }}
                />
                <div style={{ marginLeft: "auto" }}>
                  <div
                    className="ems-skeleton"
                    style={{ height: 32, width: 120 }}
                  />
                </div>
              </div>
              <table className="ems-table">
                <thead>
                  <tr>
                    <th>Mã SV</th>
                    <th>Họ tên</th>
                    <th>Lớp</th>
                    <th>GPA</th>
                    <th>Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3, 4].map((i) => (
                    <tr key={i}>
                      <td>
                        <div
                          className="ems-skeleton"
                          style={{ height: 14, width: 80 }}
                        />
                      </td>
                      <td>
                        <div
                          style={{
                            display: "flex",
                            gap: 8,
                            alignItems: "center",
                          }}
                        >
                          <div
                            className="ems-skeleton"
                            style={{
                              width: 28,
                              height: 28,
                              borderRadius: "50%",
                            }}
                          />
                          <div
                            className="ems-skeleton"
                            style={{ height: 14, width: 120 }}
                          />
                        </div>
                      </td>
                      <td>
                        <div
                          className="ems-skeleton"
                          style={{ height: 14, width: 60 }}
                        />
                      </td>
                      <td>
                        <div
                          className="ems-skeleton"
                          style={{ height: 14, width: 100 }}
                        />
                      </td>
                      <td>
                        <div
                          className="ems-skeleton"
                          style={{ height: 20, width: 70, borderRadius: 10 }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Empty */}
          <div>
            <div className="section-label">Không có dữ liệu</div>
            <div className="ems-card" style={{ overflow: "hidden" }}>
              <table className="ems-table">
                <thead>
                  <tr>
                    <th>Mã SV</th>
                    <th>Họ tên</th>
                    <th>Lớp</th>
                    <th>GPA</th>
                    <th>Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td
                      colSpan={5}
                      style={{ textAlign: "center", padding: "48px 20px" }}
                    >
                      <div style={{ fontSize: 36, marginBottom: 12 }}>📭</div>
                      <div
                        style={{
                          fontWeight: 700,
                          fontSize: 15,
                          color: "#0f1b2d",
                          marginBottom: 6,
                        }}
                      >
                        Không tìm thấy sinh viên
                      </div>
                      <div
                        style={{
                          fontSize: 13,
                          color: "#7a90a8",
                          marginBottom: 16,
                        }}
                      >
                        Thử thay đổi điều kiện tìm kiếm hoặc bộ lọc
                      </div>
                      <button className="ems-btn ems-btn-secondary ems-btn-sm">
                        Xóa bộ lọc
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Error */}
          <div>
            <div className="section-label">Lỗi tải dữ liệu</div>
            <div className="ems-card" style={{ overflow: "hidden" }}>
              <table className="ems-table">
                <thead>
                  <tr>
                    <th>Mã SV</th>
                    <th>Họ tên</th>
                    <th>GPA</th>
                    <th>Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td
                      colSpan={4}
                      style={{ textAlign: "center", padding: "48px 20px" }}
                    >
                      <div style={{ fontSize: 36, marginBottom: 12 }}>⚠️</div>
                      <div
                        style={{
                          fontWeight: 700,
                          fontSize: 15,
                          color: "#cf1322",
                          marginBottom: 6,
                        }}
                      >
                        Lỗi kết nối máy chủ
                      </div>
                      <div
                        style={{
                          fontSize: 13,
                          color: "#7a90a8",
                          marginBottom: 16,
                        }}
                      >
                        Không thể tải dữ liệu. Kiểm tra kết nối mạng và thử lại.
                      </div>
                      <button className="ems-btn ems-btn-primary ems-btn-sm">
                        ↻ Thử lại
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : activeTab === 5 ? null : (
        renderTable()
      )}

      {/* Grade entry table */}
      {activeTab === 5 && (
        <div style={{ marginTop: 32 }}>
          <div className="section-label">
            Bảng nhập điểm — Grade Entry Table
          </div>
          <div className="ems-card" style={{ overflow: "hidden" }}>
            <div
              style={{
                padding: "12px 16px",
                borderBottom: "1px solid #e8eef5",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div>
                <span
                  style={{ fontWeight: 700, fontSize: 14, color: "#0f1b2d" }}
                >
                  IT302 — Lập trình Web
                </span>
                <span
                  style={{ fontSize: 13, color: "#7a90a8", marginLeft: 10 }}
                >
                  Học kỳ 1 / 2024–2025 • 42 sinh viên
                </span>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button className="ems-btn ems-btn-secondary ems-btn-sm">
                  Nhập từ Excel
                </button>
                <button className="ems-btn ems-btn-primary ems-btn-sm">
                  Lưu điểm
                </button>
              </div>
            </div>
            <div style={{ overflowX: "auto" }}>
              <table className="ems-table">
                <thead>
                  <tr>
                    <th style={{ width: 40 }}>#</th>
                    <th>Họ và tên</th>
                    <th>Mã SV</th>
                    <th style={{ textAlign: "center" }}>CC (10%)</th>
                    <th style={{ textAlign: "center" }}>GK (30%)</th>
                    <th style={{ textAlign: "center" }}>CK (60%)</th>
                    <th style={{ textAlign: "center" }}>Tổng kết</th>
                    <th style={{ textAlign: "center" }}>Chữ</th>
                    <th>Ghi chú</th>
                  </tr>
                </thead>
                <tbody>
                  {STUDENTS.slice(0, 6).map((s, i) => {
                    const [cc, gk, ck] = grades[s.id] ?? [8.5, 7, 6.5]
                    const total = (cc * 0.1 + gk * 0.3 + ck * 0.6).toFixed(1)
                    const grade =
                      parseFloat(total) >= 8.5
                        ? "A"
                        : parseFloat(total) >= 7
                          ? "B"
                          : parseFloat(total) >= 5.5
                            ? "C"
                            : parseFloat(total) >= 4
                              ? "D"
                              : "F"
                    const gradeColor =
                      grade === "A"
                        ? "#389e0d"
                        : grade === "B"
                          ? "#1677ff"
                          : grade === "C"
                            ? "#d46b08"
                            : "#cf1322"
                    return (
                      <tr key={s.id} className="drag-row">
                        <td style={{ color: "#b0bec8", fontSize: 12 }}>
                          {i + 1}
                        </td>
                        <td style={{ fontWeight: 500 }}>{s.name}</td>
                        <td
                          style={{
                            fontFamily: "JetBrains Mono,monospace",
                            fontSize: 12,
                            color: "#4a5e78",
                          }}
                        >
                          {s.id}
                        </td>
                        {[cc, gk, ck].map((v, j) => (
                          <td
                            key={j}
                            style={{ textAlign: "center", padding: "6px 8px" }}
                          >
                            <input
                              type="number"
                              min="0"
                              max="10"
                              step="0.1"
                              aria-label={`Điểm ${["chuyên cần", "giữa kỳ", "cuối kỳ"][j]} của ${s.name}`}
                              value={v}
                              onChange={(event) =>
                                updateGrade(s.id, j, event.target.value)
                              }
                              style={{
                                width: 56,
                                textAlign: "center",
                                padding: "4px 6px",
                                border: "1px solid #d1dbe8",
                                borderRadius: 4,
                                fontFamily: "JetBrains Mono,monospace",
                                fontSize: 13,
                                outline: "none",
                                fontWeight: 600,
                              }}
                              onFocus={(e) =>
                                (e.target.style.borderColor = "#1677ff")
                              }
                              onBlur={(e) =>
                                (e.target.style.borderColor = "#d1dbe8")
                              }
                            />
                          </td>
                        ))}
                        <td
                          style={{
                            textAlign: "center",
                            fontWeight: 700,
                            fontSize: 15,
                            color: "#0f1b2d",
                            fontFamily: "JetBrains Mono,monospace",
                          }}
                        >
                          {total}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          <span
                            style={{
                              fontWeight: 700,
                              fontSize: 14,
                              color: gradeColor,
                              background: gradeColor + "18",
                              padding: "2px 10px",
                              borderRadius: 4,
                            }}
                          >
                            {grade}
                          </span>
                        </td>
                        <td>
                          <input
                            aria-label={`Ghi chú cho ${s.name}`}
                            className="ems-input"
                            style={{ fontSize: 12, padding: "4px 8px" }}
                            placeholder="Ghi chú..."
                          />
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
