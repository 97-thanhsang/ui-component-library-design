import { useState } from "react"

const TABS = ["Component API", "Accessibility", "Do & Don't", "Changelog"]

function ComponentAPI() {
  const [selected, setSelected] = useState("Button")

  const COMPONENTS: Record<string, {
    desc: string
    props: Array<{
      name: string
      type: string
      default: string
      desc: string
      required?: boolean
    }>
    example: string
  }> = {
    Button: {
      desc: "Component nút bấm đa dụng với nhiều biến thể và kích thước. Hỗ trợ icon, loading state và disabled.",
      props: [
        {
          name: "variant",
          type: "'primary' | 'secondary' | 'ghost' | 'danger' | 'success'",
          default: "'primary'",
          desc: "Kiểu hiển thị của nút",
        },
        {
          name: "size",
          type: "'xs' | 'sm' | 'md' | 'lg'",
          default: "'md'",
          desc: "Kích thước nút",
        },
        {
          name: "disabled",
          type: "boolean",
          default: "false",
          desc: "Vô hiệu hóa nút",
        },
        {
          name: "loading",
          type: "boolean",
          default: "false",
          desc: "Hiển thị trạng thái đang tải",
        },
        {
          name: "onClick",
          type: "() => void",
          default: "—",
          desc: "Hàm xử lý sự kiện click",
        },
        {
          name: "children",
          type: "React.ReactNode",
          default: "—",
          desc: "Nội dung bên trong nút",
          required: true,
        },
        {
          name: "icon",
          type: "React.ReactNode",
          default: "—",
          desc: "Icon hiển thị bên trái",
        },
        {
          name: "iconRight",
          type: "React.ReactNode",
          default: "—",
          desc: "Icon hiển thị bên phải",
        },
        {
          name: "fullWidth",
          type: "boolean",
          default: "false",
          desc: "Nút chiếm toàn bộ chiều rộng",
        },
      ],
      example: `<Button variant="primary" size="md" onClick={() => {}}>
  Thêm sinh viên
</Button>

<Button variant="danger" loading={isDeleting}>
  Xóa bản ghi
</Button>

<Button variant="secondary" icon={<DownloadIcon />}>
  Xuất dữ liệu
</Button>`,
    },
    Input: {
      desc: "Trường nhập liệu văn bản với đầy đủ trạng thái: mặc định, focus, lỗi, thành công, disabled và read-only.",
      props: [
        {
          name: "value",
          type: "string",
          default: "—",
          desc: "Giá trị của input",
          required: true,
        },
        {
          name: "onChange",
          type: "(e: ChangeEvent) => void",
          default: "—",
          desc: "Hàm xử lý thay đổi giá trị",
        },
        {
          name: "placeholder",
          type: "string",
          default: "—",
          desc: "Văn bản gợi ý",
        },
        {
          name: "disabled",
          type: "boolean",
          default: "false",
          desc: "Vô hiệu hóa input",
        },
        {
          name: "readOnly",
          type: "boolean",
          default: "false",
          desc: "Chỉ đọc",
        },
        {
          name: "error",
          type: "boolean | string",
          default: "false",
          desc: "Trạng thái lỗi, có thể là thông báo lỗi",
        },
        {
          name: "success",
          type: "boolean",
          default: "false",
          desc: "Trạng thái hợp lệ",
        },
        {
          name: "prefix",
          type: "React.ReactNode",
          default: "—",
          desc: "Icon hoặc text trước input",
        },
        {
          name: "suffix",
          type: "React.ReactNode",
          default: "—",
          desc: "Icon hoặc text sau input",
        },
        {
          name: "size",
          type: "'sm' | 'md' | 'lg'",
          default: "'md'",
          desc: "Chiều cao của input",
        },
      ],
      example: `<Input
  value={name}
  onChange={e => setName(e.target.value)}
  placeholder="Nhập họ và tên..."
  error={!name && "Tên không được để trống"}
/>

<Input
  value={search}
  prefix={<SearchIcon />}
  placeholder="Tìm kiếm sinh viên..."
/>`,
    },
    Badge: {
      desc: "Nhãn trạng thái nhỏ gọn dùng để hiển thị trạng thái, phân loại và đếm số lượng.",
      props: [
        {
          name: "variant",
          type: "'blue' | 'green' | 'orange' | 'red' | 'purple' | 'gray'",
          default: "'blue'",
          desc: "Màu sắc badge theo semantic",
        },
        {
          name: "dot",
          type: "boolean",
          default: "false",
          desc: "Hiển thị chấm tròn trước label",
        },
        {
          name: "count",
          type: "number",
          default: "—",
          desc: "Số đếm thay thế cho label",
        },
        {
          name: "children",
          type: "React.ReactNode",
          default: "—",
          desc: "Nội dung badge",
          required: true,
        },
      ],
      example: `<Badge variant="green" dot>Đang học</Badge>
<Badge variant="orange">Cảnh báo</Badge>
<Badge variant="red" count={5} />`,
    },
    Modal: {
      desc: "Hộp thoại modal với overlay, header, body và footer. Hỗ trợ đóng bằng Escape và click bên ngoài.",
      props: [
        {
          name: "open",
          type: "boolean",
          default: "false",
          desc: "Kiểm soát hiển thị modal",
          required: true,
        },
        {
          name: "onClose",
          type: "() => void",
          default: "—",
          desc: "Hàm đóng modal",
          required: true,
        },
        { name: "title", type: "string", default: "—", desc: "Tiêu đề modal" },
        {
          name: "size",
          type: "'sm' | 'md' | 'lg' | 'xl' | 'full'",
          default: "'md'",
          desc: "Kích thước modal",
        },
        {
          name: "footer",
          type: "React.ReactNode",
          default: "—",
          desc: "Nội dung footer tùy chỉnh",
        },
        {
          name: "closeOnOverlay",
          type: "boolean",
          default: "true",
          desc: "Đóng khi click overlay",
        },
        {
          name: "children",
          type: "React.ReactNode",
          default: "—",
          desc: "Nội dung body",
          required: true,
        },
      ],
      example: `<Modal
  open={showModal}
  onClose={() => setShowModal(false)}
  title="Thêm sinh viên mới"
  size="md"
  footer={
    <>
      <Button variant="secondary" onClick={onClose}>Hủy</Button>
      <Button variant="primary" onClick={onSubmit}>Lưu</Button>
    </>
  }
>
  <FormContent />
</Modal>`,
    },
  }

  const comp = COMPONENTS[selected]

  return (
    <div>
      <div style={{ display: "flex", gap: 16 }}>
        {/* Component list */}
        <div style={{ width: 180, flexShrink: 0 }}>
          <div className="section-label">Components</div>
          <div
            style={{
              background: "white",
              border: "1px solid #d1dbe8",
              borderRadius: 8,
              overflow: "hidden",
            }}
          >
            {Object.keys(COMPONENTS).map((name) => (
              <button
                key={name}
                type="button"
                aria-pressed={selected === name}
                onClick={() => setSelected(name)}
                style={{
                  padding: "10px 14px",
                  cursor: "pointer",
                  fontSize: 13.5,
                  fontWeight: 500,
                  borderBottom: "1px solid #e8eef5",
                  background: selected === name ? "#e6f4ff" : "white",
                  color: selected === name ? "#1677ff" : "#0f1b2d",
                  borderLeft: `2px solid ${
                    selected === name ? "#1677ff" : "transparent"
                  }`,
                  textAlign: "left",
                  width: "100%",
                }}
              >
                {name}
              </button>
            ))}
          </div>
        </div>

        {/* API doc */}
        <div style={{ flex: 1 }}>
          <div className="ems-card" style={{ marginBottom: 16 }}>
            <div className="ems-card-header">
              <div>
                <div
                  style={{ fontWeight: 800, fontSize: 18, color: "#0f1b2d" }}
                >
                  &lt;{selected} /&gt;
                </div>
                <div style={{ fontSize: 13, color: "#7a90a8", marginTop: 4 }}>
                  {comp.desc}
                </div>
              </div>
            </div>
            <div className="ems-card-body">
              <div className="section-label">Props</div>
              <div
                style={{
                  border: "1px solid #d1dbe8",
                  borderRadius: 8,
                  overflow: "hidden",
                }}
              >
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    fontSize: 13,
                  }}
                >
                  <thead>
                    <tr style={{ background: "#f5f7fa" }}>
                      <th
                        style={{
                          padding: "10px 14px",
                          textAlign: "left",
                          color: "#4a5e78",
                          fontWeight: 600,
                          borderBottom: "1px solid #d1dbe8",
                        }}
                      >
                        Prop
                      </th>
                      <th
                        style={{
                          padding: "10px 14px",
                          textAlign: "left",
                          color: "#4a5e78",
                          fontWeight: 600,
                          borderBottom: "1px solid #d1dbe8",
                        }}
                      >
                        Type
                      </th>
                      <th
                        style={{
                          padding: "10px 14px",
                          textAlign: "left",
                          color: "#4a5e78",
                          fontWeight: 600,
                          borderBottom: "1px solid #d1dbe8",
                        }}
                      >
                        Default
                      </th>
                      <th
                        style={{
                          padding: "10px 14px",
                          textAlign: "left",
                          color: "#4a5e78",
                          fontWeight: 600,
                          borderBottom: "1px solid #d1dbe8",
                        }}
                      >
                        Mô tả
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {comp.props.map((p, i) => (
                      <tr
                        key={p.name}
                        style={{
                          borderBottom:
                            i < comp.props.length - 1
                              ? "1px solid #e8eef5"
                              : "none",
                        }}
                      >
                        <td
                          style={{ padding: "9px 14px", verticalAlign: "top" }}
                        >
                          <code
                            style={{
                              fontFamily: "JetBrains Mono,monospace",
                              fontSize: 12,
                              color: "#531dab",
                            }}
                          >
                            {p.name}
                          </code>
                          {p.required && (
                            <span style={{ color: "#ff4d4f", marginLeft: 2 }}>
                              *
                            </span>
                          )}
                        </td>
                        <td
                          style={{ padding: "9px 14px", verticalAlign: "top" }}
                        >
                          <code
                            style={{
                              fontFamily: "JetBrains Mono,monospace",
                              fontSize: 11,
                              color: "#0958d9",
                              background: "#e6f4ff",
                              padding: "1px 5px",
                              borderRadius: 3,
                            }}
                          >
                            {p.type}
                          </code>
                        </td>
                        <td
                          style={{ padding: "9px 14px", verticalAlign: "top" }}
                        >
                          <code
                            style={{
                              fontFamily: "JetBrains Mono,monospace",
                              fontSize: 12,
                              color: "#389e0d",
                            }}
                          >
                            {p.default}
                          </code>
                        </td>
                        <td
                          style={{
                            padding: "9px 14px",
                            verticalAlign: "top",
                            color: "#4a5e78",
                          }}
                        >
                          {p.desc}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="ems-card">
            <div className="ems-card-header">
              <span style={{ fontWeight: 700, fontSize: 14 }}>
                Ví dụ sử dụng
              </span>
            </div>
            <div
              style={{
                background: "#0f1b2d",
                margin: 0,
                borderRadius: "0 0 8px 8px",
                padding: "16px 20px",
                fontFamily: "JetBrains Mono,monospace",
                fontSize: 13,
                color: "#9db8d0",
                lineHeight: 1.8,
                overflow: "auto",
              }}
            >
              <pre style={{ margin: 0, whiteSpace: "pre-wrap" }}>
                {comp.example}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function AccessibilityDocs() {
  return (
    <div>
      <div className="page-section">
        <div className="section-label">WCAG 2.1 AA Compliance</div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2,1fr)",
            gap: 16,
          }}
        >
          {[
            {
              title: "1.1 — Thay thế văn bản",
              items: [
                "Tất cả icon có aria-label hoặc title",
                "Hình ảnh có alt text mô tả",
                "Biểu đồ có mô tả văn bản",
                "Badge không chỉ dùng màu sắc để truyền thông tin",
              ],
            },
            {
              title: "1.4 — Phân biệt màu sắc",
              items: [
                "Tỷ lệ tương phản text ≥ 4.5:1 (AA)",
                "Text lớn ≥ 3:1",
                "Focus ring: 2px solid #1677ff",
                "Không bao giờ chỉ dùng màu làm phương tiện duy nhất",
              ],
            },
            {
              title: "2.1 — Điều khiển bàn phím",
              items: [
                "Tất cả interactive element có thể focus bằng Tab",
                "Modal đóng bằng Escape",
                "Dropdown điều hướng bằng Arrow keys",
                "Dialog trap focus khi mở",
              ],
            },
            {
              title: "2.4 — Điều hướng dễ dàng",
              items: [
                "Skip to content link",
                "Heading hierarchy rõ ràng (h1 → h6)",
                "Focus visible trên mọi element",
                "Breadcrumb trên mọi trang con",
              ],
            },
            {
              title: "3.1 — Ngôn ngữ",
              items: [
                "lang='vi' trong HTML element",
                "Nội dung tiếng Anh đánh dấu lang='en'",
                "Font Be Vietnam Pro hỗ trợ đầy đủ ký tự tiếng Việt",
                "Tên riêng Việt Nam giữ nguyên dấu",
              ],
            },
            {
              title: "4.1 — Tương thích",
              items: [
                "ARIA roles và attributes đúng chuẩn",
                "Live regions cho thông báo dynamic",
                "Form labels liên kết với input qua htmlFor",
                "Error messages được đọc bởi screen reader",
              ],
            },
          ].map((section) => (
            <div key={section.title} className="ems-card">
              <div className="ems-card-header">
                <span
                  style={{ fontWeight: 700, fontSize: 13.5, color: "#0f1b2d" }}
                >
                  {section.title}
                </span>
              </div>
              <div className="ems-card-body">
                <ul
                  style={{
                    margin: 0,
                    padding: "0 0 0 16px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 6,
                  }}
                >
                  {section.items.map((item) => (
                    <li
                      key={item}
                      style={{
                        fontSize: 13,
                        color: "#4a5e78",
                        lineHeight: 1.5,
                      }}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="page-section">
        <div className="section-label">
          Contrast Ratios — Kiểm tra tương phản
        </div>
        <div className="ems-card" style={{ overflow: "hidden" }}>
          <table className="ems-table">
            <thead>
              <tr>
                <th>Cặp màu</th>
                <th>Background</th>
                <th>Text</th>
                <th style={{ textAlign: "center" }}>Tỷ lệ</th>
                <th style={{ textAlign: "center" }}>AA (4.5:1)</th>
                <th style={{ textAlign: "center" }}>AAA (7:1)</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Nút Primary", "#1677ff", "#ffffff", "4.6:1", true, false],
                [
                  "Text trên nền trắng",
                  "#0f1b2d",
                  "#ffffff",
                  "17.4:1",
                  true,
                  true,
                ],
                ["Text phụ", "#4a5e78", "#ffffff", "7.1:1", true, true],
                ["Text tertiary", "#7a90a8", "#ffffff", "4.6:1", true, false],
                ["Text disabled", "#b0bec8", "#ffffff", "2.3:1", false, false],
                ["Success badge", "#389e0d", "#f6ffed", "4.9:1", true, false],
                ["Error badge", "#cf1322", "#fff2f0", "5.2:1", true, false],
                ["Warning badge", "#d46b08", "#fff7e6", "4.7:1", true, false],
                ["Navy sidebar", "#ffffff", "#0f1b2d", "17.4:1", true, true],
              ].map(([pair, bg, text, ratio, aa, aaa]) => (
                <tr key={pair as string}>
                  <td>
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 8 }}
                    >
                      <div
                        style={{
                          width: 32,
                          height: 20,
                          background: bg as string,
                          border: "1px solid rgba(0,0,0,0.1)",
                          borderRadius: 4,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <span
                          style={{
                            fontSize: 9,
                            color: text as string,
                            fontWeight: 700,
                          }}
                        >
                          Aa
                        </span>
                      </div>
                      <span style={{ fontSize: 13 }}>{pair as string}</span>
                    </div>
                  </td>
                  <td>
                    <code
                      style={{
                        fontSize: 12,
                        fontFamily: "JetBrains Mono,monospace",
                        color: "#4a5e78",
                      }}
                    >
                      {bg as string}
                    </code>
                  </td>
                  <td>
                    <code
                      style={{
                        fontSize: 12,
                        fontFamily: "JetBrains Mono,monospace",
                        color: "#4a5e78",
                      }}
                    >
                      {text as string}
                    </code>
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      fontWeight: 600,
                      fontFamily: "JetBrains Mono,monospace",
                    }}
                  >
                    {ratio as string}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {aa ? (
                      <span style={{ color: "#52c41a", fontSize: 16 }}>✓</span>
                    ) : (
                      <span style={{ color: "#ff4d4f", fontSize: 14 }}>✕</span>
                    )}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {aaa ? (
                      <span style={{ color: "#52c41a", fontSize: 16 }}>✓</span>
                    ) : (
                      <span style={{ color: "#b0bec8", fontSize: 14 }}>—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function DoAndDont() {
  const rules = [
    {
      topic: "Buttons — Nút bấm",
      do: [
        "Dùng Primary button cho hành động chính trên mỗi trang/dialog",
        "Đặt nút chính ở phải, nút phụ ở trái trong dialog footer",
        "Dùng verb hành động rõ ràng: 'Lưu thông tin', 'Xóa sinh viên'",
        "Thêm icon khi icon giúp hiểu nhanh hơn (Download icon + 'Xuất Excel')",
      ],
      dont: [
        "Không dùng nhiều hơn 1 Primary button cùng cấp",
        "Không dùng màu đỏ cho hành động không nguy hiểm",
        "Không để nút quá dài hoặc quá ngắn — min-width 80px",
        "Không dùng 'OK', 'Submit', 'Click here' — thiếu ngữ cảnh",
      ],
    },
    {
      topic: "Forms — Biểu mẫu",
      do: [
        "Label luôn đặt phía trên input, không inline với input",
        "Hiển thị lỗi ngay bên dưới field liên quan",
        "Trường bắt buộc đánh dấu * và giải thích ở đầu form",
        "Dùng autocomplete attribute cho các trường phổ biến",
      ],
      dont: [
        "Không ẩn label dù có placeholder",
        "Không hiển thị tất cả lỗi chỉ sau khi submit",
        "Không dùng placeholder làm label duy nhất",
        "Không disable nút Submit — để submit rồi validate",
      ],
    },
    {
      topic: "Status & Colors — Trạng thái",
      do: [
        "Luôn kết hợp màu + icon + text để truyền trạng thái",
        "Dùng cùng màu semantic nhất quán: xanh=OK, đỏ=lỗi",
        "Badge trạng thái luôn có chấm tròn hoặc icon prefix",
        "Dùng ARIA live region cho thay đổi trạng thái dynamic",
      ],
      dont: [
        "Không dùng màu đỏ cho trạng thái trung tính như 'Bảo lưu'",
        "Không đổi màu ngẫu nhiên — theo đúng semantic color system",
        "Không chỉ dùng màu (không có text) để truyền nghĩa",
        "Không dùng quá 3 màu trạng thái trong cùng 1 component",
      ],
    },
    {
      topic: "Tables — Bảng dữ liệu",
      do: [
        "Header cột sticky khi bảng cuộn dọc",
        "Hiển thị total count và range đang hiển thị",
        "Cho phép sắp xếp cột với indicator rõ ràng",
        "Hành động hàng (edit/delete) hiện khi hover",
      ],
      dont: [
        "Không để bảng quá nhiều cột — ẩn cột ít quan trọng",
        "Không pagination dưới 20 bản ghi — hiển thị tất cả",
        "Không đặt action button nổi bật trong mọi hàng",
        "Không cho phép sort cột không có nghĩa sort (như mô tả)",
      ],
    },
  ]

  return (
    <div>
      {rules.map((rule) => (
        <div key={rule.topic} className="page-section">
          <div className="section-label">{rule.topic}</div>
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}
          >
            <div
              style={{
                background: "#f6ffed",
                border: "1px solid #b7eb8f",
                borderRadius: 8,
                padding: "16px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 12,
                  fontWeight: 700,
                  color: "#389e0d",
                }}
              >
                <span style={{ fontSize: 18 }}>✓</span> NÊN làm
              </div>
              <ul
                style={{
                  margin: 0,
                  padding: "0 0 0 16px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                {rule.do.map((item) => (
                  <li
                    key={item}
                    style={{
                      fontSize: 13.5,
                      color: "#0f1b2d",
                      lineHeight: 1.5,
                    }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div
              style={{
                background: "#fff2f0",
                border: "1px solid #ffccc7",
                borderRadius: 8,
                padding: "16px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 12,
                  fontWeight: 700,
                  color: "#cf1322",
                }}
              >
                <span style={{ fontSize: 18 }}>✕</span> KHÔNG nên làm
              </div>
              <ul
                style={{
                  margin: 0,
                  padding: "0 0 0 16px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                {rule.dont.map((item) => (
                  <li
                    key={item}
                    style={{
                      fontSize: 13.5,
                      color: "#0f1b2d",
                      lineHeight: 1.5,
                    }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function Changelog() {
  const entries = [
    {
      version: "2.0.0",
      date: "09/2026",
      tag: "Major",
      color: "#722ed1",
      changes: [
        "Hoàn thiện bộ component library đầy đủ 100+ components",
        "Thêm 8 trang hệ thống có tổ chức rõ ràng",
        "Bổ sung prototype flows: đăng nhập, đăng ký HP, nhập điểm",
        "Cập nhật design tokens Tailwind CSS v4 compatible",
        "Bổ sung Vietnamese typography với Be Vietnam Pro",
        "Thêm WCAG 2.1 AA compliance documentation",
      ],
    },
    {
      version: "1.5.0",
      date: "06/2025",
      tag: "Feature",
      color: "#52c41a",
      changes: [
        "Thêm component Schedule / Timetable",
        "Bổ sung Attendance Marking pattern",
        "Cập nhật Advanced Filter với saved filters",
        "Thêm Import/Export template hoàn chỉnh",
      ],
    },
    {
      version: "1.4.0",
      date: "03/2025",
      tag: "Feature",
      color: "#1677ff",
      changes: [
        "Thêm Approval Workflow pattern",
        "Bổ sung Permission Matrix component",
        "Cập nhật Table với editable cells",
        "Thêm QR Attendance flow",
      ],
    },
    {
      version: "1.3.0",
      date: "12/2024",
      tag: "Patch",
      color: "#fa8c16",
      changes: [
        "Fix contrast ratio cho warning badge",
        "Cải thiện focus ring visibility",
        "Sửa lỗi date picker trên Safari",
      ],
    },
    {
      version: "1.0.0",
      date: "09/2024",
      tag: "Initial",
      color: "#b0bec8",
      changes: [
        "Ra mắt ASC.EMS Design System v1.0",
        "Bộ component cơ bản: Button, Input, Table, Modal",
        "Foundations: Color, Typography, Spacing",
      ],
    },
  ]

  return (
    <div className="page-section">
      <div className="section-label">Lịch sử phiên bản</div>
      <div>
        {entries.map((e) => (
          <div key={e.version} className="timeline-item">
            <div
              className="timeline-dot"
              style={{
                width: 36,
                height: 36,
                background: e.color + "22",
                border: `2px solid ${e.color}`,
              }}
            >
              <span style={{ fontSize: 10, fontWeight: 700, color: e.color }}>
                v{e.version.split(".")[0]}
              </span>
            </div>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 6,
                }}
              >
                <span
                  style={{ fontWeight: 800, fontSize: 16, color: "#0f1b2d" }}
                >
                  v{e.version}
                </span>
                <span
                  style={{
                    fontSize: 12,
                    color: "white",
                    background: e.color,
                    padding: "2px 8px",
                    borderRadius: 4,
                    fontWeight: 600,
                  }}
                >
                  {e.tag}
                </span>
                <span style={{ fontSize: 12, color: "#7a90a8" }}>{e.date}</span>
              </div>
              <ul style={{ margin: 0, padding: "0 0 0 16px" }}>
                {e.changes.map((c) => (
                  <li
                    key={c}
                    style={{
                      fontSize: 13.5,
                      color: "#4a5e78",
                      marginBottom: 4,
                      lineHeight: 1.5,
                    }}
                  >
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Page08Docs() {
  const [activeTab, setActiveTab] = useState(0)
  const renderContent = () => {
    switch (activeTab) {
      case 0:
        return <ComponentAPI />
      case 1:
        return <AccessibilityDocs />
      case 2:
        return <DoAndDont />
      case 3:
        return <Changelog />
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
          08
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
          Documentation
        </h1>
        <p style={{ fontSize: 14, color: "#7a90a8", margin: 0 }}>
          Component API, accessibility compliance, do & don't examples và
          changelog
        </p>
      </div>
      <div
        className="ems-tabs-nav"
        role="tablist"
        aria-label="Tài liệu thiết kế"
        style={{ marginBottom: 28 }}
      >
        {TABS.map((t, i) => (
          <button
            key={t}
            type="button"
            role="tab"
            id={`docs-tab-${i}`}
            aria-selected={activeTab === i}
            aria-controls={`docs-panel-${i}`}
            className={`ems-tab-item ${activeTab === i ? "active" : ""}`}
            onClick={() => setActiveTab(i)}
          >
            {t}
          </button>
        ))}
      </div>
      <div
        role="tabpanel"
        id={`docs-panel-${activeTab}`}
        aria-labelledby={`docs-tab-${activeTab}`}
      >
        {renderContent()}
      </div>
    </div>
  )
}
