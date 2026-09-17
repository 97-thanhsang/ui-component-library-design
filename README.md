# UI Component Library Design

Danh mục nội bộ cho hệ thống thiết kế và các thành phần giao diện doanh nghiệp, xây dựng bằng React 19, Vite 8 và Tailwind CSS v4.

## Phạm vi phát hành

Dự án giữ trạng thái riêng tư và không lập chỉ mục. Figma Make tạo `robots.txt` chặn mọi trình thu thập; không thêm analytics hoặc script tùy chỉnh.

## Yêu cầu

- Node.js 22
- pnpm 10.34.3

Phiên bản công cụ được ghi tại `.mise.toml`.

## Phát triển

```bash
pnpm install --frozen-lockfile
pnpm dev
```

Máy chủ phát triển mặc định dùng cổng `8443` hoặc giá trị từ biến môi trường `PORT`.

## Kiểm tra trước khi phát hành

```bash
pnpm run typecheck
pnpm run format:check
pnpm run build
```

GitLab CI chạy cài đặt với lockfile đóng băng, typecheck, kiểm tra định dạng và build. Source map chỉ được bật cho build Figma development; build production không xuất source map.

## Giấy phép

Phát hành theo [MIT License](LICENSE).
