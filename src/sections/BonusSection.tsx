import React from "react";
import { useContent } from "../content";
import { useTheme } from "../theme";
import { FadeIn, Label, SH, Sec, BONUS_ICONS } from "../components/ui";

export function BonusSection() {
  const c = useContent();
  const t = useTheme();
  return (
    <Sec maxWidth={860} id="bonus">
      <FadeIn>
        <div style={{ textAlign: "center", marginBottom: 54 }}>
          <Label>{(c as any).bonusLabel || c.bonusesLabel}</Label>
          <SH typed>{(c as any).bonusHeading || c.bonusesHeading}</SH>
          <p style={{ fontSize: 18, color: "var(--cl-text-muted, #888)", maxWidth: 620, margin: "16px auto 0", lineHeight: 1.75 }}>
            {(c as any).bonusSub || c.bonusesSub}
          </p>
        </div>
      </FadeIn>
      <FadeIn delay={100}>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {((c as any).bonusItems || c.bonuses || []).map((item: any, i: number) => {
            const Icon = BONUS_ICONS[i % BONUS_ICONS.length];
            const hasSideGif = !!item.gifDemo;
            const hasMultiGifs = Array.isArray(item.gifDemos) && item.gifDemos.length > 0;

            if (hasMultiGifs) {
              return (
                <div key={i} style={{
                  background: "var(--cl-card)", border: `1px solid var(--cl-line)`,
                  borderRadius: t.cardRadius, padding: "clamp(20px, 4vw, 32px)",
                  display: "flex", flexDirection: "column", gap: 20
                }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 20 }}>
                    <div style={{
                      width: 52, height: 52, borderRadius: 12,
                      background: `linear-gradient(135deg, ${t.accent}22, transparent)`,
                      border: `1px solid ${t.accent}44`,
                      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                    }}>
                      <Icon accent={t.accent} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 12, color: "var(--cl-accent)", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>
                        BONUS {i + 1}
                      </div>
                      <h4 style={{ fontFamily: t.fontBody, fontSize: 20, fontWeight: 500, color: "#fff", margin: "0 0 8px 0" }}>
                        {item.title}
                      </h4>
                      <div style={{ fontSize: 15, lineHeight: 1.6, color: "#cbd5e1", margin: 0 }} dangerouslySetInnerHTML={{ __html: item.desc }} />
                    </div>
                  </div>

                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))",
                    gap: 16,
                    marginTop: 8
                  }}>
                    {item.gifDemos.map((gif: any, idx: number) => {
                      const src = typeof gif === "string" ? gif : gif.url;
                      const label = typeof gif === "object" ? gif.label : "";
                      return (
                        <div key={idx} style={{
                          background: "#000",
                          border: "1px solid rgba(255, 255, 255, 0.12)",
                          borderRadius: 12,
                          overflow: "hidden",
                          boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
                          display: "flex",
                          flexDirection: "column"
                        }}>
                          <img
                            src={src}
                            alt={label || item.title}
                            style={{
                              width: "100%",
                              height: 160,
                              objectFit: "cover",
                              display: "block"
                            }}
                          />
                          {label && (
                            <div style={{
                              padding: "8px 12px",
                              background: "rgba(15, 23, 42, 0.9)",
                              borderTop: "1px solid rgba(255,255,255,0.08)",
                              fontSize: 13,
                              color: "var(--cl-accent)",
                              textAlign: "center",
                              fontWeight: 500,
                              fontFamily: "var(--cl-font-mono)"
                            }}>
                              {label}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            }

            if (hasSideGif) {
              return (
                <div key={i} style={{
                  background: "var(--cl-card)", border: `1px solid var(--cl-line)`,
                  borderRadius: t.cardRadius, padding: "28px",
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))",
                  gap: 24, alignItems: "center"
                }}>
                  {/* Left Column: Icon + Text */}
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 20 }}>
                    <div style={{
                      width: 52, height: 52, borderRadius: 12,
                      background: `linear-gradient(135deg, ${t.accent}22, transparent)`,
                      border: `1px solid ${t.accent}44`,
                      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                    }}>
                      <Icon accent={t.accent} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 12, color: "var(--cl-accent)", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>
                        BONUS {i + 1}
                      </div>
                      <h4 style={{ fontFamily: t.fontBody, fontSize: 20, fontWeight: 500, color: "#fff", margin: "0 0 8px 0" }}>
                        {item.title}
                      </h4>
                      <div style={{ fontSize: 15, lineHeight: 1.6, color: "#cbd5e1", margin: 0 }} dangerouslySetInnerHTML={{ __html: item.desc }} />
                    </div>
                  </div>

                  {/* Right Column: GIF */}
                  <div style={{
                    background: "#000",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    borderRadius: 12,
                    overflow: "hidden",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.4)"
                  }}>
                    <img
                      src={item.gifDemo}
                      alt={item.title}
                      style={{
                        width: "100%",
                        height: "auto",
                        maxHeight: 210,
                        objectFit: "cover",
                        display: "block"
                      }}
                    />
                  </div>
                </div>
              );
            }

            return (
              <div key={i} style={{
                background: "var(--cl-card)", border: `1px solid var(--cl-line)`,
                borderRadius: t.cardRadius, padding: "clamp(16px, 4vw, 32px)", display: "flex", alignItems: "flex-start", gap: 24,
              }}>
                <div style={{
                  width: 56, height: 56, borderRadius: 12,
                  background: `linear-gradient(135deg, ${t.accent}22, transparent)`,
                  border: `1px solid ${t.accent}44`,
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                }}>
                  <Icon accent={t.accent} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, color: "var(--cl-accent)", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>
                    BONUS {i + 1}
                  </div>
                  <h4 style={{ fontFamily: t.fontBody, fontSize: 20, fontWeight: 500, color: "#fff", margin: "0 0 8px 0" }}>
                    {item.title}
                  </h4>
                  <div style={{ fontSize: 16, lineHeight: 1.6, color: "#cbd5e1", margin: 0 }} dangerouslySetInnerHTML={{ __html: item.desc }} />
                  {item.audioDemo && (
                    <div style={{ marginTop: 20, padding: "14px 16px", background: "rgba(255,255,255,0.04)", borderRadius: 12, border: `1px solid rgba(255,255,255,0.08)` }}>
                      <div style={{ fontSize: 13, color: "#a1a1aa", marginBottom: 10, fontWeight: 500, letterSpacing: "0.03em" }}>🎧 NGHE THỬ ÂM THANH MẪU:</div>
                      <audio controls src={item.audioDemo} style={{ width: "100%", height: 38, outline: "none", borderRadius: 8 }} />
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
