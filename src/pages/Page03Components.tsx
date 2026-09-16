import { useState } from "react";

const TABS = ["Actions", "Forms", "Navigation", "Feedback", "Overlays", "Data Display", "Advanced"];

/* ── helpers ─────────────────────────────────────────────────── */
function SectionTitle({ children }: { children: React.ReactNode }) {
  return <div style={{ fontSize: 15, fontWeight: 700, color: "#0f1b2d", marginBottom: 4 }}>{children}</div>;
}
function SectionDesc({ children }: { children: React.ReactNode }) {
  return <div style={{ fontSize: 13, color: "#7a90a8", marginBottom: 14 }}>{children}</div>;
}
function Divider() {
  return <div style={{ height: 1, background: "#e8eef5", margin: "28px 0" }} />;
}
function DemoBox({ children, bg = "white", label }: { children: React.ReactNode; bg?: string; label?: string }) {
  return (
    <div style={{ background: bg, border: "1px solid #d1dbe8", borderRadius: 8, padding: 20 }}>
      {label && <div style={{ fontSize: 11, fontWeight: 700, color: "#b0bec8", letterSpacing: "0.06em", marginBottom: 12 }}>{label}</div>}
      {children}
    </div>
  );
}

/* ── Actions tab ─────────────────────────────────────────────── */
function ActionsSection() {
  const [loading, setLoading] = useState(false);
  const [splitOpen, setSplitOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState("Tuần");

  return (
    <div>
      <div className="page-section">
        <SectionTitle>Button Variants × Sizes</SectionTitle>
        <SectionDesc>5 variants × 4 sizes. Mỗi variant có đủ states: default, hover, active, disabled, loading.</SectionDesc>
        <DemoBox label="VARIANTS">
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { v: "primary", name: "Primary" },
              { v: "secondary", name: "Secondary" },
              { v: "ghost", name: "Ghost" },
              { v: "danger", name: "Danger" },
              { v: "success", name: "Success" },
            ].map(({ v, name }) => (
              <div key={v} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 90, fontSize: 12, color: "#7a90a8", fontFamily: "JetBrains Mono,monospace" }}>.btn-{v}</div>
                {(["xs", "sm", "md", "lg"] as const).map(s => (
                  <button key={s} className={`ems-btn ems-btn-${v} ems-btn-${s}`}>{name} {s.toUpperCase()}</button>
                ))}
                <button className={`ems-btn ems-btn-${v} ems-btn-md`} disabled>Disabled</button>
              </div>
            ))}
          </div>
        </DemoBox>
      </div>

      <Divider />
      <div className="page-section">
        <SectionTitle>Icon Buttons & Loading State</SectionTitle>
        <div className="component-row" style={{ flexWrap: "wrap" }}>
          {["primary", "secondary", "ghost", "danger"].map(v => (
            <button key={v} className={`ems-btn ems-btn-${v} ems-btn-md`}
              style={{ width: 38, height: 38, padding: 0, justifyContent: "center" }}
              title={v}>
              {v === "primary" ? "＋" : v === "secondary" ? "✎" : v === "ghost" ? "↻" : "🗑"}
            </button>
          ))}
          <button className="ems-btn ems-btn-primary ems-btn-md" onClick={() => { setLoading(true); setTimeout(() => setLoading(false), 2000); }} style={{ minWidth: 160 }}>
            {loading ? (
              <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ width: 14, height: 14, border: "2px solid rgba(255,255,255,0.35)", borderTopColor: "white", borderRadius: "50%", display: "inline-block", animation: "spin 0.7s linear infinite" }} />
                Đang lưu...
              </span>
            ) : "Nhấn → Loading"}
          </button>
        </div>
      </div>

      <Divider />
      <div className="page-section">
        <SectionTitle>Button Groups & Toggle Group</SectionTitle>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {/* Toggle group */}
          <div style={{ display: "flex", background: "#f0f4f8", borderRadius: 8, padding: 3, gap: 2 }}>
            {["Ngày", "Tuần", "Tháng", "Học kỳ"].map(l => (
              <button key={l} onClick={() => setSelectedGroup(l)} style={{
                flex: 1, padding: "6px 12px", borderRadius: 6, border: "none",
                background: selectedGroup === l ? "white" : "transparent",
                color: selectedGroup === l ? "#0f1b2d" : "#7a90a8",
                fontWeight: selectedGroup === l ? 600 : 400, fontSize: 13, cursor: "pointer",
                boxShadow: selectedGroup === l ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
                transition: "all 0.15s",
              }}>{l}</button>
            ))}
          </div>
          {/* Segmented inline */}
          <div style={{ display: "flex", border: "1px solid #d1dbe8", borderRadius: 6, overflow: "hidden" }}>
            {["Tất cả (247)", "Đang học (180)", "Cảnh báo (42)", "Đình chỉ (25)"].map((l, i) => (
              <button key={l} style={{
                flex: 1, padding: "7px 12px", border: "none", borderRight: i < 3 ? "1px solid #d1dbe8" : "none",
                background: i === 0 ? "#1677ff" : "white", color: i === 0 ? "white" : "#4a5e78",
                fontSize: 13, cursor: "pointer", fontWeight: i === 0 ? 600 : 400, transition: "all 0.15s",
              }}
                onMouseEnter={e => { if (i !== 0) e.currentTarget.style.background = "#f0f4f8"; }}
                onMouseLeave={e => { if (i !== 0) e.currentTarget.style.background = "white"; }}
              >{l}</button>
            ))}
          </div>
        </div>
      </div>

      <Divider />
      <div className="page-section">
        <SectionTitle>Split Button & Dropdown Button</SectionTitle>
        <div className="component-row">
          {/* Split button */}
          <div style={{ display: "flex", position: "relative" }}>
            <button className="ems-btn ems-btn-primary ems-btn-md" style={{ borderRadius: "6px 0 0 6px", borderRight: "1px solid #0958d9" }}>
              ⬇ Xuất Excel
            </button>
            <div style={{ position: "relative" }}>
              <button className="ems-btn ems-btn-primary ems-btn-md" onClick={() => setSplitOpen(o => !o)}
                style={{ borderRadius: "0 6px 6px 0", padding: "0 10px" }}>▾</button>
              {splitOpen && (
                <>
                  <div style={{ position: "fixed", inset: 0, zIndex: 99 }} onClick={() => setSplitOpen(false)} />
                  <div style={{ position: "absolute", top: "calc(100% + 4px)", right: 0, background: "white", border: "1px solid #d1dbe8", borderRadius: 8, boxShadow: "0 4px 16px rgba(0,0,0,0.12)", zIndex: 100, minWidth: 160, overflow: "hidden" }}>
                    {["Xuất Excel (.xlsx)", "Xuất CSV (.csv)", "Xuất PDF (.pdf)"].map(o => (
                      <button key={o} onClick={() => setSplitOpen(false)} style={{ width: "100%", textAlign: "left", padding: "9px 14px", background: "none", border: "none", cursor: "pointer", fontSize: 13, color: "#0f1b2d" }}
                        onMouseEnter={e => e.currentTarget.style.background = "#f5f7fa"}
                        onMouseLeave={e => e.currentTarget.style.background = "none"}
                      >{o}</button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Bulk action bar */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, background: "#e6f4ff", border: "1px solid #91caff", borderRadius: 8, padding: "8px 14px" }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: "#0958d9" }}>42 đã chọn</span>
            <div style={{ width: 1, height: 18, background: "#91caff" }} />
            <button className="ems-btn ems-btn-ghost ems-btn-sm" style={{ color: "#0958d9" }}>📄 Xuất</button>
            <button className="ems-btn ems-btn-ghost ems-btn-sm" style={{ color: "#0958d9" }}>✉ Gửi email</button>
            <button className="ems-btn ems-btn-ghost ems-btn-sm" style={{ color: "#cf1322" }}>🗑 Xóa</button>
            <button className="ems-btn ems-btn-ghost ems-btn-xs" style={{ color: "#7a90a8" }}>✕</button>
          </div>
        </div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

/* ── Forms tab ───────────────────────────────────────────────── */
function FormsSection() {
  const [sw1, setSw1] = useState(true);
  const [sw2, setSw2] = useState(false);
  const [radio, setRadio] = useState("fulltime");
  const [checks, setChecks] = useState<string[]>(["monday", "wednesday"]);
  const [pw, setPw] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [textarea, setTextarea] = useState("");
  const [range, setRange] = useState(65);

  const pwStr = pw.length < 6 ? "Yếu" : pw.length < 10 ? "Trung bình" : pw.length < 14 ? "Mạnh" : "Rất mạnh";
  const pwColor = pw.length < 6 ? "#ff4d4f" : pw.length < 10 ? "#fa8c16" : pw.length < 14 ? "#1677ff" : "#52c41a";
  const pwPct = Math.min(100, (pw.length / 16) * 100);

  const toggleCheck = (val: string) => setChecks(c => c.includes(val) ? c.filter(x => x !== val) : [...c, val]);

  return (
    <div>
      {/* Text inputs states */}
      <div className="page-section">
        <SectionTitle>Input States</SectionTitle>
        <SectionDesc>Default → Hover → Focus → Filled → Error → Success → Read-only → Disabled</SectionDesc>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14 }}>
          {[
            { label: "Mặc định", placeholder: "Nhập tên...", cls: "" },
            { label: "Có giá trị", placeholder: "", defaultVal: "Nguyễn Văn An", cls: "" },
            { label: "Lỗi", defaultVal: "SV0001@@@", cls: "error", helper: "⚠ Mã SV không hợp lệ", helperType: "error" },
            { label: "Hợp lệ", defaultVal: "SV2024001", cls: "success", helper: "✓ Mã SV hợp lệ", helperType: "success" },
            { label: "Read-only", defaultVal: "K46 — CNTT", cls: "", readOnly: true, hint: "Read-only" },
            { label: "Disabled", placeholder: "Không thể nhập", cls: "", disabled: true },
            { label: "Bắt buộc *", placeholder: "Chọn khoa...", cls: "" },
            { label: "Với prefix", placeholder: "Tìm kiếm...", cls: "", prefix: "🔍" },
          ].map((f, i) => (
            <div key={i}>
              <label className="ems-label">{f.label}</label>
              <div style={{ position: "relative" }}>
                {f.prefix && <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#7a90a8", fontSize: 14 }}>{f.prefix}</span>}
                <input className={`ems-input ${f.cls}`}
                  placeholder={f.placeholder}
                  defaultValue={(f as { defaultVal?: string }).defaultVal}
                  readOnly={(f as { readOnly?: boolean }).readOnly}
                  disabled={f.disabled}
                  style={{
                    paddingLeft: f.prefix ? 32 : undefined,
                    background: (f as { readOnly?: boolean }).readOnly ? "#f5f7fa" : undefined,
                    color: (f as { readOnly?: boolean }).readOnly ? "#4a5e78" : undefined,
                  }}
                />
              </div>
              {(f as { helper?: string }).helper && <p className={`ems-helper ${(f as { helperType?: string }).helperType}`}>{(f as { helper: string }).helper}</p>}
              {(f as { hint?: string }).hint && <p className="ems-helper">{(f as { hint: string }).hint}</p>}
            </div>
          ))}
        </div>
      </div>

      <Divider />
      <div className="page-section">
        <SectionTitle>Password Strength & Character Counter</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          <div>
            <label className="ems-label required">Mật khẩu</label>
            <div style={{ position: "relative" }}>
              <input type={showPw ? "text" : "password"} className="ems-input" value={pw} onChange={e => setPw(e.target.value)} placeholder="Tạo mật khẩu..." style={{ paddingRight: 36 }} />
              <button onClick={() => setShowPw(s => !s)} style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", fontSize: 15 }}>
                {showPw ? "🙈" : "👁"}
              </button>
            </div>
            {pw.length > 0 && (
              <div style={{ marginTop: 8 }}>
                <div style={{ display: "flex", gap: 3, marginBottom: 4 }}>
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: pw.length >= i * 4 ? pwColor : "#e8eef5", transition: "background 0.3s" }} />
                  ))}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 12, color: pwColor, fontWeight: 600 }}>{pwStr}</span>
                  <span style={{ fontSize: 11, color: "#b0bec8" }}>{pw.length}/16 ký tự</span>
                </div>
                <div style={{ height: 2, background: "#e8eef5", borderRadius: 1, marginTop: 4 }}>
                  <div style={{ width: `${pwPct}%`, height: "100%", background: pwColor, borderRadius: 1, transition: "all 0.3s" }} />
                </div>
              </div>
            )}
          </div>
          <div>
            <label className="ems-label">Nhận xét sinh viên</label>
            <textarea className="ems-input" rows={4} maxLength={300} value={textarea} onChange={e => setTextarea(e.target.value)}
              placeholder="Nhập nhận xét chi tiết..." style={{ resize: "vertical", position: "relative" }} />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p className="ems-helper">Mô tả ngắn gọn về sinh viên</p>
              <span style={{ fontSize: 11, color: textarea.length > 270 ? "#fa8c16" : "#b0bec8", marginTop: 4 }}>{textarea.length}/300</span>
            </div>
          </div>
        </div>
      </div>

      <Divider />
      <div className="page-section">
        <SectionTitle>Selects, Multi-select & Autocomplete</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>
          <div>
            <label className="ems-label required">Khoa / Bộ môn</label>
            <select className="ems-select">
              <option value="">— Chọn khoa —</option>
              <option>Khoa Công nghệ thông tin</option>
              <option>Khoa Kinh tế và Quản trị</option>
              <option>Khoa Ngoại ngữ</option>
              <option>Khoa Kỹ thuật cơ điện</option>
              <option>Khoa Tài chính - Kế toán</option>
            </select>
          </div>
          <div>
            <label className="ems-label">Học kỳ</label>
            <select className="ems-select" defaultValue="HK1-2024">
              <option>HK1 — 2024–2025</option>
              <option>HK2 — 2024–2025</option>
              <option>HK Hè — 2025</option>
            </select>
          </div>
          <div>
            <label className="ems-label">Trạng thái</label>
            <select className="ems-select">
              <option>Tất cả trạng thái</option>
              <option>Đang học</option>
              <option>Cảnh báo học vụ</option>
              <option>Đình chỉ</option>
              <option>Bảo lưu</option>
            </select>
          </div>
          {/* Multi-select sim */}
          <div style={{ gridColumn: "1/-1" }}>
            <label className="ems-label">Học phần đăng ký (Multi-select)</label>
            <div style={{ border: "1px solid #d1dbe8", borderRadius: 6, padding: "6px 8px", display: "flex", gap: 6, flexWrap: "wrap", minHeight: 38, cursor: "text" }}
              onMouseEnter={e => e.currentTarget.style.borderColor = "#4096ff"}
              onMouseLeave={e => e.currentTarget.style.borderColor = "#d1dbe8"}
            >
              {["IT302 — Lập trình Web", "IT303 — CSDL", "IT401 — AI"].map(tag => (
                <span key={tag} style={{ display: "inline-flex", alignItems: "center", gap: 4, background: "#e6f4ff", border: "1px solid #91caff", borderRadius: 4, padding: "2px 8px", fontSize: 12, color: "#0958d9" }}>
                  {tag}
                  <button style={{ background: "none", border: "none", cursor: "pointer", color: "#4096ff", padding: 0, lineHeight: 1, fontSize: 12 }}>✕</button>
                </span>
              ))}
              <input style={{ border: "none", outline: "none", fontSize: 13, minWidth: 120, flex: 1 }} placeholder="Tìm thêm học phần..." />
            </div>
          </div>
        </div>
      </div>

      <Divider />
      <div className="page-section">
        <SectionTitle>Checkbox, Radio & Switch</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24 }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#4a5e78", marginBottom: 10 }}>Ngày học trong tuần</div>
            {[["monday", "Thứ Hai"], ["tuesday", "Thứ Ba"], ["wednesday", "Thứ Tư"], ["thursday", "Thứ Năm"], ["friday", "Thứ Sáu"]].map(([v, l]) => (
              <label key={v} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, cursor: "pointer", fontSize: 14 }}>
                <input type="checkbox" className="ems-checkbox" checked={checks.includes(v)} onChange={() => toggleCheck(v)} />
                {l}
              </label>
            ))}
            <label style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, cursor: "pointer", fontSize: 14, color: "#b0bec8" }}>
              <input type="checkbox" className="ems-checkbox" disabled />
              Thứ Bảy (không khả dụng)
            </label>
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#4a5e78", marginBottom: 10 }}>Hình thức học</div>
            {[["fulltime", "Chính quy toàn thời gian"], ["parttime", "Vừa học vừa làm"], ["online", "Học từ xa (Online)"], ["exchange", "Trao đổi sinh viên"]].map(([v, l]) => (
              <label key={v} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, cursor: "pointer", fontSize: 14 }}>
                <input type="radio" className="ems-radio" name="study-mode" checked={radio === v} onChange={() => setRadio(v)} />
                {l}
              </label>
            ))}
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#4a5e78", marginBottom: 10 }}>Cài đặt thông báo</div>
            {[
              { label: "Thông báo qua email", val: sw1, set: setSw1 },
              { label: "Nhắc nhở nộp bài", val: sw2, set: setSw2 },
              { label: "Thông báo điểm số", val: true },
              { label: "Tin tức trường", val: false },
            ].map(s => (
              <div key={s.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                <span style={{ fontSize: 14, color: "#0f1b2d" }}>{s.label}</span>
                {s.set ? (
                  <label className="ems-switch" onClick={() => s.set(!s.val)}>
                    <div className="ems-switch-track" style={{ background: s.val ? "#1677ff" : "#d1dbe8" }} />
                    <div className="ems-switch-thumb" style={{ left: s.val ? 19 : 3 }} />
                  </label>
                ) : (
                  <label className="ems-switch">
                    <div className="ems-switch-track" style={{ background: s.val ? "#1677ff" : "#d1dbe8" }} />
                    <div className="ems-switch-thumb" style={{ left: s.val ? 19 : 3 }} />
                  </label>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <Divider />
      <div className="page-section">
        <SectionTitle>Range Slider, Date & File Upload</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>
          <div>
            <label className="ems-label">Điểm tối thiểu (GPA)</label>
            <div style={{ padding: "8px 0" }}>
              <input type="range" min={0} max={100} value={range} onChange={e => setRange(+e.target.value)}
                style={{ width: "100%", accentColor: "#1677ff" }} />
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
                <span style={{ fontSize: 12, color: "#7a90a8" }}>0.0</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#1677ff" }}>{(range / 25).toFixed(2)}</span>
                <span style={{ fontSize: 12, color: "#7a90a8" }}>4.0</span>
              </div>
            </div>
          </div>
          <div>
            <label className="ems-label required">Ngày sinh</label>
            <input type="date" className="ems-input" defaultValue="2002-05-15" />
            <p className="ems-helper">Định dạng: DD/MM/YYYY</p>
          </div>
          <div>
            <label className="ems-label">Tải lên hồ sơ</label>
            <div style={{
              border: "2px dashed #d1dbe8", borderRadius: 8, padding: "20px", textAlign: "center", cursor: "pointer",
              background: "#f5f7fa", transition: "all 0.15s",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#1677ff"; e.currentTarget.style.background = "#e6f4ff"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "#d1dbe8"; e.currentTarget.style.background = "#f5f7fa"; }}
            >
              <div style={{ fontSize: 24, marginBottom: 6 }}>📁</div>
              <div style={{ fontSize: 13, color: "#4a5e78" }}>Kéo thả hoặc <span style={{ color: "#1677ff" }}>chọn file</span></div>
              <div style={{ fontSize: 11, color: "#b0bec8", marginTop: 4 }}>PDF, DOCX — tối đa 20MB</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Navigation tab ─────────────────────────────────────────── */
function NavigationSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [step, setStep] = useState(1);

  return (
    <div>
      <div className="page-section">
        <SectionTitle>Breadcrumb</SectionTitle>
        <DemoBox>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <nav className="ems-breadcrumb">
              <a href="#">Trang chủ</a><span className="sep">›</span>
              <span className="current">Tổng quan</span>
            </nav>
            <nav className="ems-breadcrumb">
              <a href="#">Trang chủ</a><span className="sep">›</span>
              <a href="#">Quản lý học vụ</a><span className="sep">›</span>
              <a href="#">Học phần</a><span className="sep">›</span>
              <span className="current">IT302 — Lập trình Web</span>
            </nav>
            <nav className="ems-breadcrumb">
              <a href="#">Quản lý sinh viên</a><span className="sep">›</span>
              <a href="#">K46 CNTT</a><span className="sep">›</span>
              <span className="current">Nguyễn Văn An</span>
              <span style={{ marginLeft: "auto", display: "flex", gap: 6 }}>
                <button className="ems-btn ems-btn-ghost ems-btn-xs">‹ Trước</button>
                <button className="ems-btn ems-btn-ghost ems-btn-xs">Sau ›</button>
              </span>
            </nav>
          </div>
        </DemoBox>
      </div>

      <Divider />
      <div className="page-section">
        <SectionTitle>Tabs — Line & Card variants</SectionTitle>
        <DemoBox>
          {/* Line tabs */}
          <div className="ems-tabs-nav" style={{ marginBottom: 16 }}>
            {["Thông tin chung", "Sinh viên (42)", "Tài liệu (8)", "Điểm số", "Thống kê"].map((t, i) => (
              <div key={t} className={`ems-tab-item ${activeTab === i ? "active" : ""}`} onClick={() => setActiveTab(i)}>{t}</div>
            ))}
          </div>
          <div style={{ fontSize: 13.5, color: "#4a5e78", padding: "12px 0" }}>
            {activeTab === 0 && "Học phần IT302 — Lập trình Web Frontend. 3 tín chỉ, bắt buộc."}
            {activeTab === 1 && "42 sinh viên đăng ký. Tỷ lệ chuyên cần TB: 87%."}
            {activeTab === 2 && "8 tài liệu: slides, bài tập, đề thi mẫu."}
            {activeTab === 3 && "CC 10% • GK 30% • CK 60%"}
            {activeTab === 4 && "Điểm TB: 7.4 • Tỷ lệ đậu: 97.6%"}
          </div>
          {/* Card tabs */}
          <div style={{ display: "flex", gap: 4, padding: "4px", background: "#f0f4f8", borderRadius: 10, marginTop: 16 }}>
            {["Lịch học", "Phòng học", "Giảng viên"].map((t, i) => (
              <button key={t} style={{
                flex: 1, padding: "8px 12px", borderRadius: 7, border: "none",
                background: i === 0 ? "white" : "transparent",
                color: i === 0 ? "#0f1b2d" : "#7a90a8",
                fontWeight: i === 0 ? 600 : 400, fontSize: 13, cursor: "pointer",
                boxShadow: i === 0 ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
              }}>{t}</button>
            ))}
          </div>
        </DemoBox>
      </div>

      <Divider />
      <div className="page-section">
        <SectionTitle>Steps / Stepper</SectionTitle>
        <DemoBox>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 0 }}>
            {[
              { label: "Điền thông tin", desc: "Hồ sơ cơ bản" },
              { label: "Chọn học phần", desc: "Đăng ký môn" },
              { label: "Xác nhận", desc: "Kiểm tra lại" },
              { label: "Hoàn thành", desc: "Nộp đăng ký" },
            ].map((s, i) => (
              <div key={s.label} style={{ display: "flex", alignItems: "flex-start", flex: 1 }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
                  <div style={{ display: "flex", alignItems: "center", width: "100%", justifyContent: "center" }}>
                    {i > 0 && <div style={{ flex: 1, height: 1.5, background: i <= step ? "#1677ff" : "#d1dbe8" }} />}
                    <button onClick={() => setStep(i)} style={{
                      width: 32, height: 32, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                      fontWeight: 700, fontSize: 13, cursor: "pointer", border: "none", transition: "all 0.2s",
                      background: i < step ? "#1677ff" : i === step ? "white" : "#f0f4f8",
                      color: i < step ? "white" : i === step ? "#1677ff" : "#b0bec8",
                      boxShadow: i === step ? "0 0 0 4px rgba(22,119,255,0.15)" : "none",
                      outline: i === step ? "2px solid #1677ff" : "none",
                    }}>
                      {i < step ? "✓" : i + 1}
                    </button>
                    {i < 3 && <div style={{ flex: 1, height: 1.5, background: i < step ? "#1677ff" : "#d1dbe8" }} />}
                  </div>
                  <div style={{ textAlign: "center", marginTop: 8 }}>
                    <div style={{ fontSize: 12.5, fontWeight: i === step ? 600 : 400, color: i <= step ? "#0f1b2d" : "#b0bec8" }}>{s.label}</div>
                    <div style={{ fontSize: 11, color: "#7a90a8" }}>{s.desc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 20, justifyContent: "flex-end" }}>
            {step > 0 && <button className="ems-btn ems-btn-secondary ems-btn-sm" onClick={() => setStep(s => Math.max(0, s - 1))}>← Quay lại</button>}
            {step < 3 && <button className="ems-btn ems-btn-primary ems-btn-sm" onClick={() => setStep(s => Math.min(3, s + 1))}>Tiếp theo →</button>}
            {step === 3 && <button className="ems-btn ems-btn-success ems-btn-sm">✓ Hoàn thành</button>}
          </div>
        </DemoBox>
      </div>

      <Divider />
      <div className="page-section">
        <SectionTitle>Pagination — variants</SectionTitle>
        <DemoBox>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Full */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: 13, color: "#7a90a8" }}>Hiển thị 1–20 / 247 bản ghi</span>
              <div style={{ display: "flex", gap: 4 }}>
                <button className="ems-btn ems-btn-secondary ems-btn-sm">«</button>
                <button className="ems-btn ems-btn-secondary ems-btn-sm">‹</button>
                {[1, 2, 3, "...", 12, 13].map((p, i) => (
                  <button key={i} className={`ems-btn ems-btn-${p === 1 ? "primary" : "secondary"} ems-btn-sm`} style={{ minWidth: 32 }}>{p}</button>
                ))}
                <button className="ems-btn ems-btn-secondary ems-btn-sm">›</button>
                <button className="ems-btn ems-btn-secondary ems-btn-sm">»</button>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <span style={{ fontSize: 13, color: "#7a90a8" }}>Hiển thị:</span>
                <select className="ems-select" style={{ width: 72 }}><option>20</option><option>50</option><option>100</option></select>
              </div>
            </div>
            {/* Simple */}
            <div style={{ display: "flex", justifyContent: "center", gap: 4 }}>
              <button className="ems-btn ems-btn-ghost ems-btn-sm">‹ Trước</button>
              <span style={{ display: "flex", alignItems: "center", padding: "0 12px", fontSize: 13, color: "#4a5e78" }}>Trang 3 / 13</span>
              <button className="ems-btn ems-btn-ghost ems-btn-sm">Sau ›</button>
            </div>
          </div>
        </DemoBox>
      </div>
    </div>
  );
}

/* ── Feedback tab ───────────────────────────────────────────── */
function FeedbackSection() {
  const [toastVisible, setToastVisible] = useState(false);
  const [toastType, setToastType] = useState<"success" | "error" | "warning" | "info">("success");

  const showToast = (t: "success" | "error" | "warning" | "info") => {
    setToastType(t); setToastVisible(true); setTimeout(() => setToastVisible(false), 3000);
  };

  return (
    <div>
      <div className="page-section">
        <SectionTitle>Alerts — 4 semantic variants</SectionTitle>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div className="ems-alert ems-alert-info">
            <span style={{ fontSize: 16 }}>ℹ</span>
            <div><strong>Thông báo đăng ký học phần:</strong> Hệ thống mở đăng ký từ 01/08 đến 20/08/2024. <a href="#" style={{ color: "#0958d9" }}>Xem thêm →</a></div>
            <button style={{ marginLeft: "auto", background: "none", border: "none", cursor: "pointer", color: "#4096ff", fontSize: 16 }}>✕</button>
          </div>
          <div className="ems-alert ems-alert-success">
            <span style={{ fontSize: 16 }}>✓</span>
            <div><strong>Đăng ký thành công!</strong> Bạn đã đăng ký 5 học phần (15 tín chỉ) cho học kỳ 1.</div>
            <button style={{ marginLeft: "auto", background: "none", border: "none", cursor: "pointer", color: "#52c41a", fontSize: 16 }}>✕</button>
          </div>
          <div className="ems-alert ems-alert-warning">
            <span style={{ fontSize: 16 }}>⚠</span>
            <div><strong>Cảnh báo học vụ:</strong> SV Nguyễn Văn An nghỉ vượt 20%. Liên hệ cố vấn học tập ngay.</div>
          </div>
          <div className="ems-alert ems-alert-error">
            <span style={{ fontSize: 16 }}>✕</span>
            <div><strong>Lỗi hệ thống:</strong> Không thể kết nối máy chủ. Vui lòng thử lại sau vài phút.</div>
          </div>
        </div>
      </div>

      <Divider />
      <div className="page-section">
        <SectionTitle>Badges, Tags & Status Chips</SectionTitle>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div className="component-row">
            {[
              { cls: "ems-badge-green", label: "● Đang học" },
              { cls: "ems-badge-blue", label: "● Chờ duyệt" },
              { cls: "ems-badge-orange", label: "● Cảnh báo" },
              { cls: "ems-badge-red", label: "● Đình chỉ" },
              { cls: "ems-badge-purple", label: "● Học bổng" },
              { cls: "ems-badge-gray", label: "● Bảo lưu" },
            ].map(b => <span key={b.label} className={`ems-badge ${b.cls}`}>{b.label}</span>)}
          </div>
          {/* Tags */}
          <div className="component-row">
            {[
              { bg: "#e6f4ff", color: "#0958d9", border: "#91caff", label: "IT302" },
              { bg: "#f9f0ff", color: "#531dab", border: "#d3adf7", label: "3 Tín chỉ" },
              { bg: "#f6ffed", color: "#389e0d", border: "#b7eb8f", label: "Bắt buộc" },
              { bg: "#fff7e6", color: "#d46b08", border: "#ffd591", label: "Tự chọn" },
              { bg: "#fff2f0", color: "#cf1322", border: "#ffccc7", label: "Học lại" },
              { bg: "#f5f7fa", color: "#4a5e78", border: "#d1dbe8", label: "K46" },
            ].map(t => (
              <span key={t.label} className="ems-tag" style={{ background: t.bg, color: t.color, border: `1px solid ${t.border}` }}>{t.label}</span>
            ))}
          </div>
          {/* Sizes */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 11, color: "#b0bec8" }}>Sizes:</span>
            <span className="ems-badge ems-badge-blue" style={{ fontSize: 10, padding: "1px 6px" }}>XS</span>
            <span className="ems-badge ems-badge-blue" style={{ fontSize: 12, padding: "2px 8px" }}>SM (default)</span>
            <span className="ems-badge ems-badge-blue" style={{ fontSize: 13, padding: "4px 12px", borderRadius: 6 }}>MD</span>
          </div>
        </div>
      </div>

      <Divider />
      <div className="page-section">
        <SectionTitle>Toast Notifications — 4 types</SectionTitle>
        <div className="component-row">
          {(["success", "error", "warning", "info"] as const).map(t => (
            <button key={t} className="ems-btn ems-btn-secondary ems-btn-sm" onClick={() => showToast(t)}
              style={{ textTransform: "capitalize" }}>
              Hiện {t}
            </button>
          ))}
        </div>
        {toastVisible && (
          <div style={{
            position: "fixed", bottom: 24, right: 24, zIndex: 9999,
            display: "flex", flexDirection: "column", gap: 8,
          }}>
            <div style={{
              background: toastType === "success" ? "#0f1b2d" : toastType === "error" ? "#1a0a0a" : toastType === "warning" ? "#1a1200" : "#0a0f1a",
              color: "white", padding: "14px 18px", borderRadius: 10,
              boxShadow: "0 6px 24px rgba(0,0,0,0.25)", display: "flex", alignItems: "center", gap: 12,
              minWidth: 300, animation: "toast-in 0.25s ease",
              borderLeft: `4px solid ${toastType === "success" ? "#52c41a" : toastType === "error" ? "#ff4d4f" : toastType === "warning" ? "#fa8c16" : "#1677ff"}`,
            }}>
              <span style={{ fontSize: 20 }}>
                {toastType === "success" ? "✅" : toastType === "error" ? "❌" : toastType === "warning" ? "⚠️" : "ℹ️"}
              </span>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>
                  {toastType === "success" ? "Lưu thành công!" : toastType === "error" ? "Đã xảy ra lỗi!" : toastType === "warning" ? "Cảnh báo!" : "Thông tin"}
                </div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", marginTop: 2 }}>
                  {toastType === "success" ? "Dữ liệu đã được lưu vào hệ thống." : toastType === "error" ? "Không thể kết nối máy chủ." : toastType === "warning" ? "Dữ liệu chưa được lưu." : "Hệ thống bảo trì lúc 02:00."}
                </div>
              </div>
              <button onClick={() => setToastVisible(false)} style={{ marginLeft: "auto", background: "none", border: "none", color: "rgba(255,255,255,0.5)", cursor: "pointer", fontSize: 16 }}>✕</button>
            </div>
          </div>
        )}
      </div>

      <Divider />
      <div className="page-section">
        <SectionTitle>Progress & Skeleton Loaders</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          <div className="ems-card"><div className="ems-card-body">
            <div style={{ fontSize: 13, fontWeight: 600, color: "#4a5e78", marginBottom: 12 }}>Linear Progress</div>
            {[
              { label: "Hoàn thành HP", pct: 78, color: "#1677ff" },
              { label: "Chuyên cần", pct: 92, color: "#52c41a" },
              { label: "GPA", pct: 73, color: "#722ed1" },
              { label: "Tín chỉ tích lũy", pct: 55, color: "#fa8c16" },
            ].map(p => (
              <div key={p.label} style={{ marginBottom: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontSize: 13, color: "#4a5e78" }}>{p.label}</span>
                  <span style={{ fontWeight: 600, color: "#0f1b2d", fontSize: 13 }}>{p.pct}%</span>
                </div>
                <div className="ems-progress-bar">
                  <div className="ems-progress-fill" style={{ width: `${p.pct}%`, background: p.color }} />
                </div>
              </div>
            ))}
            {/* Circular progress placeholder */}
            <div style={{ display: "flex", gap: 20, marginTop: 16, justifyContent: "center" }}>
              {[{ pct: 87, color: "#52c41a", label: "Chuyên cần" }, { pct: 73, color: "#1677ff", label: "GPA" }, { pct: 55, color: "#fa8c16", label: "TC/Kế hoạch" }].map(c => (
                <div key={c.label} style={{ textAlign: "center" }}>
                  <div style={{
                    width: 60, height: 60, borderRadius: "50%",
                    background: `conic-gradient(${c.color} ${c.pct * 3.6}deg, #e8eef5 0deg)`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto 6px",
                  }}>
                    <div style={{ width: 44, height: 44, borderRadius: "50%", background: "white", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: c.color }}>{c.pct}%</span>
                    </div>
                  </div>
                  <div style={{ fontSize: 11, color: "#7a90a8" }}>{c.label}</div>
                </div>
              ))}
            </div>
          </div></div>

          <div className="ems-card"><div className="ems-card-body">
            <div style={{ fontSize: 13, fontWeight: 600, color: "#4a5e78", marginBottom: 12 }}>Skeleton Loaders</div>
            {[1, 2, 3].map(i => (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 16 }}>
                <div className="ems-skeleton" style={{ width: 36, height: 36, borderRadius: "50%", flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div className="ems-skeleton" style={{ height: 14, width: `${[70, 85, 60][i - 1]}%`, marginBottom: 6 }} />
                  <div className="ems-skeleton" style={{ height: 11, width: `${[90, 75, 80][i - 1]}%` }} />
                </div>
              </div>
            ))}
            {/* Table skeleton */}
            <div style={{ marginTop: 8 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr 1fr", gap: 8, marginBottom: 8 }}>
                {[80, 140, 60].map((w, i) => <div key={i} className="ems-skeleton" style={{ height: 12 }} />)}
              </div>
              {[1, 2, 3].map(i => (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 2fr 1fr", gap: 8, marginBottom: 8 }}>
                  {[0, 1, 2].map(j => <div key={j} className="ems-skeleton" style={{ height: 10 }} />)}
                </div>
              ))}
            </div>
          </div></div>
        </div>
      </div>
    </div>
  );
}

/* ── Overlays tab ───────────────────────────────────────────── */
function OverlaysSection() {
  const [showModal, setShowModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [popover, setPopover] = useState<string | null>(null);

  return (
    <div>
      <div className="page-section">
        <SectionTitle>Modals & Dialogs</SectionTitle>
        <div className="component-row" style={{ flexWrap: "wrap" }}>
          <button className="ems-btn ems-btn-primary ems-btn-md" onClick={() => setShowModal(true)}>Form Modal</button>
          <button className="ems-btn ems-btn-danger ems-btn-sm" onClick={() => setShowConfirm(true)}>Confirm Delete</button>
          <button className="ems-btn ems-btn-success ems-btn-sm" onClick={() => setShowSuccess(true)}>Success State</button>
          <button className="ems-btn ems-btn-secondary ems-btn-md" onClick={() => setShowDrawer(true)}>Slide Drawer →</button>
        </div>
      </div>

      {showModal && (
        <div className="ems-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="ems-modal" onClick={e => e.stopPropagation()}>
            <div className="ems-modal-header">
              <div>
                <div style={{ fontWeight: 700, fontSize: 16, color: "#0f1b2d" }}>Thêm sinh viên mới</div>
                <div style={{ fontSize: 12, color: "#7a90a8", marginTop: 2 }}>Điền đầy đủ thông tin bên dưới</div>
              </div>
              <button onClick={() => setShowModal(false)} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "#7a90a8" }}>✕</button>
            </div>
            <div className="ems-modal-body">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                {[["Họ và tên", "Nguyễn Văn An", true], ["Mã sinh viên", "SV2024001", true], ["Email", "sv@student.edu.vn", true], ["Điện thoại", "0912 345 678", false]].map(([l, p, r]) => (
                  <div key={l as string}>
                    <label className={`ems-label ${r ? "required" : ""}`}>{l as string}</label>
                    <input className="ems-input" placeholder={p as string} />
                  </div>
                ))}
                <div>
                  <label className="ems-label required">Ngày sinh</label>
                  <input type="date" className="ems-input" />
                </div>
                <div>
                  <label className="ems-label required">Giới tính</label>
                  <select className="ems-select"><option>Nam</option><option>Nữ</option><option>Khác</option></select>
                </div>
                <div style={{ gridColumn: "1/-1" }}>
                  <label className="ems-label required">Khoa</label>
                  <select className="ems-select"><option>— Chọn khoa —</option><option>Khoa Công nghệ thông tin</option><option>Khoa Kinh tế</option></select>
                </div>
              </div>
            </div>
            <div className="ems-modal-footer">
              <button className="ems-btn ems-btn-secondary ems-btn-md" onClick={() => setShowModal(false)}>Hủy</button>
              <button className="ems-btn ems-btn-primary ems-btn-md">Thêm sinh viên</button>
            </div>
          </div>
        </div>
      )}

      {showConfirm && (
        <div className="ems-modal-overlay" onClick={() => setShowConfirm(false)}>
          <div className="ems-modal" style={{ maxWidth: 400 }} onClick={e => e.stopPropagation()}>
            <div className="ems-modal-body" style={{ textAlign: "center", padding: "36px 28px 20px" }}>
              <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#fff2f0", border: "1.5px solid #ffccc7", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", fontSize: 32 }}>🗑</div>
              <div style={{ fontWeight: 700, fontSize: 18, color: "#0f1b2d", marginBottom: 8 }}>Xóa sinh viên?</div>
              <div style={{ fontSize: 14, color: "#7a90a8", lineHeight: 1.6 }}>
                Bạn sắp xóa <strong>Nguyễn Văn An (SV2021001)</strong>. Dữ liệu học tập và điểm số cũng sẽ bị xóa. Không thể hoàn tác.
              </div>
            </div>
            <div className="ems-modal-footer" style={{ justifyContent: "center", gap: 12 }}>
              <button className="ems-btn ems-btn-secondary ems-btn-md" onClick={() => setShowConfirm(false)}>Hủy bỏ</button>
              <button className="ems-btn ems-btn-danger ems-btn-md" onClick={() => setShowConfirm(false)}>Xóa vĩnh viễn</button>
            </div>
          </div>
        </div>
      )}

      {showSuccess && (
        <div className="ems-modal-overlay" onClick={() => setShowSuccess(false)}>
          <div className="ems-modal" style={{ maxWidth: 380 }} onClick={e => e.stopPropagation()}>
            <div className="ems-modal-body" style={{ textAlign: "center", padding: "40px 32px" }}>
              <div style={{ width: 72, height: 72, borderRadius: "50%", background: "#f6ffed", border: "2px solid #b7eb8f", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontSize: 36 }}>✓</div>
              <div style={{ fontWeight: 700, fontSize: 20, color: "#389e0d", marginBottom: 8 }}>Thành công!</div>
              <div style={{ fontSize: 14, color: "#7a90a8", lineHeight: 1.6, marginBottom: 24 }}>Điểm học phần IT302 đã được gửi đi và đang chờ duyệt từ Trưởng khoa.</div>
              <button className="ems-btn ems-btn-primary ems-btn-md" onClick={() => setShowSuccess(false)}>Về trang chủ</button>
            </div>
          </div>
        </div>
      )}

      {showDrawer && (
        <>
          <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 999, backdropFilter: "blur(2px)" }} onClick={() => setShowDrawer(false)} />
          <div className="ems-drawer">
            <div style={{ padding: "16px 20px", borderBottom: "1px solid #e8eef5", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
              <div style={{ fontWeight: 700, fontSize: 16, color: "#0f1b2d" }}>Chi tiết sinh viên</div>
              <button onClick={() => setShowDrawer(false)} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "#7a90a8" }}>✕</button>
            </div>
            <div style={{ flex: 1, overflowY: "auto", padding: "20px" }} className="thin-scroll">
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24 }}>
                <div className="ems-avatar" style={{ width: 56, height: 56, fontSize: 20 }}>AN</div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 18, color: "#0f1b2d" }}>Nguyễn Văn An</div>
                  <div style={{ fontSize: 13, color: "#7a90a8", marginTop: 2 }}>SV2021001 • Khoa CNTT • K46</div>
                  <span className="ems-badge ems-badge-green" style={{ marginTop: 6, display: "inline-flex" }}>● Đang học</span>
                </div>
              </div>
              {[["Ngày sinh", "15/05/2002"], ["Giới tính", "Nam"], ["CCCD", "079202012345"], ["Email", "nguyenvana@student.edu.vn"], ["Điện thoại", "0912 345 678"], ["Ngành học", "Công nghệ thông tin"], ["Niên khóa", "2021–2025 (K46)"], ["GPA", "3.62 / 4.00"], ["Tín chỉ tích lũy", "95 / 135 TC"], ["Học bổng", "Học bổng khuyến khích HK1-2024"]].map(([k, v]) => (
                <div key={k as string} style={{ display: "flex", padding: "10px 0", borderBottom: "1px solid #e8eef5" }}>
                  <div style={{ width: 140, fontSize: 13, color: "#7a90a8" }}>{k as string}</div>
                  <div style={{ fontSize: 13, fontWeight: 500, color: "#0f1b2d" }}>{v as string}</div>
                </div>
              ))}
            </div>
            <div style={{ padding: "14px 20px", borderTop: "1px solid #e8eef5", display: "flex", gap: 8, flexShrink: 0 }}>
              <button className="ems-btn ems-btn-secondary ems-btn-sm" onClick={() => setShowDrawer(false)}>Đóng</button>
              <button className="ems-btn ems-btn-primary ems-btn-sm" style={{ flex: 1, justifyContent: "center" }}>✎ Chỉnh sửa thông tin</button>
            </div>
          </div>
        </>
      )}

      <Divider />
      <div className="page-section">
        <SectionTitle>Tooltips & Popovers</SectionTitle>
        <div className="component-row">
          {["Chỉnh sửa thông tin sinh viên", "Xóa bản ghi vĩnh viễn", "Xuất báo cáo Excel"].map((tip, i) => (
            <div key={tip} className="ems-tooltip">
              <button className={`ems-btn ems-btn-${i === 1 ? "danger" : "secondary"} ems-btn-sm`}>
                {i === 0 ? "✎ Sửa" : i === 1 ? "🗑 Xóa" : "⬇ Xuất"}
              </button>
              <div className="ems-tooltip-content">{tip}</div>
            </div>
          ))}
          {/* Popover */}
          <div style={{ position: "relative" }}>
            <button className="ems-btn ems-btn-secondary ems-btn-sm" onClick={() => setPopover(p => p ? null : "info")}>
              ℹ Thông tin
            </button>
            {popover === "info" && (
              <>
                <div style={{ position: "fixed", inset: 0, zIndex: 99 }} onClick={() => setPopover(null)} />
                <div style={{
                  position: "absolute", top: "calc(100% + 8px)", left: 0,
                  background: "white", border: "1px solid #d1dbe8", borderRadius: 10,
                  boxShadow: "0 4px 16px rgba(0,0,0,0.12)", zIndex: 100, width: 260, padding: 16,
                }}>
                  <div style={{ fontWeight: 700, fontSize: 14, color: "#0f1b2d", marginBottom: 6 }}>Thông tin học phần</div>
                  <div style={{ fontSize: 13, color: "#4a5e78", lineHeight: 1.6 }}>
                    <strong>IT302</strong> — Lập trình Web Frontend. Bao gồm HTML, CSS, JavaScript và React. Tiên quyết: IT201.
                  </div>
                  <button className="ems-btn ems-btn-primary ems-btn-xs" style={{ marginTop: 10 }}>Xem chi tiết →</button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <Divider />
      <div className="page-section">
        <SectionTitle>Dropdown Menu</SectionTitle>
        <DropdownDemo />
      </div>
    </div>
  );
}

function DropdownDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <button className="ems-btn ems-btn-secondary ems-btn-md" onClick={() => setOpen(o => !o)}
        style={{ display: "flex", alignItems: "center", gap: 8 }}>
        Hành động ▾
      </button>
      {open && (
        <>
          <div style={{ position: "fixed", inset: 0, zIndex: 99 }} onClick={() => setOpen(false)} />
          <div style={{ position: "absolute", top: "calc(100% + 4px)", left: 0, background: "white", border: "1px solid #d1dbe8", borderRadius: 10, boxShadow: "0 4px 16px rgba(0,0,0,0.12)", zIndex: 100, minWidth: 210, overflow: "hidden" }}>
            <div style={{ padding: "8px 14px 4px", fontSize: 11, fontWeight: 700, color: "#b0bec8", letterSpacing: "0.06em" }}>QUẢN LÝ</div>
            {[{ icon: "✎", label: "Chỉnh sửa thông tin", shortcut: "⌘E" }, { icon: "📄", label: "Xem hồ sơ đầy đủ" }, { icon: "📊", label: "Xem bảng điểm" }].map(item => (
              <button key={item.label} onClick={() => setOpen(false)} style={{ width: "100%", textAlign: "left", padding: "9px 14px", background: "none", border: "none", cursor: "pointer", fontSize: 13.5, color: "#0f1b2d", display: "flex", alignItems: "center", gap: 8 }}
                onMouseEnter={e => e.currentTarget.style.background = "#f5f7fa"}
                onMouseLeave={e => e.currentTarget.style.background = "none"}
              >
                <span style={{ width: 18 }}>{item.icon}</span>
                <span style={{ flex: 1 }}>{item.label}</span>
                {item.shortcut && <span style={{ fontSize: 11, color: "#b0bec8" }}>{item.shortcut}</span>}
              </button>
            ))}
            <div style={{ height: 1, background: "#e8eef5", margin: "4px 0" }} />
            <div style={{ padding: "4px 14px 4px", fontSize: 11, fontWeight: 700, color: "#b0bec8", letterSpacing: "0.06em" }}>THAO TÁC</div>
            {[{ icon: "🔔", label: "Gửi thông báo" }, { icon: "📧", label: "Gửi email" }].map(item => (
              <button key={item.label} onClick={() => setOpen(false)} style={{ width: "100%", textAlign: "left", padding: "9px 14px", background: "none", border: "none", cursor: "pointer", fontSize: 13.5, color: "#0f1b2d", display: "flex", alignItems: "center", gap: 8 }}
                onMouseEnter={e => e.currentTarget.style.background = "#f5f7fa"}
                onMouseLeave={e => e.currentTarget.style.background = "none"}
              >
                <span style={{ width: 18 }}>{item.icon}</span> {item.label}
              </button>
            ))}
            <div style={{ height: 1, background: "#e8eef5", margin: "4px 0" }} />
            <button onClick={() => setOpen(false)} style={{ width: "100%", textAlign: "left", padding: "9px 14px", background: "none", border: "none", cursor: "pointer", fontSize: 13.5, color: "#cf1322", display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}
              onMouseEnter={e => e.currentTarget.style.background = "#fff2f0"}
              onMouseLeave={e => e.currentTarget.style.background = "none"}
            >
              <span style={{ width: 18 }}>🗑</span> Xóa sinh viên
            </button>
          </div>
        </>
      )}
    </div>
  );
}

/* ── Data Display tab ───────────────────────────────────────── */
function DataDisplaySection() {
  const [accordionOpen, setAccordionOpen] = useState<number[]>([0]);

  const toggleAccordion = (i: number) => setAccordionOpen(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]);

  return (
    <div>
      <div className="page-section">
        <SectionTitle>Stat Cards</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14 }}>
          {[
            { label: "Tổng sinh viên", val: "4,821", delta: "+124", pos: true, icon: "👥", color: "#1677ff" },
            { label: "Học phần đang mở", val: "186", delta: "+12", pos: true, icon: "📚", color: "#722ed1" },
            { label: "Chuyên cần TB", val: "87.3%", delta: "-1.2%", pos: false, icon: "✅", color: "#52c41a" },
            { label: "Phòng trống hôm nay", val: "23", delta: "=", pos: true, icon: "🏫", color: "#fa8c16" },
          ].map(c => (
            <div key={c.label} className="ems-stat-card">
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: c.color + "18", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>{c.icon}</div>
                <span style={{ fontSize: 12, color: c.pos ? "#389e0d" : "#cf1322", fontWeight: 600 }}>
                  {c.delta !== "=" && (c.pos ? "↑" : "↓")} {c.delta}
                </span>
              </div>
              <div style={{ fontSize: 26, fontWeight: 800, color: "#0f1b2d", marginBottom: 4 }}>{c.val}</div>
              <div style={{ fontSize: 12.5, color: "#7a90a8" }}>{c.label}</div>
              <div className="ems-progress-bar" style={{ marginTop: 10 }}>
                <div className="ems-progress-fill" style={{ width: "65%", background: c.color }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <Divider />
      <div className="page-section">
        <SectionTitle>Accordion / Collapsible</SectionTitle>
        <div className="ems-card" style={{ overflow: "hidden" }}>
          {[
            { title: "Thông tin cơ bản học phần IT302", content: "Học phần Lập trình Web (IT302) cung cấp kiến thức nền tảng về phát triển giao diện người dùng với HTML5, CSS3, JavaScript ES6+ và framework React. Tiên quyết: IT201 (Lập trình hướng đối tượng)." },
            { title: "Lịch học và địa điểm", content: "Thứ Hai tiết 1–3 (07:00–09:30) tại phòng H2-301. Thứ Tư tiết 1–3 (07:00–09:30) tại Lab-A01. Giảng viên: TS. Nguyễn Thị Lan — lan.nguyen@asc.edu.vn" },
            { title: "Hình thức đánh giá và điểm số", content: "Chuyên cần: 10% • Kiểm tra giữa kỳ: 30% • Thi cuối kỳ: 60%. Điểm đậu: ≥ 4.0/10. Không thi lại nếu CC < 70%." },
            { title: "Tài liệu và học liệu", content: "Slide bài giảng (8 chương), Video hướng dẫn (16 bài), Bài tập thực hành (12 lab), Đề thi mẫu (3 đề). Tất cả có sẵn trên LMS." },
          ].map((item, i) => (
            <div key={i} style={{ borderBottom: i < 3 ? "1px solid #e8eef5" : "none" }}>
              <button onClick={() => toggleAccordion(i)} style={{
                width: "100%", textAlign: "left", padding: "14px 20px", background: "none", border: "none",
                cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between",
                fontSize: 14, fontWeight: 600, color: "#0f1b2d", transition: "background 0.15s",
              }}
                onMouseEnter={e => e.currentTarget.style.background = "#f8f9fa"}
                onMouseLeave={e => e.currentTarget.style.background = "none"}
              >
                <span>{item.title}</span>
                <span style={{ fontSize: 12, color: "#7a90a8", transition: "transform 0.2s", transform: accordionOpen.includes(i) ? "rotate(180deg)" : "none" }}>▾</span>
              </button>
              {accordionOpen.includes(i) && (
                <div style={{ padding: "0 20px 16px", fontSize: 14, color: "#4a5e78", lineHeight: 1.7 }}>
                  {item.content}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <Divider />
      <div className="page-section">
        <SectionTitle>Tree View & Nested Navigation</SectionTitle>
        <div className="ems-card" style={{ overflow: "hidden" }}>
          <div className="ems-card-header"><span style={{ fontWeight: 700, fontSize: 14 }}>📁 Cơ cấu tổ chức</span></div>
          <div className="ems-card-body">
            <TreeNode label="🏛 Trường Đại học ASC Việt Nam" defaultOpen>
              <TreeNode label="🏢 Khoa Công nghệ thông tin" defaultOpen>
                <TreeNode label="📂 Bộ môn Kỹ thuật phần mềm">
                  <TreeNode label="👤 Nguyễn Thị Lan (Trưởng BM)" leaf />
                  <TreeNode label="👤 Trần Văn Khoa (GV)" leaf />
                  <TreeNode label="👤 Lê Minh Hải (GV)" leaf />
                </TreeNode>
                <TreeNode label="📂 Bộ môn Hệ thống thông tin">
                  <TreeNode label="👤 Phạm Đức Tùng (Trưởng BM)" leaf />
                </TreeNode>
              </TreeNode>
              <TreeNode label="🏢 Khoa Kinh tế và Quản trị">
                <TreeNode label="📂 Bộ môn Quản trị kinh doanh">
                  <TreeNode label="👤 Hoàng Văn Sơn (Trưởng BM)" leaf />
                </TreeNode>
              </TreeNode>
              <TreeNode label="🏢 Phòng Đào tạo" leaf />
            </TreeNode>
          </div>
        </div>
      </div>

      <Divider />
      <div className="page-section">
        <SectionTitle>Timeline & Avatar Group</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div className="ems-card"><div className="ems-card-body">
            {[
              { dot: "#52c41a", icon: "✓", title: "Điểm đã được công bố", time: "14:30 — 12/01/2025", desc: "GV Nguyễn Thị Lan công bố điểm IT302" },
              { dot: "#1677ff", icon: "📄", title: "Bài nộp được chấp nhận", time: "09:15 — 10/01/2025", desc: "Báo cáo nhóm 3 đã được hệ thống chấp nhận" },
              { dot: "#fa8c16", icon: "⏰", title: "Nhắc nhở nộp bài", time: "08:00 — 08/01/2025", desc: "Deadline còn 2 ngày — 10/01 23:59" },
              { dot: "#722ed1", icon: "📋", title: "Điểm danh", time: "07:30 — 07/01/2025", desc: "38/42 sinh viên có mặt" },
            ].map(t => (
              <div key={t.title} className="timeline-item">
                <div className="timeline-dot" style={{ background: t.dot + "22", border: `2px solid ${t.dot}`, color: t.dot, fontSize: 11 }}>
                  {t.icon}
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 13.5, color: "#0f1b2d" }}>{t.title}</div>
                  <div style={{ fontSize: 11, color: "#b0bec8", margin: "2px 0 4px" }}>{t.time}</div>
                  <div style={{ fontSize: 13, color: "#7a90a8" }}>{t.desc}</div>
                </div>
              </div>
            ))}
          </div></div>
          <div className="ems-card"><div className="ems-card-body">
            <div style={{ fontSize: 13, fontWeight: 600, color: "#4a5e78", marginBottom: 14 }}>Avatar sizes & groups</div>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 16, marginBottom: 20 }}>
              {[24, 32, 40, 48, 56].map((s, i) => (
                <div key={s} className="ems-avatar" style={{ width: s, height: s, background: ["#1677ff", "#722ed1", "#52c41a", "#fa8c16", "#ff4d4f"][i], fontSize: s * 0.32 }}>
                  {["AN", "TH", "LM", "PQ", "NT"][i]}
                </div>
              ))}
            </div>
            {/* Avatar group */}
            <div style={{ fontSize: 13, fontWeight: 600, color: "#4a5e78", marginBottom: 10 }}>Nhóm Avatar (stacked)</div>
            <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
              {["AN", "TH", "LM", "PQ"].map((init, i) => (
                <div key={init} className="ems-avatar" style={{
                  width: 36, height: 36, fontSize: 11, fontWeight: 700,
                  background: ["#1677ff", "#722ed1", "#52c41a", "#fa8c16"][i],
                  marginLeft: i > 0 ? -10 : 0, border: "2px solid white",
                  boxShadow: "0 0 0 1px rgba(0,0,0,0.05)",
                  zIndex: 4 - i,
                }}>{init}</div>
              ))}
              <div className="ems-avatar" style={{ width: 36, height: 36, fontSize: 11, fontWeight: 700, background: "#e8eef5", color: "#4a5e78", marginLeft: -10, border: "2px solid white" }}>+18</div>
            </div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#4a5e78", marginTop: 20, marginBottom: 10 }}>Empty States</div>
            <div style={{ display: "flex", gap: 12 }}>
              {[
                { icon: "📭", title: "Không có dữ liệu", desc: "Thêm sinh viên đầu tiên" },
                { icon: "🔒", title: "Không có quyền", desc: "Liên hệ quản trị viên" },
              ].map(e => (
                <div key={e.title} style={{ flex: 1, background: "#f5f7fa", borderRadius: 8, padding: "20px", textAlign: "center" }}>
                  <div style={{ fontSize: 28, marginBottom: 6 }}>{e.icon}</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#0f1b2d", marginBottom: 4 }}>{e.title}</div>
                  <div style={{ fontSize: 12, color: "#7a90a8" }}>{e.desc}</div>
                </div>
              ))}
            </div>
          </div></div>
        </div>
      </div>
    </div>
  );
}

function TreeNode({ label, children, leaf, defaultOpen }: { label: string; children?: React.ReactNode; leaf?: boolean; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen ?? false);
  return (
    <div style={{ userSelect: "none" }}>
      <div onClick={() => !leaf && setOpen(o => !o)} style={{
        display: "flex", alignItems: "center", gap: 6, padding: "5px 8px",
        borderRadius: 5, cursor: leaf ? "default" : "pointer", fontSize: 13.5,
        color: "#0f1b2d", transition: "background 0.1s",
      }}
        onMouseEnter={e => e.currentTarget.style.background = "#f0f7ff"}
        onMouseLeave={e => e.currentTarget.style.background = "transparent"}
      >
        {!leaf && <span style={{ fontSize: 10, color: "#7a90a8", transition: "transform 0.2s", transform: open ? "rotate(90deg)" : "none", display: "inline-block" }}>▶</span>}
        {leaf && <span style={{ display: "inline-block", width: 14 }} />}
        <span>{label}</span>
      </div>
      {open && children && <div style={{ marginLeft: 20, borderLeft: "1.5px solid #e8eef5", paddingLeft: 4 }}>{children}</div>}
    </div>
  );
}

/* ── Advanced tab ───────────────────────────────────────────── */
function AdvancedSection() {
  const [calMonth, setCalMonth] = useState(new Date(2025, 0, 1));

  const getDaysInMonth = (date: Date) => {
    const y = date.getFullYear(), m = date.getMonth();
    const firstDay = new Date(y, m, 1).getDay();
    const daysInMonth = new Date(y, m + 1, 0).getDate();
    return { firstDay: firstDay === 0 ? 6 : firstDay - 1, daysInMonth };
  };

  const { firstDay, daysInMonth } = getDaysInMonth(calMonth);
  const today = new Date();

  const EVENTS: Record<number, { label: string; color: string }[]> = {
    6: [{ label: "Thi giữa kỳ IT302", color: "#ff4d4f" }],
    13: [{ label: "Deadline ĐKHT", color: "#fa8c16" }],
    15: [{ label: "Họp khoa CNTT", color: "#1677ff" }],
    20: [{ label: "Công bố điểm HK", color: "#52c41a" }],
    25: [{ label: "Khai giảng HK2", color: "#722ed1" }],
  };

  return (
    <div>
      <div className="page-section">
        <SectionTitle>Academic Calendar</SectionTitle>
        <SectionDesc>Lịch học thuật với events theo màu semantic và điều hướng theo tháng</SectionDesc>
        <div className="ems-card" style={{ overflow: "hidden" }}>
          <div className="ems-card-header">
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <button className="ems-btn ems-btn-secondary ems-btn-sm" onClick={() => setCalMonth(d => new Date(d.getFullYear(), d.getMonth() - 1, 1))}>‹</button>
              <span style={{ fontWeight: 700, fontSize: 15, minWidth: 150, textAlign: "center" }}>
                {calMonth.toLocaleDateString("vi-VN", { month: "long", year: "numeric" }).replace("tháng", "Tháng")}
              </span>
              <button className="ems-btn ems-btn-secondary ems-btn-sm" onClick={() => setCalMonth(d => new Date(d.getFullYear(), d.getMonth() + 1, 1))}>›</button>
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              {[{ label: "Thi", color: "#ff4d4f" }, { label: "Hạn nộp", color: "#fa8c16" }, { label: "Sự kiện", color: "#1677ff" }, { label: "Điểm", color: "#52c41a" }].map(e => (
                <span key={e.label} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: "#4a5e78" }}>
                  <span style={{ width: 8, height: 8, borderRadius: 2, background: e.color, display: "inline-block" }} />{e.label}
                </span>
              ))}
            </div>
          </div>
          <div style={{ padding: "0 0 16px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 0, background: "#f5f7fa", borderBottom: "1px solid #e8eef5" }}>
              {["T2", "T3", "T4", "T5", "T6", "T7", "CN"].map(d => (
                <div key={d} style={{ padding: "8px", textAlign: "center", fontSize: 12, fontWeight: 700, color: "#7a90a8" }}>{d}</div>
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)" }}>
              {Array.from({ length: firstDay }, (_, i) => <div key={`empty-${i}`} style={{ minHeight: 72, borderBottom: "1px solid #f0f4f8", borderRight: "1px solid #f0f4f8" }} />)}
              {Array.from({ length: daysInMonth }, (_, i) => {
                const day = i + 1;
                const isToday = today.getDate() === day && today.getMonth() === calMonth.getMonth() && today.getFullYear() === calMonth.getFullYear();
                const events = EVENTS[day] || [];
                return (
                  <div key={day} style={{
                    minHeight: 72, padding: "6px 8px",
                    borderBottom: "1px solid #f0f4f8", borderRight: "1px solid #f0f4f8",
                    background: isToday ? "#fffbe6" : "white",
                    cursor: "pointer", transition: "background 0.1s",
                  }}
                    onMouseEnter={e => { if (!isToday) e.currentTarget.style.background = "#f8f9fa"; }}
                    onMouseLeave={e => { if (!isToday) e.currentTarget.style.background = "white"; }}
                  >
                    <div style={{
                      width: 24, height: 24, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                      background: isToday ? "#1677ff" : "transparent",
                      color: isToday ? "white" : "#0f1b2d",
                      fontWeight: isToday ? 700 : 400, fontSize: 13, marginBottom: 4,
                    }}>{day}</div>
                    {events.map((e, ei) => (
                      <div key={ei} style={{ fontSize: 10.5, color: "white", background: e.color, borderRadius: 3, padding: "1px 5px", marginBottom: 2, lineHeight: 1.4, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {e.label}
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <Divider />
      <div className="page-section">
        <SectionTitle>File Preview Cards</SectionTitle>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {[
            { name: "Đề thi cuối kỳ IT302.pdf", size: "2.4 MB", icon: "📄", color: "#ff4d4f", type: "PDF" },
            { name: "Danh sách SV K46.xlsx", size: "845 KB", icon: "📊", color: "#52c41a", type: "XLSX" },
            { name: "Kế hoạch giảng dạy.docx", size: "1.2 MB", icon: "📝", color: "#1677ff", type: "DOCX" },
            { name: "Thời khóa biểu HK1.pptx", size: "5.8 MB", icon: "📋", color: "#fa8c16", type: "PPTX" },
          ].map(f => (
            <div key={f.name} style={{ width: 180, border: "1px solid #d1dbe8", borderRadius: 10, overflow: "hidden", cursor: "pointer", transition: "all 0.15s" }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)"}
              onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
            >
              <div style={{ height: 90, background: f.color + "18", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                <span style={{ fontSize: 40 }}>{f.icon}</span>
                <span style={{ position: "absolute", top: 8, right: 8, fontSize: 10, fontWeight: 700, color: f.color, background: f.color + "18", padding: "2px 5px", borderRadius: 3 }}>{f.type}</span>
              </div>
              <div style={{ padding: "10px 12px" }}>
                <div style={{ fontSize: 12.5, fontWeight: 500, color: "#0f1b2d", lineHeight: 1.4, marginBottom: 4, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{f.name}</div>
                <div style={{ fontSize: 11, color: "#7a90a8" }}>{f.size}</div>
                <div style={{ display: "flex", gap: 4, marginTop: 8 }}>
                  <button className="ems-btn ems-btn-ghost ems-btn-xs">👁 Xem</button>
                  <button className="ems-btn ems-btn-ghost ems-btn-xs">⬇</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Page03Components() {
  const [activeTab, setActiveTab] = useState(0);

  const renderContent = () => {
    switch (activeTab) {
      case 0: return <ActionsSection />;
      case 1: return <FormsSection />;
      case 2: return <NavigationSection />;
      case 3: return <FeedbackSection />;
      case 4: return <OverlaysSection />;
      case 5: return <DataDisplaySection />;
      case 6: return <AdvancedSection />;
      default: return null;
    }
  };

  return (
    <div style={{ padding: 32, maxWidth: 1100, margin: "0 auto" }}>
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#7a90a8", marginBottom: 4 }}>03</div>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: "#0f1b2d", margin: 0, marginBottom: 4 }}>Components</h1>
        <p style={{ fontSize: 14, color: "#7a90a8", margin: 0 }}>100+ UI components với đầy đủ trạng thái, sizes và variants</p>
      </div>

      <div className="ems-tabs-nav" style={{ marginBottom: 28, overflowX: "auto" }}>
        {TABS.map((t, i) => (
          <div key={t} className={`ems-tab-item ${activeTab === i ? "active" : ""}`} onClick={() => setActiveTab(i)} style={{ whiteSpace: "nowrap" }}>{t}</div>
        ))}
      </div>

      {renderContent()}
    </div>
  );
}
