import { useState } from "react";

const TABS = ["Bộ lọc nâng cao", "Phê duyệt", "Lịch học", "Điểm danh", "Phân quyền"];

// ---- Advanced Filter ----
function AdvancedFilterPattern() {
  const [filters, setFilters] = useState<{ dept: string[]; status: string[]; semester: string; gpaMin: string; gpaMax: string; attendMin: string }>({
    dept: [], status: [], semester: "", gpaMin: "", gpaMax: "", attendMin: "",
  });
  const [showFilter, setShowFilter] = useState(true);
  const [saved, setSaved] = useState(["Sinh viên cảnh báo CNTT", "GPA > 3.5 HK1-2024"]);

  return (
    <div>
      <div className="section-label">Advanced Filter Panel</div>
      <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
        {/* Filter panel */}
        {showFilter && (
          <div className="ems-card" style={{ width: 280, flexShrink: 0 }}>
            <div className="ems-card-header">
              <span style={{ fontWeight: 700, fontSize: 14 }}>🎛 Bộ lọc</span>
              <button className="ems-btn ems-btn-ghost ems-btn-xs" onClick={() => setFilters({ dept: [], status: [], semester: "", gpaMin: "", gpaMax: "", attendMin: "" })}>
                Xóa tất cả
              </button>
            </div>
            <div className="ems-card-body" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <label className="ems-label">Học kỳ</label>
                <select className="ems-select" value={filters.semester} onChange={e => setFilters(f => ({ ...f, semester: e.target.value }))}>
                  <option value="">Tất cả học kỳ</option>
                  <option value="hk1-2024">HK1 — 2024–2025</option>
                  <option value="hk2-2024">HK2 — 2024–2025</option>
                  <option value="hk3-2024">HK Hè — 2025</option>
                </select>
              </div>
              <div>
                <label className="ems-label">Khoa</label>
                {["CNTT", "Kinh tế", "Ngoại ngữ", "Tài chính", "Kỹ thuật"].map(d => (
                  <label key={d} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, cursor: "pointer", fontSize: 13.5 }}>
                    <input type="checkbox" className="ems-checkbox"
                      checked={(filters.dept as string[]).includes(d)}
                      onChange={() => setFilters(f => ({
                        ...f, dept: (f.dept as string[]).includes(d) ? (f.dept as string[]).filter((x: string) => x !== d) : [...(f.dept as string[]), d]
                      }))}
                    /> {d}
                  </label>
                ))}
              </div>
              <div>
                <label className="ems-label">Trạng thái học</label>
                {["Đang học", "Cảnh báo", "Đình chỉ", "Bảo lưu", "Tốt nghiệp"].map(s => (
                  <label key={s} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, cursor: "pointer", fontSize: 13.5 }}>
                    <input type="checkbox" className="ems-checkbox"
                      checked={(filters.status as string[]).includes(s)}
                      onChange={() => setFilters(f => ({
                        ...f, status: (f.status as string[]).includes(s) ? (f.status as string[]).filter((x: string) => x !== s) : [...(f.status as string[]), s]
                      }))}
                    /> {s}
                  </label>
                ))}
              </div>
              <div>
                <label className="ems-label">GPA</label>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <input className="ems-input" style={{ textAlign: "center" }} placeholder="0.0" value={filters.gpaMin}
                    onChange={e => setFilters(f => ({ ...f, gpaMin: e.target.value }))} />
                  <span style={{ color: "#7a90a8", fontSize: 12 }}>đến</span>
                  <input className="ems-input" style={{ textAlign: "center" }} placeholder="4.0" value={filters.gpaMax}
                    onChange={e => setFilters(f => ({ ...f, gpaMax: e.target.value }))} />
                </div>
              </div>
              <div>
                <label className="ems-label">Chuyên cần tối thiểu (%)</label>
                <input className="ems-input" type="number" min="0" max="100" placeholder="Ví dụ: 80" value={filters.attendMin}
                  onChange={e => setFilters(f => ({ ...f, attendMin: e.target.value }))} />
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button className="ems-btn ems-btn-secondary ems-btn-sm" style={{ flex: 1 }}
                  onClick={() => setSaved(s => [...s, "Bộ lọc " + (s.length + 1)])}>
                  💾 Lưu bộ lọc
                </button>
                <button className="ems-btn ems-btn-primary ems-btn-sm" style={{ flex: 1 }}>Áp dụng</button>
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: "#7a90a8", marginBottom: 6 }}>BỘ LỌC ĐÃ LƯU</div>
                {saved.map(s => (
                  <div key={s} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "6px 8px", borderRadius: 5, marginBottom: 4, background: "#f5f7fa", cursor: "pointer", fontSize: 13 }}
                    onMouseEnter={e => e.currentTarget.style.background = "#e6f4ff"}
                    onMouseLeave={e => e.currentTarget.style.background = "#f5f7fa"}
                  >
                    <span style={{ color: "#1677ff" }}>⊕ {s}</span>
                    <button style={{ background: "none", border: "none", color: "#b0bec8", cursor: "pointer", fontSize: 12 }}>✕</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Results area */}
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 14, alignItems: "center" }}>
            <button className="ems-btn ems-btn-secondary ems-btn-sm" onClick={() => setShowFilter(s => !s)}>
              {showFilter ? "← Ẩn bộ lọc" : "→ Hiện bộ lọc"}
            </button>
            {((filters.dept as string[]).length > 0 || (filters.status as string[]).length > 0 || filters.gpaMin || filters.semester) && (
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {(filters.dept as string[]).map((d: string) => (
                  <span key={d} style={{ display: "flex", alignItems: "center", gap: 4, padding: "2px 8px", borderRadius: 12, background: "#e6f4ff", border: "1px solid #91caff", fontSize: 12, color: "#0958d9" }}>
                    {d} <button onClick={() => setFilters(f => ({ ...f, dept: (f.dept as string[]).filter((x: string) => x !== d) }))} style={{ background: "none", border: "none", cursor: "pointer", color: "#0958d9", padding: 0, lineHeight: 1 }}>✕</button>
                  </span>
                ))}
                {(filters.status as string[]).map((s: string) => (
                  <span key={s} style={{ display: "flex", alignItems: "center", gap: 4, padding: "2px 8px", borderRadius: 12, background: "#f9f0ff", border: "1px solid #d3adf7", fontSize: 12, color: "#531dab" }}>
                    {s} <button onClick={() => setFilters(f => ({ ...f, status: (f.status as string[]).filter((x: string) => x !== s) }))} style={{ background: "none", border: "none", cursor: "pointer", color: "#531dab", padding: 0, lineHeight: 1 }}>✕</button>
                  </span>
                ))}
              </div>
            )}
            <span style={{ marginLeft: "auto", fontSize: 13, color: "#7a90a8" }}>247 bản ghi</span>
          </div>

          <div className="ems-card" style={{ padding: "40px", textAlign: "center" }}>
            <div style={{ fontSize: 32, marginBottom: 10 }}>📊</div>
            <div style={{ fontSize: 14, color: "#7a90a8" }}>Kết quả sẽ hiện tại đây sau khi áp dụng bộ lọc</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---- Approval Workflow ----
type ApprovalItem = { id: string; title: string; submitter: string; dept: string; date: string; type: string; status: string; priority: string };

function ApprovalPattern() {
  const [items, setItems] = useState<ApprovalItem[]>([
    { id: "REQ001", title: "Đơn xin nghỉ học tạm thời", submitter: "Nguyễn Văn An", dept: "CNTT", date: "12/01/2025", type: "Bảo lưu", status: "Chờ duyệt", priority: "Cao" },
    { id: "REQ002", title: "Đơn đăng ký học lại HP IT201", submitter: "Trần Thị Bình", dept: "CNTT", date: "11/01/2025", type: "Học lại", status: "Chờ duyệt", priority: "Bình thường" },
    { id: "REQ003", title: "Đơn miễn giảm học phí", submitter: "Lê Minh Cường", dept: "Kinh tế", date: "10/01/2025", type: "Tài chính", status: "Đã duyệt", priority: "Cao" },
    { id: "REQ004", title: "Đơn chuyển ngành học", submitter: "Phạm Thị Dung", dept: "Ngoại ngữ", date: "09/01/2025", type: "Chuyển ngành", status: "Từ chối", priority: "Bình thường" },
    { id: "REQ005", title: "Đơn xin xét đặc cách tốt nghiệp", submitter: "Vũ Thị Phương", dept: "CNTT", date: "08/01/2025", type: "Tốt nghiệp", status: "Chờ duyệt", priority: "Khẩn" },
  ]);
  const [selectedItem, setSelectedItem] = useState<ApprovalItem | null>(items[0]);
  const [note, setNote] = useState("");

  const approve = (id: string) => {
    setItems(prev => prev.map(i => i.id === id ? { ...i, status: "Đã duyệt" } : i));
    if (selectedItem?.id === id) setSelectedItem(i => i ? { ...i, status: "Đã duyệt" } : null);
  };
  const reject = (id: string) => {
    setItems(prev => prev.map(i => i.id === id ? { ...i, status: "Từ chối" } : i));
    if (selectedItem?.id === id) setSelectedItem(i => i ? { ...i, status: "Từ chối" } : null);
  };

  const statusConfig: Record<string, { cls: string; color: string }> = {
    "Chờ duyệt": { cls: "ems-badge-blue", color: "#1677ff" },
    "Đã duyệt": { cls: "ems-badge-green", color: "#52c41a" },
    "Từ chối": { cls: "ems-badge-red", color: "#ff4d4f" },
  };
  const priorityConfig: Record<string, string> = {
    "Khẩn": "#ff4d4f", "Cao": "#fa8c16", "Bình thường": "#7a90a8"
  };

  return (
    <div>
      <div className="section-label">Approval Workflow — Duyệt đơn từ sinh viên</div>
      <div style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: 16 }}>
        {/* List */}
        <div className="ems-card" style={{ overflow: "hidden" }}>
          <div className="ems-card-header">
            <span style={{ fontWeight: 700, fontSize: 14 }}>Danh sách đơn từ</span>
            <span className="ems-badge ems-badge-blue">{items.filter(i => i.status === "Chờ duyệt").length} chờ</span>
          </div>
          <div>
            {items.map(item => (
              <div key={item.id}
                onClick={() => setSelectedItem(item)}
                style={{
                  padding: "12px 16px", borderBottom: "1px solid #e8eef5",
                  cursor: "pointer", background: selectedItem?.id === item.id ? "#e6f4ff" : "white",
                  borderLeft: `3px solid ${selectedItem?.id === item.id ? "#1677ff" : "transparent"}`,
                  transition: "all 0.1s",
                }}
                onMouseEnter={e => { if (selectedItem?.id !== item.id) e.currentTarget.style.background = "#f5f7fa"; }}
                onMouseLeave={e => { if (selectedItem?.id !== item.id) e.currentTarget.style.background = "white"; }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontSize: 12, fontFamily: "JetBrains Mono,monospace", color: "#7a90a8" }}>{item.id}</span>
                  <span style={{ fontSize: 11, color: priorityConfig[item.priority], fontWeight: 600 }}>● {item.priority}</span>
                </div>
                <div style={{ fontWeight: 600, fontSize: 13.5, color: "#0f1b2d", marginBottom: 4, lineHeight: 1.4 }}>{item.title}</div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 12, color: "#7a90a8" }}>{item.submitter} • {item.date}</span>
                  <span className={`ems-badge ${statusConfig[item.status].cls}`} style={{ fontSize: 11 }}>{item.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Detail */}
        {selectedItem && (
          <div className="ems-card" style={{ overflow: "hidden" }}>
            <div className="ems-card-header">
              <div>
                <div style={{ fontWeight: 700, fontSize: 16, color: "#0f1b2d" }}>{selectedItem.title}</div>
                <div style={{ fontSize: 12, color: "#7a90a8", marginTop: 2 }}>{selectedItem.id} • Nộp ngày {selectedItem.date}</div>
              </div>
              <span className={`ems-badge ${statusConfig[selectedItem.status].cls}`}>{selectedItem.status}</span>
            </div>
            <div className="ems-card-body">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
                {[
                  ["Người nộp đơn", selectedItem.submitter],
                  ["Khoa", selectedItem.dept],
                  ["Loại đơn", selectedItem.type],
                  ["Mức độ ưu tiên", selectedItem.priority],
                ].map(([k, v]) => (
                  <div key={k as string} style={{ background: "#f5f7fa", borderRadius: 6, padding: "10px 12px" }}>
                    <div style={{ fontSize: 11, color: "#7a90a8", fontWeight: 600, marginBottom: 2 }}>{k as string}</div>
                    <div style={{ fontSize: 14, fontWeight: 500, color: "#0f1b2d" }}>{v as string}</div>
                  </div>
                ))}
              </div>

              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#4a5e78", marginBottom: 8 }}>Nội dung đơn</div>
                <div style={{ background: "#f5f7fa", borderRadius: 6, padding: 14, fontSize: 14, color: "#0f1b2d", lineHeight: 1.7 }}>
                  Kính gửi Ban Giám hiệu và Phòng Đào tạo, tôi là {selectedItem.submitter}, sinh viên khoa {selectedItem.dept}.
                  Tôi xin phép {selectedItem.title.toLowerCase()} theo quy định của nhà trường. Lý do: vì hoàn cảnh gia đình đặc biệt khó khăn.
                  Kính mong Ban Giám hiệu xem xét và chấp thuận đơn của tôi.
                </div>
              </div>

              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#4a5e78", marginBottom: 6 }}>Tài liệu đính kèm</div>
                {["don_xin.pdf", "giay_to_bo_sung.pdf"].map(f => (
                  <div key={f} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 10px", borderRadius: 6, border: "1px solid #d1dbe8", marginBottom: 6, cursor: "pointer" }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = "#1677ff"}
                    onMouseLeave={e => e.currentTarget.style.borderColor = "#d1dbe8"}
                  >
                    <span>📄</span>
                    <span style={{ fontSize: 13, color: "#1677ff", flex: 1 }}>{f}</span>
                    <span style={{ fontSize: 12, color: "#7a90a8" }}>⬇</span>
                  </div>
                ))}
              </div>

              {selectedItem.status === "Chờ duyệt" && (
                <>
                  <div style={{ marginBottom: 16 }}>
                    <label className="ems-label">Ghi chú phê duyệt</label>
                    <textarea className="ems-input" rows={3} placeholder="Nhập ghi chú hoặc lý do từ chối..."
                      value={note} onChange={e => setNote(e.target.value)} />
                  </div>
                  <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
                    <button className="ems-btn ems-btn-secondary ems-btn-md">Chuyển tiếp</button>
                    <button className="ems-btn ems-btn-danger ems-btn-md" onClick={() => reject(selectedItem.id)}>✕ Từ chối</button>
                    <button className="ems-btn ems-btn-success ems-btn-md" onClick={() => approve(selectedItem.id)}>✓ Phê duyệt</button>
                  </div>
                </>
              )}
              {selectedItem.status !== "Chờ duyệt" && (
                <div className={`ems-alert ${selectedItem.status === "Đã duyệt" ? "ems-alert-success" : "ems-alert-error"}`}>
                  <span>{selectedItem.status === "Đã duyệt" ? "✓" : "✕"}</span>
                  <span>Đơn này đã được <strong>{selectedItem.status.toLowerCase()}</strong>.</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ---- Schedule / Timetable ----
function SchedulePattern() {
  const PERIODS = ["Tiết 1–3\n07:00–09:30", "Tiết 4–6\n09:45–12:15", "Tiết 7–9\n13:00–15:30", "Tiết 10–12\n15:45–18:15"];
  const DAYS = ["Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"];

  const SCHEDULE: Record<string, Record<string, { code: string; name: string; room: string; teacher: string; color: string }>> = {
    "Thứ Hai": {
      "Tiết 1–3\n07:00–09:30": { code: "IT302", name: "Lập trình Web", room: "H2-301", teacher: "Nguyễn Thị Lan", color: "#e6f4ff" },
      "Tiết 7–9\n13:00–15:30": { code: "IT401", name: "Trí tuệ nhân tạo", room: "H3-102", teacher: "Trần Văn Khoa", color: "#f9f0ff" },
    },
    "Thứ Ba": {
      "Tiết 4–6\n09:45–12:15": { code: "IT303", name: "Cơ sở dữ liệu", room: "H1-201", teacher: "Lê Minh Hải", color: "#fff7e6" },
    },
    "Thứ Tư": {
      "Tiết 1–3\n07:00–09:30": { code: "IT302", name: "Lập trình Web (Lab)", room: "Lab-A01", teacher: "Nguyễn Thị Lan", color: "#e6f4ff" },
      "Tiết 10–12\n15:45–18:15": { code: "IT501", name: "Kiến trúc phần mềm", room: "H2-402", teacher: "Phạm Đức Tùng", color: "#f6ffed" },
    },
    "Thứ Năm": {
      "Tiết 4–6\n09:45–12:15": { code: "IT303", name: "Cơ sở dữ liệu (Lab)", room: "Lab-B02", teacher: "Lê Minh Hải", color: "#fff7e6" },
      "Tiết 7–9\n13:00–15:30": { code: "ENG201", name: "Tiếng Anh chuyên ngành", room: "C1-105", teacher: "Hoàng Thu Hà", color: "#fff2f0" },
    },
    "Thứ Sáu": {
      "Tiết 1–3\n07:00–09:30": { code: "IT401", name: "Trí tuệ nhân tạo", room: "H3-102", teacher: "Trần Văn Khoa", color: "#f9f0ff" },
    },
  };

  const today = "Thứ Tư";

  return (
    <div>
      <div className="section-label">Thời khóa biểu — Weekly Schedule</div>
      <div className="ems-card" style={{ overflow: "hidden" }}>
        <div className="ems-card-header">
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button className="ems-btn ems-btn-secondary ems-btn-sm">‹ Tuần trước</button>
            <span style={{ fontWeight: 700, fontSize: 14 }}>06/01 – 11/01/2025</span>
            <button className="ems-btn ems-btn-secondary ems-btn-sm">Tuần sau ›</button>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="ems-btn ems-btn-ghost ems-btn-sm">Ngày</button>
            <button className="ems-btn ems-btn-primary ems-btn-sm">Tuần</button>
            <button className="ems-btn ems-btn-ghost ems-btn-sm">Tháng</button>
          </div>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 700 }}>
            <thead>
              <tr>
                <th style={{ width: 120, padding: "10px 14px", background: "#f5f7fa", borderBottom: "1px solid #d1dbe8", fontSize: 12, color: "#7a90a8", textAlign: "left" }}>Tiết học</th>
                {DAYS.map(d => (
                  <th key={d} style={{
                    padding: "10px 14px", background: d === today ? "#e6f4ff" : "#f5f7fa",
                    borderBottom: "1px solid #d1dbe8", fontSize: 13, fontWeight: d === today ? 700 : 500,
                    color: d === today ? "#1677ff" : "#4a5e78", textAlign: "center",
                    borderLeft: d === today ? "2px solid #1677ff" : undefined,
                  }}>
                    {d} {d === today && <span style={{ fontSize: 10, display: "block", color: "#4096ff" }}>Hôm nay</span>}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PERIODS.map(period => (
                <tr key={period}>
                  <td style={{ padding: "10px 14px", borderBottom: "1px solid #e8eef5", fontSize: 11, color: "#7a90a8", lineHeight: 1.5, whiteSpace: "pre-line", verticalAlign: "top" }}>
                    {period}
                  </td>
                  {DAYS.map(day => {
                    const cell = SCHEDULE[day]?.[period];
                    return (
                      <td key={day} style={{
                        padding: "6px", borderBottom: "1px solid #e8eef5", verticalAlign: "top",
                        background: day === today ? "rgba(22,119,255,0.02)" : "white",
                        borderLeft: day === today ? "2px solid rgba(22,119,255,0.2)" : undefined,
                      }}>
                        {cell && (
                          <div style={{
                            background: cell.color, border: `1px solid ${cell.color.replace("ff", "aa")}`,
                            borderRadius: 6, padding: "8px 10px", cursor: "pointer",
                            transition: "all 0.1s",
                          }}
                            onMouseEnter={e => e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)"}
                            onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
                          >
                            <div style={{ fontWeight: 700, fontSize: 12, color: "#0958d9", marginBottom: 2 }}>{cell.code}</div>
                            <div style={{ fontSize: 12, fontWeight: 500, color: "#0f1b2d", lineHeight: 1.3, marginBottom: 4 }}>{cell.name}</div>
                            <div style={{ fontSize: 11, color: "#4a5e78" }}>📍 {cell.room}</div>
                            <div style={{ fontSize: 11, color: "#7a90a8" }}>👤 {cell.teacher}</div>
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ---- Attendance ----
function AttendancePattern() {
  const [attendance, setAttendance] = useState<Record<string, "present" | "absent" | "late" | null>>({});
  const students = [
    "Nguyễn Văn An", "Trần Thị Bình", "Lê Minh Cường", "Phạm Thị Dung",
    "Hoàng Văn Em", "Vũ Thị Phương", "Đặng Văn Quân", "Bùi Thị Lan",
    "Đinh Văn Nam", "Ngô Thị Oanh",
  ];
  const mark = (name: string, val: "present" | "absent" | "late") => {
    setAttendance(a => ({ ...a, [name]: a[name] === val ? null : val }));
  };
  const markAll = (val: "present" | "absent") => {
    const m: Record<string, "present" | "absent" | "late" | null> = {};
    students.forEach(s => { m[s] = val; });
    setAttendance(m);
  };

  const counts = {
    present: students.filter(s => attendance[s] === "present").length,
    absent: students.filter(s => attendance[s] === "absent").length,
    late: students.filter(s => attendance[s] === "late").length,
  };

  return (
    <div>
      <div className="section-label">Điểm danh — Attendance Marking</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 16 }}>
        <div className="ems-card" style={{ overflow: "hidden" }}>
          <div className="ems-card-header">
            <div>
              <div style={{ fontWeight: 700, fontSize: 14 }}>IT302 — Lập trình Web</div>
              <div style={{ fontSize: 12, color: "#7a90a8" }}>Tiết 1–3 • 07:00 • Thứ Tư 08/01/2025 • H2-301</div>
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              <button className="ems-btn ems-btn-success ems-btn-sm" onClick={() => markAll("present")}>✓ Tất cả có mặt</button>
              <button className="ems-btn ems-btn-secondary ems-btn-sm" onClick={() => markAll("absent")}>✕ Tất cả vắng</button>
            </div>
          </div>
          <div>
            {students.map((s, i) => {
              const state = attendance[s];
              return (
                <div key={s} style={{
                  display: "flex", alignItems: "center", gap: 12, padding: "10px 16px",
                  borderBottom: "1px solid #e8eef5",
                  background: state === "present" ? "#f6ffed" : state === "absent" ? "#fff2f0" : state === "late" ? "#fff7e6" : "white",
                }}>
                  <span style={{ fontSize: 12, color: "#b0bec8", width: 20, textAlign: "right" }}>{i + 1}</span>
                  <div className="ems-avatar" style={{ width: 28, height: 28, fontSize: 10,
                    background: ["#1677ff","#722ed1","#52c41a","#fa8c16","#ff4d4f"][i % 5] }}>
                    {s.split(" ").slice(-1)[0][0]}
                  </div>
                  <span style={{ flex: 1, fontSize: 13.5, fontWeight: 500, color: "#0f1b2d" }}>{s}</span>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button onClick={() => mark(s, "present")} className={`ems-btn ems-btn-xs ${state === "present" ? "ems-btn-success" : "ems-btn-secondary"}`}>✓ Có mặt</button>
                    <button onClick={() => mark(s, "late")} className={`ems-btn ems-btn-xs ${state === "late" ? "" : "ems-btn-secondary"}`}
                      style={state === "late" ? { background: "#fa8c16", color: "white", borderColor: "#fa8c16" } : undefined}>⏰ Muộn</button>
                    <button onClick={() => mark(s, "absent")} className={`ems-btn ems-btn-xs ${state === "absent" ? "ems-btn-danger" : "ems-btn-secondary"}`}>✕ Vắng</button>
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{ padding: "12px 16px", borderTop: "1px solid #e8eef5", display: "flex", justifyContent: "flex-end", gap: 8 }}>
            <button className="ems-btn ems-btn-secondary ems-btn-sm">Lưu nháp</button>
            <button className="ems-btn ems-btn-primary ems-btn-sm">Xác nhận điểm danh</button>
          </div>
        </div>

        {/* Summary */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div className="ems-stat-card">
            <div style={{ fontSize: 13, color: "#7a90a8", marginBottom: 4 }}>Tổng sinh viên</div>
            <div style={{ fontSize: 28, fontWeight: 800, color: "#0f1b2d" }}>{students.length}</div>
            <div style={{ fontSize: 12, color: "#b0bec8" }}>Đã điểm danh: {Object.keys(attendance).length}</div>
          </div>
          {[
            { label: "Có mặt", count: counts.present, color: "#52c41a", bg: "#f6ffed" },
            { label: "Đi muộn", count: counts.late, color: "#fa8c16", bg: "#fff7e6" },
            { label: "Vắng mặt", count: counts.absent, color: "#ff4d4f", bg: "#fff2f0" },
          ].map(c => (
            <div key={c.label} style={{ background: c.bg, border: `1px solid ${c.color}33`, borderRadius: 8, padding: "14px 16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: 13, color: c.color, fontWeight: 600 }}>{c.label}</span>
                <span style={{ fontSize: 24, fontWeight: 800, color: c.color }}>{c.count}</span>
              </div>
              <div style={{ height: 4, background: "#e8eef5", borderRadius: 2, marginTop: 8 }}>
                <div style={{ width: `${students.length > 0 ? (c.count / students.length) * 100 : 0}%`, height: "100%", background: c.color, borderRadius: 2 }} />
              </div>
            </div>
          ))}
          <div style={{ background: "#f5f7fa", borderRadius: 8, padding: "14px 16px", border: "1px solid #d1dbe8" }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#4a5e78", marginBottom: 6 }}>Tỷ lệ chuyên cần</div>
            <div style={{ fontSize: 32, fontWeight: 800, color: counts.present + counts.late > 0 ? "#1677ff" : "#b0bec8" }}>
              {students.length > 0 ? Math.round(((counts.present + counts.late) / students.length) * 100) : 0}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---- Permission Matrix ----
function PermissionPattern() {
  const ROLES = ["Quản trị viên", "Trưởng khoa", "Giảng viên", "Cố vấn HT", "Sinh viên"];
  const MODULES = [
    { name: "Quản lý sinh viên", perms: ["Xem", "Thêm", "Sửa", "Xóa"] },
    { name: "Quản lý học phần", perms: ["Xem", "Thêm", "Sửa", "Xóa"] },
    { name: "Nhập điểm", perms: ["Xem", "Nhập", "Sửa", "Duyệt"] },
    { name: "Điểm danh", perms: ["Xem", "Điểm danh", "Sửa"] },
    { name: "Báo cáo", perms: ["Xem", "Xuất", "Tạo"] },
    { name: "Cấu hình hệ thống", perms: ["Xem", "Sửa"] },
  ];

  const DEFAULT_MATRIX: Record<string, Record<string, boolean>> = {
    "Quản lý sinh viên|Quản trị viên": { Xem: true, Thêm: true, Sửa: true, Xóa: true },
    "Quản lý sinh viên|Trưởng khoa": { Xem: true, Thêm: false, Sửa: true, Xóa: false },
    "Quản lý sinh viên|Giảng viên": { Xem: true, Thêm: false, Sửa: false, Xóa: false },
    "Quản lý sinh viên|Cố vấn HT": { Xem: true, Thêm: false, Sửa: true, Xóa: false },
    "Quản lý sinh viên|Sinh viên": { Xem: false, Thêm: false, Sửa: false, Xóa: false },
    "Nhập điểm|Giảng viên": { Xem: true, Nhập: true, Sửa: true, Duyệt: false },
    "Nhập điểm|Trưởng khoa": { Xem: true, Nhập: false, Sửa: false, Duyệt: true },
    "Nhập điểm|Quản trị viên": { Xem: true, Nhập: true, Sửa: true, Duyệt: true },
    "Báo cáo|Sinh viên": { Xem: true, Xuất: false, Tạo: false },
    "Cấu hình hệ thống|Quản trị viên": { Xem: true, Sửa: true },
  };

  const [matrix, setMatrix] = useState(DEFAULT_MATRIX);
  const getVal = (module: string, role: string, perm: string): boolean => {
    const key = `${module}|${role}`;
    if (matrix[key]?.[perm] !== undefined) return matrix[key][perm];
    if (role === "Quản trị viên") return true;
    return false;
  };
  const toggle = (module: string, role: string, perm: string) => {
    const key = `${module}|${role}`;
    setMatrix(m => ({ ...m, [key]: { ...(m[key] || {}), [perm]: !getVal(module, role, perm) } }));
  };

  return (
    <div>
      <div className="section-label">Role Permission Matrix — Ma trận phân quyền</div>
      <div className="ems-card" style={{ overflow: "hidden" }}>
        <div className="ems-card-header">
          <span style={{ fontWeight: 700, fontSize: 14 }}>🔐 Ma trận phân quyền theo vai trò</span>
          <button className="ems-btn ems-btn-primary ems-btn-sm">Lưu thay đổi</button>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ padding: "10px 16px", background: "#f5f7fa", borderBottom: "1px solid #d1dbe8", fontSize: 13, fontWeight: 600, color: "#4a5e78", textAlign: "left", minWidth: 160 }}>Chức năng</th>
                <th style={{ padding: "10px 16px", background: "#f5f7fa", borderBottom: "1px solid #d1dbe8", fontSize: 12, color: "#7a90a8", textAlign: "left" }}>Quyền</th>
                {ROLES.map(role => (
                  <th key={role} style={{ padding: "10px 12px", background: "#f5f7fa", borderBottom: "1px solid #d1dbe8", fontSize: 12, fontWeight: 600, color: "#4a5e78", textAlign: "center", minWidth: 96 }}>
                    {role}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MODULES.map((mod, mi) => (
                mod.perms.map((perm, pi) => (
                  <tr key={`${mod.name}-${perm}`} style={{ background: mi % 2 === 0 ? "white" : "#fafbfc" }}>
                    {pi === 0 && (
                      <td rowSpan={mod.perms.length} style={{
                        padding: "10px 16px", borderBottom: "1px solid #e8eef5",
                        borderRight: "1px solid #e8eef5", fontWeight: 600, fontSize: 13.5, color: "#0f1b2d",
                        verticalAlign: "middle",
                      }}>
                        {mod.name}
                      </td>
                    )}
                    <td style={{ padding: "8px 16px", borderBottom: "1px solid #e8eef5", fontSize: 12, color: "#7a90a8" }}>{perm}</td>
                    {ROLES.map(role => {
                      const val = getVal(mod.name, role, perm);
                      const isAdmin = role === "Quản trị viên";
                      return (
                        <td key={role} style={{ padding: "8px 12px", borderBottom: "1px solid #e8eef5", textAlign: "center" }}>
                          <input type="checkbox" className="ems-checkbox"
                            checked={val}
                            disabled={isAdmin}
                            onChange={() => !isAdmin && toggle(mod.name, role, perm)}
                            style={{ cursor: isAdmin ? "not-allowed" : "pointer" }}
                          />
                        </td>
                      );
                    })}
                  </tr>
                ))
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default function Page05Patterns() {
  const [activeTab, setActiveTab] = useState(0);
  const renderContent = () => {
    switch (activeTab) {
      case 0: return <AdvancedFilterPattern />;
      case 1: return <ApprovalPattern />;
      case 2: return <SchedulePattern />;
      case 3: return <AttendancePattern />;
      case 4: return <PermissionPattern />;
      default: return null;
    }
  };

  return (
    <div style={{ padding: 32, maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#7a90a8", marginBottom: 6 }}>05</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: "#0f1b2d", margin: 0, marginBottom: 6 }}>Patterns</h1>
        <p style={{ fontSize: 14, color: "#7a90a8", margin: 0 }}>Luồng tương tác enterprise: bộ lọc, phê duyệt, lịch học, điểm danh, phân quyền</p>
      </div>
      <div className="ems-tabs-nav" style={{ marginBottom: 28 }}>
        {TABS.map((t, i) => (
          <div key={t} className={`ems-tab-item ${activeTab === i ? "active" : ""}`} onClick={() => setActiveTab(i)}>{t}</div>
        ))}
      </div>
      {renderContent()}
    </div>
  );
}
