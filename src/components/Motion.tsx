"use client";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
export default function Motion() {
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(
      {
        mobile: "(max-width: 767px)",
        desktop: "(min-width: 768px)",
        reduce: "(prefers-reduced-motion: reduce)",
      },
      (context) => {
        const { mobile, reduce } = context.conditions!;
        const cleanups: (() => void)[] = [];
        if (reduce) return;
        const stage = document.querySelector(".cinema-stage")!;
        const percent = document.querySelector(".cinema-percent")!;
        ScrollTrigger.create({
          trigger: ".cinema",
          start: "top bottom",
          end: "bottom top",
          toggleClass: { targets: stage, className: "motion-active" },
        });
        const intro = gsap.timeline({ defaults: { ease: "expo.out" } });
        intro
          .from(".chapter-one .motion-line span", {
            yPercent: 115,
            rotationX: -35,
            transformPerspective: 800,
            stagger: 0.12,
            duration: 1.6,
          })
          .from(
            ".chapter-one .section-caption, .chapter-one .chapter-description, .chapter-one .button",
            { opacity: 0, y: 20, stagger: 0.12, duration: 1 },
            0.4,
          )
          .from(
            ".float-bag img",
            {
              clipPath: "inset(100% 0% 0% 0%)",
              opacity: 0,
              duration: 1.8,
              ease: "power3.inOut",
            },
            0.1,
          )
          .from(
            ".cinema-foot, .cinema-orbit",
            { opacity: 0, duration: 1.4 },
            0.6,
          );
        gsap.set(".chapter-two, .chapter-three", { autoAlpha: 0 });
        gsap.set(".float-shoe", { autoAlpha: 0, rotation: 16, scale: 0.7 });
        gsap.set(".float-bag", { rotation: -9, scale: 0.92 });
        const cinema = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: ".cinema",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.8,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              percent.textContent = `${String(Math.round(self.progress * 100)).padStart(2, "0")}%`;
            },
          },
        });
        cinema
          .to(".float-bag", { rotation: 5, scale: 1.05, duration: 0.65 }, 0)
          .to(
            ".chapter-one",
            { autoAlpha: 0, yPercent: -18, duration: 0.38 },
            0.35,
          )
          .to(
            ".cinema-stage",
            { backgroundColor: "#493128", duration: 0.75 },
            0.45,
          )
          .to(
            ".cinema-watermark",
            { xPercent: -18, opacity: 0.07, duration: 1 },
            0.3,
          )
          .to(
            ".cinema-visual",
            {
              xPercent: mobile ? 0 : -72,
              yPercent: mobile ? 3 : -2,
              duration: 0.9,
              ease: "power2.inOut",
            },
            0.55,
          )
          .to(
            ".float-bag",
            { rotation: 16, scale: mobile ? 1.1 : 1.2, duration: 0.9 },
            0.55,
          )
          .fromTo(
            ".chapter-two",
            { yPercent: 22, autoAlpha: 0 },
            { yPercent: 0, autoAlpha: 1, duration: 0.5 },
            0.85,
          )
          .from(
            ".chapter-two .motion-line span",
            { yPercent: 110, rotation: 3, stagger: 0.06, duration: 0.4 },
            0.85,
          )
          .to(".dot-one", { opacity: 0.3, duration: 0.2 }, 0.65)
          .to(".dot-two", { opacity: 1, duration: 0.2 }, 0.65)
          .to(
            ".float-bag",
            { autoAlpha: 0, scale: 1.45, rotation: 22, duration: 0.4 },
            1.45,
          )
          .to(".particle-sculpture", { opacity: 1, duration: 0.35 }, 1.4)
          .to(
            ".chapter-two",
            { autoAlpha: 0, yPercent: -20, duration: 0.4 },
            1.85,
          )
          .to(
            ".cinema-stage",
            { backgroundColor: "#1f2927", duration: 0.75 },
            1.85,
          )
          .to(
            ".cinema-visual",
            { xPercent: 0, yPercent: 0, duration: 0.8, ease: "power2.inOut" },
            1.9,
          )
          .fromTo(
            ".chapter-three",
            { yPercent: 25, autoAlpha: 0 },
            { yPercent: 0, autoAlpha: 1, duration: 0.5 },
            2.2,
          )
          .from(
            ".chapter-three .motion-line span",
            { yPercent: 110, rotation: 3, stagger: 0.06, duration: 0.5 },
            2.2,
          )
          .to(
            ".float-shoe",
            { autoAlpha: 1, scale: 1.02, rotation: -12, duration: 0.65 },
            2.3,
          )
          .to(".particle-sculpture", { opacity: 0.45, duration: 0.65 }, 2.3)
          .to(".dot-two", { opacity: 0.3, duration: 0.2 }, 2.1)
          .to(".dot-three", { opacity: 1, duration: 0.2 }, 2.1)
          .to(
            ".float-shoe",
            { rotation: -5, scale: 1.12, yPercent: -6, duration: 0.7 },
            2.9,
          )
          .to(".cinema-progress span", { scaleX: 1, duration: 3.6 }, 0);
        gsap.fromTo(
          ".manifesto-word",
          { opacity: 0.15, filter: "blur(3px)" },
          {
            opacity: 1,
            filter: "blur(0px)",
            stagger: 0.1,
            ease: "none",
            scrollTrigger: {
              trigger: ".manifesto",
              start: "top 78%",
              end: "bottom 60%",
              scrub: 0.5,
            },
          },
        );
        gsap.from(".manifesto-thread span", {
          scaleY: 0,
          transformOrigin: "top",
          scrollTrigger: {
            trigger: ".manifesto",
            start: "top 60%",
            end: "bottom 30%",
            scrub: 1,
          },
        });
        const skew = gsap.quickTo(".kinetic-track", "skewX", {
          duration: 0.6,
          ease: "power3.out",
        });
        gsap.fromTo(
          ".kinetic-track",
          { xPercent: 5 },
          {
            xPercent: -28,
            ease: "none",
            scrollTrigger: {
              trigger: ".kinetic-ribbon",
              start: "top bottom",
              end: "bottom top",
              scrub: 0.8,
              onUpdate: (self) => {
                skew(gsap.utils.clamp(-7, 7, self.getVelocity() / -350));
              },
              onScrubComplete: () => skew(0),
            },
          },
        );
        const panels = gsap.utils.toArray<HTMLElement>(".campaign");
        if (!mobile) {
          const journey = gsap.to(".campaigns", {
            xPercent: -50,
            ease: "none",
            scrollTrigger: {
              trigger: ".campaign-journey",
              pin: true,
              start: "top top",
              end: () => `+=${innerWidth * 1.5}`,
              scrub: 1,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });
          const navigateCampaign = (event: MouseEvent) => {
            const anchor = (event.target as Element).closest<HTMLAnchorElement>(
              'a[href="#women"],a[href="#men"]',
            );
            const trigger = journey.scrollTrigger;
            if (!anchor || !trigger) return;
            event.preventDefault();
            const destination =
              anchor.hash === "#men" ? trigger.end - 1 : trigger.start + 1;
            window.scrollTo({ top: destination, behavior: "smooth" });
            history.replaceState(null, "", anchor.hash);
          };
          document.addEventListener("click", navigateCampaign);
          cleanups.push(() =>
            document.removeEventListener("click", navigateCampaign),
          );
          panels.forEach((section, index) => {
            gsap.from(section.querySelector(".campaign-copy"), {
              rotationY: index ? 15 : -10,
              opacity: index ? 0.2 : 1,
              y: 70,
              transformPerspective: 1200,
              scrollTrigger: index
                ? {
                    trigger: section,
                    containerAnimation: journey,
                    start: "left 85%",
                    end: "left 20%",
                    scrub: 1,
                  }
                : {
                    trigger: section,
                    start: "top 75%",
                    end: "top 15%",
                    scrub: 1,
                  },
            });
          });
        } else {
          panels.forEach((section) => {
            gsap.fromTo(
              section.querySelector(".campaign-image"),
              { scale: 1.22, clipPath: "inset(12% 6% 12% 6%)" },
              {
                scale: 1,
                clipPath: "inset(0% 0% 0% 0%)",
                scrollTrigger: {
                  trigger: section,
                  start: "top 95%",
                  end: "top 5%",
                  scrub: 0.6,
                },
              },
            );
            gsap.from(section.querySelector(".campaign-copy"), {
              y: 80,
              rotationX: 15,
              opacity: 0,
              transformPerspective: 900,
              scrollTrigger: {
                trigger: section,
                start: "top 70%",
                end: "top 20%",
                scrub: 0.6,
              },
            });
          });
        }
        gsap.from(".craft-photo", {
          clipPath: "inset(20% 10% 20% 10%)",
          scale: 1.15,
          scrollTrigger: {
            trigger: ".craft",
            start: "top 80%",
            end: "top 15%",
            scrub: 0.8,
          },
        });
        gsap.from(".craft-copy h2", {
          y: 80,
          rotationX: 20,
          opacity: 0,
          transformPerspective: 900,
          scrollTrigger: {
            trigger: ".craft-copy",
            start: "top 85%",
            end: "top 35%",
            scrub: 0.8,
          },
        });
        gsap.fromTo(
          ".footer-wordmark",
          { yPercent: 28 },
          {
            yPercent: 0,
            ease: "none",
            scrollTrigger: {
              trigger: "footer",
              start: "top bottom",
              end: "bottom bottom",
              scrub: 1,
            },
          },
        );
        if (matchMedia("(hover: hover) and (pointer: fine)").matches) {
          const target = stage as HTMLElement;
          const tiltX = gsap.quickTo(".product-tilt", "rotationX", {
            duration: 1,
            ease: "power3.out",
          });
          const tiltY = gsap.quickTo(".product-tilt", "rotationY", {
            duration: 1,
            ease: "power3.out",
          });
          const move = (event: PointerEvent) => {
            tiltX((0.5 - event.clientY / innerHeight) * 10);
            tiltY((event.clientX / innerWidth - 0.5) * 16);
          };
          const leave = () => {
            tiltX(0);
            tiltY(0);
          };
          target.addEventListener("pointermove", move);
          target.addEventListener("pointerleave", leave);
          cleanups.push(() => {
            target.removeEventListener("pointermove", move);
            target.removeEventListener("pointerleave", leave);
          });
        }
        const refresh = () => ScrollTrigger.refresh();
        document.fonts.ready.then(refresh);
        window.addEventListener("load", refresh);
        return () => {
          window.removeEventListener("load", refresh);
          cleanups.forEach((cleanup) => cleanup());
        };
      },
    );
    return () => mm.revert();
  }, []);
  return null;
}
