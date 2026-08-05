import React from "react";
import { useContent } from "../content";
import { useTheme } from "../theme";
import { FadeIn, Label, Sec } from "../components/ui";

export function CycleSection() {
  const c = useContent();
  const t = useTheme();
  return (
    <Sec maxWidth={860}>
      <FadeIn>
        <div style={{ textAlign: "center", marginBottom: 54 }}>
          <Label>{c.cycleLabel}</Label>
          <h2 style={{ fontFamily: t.fontDisplay, fontSize: "clamp(26px, 6vw, 48px)", fontWeight: 500, lineHeight: 1.15, letterSpacing: "-0.018em", color: "#fff", margin: "16px 0" }}>
            {c.cycleHeading}
          </h2>
          <p style={{ fontSize: "clamp(15px, 3.8vw, 19px)", color: "var(--cl-text-muted, #888)", maxWidth: 720, margin: "0 auto", lineHeight: 1.75 }}>
            {c.cyclePara}
          </p>
        </div>
      </FadeIn>

      <FadeIn delay={100}>
        {c.cycleItems[0] && (
          <div style={{
            background: `linear-gradient(135deg, ${t.accent}0a, transparent)`,
            border: `1px solid ${t.accent}33`,
            borderRadius: t.cardRadius,
            padding: "clamp(20px, 5vw, 48px)",
            textAlign: "center",
            maxWidth: 720,
            margin: "0 auto 48px",
            position: "relative",
            overflow: "hidden"
          }}>
            <div style={{
              position: "absolute",
              top: "-50%",
              left: "50%",
              transform: "translateX(-50%)",
              width: "80%",
              height: "200%",
              background: `radial-gradient(ellipse at top, ${t.accent}15, transparent 70%)`,
              pointerEvents: "none",
            }} />
            
            <h3 style={{ 
              fontFamily: t.fontBody, 
              fontSize: "clamp(20px, 4.5vw, 26px)", 
              fontWeight: 500, 
              color: "#fff", 
              marginBottom: 20,
              letterSpacing: "-0.02em",
              maxWidth: 500,
              margin: "0 auto 20px"
            }}>
              {c.cycleItems[0].fail}
            </h3>
            
            <p style={{ 
              fontSize: "clamp(15px, 3.8vw, 19px)", 
              lineHeight: 1.85, 
              color: "#cbd5e1", 
              margin: 0,
              fontWeight: 400 
            }}>
              {c.cycleItems[0].why}
            </p>
          </div>
        )}
      </FadeIn>
    </Sec>
  );
}
