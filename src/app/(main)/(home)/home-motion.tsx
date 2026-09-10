"use client";

import { useEffect, useRef, type ReactNode } from "react";

export default function HomeMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cleanup = () => {};
    const setup = async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (!root.current) return;
      gsap.registerPlugin(ScrollTrigger);

      const context = gsap.context(() => {
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const intro = root.current?.querySelector<HTMLElement>("[data-brand-intro]");
        const introImage = root.current?.querySelector<HTMLElement>("[data-brand-intro-image]");
        const introMark = root.current?.querySelector<HTMLElement>("[data-brand-intro-mark]");
        const headerLogo = document.querySelector<HTMLElement>("[data-meu-logo]");

        if (reduceMotion) {
          if (intro) gsap.set(intro, { display: "none" });
          return;
        }

        if (intro && headerLogo) {
          const logoRect = headerLogo.getBoundingClientRect();
          document.documentElement.style.overflow = "hidden";
          gsap.set(headerLogo, { autoAlpha: 0 });
          gsap.timeline({
            onComplete: () => {
              gsap.set(intro, { display: "none" });
              gsap.set(headerLogo, { clearProps: "all" });
              document.documentElement.style.overflow = "";
              ScrollTrigger.refresh();
            },
          })
            .fromTo(introImage, { scale: 1.08 }, { scale: 1, duration: 1.2, ease: "power2.out" })
            .to(introMark, { scale: .94, duration: 1.2, ease: "power1.inOut" }, 0)
            .to(intro, {
              x: logoRect.left,
              y: logoRect.top,
              scaleX: logoRect.width / window.innerWidth,
              scaleY: logoRect.height / window.innerHeight,
              borderRadius: 8,
              duration: 1.05,
              ease: "power4.inOut",
              transformOrigin: "0 0",
            }, 1.15)
            .to(introImage, { autoAlpha: 0, duration: .35 }, 1.72)
            .to(introMark, { autoAlpha: 0, duration: .22 }, 1.94)
            .to(headerLogo, { autoAlpha: 1, duration: .3, ease: "power2.out" }, 1.98)
            .to(intro, { autoAlpha: 0, duration: .2 }, 2.08);
        }

        gsap.timeline({ delay: intro && headerLogo ? 2.08 : 0, defaults: { ease: "power3.out" } })
          .from("[data-gsap-hero] .hero-kicker", { autoAlpha: 0, y: 18, duration: .5 })
          .from("[data-gsap-hero] h1", { autoAlpha: 0, y: 42, duration: .9 }, "-=.2")
          .from("[data-gsap-hero] h1 em", { color: "#f8fafc", duration: .65 }, "-=.5")
          .from("[data-gsap-hero] .hero-reveal", { autoAlpha: 0, y: 18, duration: .55, stagger: .08 }, "-=.45");

        gsap.to("[data-gsap-backdrop]", {
          yPercent: 8, scale: 1.06, ease: "none",
          scrollTrigger: { trigger: "[data-gsap-hero]", start: "top top", end: "bottom top", scrub: .8 },
        });

        gsap.utils.toArray<HTMLElement>("[data-gsap-section]").forEach((section) => {
          const heading = section.querySelector("h2");
          const items = section.querySelectorAll("article, li");
          if (heading) gsap.from(heading, {
            autoAlpha: 0, y: 50, duration: .85, ease: "power3.out",
            scrollTrigger: { trigger: heading, start: "top 86%", once: true },
          });
          if (items.length) gsap.from(items, {
            autoAlpha: 0, y: 30, duration: .6, stagger: .07, ease: "power2.out",
            scrollTrigger: { trigger: items[0], start: "top 90%", once: true },
          });
        });

        gsap.from("[data-gsap-lifecycle] > *", {
          autoAlpha: 0, x: -28, duration: .65, stagger: .12, ease: "power2.out",
          scrollTrigger: { trigger: "[data-gsap-lifecycle]", start: "top 82%", once: true },
        });

        const media = gsap.matchMedia();
        media.add("(min-width: 901px) and (prefers-reduced-motion: no-preference)", () => {
          const section = root.current?.querySelector<HTMLElement>("[data-ai-section]");
          const track = section?.querySelector<HTMLElement>("[data-ai-track]");
          const progress = section?.querySelector<HTMLElement>("[data-ai-progress]");
          const counter = section?.querySelector<HTMLElement>("[data-ai-counter]");
          if (!section || !track) return;

          const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);
          const horizontal = gsap.to(track, {
            x: () => -distance(),
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: () => `+=${distance()}`,
              pin: true,
              scrub: .85,
              invalidateOnRefresh: true,
              anticipatePin: 1,
              onUpdate: (self) => {
                if (counter) counter.textContent = `${String(Math.round(self.progress * 4) + 1).padStart(2, "0")} — 05`;
              },
            },
          });

          if (progress) gsap.fromTo(progress, { scaleX: 0 }, {
            scaleX: 1,
            ease: "none",
            transformOrigin: "left center",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: () => `+=${distance()}`,
              scrub: .85,
            },
          });

          gsap.utils.toArray<HTMLElement>("[data-ai-track] article").slice(1).forEach((panel) => {
            gsap.from(panel.querySelectorAll("h3, p, span"), {
              autoAlpha: 0,
              y: 36,
              duration: .7,
              stagger: .06,
              ease: "power2.out",
              scrollTrigger: {
                trigger: panel,
                containerAnimation: horizontal,
                start: "left 72%",
                once: true,
              },
            });
          });
        });
      }, root);
      cleanup = () => {
        document.documentElement.style.overflow = "";
        context.revert();
      };
      requestAnimationFrame(() => requestAnimationFrame(() => ScrollTrigger.refresh()));
    };
    void setup();
    return () => cleanup();
  }, []);

  return <div ref={root}>{children}</div>;
}
