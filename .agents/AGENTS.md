# Video Landing Page Design System Rules

**Toàn bộ codebase bắt buộc phải sử dụng các class CSS toàn cục (như `.cl-sh`, `.cl-sec`) thay vì viết inline styles.**

## 1. Không Gian Khối (Layout Max-Width)
- **Single-Column**: Khóa cứng `maxWidth: 860px`.
- **Grid / Card**: Khóa cứng `maxWidth: 1020px`. (Dùng class `.cl-sec--full`).
- **Padding giữa các khối**: Luôn duy trì `padding-top: 120px` (được cấu hình trong `.cl-sec`).

## 2. Hệ Phông Chữ (Typography Stack)
- **Heading (Tiêu đề chính)**: `Noe Display` (`fontDisplay`). Độ đậm khóa ở mức `500 (Medium)`, tuyệt đối không dùng 700/800/900.
- **Body (Văn bản dài, mô tả)**: `Aeonik` / `Inter` (`fontBody`). Độ đậm `400 (Regular)`.
- **Accent / Meta (Nhãn tag, Label, Mã giảm giá, Header cột)**: `JetBrains Mono` (`fontMono`). Bắt buộc IN HOA và `letter-spacing: 0.15em` đến `0.18em`.

## 3. Tiêu đề & Cân bằng dọc (Vertical Rhythm)
- **Line-Height (Chiều cao dòng)**: Khóa ở mức `1.15` cho tiêu đề Noe Display.
- **Letter-Spacing (Khoảng cách chữ)**: Khóa ở mức `-0.018em` cho tiêu đề Noe Display.
- **Class bắt buộc**: Tất cả tiêu đề H1/H2 phải dùng class `.cl-sh`.

## 4. Văn Bản Dài (Body Text)
- **Màu sắc**: Không dùng Trắng Tinh (`#ffffff`). Luôn dùng Xám Sáng (`#b0b0b0` / `var(--cl-text-body)`).
- **Kích thước & Dòng**: `fontSize` dùng `clamp(16px, 1.8vw, 19px)`. `line-height` từ `1.75` đến `1.85`.

## 5. Hình Khối Bo Góc (Radius & Border)
- **Thẻ Card**: Bo góc `16px` (`var(--cl-radius)`).
- **Nút CTA**: Bo góc `12px`, padding dày `22px 56px`.
- **Đường viền vi mạch**: Sử dụng màu chủ đạo (`var(--cl-accent)` pha với opacity 20-30%) để tạo Glow thay vì viền xám đục.
