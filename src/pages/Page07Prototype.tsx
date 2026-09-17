import { useEffect, useRef, useState } from "react"

const FLOWS = [
  "Đăng nhập hệ thống",
  "Đăng ký học phần",
  "Nộp đơn từ",
  "Nhập và duyệt điểm",
  "Điểm danh QR",
]

// ---- Login Flow ----
type LoginStep = "login" | "otp" | "dashboard"
function LoginFlow() {
  const [step, setStep] = useState<LoginStep>("login")
  const [email, setEmail] = useState("")
  const [pw, setPw] = useState("")
  const [otp, setOtp] = useState("")
  const [error, setError] = useState<string>("")

  const handleLogin = () => {
    if (!email || !pw) {
      setError("Vui lòng nhập đầy đủ thông tin.")
      return
    }
    if (pw.length < 6) {
      setError("Mật khẩu không đúng. Vui lòng thử lại.")
      return
    }
    setError("")
    setStep("otp")
  }

  const handleOtp = () => {
    if (otp.length !== 6) {
      setError("Mã OTP không hợp lệ.")
      return
    }
    setError("")
    setStep("dashboard" as LoginStep)
  }

  const emailInvalid = Boolean(error && !email)
  const passwordInvalid = Boolean(error && (!pw || pw.length < 6))
  const otpInvalid = Boolean(error && otp.length !== 6)

  if (step === "dashboard") {
    return (
      <div style={{ textAlign: "center", padding: "60px 0" }}>
        <div style={{ fontSize: 56, marginBottom: 20 }}>🎉</div>
        <div
          style={{
            fontSize: 22,
            fontWeight: 800,
            color: "#0f1b2d",
            marginBottom: 8,
          }}
        >
          Đăng nhập thành công!
        </div>
        <div style={{ fontSize: 14, color: "#7a90a8", marginBottom: 24 }}>
          Chào mừng trở lại, Nguyễn Thị Lan (Giảng viên)
        </div>
        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <button
            className="ems-btn ems-btn-secondary ems-btn-md"
            onClick={() => {
              setStep("login")
              setEmail("")
              setPw("")
              setOtp("")
            }}
          >
            ← Thử lại từ đầu
          </button>
          <button className="ems-btn ems-btn-primary ems-btn-md">
            Vào Dashboard →
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ width: 400 }}>
        {/* Progress */}
        <div style={{ display: "flex", gap: 4, marginBottom: 28 }}>
          {(["login", "otp", "dashboard"] as LoginStep[]).map((s, i) => (
            <div
              key={s}
              style={{
                flex: 1,
                height: 3,
                borderRadius: 2,
                background:
                  (step === "login" && i === 0) ||
                  (step === "otp" && i <= 1) ||
                  step as string === "dashboard"
                    ? "#1677ff"
                    : "#e8eef5",
              }}
            />
          ))}
        </div>

        <div className="ems-card">
          <div className="ems-card-body" style={{ padding: "28px 28px 24px" }}>
            {step === "login" && (
              <>
                <div style={{ textAlign: "center", marginBottom: 24 }}>
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 12,
                      background: "linear-gradient(135deg,#1677ff,#4096ff)",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 22,
                      fontWeight: 800,
                      color: "white",
                      marginBottom: 12,
                    }}
                  >
                    A
                  </div>
                  <div
                    style={{
                      fontSize: 20,
                      fontWeight: 800,
                      color: "#0f1b2d",
                      marginBottom: 4,
                    }}
                  >
                    Đăng nhập ASC.EMS
                  </div>
                  <div style={{ fontSize: 13, color: "#7a90a8" }}>
                    Nhập thông tin tài khoản của bạn
                  </div>
                </div>

                {error && (
                  <div
                    id="login-error"
                    className="ems-alert ems-alert-error"
                    role="alert"
                    style={{ marginBottom: 14, fontSize: 13 }}
                  >
                    ⚠ {error}
                  </div>
                )}

                <div style={{ marginBottom: 14 }}>
                  <label
                    className="ems-label required"
                    htmlFor="login-username"
                  >
                    Email / Tên đăng nhập
                  </label>
                  <input
                    id="login-username"
                    className="ems-input"
                    placeholder="giang.vien@asc.edu.vn"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    aria-invalid={emailInvalid}
                    aria-describedby={emailInvalid ? "login-error" : undefined}
                    style={{
                      borderColor: emailInvalid ? "#ff4d4f" : undefined,
                    }}
                  />
                </div>
                <div style={{ marginBottom: 8 }}>
                  <label
                    className="ems-label required"
                    htmlFor="login-password"
                  >
                    Mật khẩu
                  </label>
                  <input
                    id="login-password"
                    type="password"
                    className="ems-input"
                    placeholder="••••••••"
                    value={pw}
                    onChange={(e) => setPw(e.target.value)}
                    aria-invalid={passwordInvalid}
                    aria-describedby={
                      passwordInvalid ? "login-error" : undefined
                    }
                    style={{
                      borderColor: passwordInvalid ? "#ff4d4f" : undefined,
                    }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginBottom: 20,
                  }}
                >
                  <button
                    style={{
                      background: "none",
                      border: "none",
                      color: "#1677ff",
                      cursor: "pointer",
                      fontSize: 13,
                    }}
                  >
                    Quên mật khẩu?
                  </button>
                </div>
                <button
                  className="ems-btn ems-btn-primary ems-btn-md"
                  style={{ width: "100%", justifyContent: "center" }}
                  onClick={handleLogin}
                >
                  Đăng nhập →
                </button>
                <div
                  style={{
                    textAlign: "center",
                    marginTop: 16,
                    fontSize: 12,
                    color: "#7a90a8",
                  }}
                >
                  Hint: nhập email bất kỳ + mật khẩu ≥ 6 ký tự
                </div>
              </>
            )}

            {step === "otp" && (
              <>
                <div style={{ textAlign: "center", marginBottom: 24 }}>
                  <div style={{ fontSize: 36, marginBottom: 12 }}>📱</div>
                  <div
                    style={{
                      fontSize: 18,
                      fontWeight: 800,
                      color: "#0f1b2d",
                      marginBottom: 4,
                    }}
                  >
                    Xác thực 2 bước
                  </div>
                  <div style={{ fontSize: 13, color: "#7a90a8" }}>
                    Nhập mã OTP đã gửi đến <strong>{email}</strong>
                  </div>
                </div>

                {error && (
                  <div
                    id="login-otp-error"
                    className="ems-alert ems-alert-error"
                    role="alert"
                    style={{ marginBottom: 14, fontSize: 13 }}
                  >
                    ⚠ {error}
                  </div>
                )}

                <div style={{ marginBottom: 20 }}>
                  <label className="ems-label required" htmlFor="login-otp">
                    Mã OTP (6 chữ số)
                  </label>
                  <input
                    id="login-otp"
                    className="ems-input"
                    placeholder="123456"
                    maxLength={6}
                    style={{
                      textAlign: "center",
                      fontSize: 20,
                      letterSpacing: "0.2em",
                      fontWeight: 600,
                    }}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                    aria-invalid={otpInvalid}
                    aria-describedby={
                      otpInvalid ? "login-otp-error" : undefined
                    }
                  />
                  <p className="ems-helper">
                    Mã có hiệu lực trong 5 phút. Hint: nhập 6 ký tự số bất kỳ
                  </p>
                </div>

                <button
                  className="ems-btn ems-btn-primary ems-btn-md"
                  style={{ width: "100%", justifyContent: "center" }}
                  onClick={handleOtp}
                >
                  Xác nhận →
                </button>
                <button
                  className="ems-btn ems-btn-ghost ems-btn-sm"
                  style={{
                    width: "100%",
                    justifyContent: "center",
                    marginTop: 8,
                  }}
                  onClick={() => {
                    setStep("login")
                    setError("")
                  }}
                >
                  ← Quay lại
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// ---- Course Registration Flow ----
type RegStep = "browse" | "cart" | "confirm" | "success"
function CourseRegFlow() {
  const [step, setStep] = useState<RegStep>("browse")
  const [cart, setCart] = useState<string[]>([])

  const courses = [
    {
      code: "IT302",
      name: "Lập trình Web",
      credits: 3,
      teacher: "Nguyễn Thị Lan",
      avail: true,
      conflict: false,
    },
    {
      code: "IT401",
      name: "Trí tuệ nhân tạo",
      credits: 4,
      teacher: "Trần Văn Khoa",
      avail: true,
      conflict: false,
    },
    {
      code: "KT201",
      name: "Kinh tế vi mô",
      credits: 2,
      teacher: "Hoàng Văn Sơn",
      avail: true,
      conflict: false,
    },
    {
      code: "ENG201",
      name: "Tiếng Anh CN",
      credits: 2,
      teacher: "Hoàng Thu Hà",
      avail: false,
      conflict: false,
    },
    {
      code: "IT303",
      name: "Cơ sở dữ liệu",
      credits: 3,
      teacher: "Lê Minh Hải",
      avail: true,
      conflict: cart.includes("IT302"),
    },
  ]

  const totalCredits = courses
    .filter((c) => cart.includes(c.code))
    .reduce((a, c) => a + c.credits, 0)

  const toggleCart = (code: string) => {
    setCart((c) =>
      c.includes(code) ? c.filter((x) => x !== code) : [...c, code],
    )
  }

  const steps: RegStep[] = ["browse", "cart", "confirm", "success"]
  const stepLabels = ["Chọn môn", "Giỏ hàng", "Xác nhận", "Hoàn tất"]

  return (
    <div>
      {/* Step indicator */}
      <div
        style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}
      >
        {steps.map((s, i) => (
          <div key={s} style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  fontSize: 13,
                  background:
                    steps.indexOf(step) > i
                      ? "#52c41a"
                      : steps.indexOf(step) === i
                        ? "#1677ff"
                        : "#f0f4f8",
                  color: steps.indexOf(step) >= i ? "white" : "#b0bec8",
                  boxShadow:
                    steps.indexOf(step) === i
                      ? "0 0 0 4px rgba(22,119,255,0.2)"
                      : "none",
                }}
              >
                {steps.indexOf(step) > i ? "✓" : i + 1}
              </div>
              <div
                style={{
                  fontSize: 11,
                  marginTop: 4,
                  color: steps.indexOf(step) >= i ? "#1677ff" : "#b0bec8",
                  fontWeight: 600,
                }}
              >
                {stepLabels[i]}
              </div>
            </div>
            {i < steps.length - 1 && (
              <div
                style={{
                  width: 60,
                  height: 1,
                  background: steps.indexOf(step) > i ? "#52c41a" : "#d1dbe8",
                  margin: "0 8px",
                  marginTop: -18,
                }}
              />
            )}
          </div>
        ))}
      </div>

      {step === "browse" && (
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 14,
            }}
          >
            <div style={{ fontSize: 14, color: "#7a90a8" }}>
              Đã chọn:{" "}
              <strong style={{ color: "#0f1b2d" }}>
                {cart.length} học phần
              </strong>{" "}
              ({totalCredits} tín chỉ)
              {totalCredits > 21 && (
                <span style={{ color: "#ff4d4f" }}>
                  {" "}
                  — Vượt giới hạn 21 TC!
                </span>
              )}
            </div>
            <button
              className="ems-btn ems-btn-primary ems-btn-sm"
              disabled={cart.length === 0}
              onClick={() => setStep("cart")}
            >
              Xem giỏ hàng ({cart.length}) →
            </button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {courses.map((c) => (
              <div
                key={c.code}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  padding: "14px 16px",
                  border: `1.5px solid ${
                    cart.includes(c.code)
                      ? "#1677ff"
                      : c.conflict
                        ? "#ffccc7"
                        : "#d1dbe8"
                  }`,
                  borderRadius: 8,
                  background: cart.includes(c.code)
                    ? "#e6f4ff"
                    : c.conflict
                      ? "#fff2f0"
                      : "white",
                  opacity: !c.avail ? 0.6 : 1,
                }}
              >
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      display: "flex",
                      gap: 8,
                      alignItems: "center",
                      marginBottom: 4,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "JetBrains Mono,monospace",
                        fontSize: 12,
                        color: "#1677ff",
                        fontWeight: 700,
                      }}
                    >
                      {c.code}
                    </span>
                    <span
                      style={{
                        fontWeight: 600,
                        fontSize: 14,
                        color: "#0f1b2d",
                      }}
                    >
                      {c.name}
                    </span>
                    <span className="ems-badge ems-badge-blue">
                      {c.credits} TC
                    </span>
                    {c.conflict && (
                      <span className="ems-badge ems-badge-red">
                        ⚠ Trùng lịch
                      </span>
                    )}
                    {!c.avail && (
                      <span className="ems-badge ems-badge-gray">Hết chỗ</span>
                    )}
                  </div>
                  <div style={{ fontSize: 12, color: "#7a90a8" }}>
                    👤 {c.teacher}
                  </div>
                </div>
                <button
                  className={`ems-btn ems-btn-${
                    cart.includes(c.code) ? "danger" : "primary"
                  } ems-btn-sm`}
                  disabled={!c.avail || c.conflict}
                  onClick={() => toggleCart(c.code)}
                >
                  {cart.includes(c.code) ? "✕ Bỏ chọn" : "+ Thêm"}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {step === "cart" && (
        <div>
          <div style={{ marginBottom: 14 }}>
            <div
              style={{
                fontWeight: 700,
                fontSize: 16,
                color: "#0f1b2d",
                marginBottom: 4,
              }}
            >
              Giỏ đăng ký
            </div>
            <div style={{ fontSize: 13, color: "#7a90a8" }}>
              Kiểm tra lại trước khi xác nhận
            </div>
          </div>
          {cart.length === 0 ? (
            <div
              style={{ textAlign: "center", padding: "40px", color: "#7a90a8" }}
            >
              <div style={{ fontSize: 32, marginBottom: 8 }}>🛒</div>
              Giỏ đăng ký trống
            </div>
          ) : (
            <div
              className="ems-card"
              style={{ marginBottom: 14, overflow: "hidden" }}
            >
              <table className="ems-table">
                <thead>
                  <tr>
                    <th>Mã HP</th>
                    <th>Tên học phần</th>
                    <th>Tín chỉ</th>
                    <th>Giảng viên</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {courses
                    .filter((c) => cart.includes(c.code))
                    .map((c) => (
                      <tr key={c.code}>
                        <td
                          style={{
                            fontFamily: "JetBrains Mono,monospace",
                            fontSize: 12,
                            color: "#1677ff",
                          }}
                        >
                          {c.code}
                        </td>
                        <td style={{ fontWeight: 500 }}>{c.name}</td>
                        <td>{c.credits}</td>
                        <td>{c.teacher}</td>
                        <td>
                          <button
                            className="ems-btn ems-btn-ghost ems-btn-xs"
                            onClick={() => toggleCart(c.code)}
                          >
                            ✕
                          </button>
                        </td>
                      </tr>
                    ))}
                  <tr style={{ background: "#f5f7fa" }}>
                    <td
                      colSpan={2}
                      style={{
                        fontWeight: 700,
                        textAlign: "right",
                        color: "#0f1b2d",
                      }}
                    >
                      Tổng cộng:
                    </td>
                    <td style={{ fontWeight: 700, color: "#1677ff" }}>
                      {totalCredits} TC
                    </td>
                    <td colSpan={2} />
                  </tr>
                </tbody>
              </table>
            </div>
          )}
          <div style={{ display: "flex", gap: 8 }}>
            <button
              className="ems-btn ems-btn-secondary ems-btn-sm"
              onClick={() => setStep("browse")}
            >
              ← Quay lại
            </button>
            <button
              className="ems-btn ems-btn-primary ems-btn-sm"
              disabled={cart.length === 0}
              onClick={() => setStep("confirm")}
            >
              Xác nhận →
            </button>
          </div>
        </div>
      )}

      {step === "confirm" && (
        <div>
          <div
            className="ems-alert ems-alert-warning"
            style={{ marginBottom: 16 }}
          >
            ⚠{" "}
            <span>
              Sau khi xác nhận, bạn chỉ có thể hủy đăng ký trong vòng 72 giờ.
            </span>
          </div>
          <div className="ems-card" style={{ marginBottom: 16 }}>
            <div className="ems-card-body">
              {[
                ["Sinh viên", "Nguyễn Văn An (SV2021001)"],
                ["Học kỳ", "HK1 — 2024–2025"],
                ["Số học phần", `${cart.length} học phần`],
                ["Tổng tín chỉ", `${totalCredits} tín chỉ`],
                [
                  "Học phí dự kiến",
                  `${(totalCredits * 850000).toLocaleString("vi-VN")}₫`,
                ],
              ].map(([k, v]) => (
                <div
                  key={k as string}
                  style={{
                    display: "flex",
                    padding: "10px 0",
                    borderBottom: "1px solid #e8eef5",
                  }}
                >
                  <div style={{ width: 160, fontSize: 13, color: "#7a90a8" }}>
                    {k as string}
                  </div>
                  <div
                    style={{ fontSize: 13, fontWeight: 600, color: "#0f1b2d" }}
                  >
                    {v as string}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button
              className="ems-btn ems-btn-secondary ems-btn-sm"
              onClick={() => setStep("cart")}
            >
              ← Quay lại
            </button>
            <button
              className="ems-btn ems-btn-success ems-btn-md"
              style={{ flex: 1, justifyContent: "center" }}
              onClick={() => setStep("success")}
            >
              ✓ Xác nhận đăng ký
            </button>
          </div>
        </div>
      )}

      {step === "success" && (
        <div style={{ textAlign: "center", padding: "40px 0" }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: "50%",
              background: "#f6ffed",
              border: "2px solid #b7eb8f",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 20px",
              fontSize: 36,
            }}
          >
            ✓
          </div>
          <div
            style={{
              fontSize: 22,
              fontWeight: 800,
              color: "#0f1b2d",
              marginBottom: 8,
            }}
          >
            Đăng ký học phần thành công!
          </div>
          <div style={{ fontSize: 14, color: "#7a90a8", marginBottom: 8 }}>
            Bạn đã đăng ký <strong>{cart.length} học phần</strong> (
            {totalCredits} tín chỉ) cho <strong>HK1 — 2024–2025</strong>
          </div>
          <div style={{ fontSize: 13, color: "#7a90a8", marginBottom: 24 }}>
            Email xác nhận đã được gửi đến hộp thư của bạn.
          </div>
          <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
            <button
              className="ems-btn ems-btn-secondary ems-btn-sm"
              onClick={() => {
                setStep("browse")
                setCart([])
              }}
            >
              Đăng ký lại
            </button>
            <button className="ems-btn ems-btn-primary ems-btn-sm">
              Xem thời khóa biểu →
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// ---- Grade Entry Flow ----
type GradeStep = "enter" | "review" | "submit" | "done"
function GradeEntryFlow() {
  const [step, setStep] = useState<GradeStep>("enter")
  const [grades, setGrades] = useState<Record<string, string>>({})
  const [touchedGradeIds, setTouchedGradeIds] = useState<readonly string[]>([])

  const students = [
    { id: "SV2021001", name: "Nguyễn Văn An" },
    { id: "SV2021002", name: "Trần Thị Bình" },
    { id: "SV2021003", name: "Lê Minh Cường" },
    { id: "SV2021004", name: "Phạm Thị Dung" },
  ]

  const invalidGradeIds = students
    .filter((student) => {
      const value = Number(grades[student.id])
      return (
        touchedGradeIds.includes(student.id) &&
        grades[student.id] !== undefined &&
        (!Number.isFinite(value) || value < 0 || value > 10)
      )
    })
    .map((student) => student.id)
  const allFilled = students.every((student) => {
    const value = Number(grades[student.id])
    return (
      grades[student.id] !== undefined &&
      Number.isFinite(value) &&
      value >= 0 &&
      value <= 10
    )
  })

  return (
    <div>
      <div style={{ display: "flex", gap: 4, marginBottom: 20 }}>
        {(["enter", "review", "submit", "done"] as GradeStep[]).map((s, i) => {
          const labels = ["Nhập điểm", "Xem lại", "Gửi duyệt", "Hoàn tất"]
          const cur = ["enter", "review", "submit", "done"].indexOf(step)
          return (
            <div
              key={s}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  height: 3,
                  width: "100%",
                  borderRadius: 2,
                  background: cur >= i ? "#1677ff" : "#e8eef5",
                  marginBottom: 6,
                }}
              />
              <div
                style={{
                  fontSize: 12,
                  color: cur >= i ? "#1677ff" : "#b0bec8",
                  fontWeight: 600,
                }}
              >
                {labels[i]}
              </div>
            </div>
          )
        })}
      </div>

      {step === "enter" && (
        <div>
          <div
            className="ems-card"
            style={{ overflow: "hidden", marginBottom: 14 }}
          >
            <div className="ems-card-header">
              <span style={{ fontWeight: 700 }}>IT302 — Nhập điểm cuối kỳ</span>
              <span className="ems-badge ems-badge-orange">
                Hạn: 20/01/2025
              </span>
            </div>
            <table className="ems-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Họ và tên</th>
                  <th>Mã SV</th>
                  <th style={{ width: 120 }}>Điểm CK (0–10)</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s, i) => (
                  <tr key={s.id}>
                    <td style={{ color: "#b0bec8" }}>{i + 1}</td>
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
                    <td>
                      <input
                        type="number"
                        min="0"
                        max="10"
                        step="0.25"
                        className="ems-input"
                        style={{
                          textAlign: "center",
                          fontWeight: 600,
                          borderColor:
                            grades[s.id] &&
                            (parseFloat(grades[s.id]) < 0 ||
                              parseFloat(grades[s.id]) > 10)
                              ? "#ff4d4f"
                              : undefined,
                        }}
                        aria-describedby={
                          invalidGradeIds.includes(s.id)
                            ? `grade-error-${s.id}`
                            : undefined
                        }
                        aria-invalid={invalidGradeIds.includes(s.id)}
                        aria-label={`Điểm cuối kỳ của ${s.name}`}
                        value={grades[s.id] ?? ""}
                        onChange={(e) =>
                          setGrades((g) => ({ ...g, [s.id]: e.target.value }))
                        }
                        onBlur={() =>
                          setTouchedGradeIds((ids) =>
                            ids.includes(s.id) ? ids : [...ids, s.id],
                          )
                        }
                        placeholder="0.00"
                      />
                      {invalidGradeIds.includes(s.id) && (
                        <p
                          className="ems-helper error"
                          id={`grade-error-${s.id}`}
                          role="alert"
                        >
                          Điểm phải nằm trong khoảng từ 0 đến 10.
                        </p>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {!allFilled && (
            <p className="ems-helper">
              Vui lòng nhập điểm đầy đủ cho tất cả sinh viên
            </p>
          )}
          <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
            <button className="ems-btn ems-btn-secondary ems-btn-sm">
              Lưu nháp
            </button>
            <button
              className="ems-btn ems-btn-primary ems-btn-sm"
              disabled={!allFilled}
              onClick={() => setStep("review")}
            >
              Xem lại →
            </button>
          </div>
        </div>
      )}

      {step === "review" && (
        <div>
          <div
            className="ems-alert ems-alert-info"
            style={{ marginBottom: 14 }}
          >
            ℹ Kiểm tra kỹ điểm trước khi gửi duyệt. Sau khi gửi, cần liên hệ
            Phòng Đào tạo để chỉnh sửa.
          </div>
          <div
            className="ems-card"
            style={{ overflow: "hidden", marginBottom: 14 }}
          >
            <table className="ems-table">
              <thead>
                <tr>
                  <th>Họ và tên</th>
                  <th>Mã SV</th>
                  <th>Điểm CK</th>
                  <th>Xếp loại</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s) => {
                  const val = parseFloat(grades[s.id] ?? "0")
                  const grade =
                    val >= 8.5
                      ? "A"
                      : val >= 7
                        ? "B"
                        : val >= 5.5
                          ? "C"
                          : val >= 4
                            ? "D"
                            : "F"
                  const gColor =
                    grade === "A"
                      ? "#389e0d"
                      : grade === "B"
                        ? "#1677ff"
                        : grade === "C"
                          ? "#d46b08"
                          : "#cf1322"
                  return (
                    <tr key={s.id}>
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
                      <td
                        style={{
                          fontWeight: 700,
                          fontSize: 16,
                          color: "#0f1b2d",
                        }}
                      >
                        {grades[s.id]}
                      </td>
                      <td>
                        <span
                          style={{
                            fontWeight: 700,
                            color: gColor,
                            background: gColor + "18",
                            padding: "2px 10px",
                            borderRadius: 4,
                          }}
                        >
                          {grade}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
            <button
              className="ems-btn ems-btn-secondary ems-btn-sm"
              onClick={() => setStep("enter")}
            >
              ← Sửa lại
            </button>
            <button
              className="ems-btn ems-btn-primary ems-btn-sm"
              onClick={() => setStep("submit")}
            >
              Gửi duyệt →
            </button>
          </div>
        </div>
      )}

      {step === "submit" && (
        <div style={{ textAlign: "center", padding: "40px 0" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>📤</div>
          <div
            style={{
              fontWeight: 700,
              fontSize: 18,
              color: "#0f1b2d",
              marginBottom: 8,
            }}
          >
            Gửi bảng điểm đi duyệt?
          </div>
          <div style={{ fontSize: 14, color: "#7a90a8", marginBottom: 24 }}>
            Bảng điểm IT302 — Cuối kỳ sẽ được gửi đến{" "}
            <strong>Trưởng khoa CNTT</strong> để phê duyệt.
          </div>
          <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
            <button
              className="ems-btn ems-btn-secondary ems-btn-md"
              onClick={() => setStep("review")}
            >
              ← Quay lại
            </button>
            <button
              className="ems-btn ems-btn-success ems-btn-md"
              onClick={() => setStep("done")}
            >
              ✓ Xác nhận gửi
            </button>
          </div>
        </div>
      )}

      {step === "done" && (
        <div style={{ textAlign: "center", padding: "40px 0" }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: "50%",
              background: "#f6ffed",
              border: "2px solid #b7eb8f",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 20px",
              fontSize: 36,
            }}
          >
            ✓
          </div>
          <div
            style={{
              fontWeight: 700,
              fontSize: 20,
              color: "#389e0d",
              marginBottom: 8,
            }}
          >
            Đã gửi duyệt thành công!
          </div>
          <div style={{ fontSize: 14, color: "#7a90a8", marginBottom: 24 }}>
            Bảng điểm đang chờ Trưởng khoa CNTT phê duyệt. Bạn sẽ nhận thông báo
            qua email.
          </div>
          <button
            className="ems-btn ems-btn-secondary ems-btn-sm"
            onClick={() => {
              setStep("enter")
              setGrades({})
            }}
          >
            Nhập điểm học phần khác
          </button>
        </div>
      )}
    </div>
  )
}

// ---- QR Attendance Flow ----
function QRAttendanceFlow() {
  const [scanned, setScanned] = useState(false)
  const [checking, setChecking] = useState(false)
  const scanTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(
    () => () => {
      if (scanTimer.current) clearTimeout(scanTimer.current)
    },
    [],
  )

  const handleScan = () => {
    setChecking(true)
    if (scanTimer.current) clearTimeout(scanTimer.current)
    scanTimer.current = setTimeout(() => {
      setChecking(false)
      setScanned(true)
    }, 1500)
  }

  return (
    <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
      {/* QR side */}
      <div className="ems-card" style={{ flex: 1, textAlign: "center" }}>
        <div className="ems-card-header">
          <span style={{ fontWeight: 700, fontSize: 14 }}>
            Quét mã QR điểm danh
          </span>
        </div>
        <div className="ems-card-body">
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 13, color: "#7a90a8", marginBottom: 2 }}>
              IT302 — Lập trình Web
            </div>
            <div style={{ fontSize: 13, color: "#7a90a8" }}>
              Tiết 1–3 • 07:00 • Phòng H2-301
            </div>
          </div>
          {/* QR placeholder */}
          <div
            style={{
              width: 180,
              height: 180,
              margin: "0 auto 20px",
              background: "#0f1b2d",
              borderRadius: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 12,
                border: "2px solid rgba(255,255,255,0.1)",
                borderRadius: 4,
              }}
            />
            <div
              style={{ color: "white", fontSize: 48, fontFamily: "monospace" }}
            >
              ▦
            </div>
            {/* Scan line animation */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 2,
                background:
                  "linear-gradient(90deg, transparent, #1677ff, transparent)",
                animation: "scan 2s linear infinite",
              }}
            />
          </div>
          <style>{`@keyframes scan { 0% { top: 0; } 100% { top: 100%; } }`}</style>
          <div style={{ fontSize: 12, color: "#7a90a8", marginBottom: 16 }}>
            Mã QR có hiệu lực trong{" "}
            <strong style={{ color: "#fa8c16" }}>4:23</strong>
          </div>
          {!scanned && !checking && (
            <button
              className="ems-btn ems-btn-primary ems-btn-md"
              style={{ width: "100%", justifyContent: "center" }}
              onClick={handleScan}
            >
              📷 Mô phỏng quét mã
            </button>
          )}
          {checking && (
            <div
              aria-live="polite"
              role="status"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                color: "#1677ff",
              }}
            >
              <div
                style={{
                  width: 16,
                  height: 16,
                  border: "2px solid #bae0ff",
                  borderTopColor: "#1677ff",
                  borderRadius: "50%",
                  animation: "spin 0.7s linear infinite",
                }}
              />
              Đang xác thực...
            </div>
          )}
          {scanned && (
            <div className="ems-alert ems-alert-success">
              ✓{" "}
              <span>
                <strong>Nguyễn Văn An</strong> đã điểm danh lúc 07:12
              </span>
            </div>
          )}
          {scanned && (
            <button
              className="ems-btn ems-btn-ghost ems-btn-sm"
              style={{ marginTop: 10 }}
              onClick={() => setScanned(false)}
            >
              ↺ Thử lại
            </button>
          )}
        </div>
      </div>

      {/* Realtime list */}
      <div className="ems-card" style={{ width: 280 }}>
        <div className="ems-card-header">
          <span style={{ fontWeight: 700, fontSize: 14 }}>Đã điểm danh</span>
          <span className="ems-badge ems-badge-green">
            {scanned ? 1 : 0}/10
          </span>
        </div>
        <div>
          {scanned && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 14px",
                borderBottom: "1px solid #e8eef5",
                background: "#f6ffed",
              }}
            >
              <div
                className="ems-avatar"
                style={{ width: 28, height: 28, fontSize: 10 }}
              >
                AN
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600 }}>
                  Nguyễn Văn An
                </div>
                <div style={{ fontSize: 11, color: "#7a90a8" }}>
                  07:12 — SV2021001
                </div>
              </div>
              <span
                className="ems-badge ems-badge-green"
                style={{ marginLeft: "auto", fontSize: 11 }}
              >
                ✓
              </span>
            </div>
          )}
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 14px",
                borderBottom: "1px solid #e8eef5",
              }}
            >
              <div
                className="ems-skeleton"
                style={{ width: 28, height: 28, borderRadius: "50%" }}
              />
              <div style={{ flex: 1 }}>
                <div
                  className="ems-skeleton"
                  style={{ height: 12, width: "70%", marginBottom: 4 }}
                />
                <div
                  className="ems-skeleton"
                  style={{ height: 10, width: "50%" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Page07Prototype() {
  const [activeFlow, setActiveFlow] = useState(0)

  const renderFlow = () => {
    switch (activeFlow) {
      case 0:
        return <LoginFlow />
      case 1:
        return <CourseRegFlow />
      case 2:
        return (
          <div
            style={{ textAlign: "center", padding: "60px", color: "#7a90a8" }}
          >
            <div style={{ fontSize: 40, marginBottom: 12 }}>📄</div>
            <div
              style={{
                fontWeight: 600,
                fontSize: 16,
                color: "#0f1b2d",
                marginBottom: 6,
              }}
            >
              Luồng Nộp đơn từ
            </div>
            <div>
              Xem trang 05 Patterns → tab Phê duyệt để xem prototype luồng này
            </div>
          </div>
        )
      case 3:
        return <GradeEntryFlow />
      case 4:
        return <QRAttendanceFlow />
      default:
        return null
    }
  }

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
          07
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
          Prototype Flows
        </h1>
        <p style={{ fontSize: 14, color: "#7a90a8", margin: 0 }}>
          Luồng tương tác hoàn chỉnh — interactive prototype end-to-end
        </p>
      </div>

      {/* Flow selector */}
      <div
        style={{ display: "flex", gap: 10, marginBottom: 28, flexWrap: "wrap" }}
      >
        {FLOWS.map((f, i) => (
          <button
            key={f}
            onClick={() => setActiveFlow(i)}
            className={`ems-btn ems-btn-${
              activeFlow === i ? "primary" : "secondary"
            } ems-btn-sm`}
          >
            {i + 1}. {f}
          </button>
        ))}
      </div>

      {/* Flow content in card */}
      <div className="ems-card" style={{ overflow: "hidden" }}>
        <div
          style={{
            borderBottom: "1px solid #e8eef5",
            padding: "12px 20px",
            background: "#fafbfc",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: "#ff4d4f",
            }}
          />
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: "#fa8c16",
            }}
          />
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: "#52c41a",
            }}
          />
          <span style={{ fontSize: 12, color: "#7a90a8", marginLeft: 8 }}>
            Luồng {activeFlow + 1}: {FLOWS[activeFlow]}
          </span>
        </div>
        <div style={{ padding: "24px 28px" }}>{renderFlow()}</div>
      </div>
    </div>
  )
}
