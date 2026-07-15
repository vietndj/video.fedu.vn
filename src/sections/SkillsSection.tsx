import React from "react";
import { useContent } from "../content";
import { useTheme } from "../theme";
import { FadeIn, Label, SH, Sec, AppYTEmbed } from "../components/ui";
import "./SkillsSection.css"; // We'll create this to handle responsive alternating layout

export function SkillsSection() {
  const c = useContent();
  const t = useTheme();

  return (
    <Sec id="skills" maxWidth={860}>
      <FadeIn>
        <div style={{ textAlign: "center", marginBottom: 54 }}>
          <Label>4 NGUYÊN LÝ KIẾN TRÚC KHUNG HÌNH</Label>
          <SH typed>{c.skillsHeading}</SH>
        </div>
      </FadeIn>
      <FadeIn delay={100}>
        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          {c.skillCards.map((card, i) => {
            const isReversed = i % 2 !== 0;
            return (
              <div key={i} className={`cl-skill-card-alt ${isReversed ? 'cl-skill-card-alt--reversed' : ''}`} style={{
                background: t.card,
                border: `1px solid ${t.line}`,
                borderLeft: `4px solid ${t.accent}`,
                borderRadius: t.cardRadius,
              }}>
                <div className="cl-skill-content">
                  <h4 style={{ fontFamily: t.fontDisplay, fontSize: "clamp(22px, 3vw, 28px)", lineHeight: 1.15, letterSpacing: "-0.018em", fontWeight: 500, color: "#fff", margin: "0 0 16px 0", display: "flex", alignItems: "flex-start", gap: 12 }}>
                    <span style={{ fontFamily: t.fontMono, fontSize: "clamp(20px, 2.5vw, 24px)", color: t.accent, marginTop: 4 }}>{card.n}</span>
                    <span style={{ textWrap: "balance" }}>{card.title}</span>
                  </h4>
                  <p style={{ fontSize: 18, lineHeight: 1.75, color: "#cbd5e1", margin: 0 }}>{card.desc}</p>
                </div>
                
                <div className="cl-skill-media" style={{ aspectRatio: card.aspectRatio || "3 / 4" }}>
                  {card.gif && (
                    <img src={card.gif} alt={card.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  )}
                  {card.youtubeId && (
                    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <div style={{ width: "100%", height: "100%", position: "relative" }}>
                        <AppYTEmbed url={`https://youtube.com/shorts/${card.youtubeId}`} />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </FadeIn>
    </Sec>
  );
}
