"use client";

const words = [
  "Grafik Tasarım",
  "Web Tasarım",
  "Sosyal Medya",
  "Marka Kimliği",
  "UI/UX",
  "Kurumsal Kimlik",
  "Baskı Tasarım",
  "Video Kurgu",
];

function MarqueeRow() {
  return (
    <div
      style={{
        display: "flex",
        gap: 0,
        flexShrink: 0,
      }}
    >
      {words.map((word, i) => (
        <span
          key={i}
          style={{
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            gap: 40,
            paddingRight: 40,
          }}
        >
          <span
            className="font-serif text-[clamp(3rem,6vw,5.5rem)] italic whitespace-nowrap select-none"
            style={{ color: "var(--marquee-text)" }}
          >
            {word}
          </span>
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "var(--marquee-dot)",
              flexShrink: 0,
            }}
          />
        </span>
      ))}
    </div>
  );
}

export default function TextMarquee() {
  return (
    <div
      style={{
        overflow: "hidden",
        paddingTop: 32,
        paddingBottom: 32,
        position: "relative",
      }}
    >
      {/* Row 1 — left to right */}
      <div
        style={{
          display: "flex",
          width: "max-content",
          willChange: "transform",
          animation: "marquee-scroll 40s linear infinite",
        }}
      >
        <MarqueeRow />
        <MarqueeRow />
      </div>

      {/* Row 2 — right to left (reverse) */}
      <div
        style={{
          display: "flex",
          width: "max-content",
          willChange: "transform",
          animation: "marquee-scroll-reverse 35s linear infinite",
          marginTop: 12,
        }}
      >
        <MarqueeRow />
        <MarqueeRow />
      </div>
    </div>
  );
}
