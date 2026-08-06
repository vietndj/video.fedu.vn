import React from "react";
import { useContent } from "./content";
import { useTheme } from "./theme";
import { ThemeSyncer, Div } from "./components/ui";
import { HeroSection } from "./sections/HeroSection";
import { PainSection } from "./sections/PainSection";
import { AttentionSection } from "./sections/AttentionSection";
import { RuleSection } from "./sections/RuleSection";
import { CycleSection } from "./sections/CycleSection";
import { DiscoverySection, SolutionsSection } from "./sections/DiscoverySection";
import { SolutionSection } from "./sections/DiscoverySection";
import { SkillsSection } from "./sections/SkillsSection";
import { MidCtaSection } from "./sections/MidCtaSection";
import { BeforeAfterSection } from "./sections/BeforeAfterSection";
import { RoadmapSection } from "./sections/RoadmapSection";
import { InstructorSection } from "./sections/InstructorSection";
import { BonusSection } from "./sections/BonusSection";
import { CtaSection } from "./sections/CtaSection";
import LiveSocialProof from "./LiveSocialProof";
import "./landing.css";

export default function App() {
  const t = useTheme();
  const c = useContent();
  const isHidden = (id: string) => c.blocksMeta?.hidden?.includes(id) ?? false;

  return (
    <div style={{ background: t.bg, color: t.textBase ?? "#f0f0f0", fontFamily: t.fontBody, minHeight: "100vh", overflowX: "hidden" }}>
      <ThemeSyncer />

      {!isHidden("hero") && <HeroSection />}
      <Div />

      {!isHidden("pain") && <PainSection />}
      <Div />

      {!isHidden("attention") && <AttentionSection />}
      <Div />

      {!isHidden("rule") && <RuleSection />}
      <Div />

      {!isHidden("cycle") && <CycleSection />}
      <Div />

      {!isHidden("discovery") && <DiscoverySection />}
      <Div />

      {!isHidden("solutions") && <SolutionsSection />}
      <Div />

      {!isHidden("solution") && <SolutionSection />}
      <Div />

      {!isHidden("skills") && <SkillsSection />}
      <Div />

      {!isHidden("midCta") && <MidCtaSection />}
      <Div />

      {!isHidden("before-after") && <BeforeAfterSection />}
      <Div />

      {!isHidden("roadmap") && <RoadmapSection />}
      <Div />

      {!isHidden("instructor") && <InstructorSection />}
      <Div />

      {!isHidden("bonus") && <BonusSection />}
      <Div />

      {!isHidden("cta") && <CtaSection />}

      {!isHidden("footer") && (
        <footer className="cl-footer" style={{ borderTop: `1px solid ${t.line}`, fontFamily: t.fontBody }}>
          <div className="cl-footer__brand" style={{ fontFamily: t.fontDisplay, fontSize: "clamp(28px, 6vw, 42px)", letterSpacing: "-0.02em" }}>
            {c.footerBrand}<span style={{ color: t.accent }}>{c.footerDot}</span>VIDEO
          </div>
          <p className="cl-footer__tagline" style={{ whiteSpace: "pre-line", fontSize: "16px", lineHeight: 1.8, fontStyle: "italic", marginTop: 16 }}>
            {c.footerTagline}
          </p>
          <div className="cl-footer__links" style={{ marginTop: 24, display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <a
              href="https://www.facebook.com/nguyenducviet.video"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 18px",
                borderRadius: 30,
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                fontSize: 14,
                fontWeight: 500,
                color: "var(--cl-text-body, #b0b0b0)",
                textDecoration: "none",
                transition: "all 0.2s ease"
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = "var(--cl-accent)";
                e.currentTarget.style.color = "#fff";
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
                e.currentTarget.style.color = "var(--cl-text-body, #b0b0b0)";
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.03)";
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span>Facebook Fanpage</span>
            </a>

            <a
              href="https://www.facebook.com/nddviet"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 18px",
                borderRadius: 30,
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                fontSize: 14,
                fontWeight: 500,
                color: "var(--cl-text-body, #b0b0b0)",
                textDecoration: "none",
                transition: "all 0.2s ease"
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = "var(--cl-accent)";
                e.currentTarget.style.color = "#fff";
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
                e.currentTarget.style.color = "var(--cl-text-body, #b0b0b0)";
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.03)";
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span>Facebook Cá Nhân</span>
            </a>
          </div>
          <p className="cl-footer__copy">
            {c.footerCopyright}
            <span style={{ opacity: 0.15, fontSize: "0.85em", marginLeft: 8 }}>(zalo : 0934.688.632)</span>
          </p>
        </footer>
      )}
      <LiveSocialProof />
    </div>
  );
}
