import React from "react";
import { useContent } from "../content";
import { useTheme } from "../theme";
import { FadeIn, Label, SH, Sec } from "../components/ui";

export function InstructorSection() {
  const c = useContent();
  const t = useTheme();
  return (
    <Sec maxWidth={860}>
      <FadeIn>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <Label>{c.instructorLabel}</Label>
          <SH typed>{c.instructorHeading}</SH>
        </div>
      </FadeIn>
      <FadeIn delay={100}>
        <div style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.015) 0%, rgba(255,255,255,0.002) 100%)",
          border: `1px solid var(--cl-line)`, borderRadius: t.cardRadius, padding: "48px 40px",
          display: "flex", gap: 52, alignItems: "flex-start", flexWrap: "wrap", boxShadow: "0 20px 50px -15px rgba(0,0,0,0.4)",
        }}>
          <div style={{ flexShrink: 0, textAlign: "center", minWidth: 200, maxWidth: 240, margin: "0 auto" }}>
            <div style={{
              borderRadius: 16, overflow: "hidden", border: `2px solid ${t.accent}44`,
              boxShadow: `0 0 40px -12px ${t.accent}55`, marginBottom: 16,
            }}>
              <img src={c.instructorPhoto ?? "/instructor.jpg"} loading="lazy" alt={c.instructorName} style={{ width: "100%", display: "block" }} />
            </div>
            <div style={{ fontFamily: t.fontDisplay, fontSize: 22, fontWeight: 500, lineHeight: 1.15, letterSpacing: "-0.018em", color: "#fff", marginBottom: 6 }}>
              {c.instructorName}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "center" }}>
              <div style={{
                display: "inline-block", background: `${t.accent}18`, border: `1px solid ${t.accent}44`,
                borderRadius: 40, padding: "5px 14px", fontSize: 13, color: "var(--cl-accent)",
                fontWeight: 500, letterSpacing: "0.03em",
              }}>
                15 năm giảng dạy
              </div>
              <div style={{
                display: "inline-block", background: "rgba(16, 185, 129, 0.12)", border: "1px solid rgba(16, 185, 129, 0.4)",
                borderRadius: 40, padding: "5px 14px", fontSize: 12, color: "#10b981",
                fontWeight: 600, letterSpacing: "0.03em",
              }}>
                ✨ Tác giả Bản Cập nhật Tháng 7/2026
              </div>
            </div>
          </div>

          <div style={{ flex: 1, minWidth: 260, display: "flex", flexDirection: "column", gap: 0 }}>
            <p style={{ fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--cl-text-muted, #666)", fontFamily: "monospace", marginBottom: 24, lineHeight: 1.8 }}>
              KỸ SƯ CÔNG NGHỆ PHẦN MỀM (ĐH BÁCH KHOA). 15 NĂM<br />GIẢNG VIÊN MỸ THUẬT ĐA PHƯƠNG TIỆN TẠI FPT ARENA.
            </p>
            
            <div style={{ height: 1, background: "var(--cl-line)", marginBottom: 24 }} />
            
            <div style={{ marginBottom: 24 }}>
              <p style={{ fontSize: 17, lineHeight: 1.7, color: "#94a3b8", fontWeight: 400, margin: "0 0 16px 0" }}>
                Rào cản lớn nhất của người mới không phải là thiếu thiết bị xịn.
              </p>
              <p style={{ fontSize: 17, lineHeight: 1.7, color: "#fff", fontWeight: 500, margin: 0 }}>
                Mà là bị quá tải bởi những lý thuyết dựng phim rườm rà.
              </p>
            </div>

            <div style={{ height: 1, background: "var(--cl-line)", marginBottom: 24 }} />

            <div style={{ marginBottom: 0 }}>
              <p style={{ fontSize: 17, lineHeight: 1.7, color: "#94a3b8", fontWeight: 400, margin: "0 0 16px 0" }}>
                Khóa học này không có định nghĩa hàn lâm.
              </p>
              <p style={{ fontSize: 17, lineHeight: 1.7, color: "#fff", fontWeight: 500, margin: 0 }}>
                Chỉ có những quy luật trực quan nhất — để bạn cầm máy lên là quay được ngay.
              </p>
            </div>
          </div>
        </div>
      </FadeIn>
    </Sec>
  );
}
