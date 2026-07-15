import React from "react";
import { useContent } from "../content";
import { useTheme } from "../theme";
import { FadeIn, CtaButton, Sec } from "../components/ui";

export function MidCtaSection() {
  const c = useContent();
  const t = useTheme();
  return (
    <Sec maxWidth={860}>
      <FadeIn>
        <div style={{
          textAlign: "center",
          background: `linear-gradient(135deg, ${t.accent}15, transparent)`,
          border: `1px solid ${t.accent}44`,
          borderRadius: t.cardRadius,
          padding: "48px 32px"
        }}>
          <h3 style={{ fontFamily: t.fontDisplay, fontSize: 32, fontWeight: 500, lineHeight: 1.15, letterSpacing: "-0.018em", color: "#fff", margin: "0 0 16px 0" }}>
            {c.midCtaHeading || "Sẵn sàng nâng cấp hình ảnh của bạn?"}
          </h3>
          <p style={{ fontSize: 19, color: "var(--cl-text-muted, #888)", marginBottom: 32, lineHeight: 1.75 }}>
            {c.midCtaSub || "Đừng để kỹ thuật là rào cản ngăn bạn trao đi giá trị."}
          </p>
          <CtaButton label={(c as any).midCtaBtn || "Đăng Ký Ngay"} />
          <p style={{ fontSize: 16, color: "var(--cl-accent)", marginTop: 24, fontWeight: 500 }}>
            Chỉ với {c.price} VNĐ
          </p>
        </div>
      </FadeIn>
    </Sec>
  );
}
