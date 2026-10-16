"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Lightweight projected point sculpture. No WebGL context or post-processing passes.
// The same deterministic particles interpolate between a bag, leather weave and loafer.
function shape(
  index: number,
  count: number,
  stage: number,
): [number, number, number] {
  const u = (index * 0.61803398875) % 1,
    v = (index * 0.754877666) % 1,
    t = u * Math.PI * 2;
  if (stage === 0) {
    if (index < count * 0.23) {
      const a = u * Math.PI;
      return [Math.cos(a) * 0.76, -0.55 - Math.sin(a) * 0.9, (v - 0.5) * 0.12];
    }
    const y = v * 1.45 - 0.45,
      w = 1.05 + v * 0.2;
    return [
      Math.cos(t) * w,
      y,
      Math.sin(t) * (0.32 + Math.sin(v * Math.PI) * 0.08),
    ];
  }
  if (stage === 1) {
    const x = (u - 0.5) * 3.1,
      y = (v - 0.5) * 2.4;
    return [x, y, Math.sin(x * 3 + y * 2) * 0.25 + Math.cos(y * 7) * 0.04];
  }
  const x = (u - 0.5) * 3.15,
    w = 0.3 + Math.sin(u * Math.PI) * 0.28;
  const a = v * Math.PI * 2;
  return [
    x,
    0.25 +
      Math.sin(a) * (0.14 + Math.sin(u * Math.PI) * 0.25) -
      Math.max(0, u - 0.65) * 0.7,
    Math.cos(a) * w,
  ];
}
export default function ParticleSculpture() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    if (motion.matches) return;
    const mobile = innerWidth < 768,
      count = mobile ? 750 : 1300;
    const forms = [0, 1, 2].map((stage) =>
      Array.from({ length: count }, (_, i) => shape(i, count, stage)),
    );
    const model = { morph: 0, opacity: 0.7 };
    let width = 0,
      height = 0,
      frame = 0,
      visible = true,
      last = 0,
      mouseX = 0,
      mouseY = 0,
      rotation = 0;
    const resize = () => {
      const r = canvas.getBoundingClientRect();
      width = r.width;
      height = r.height;
      const dpr = Math.min(devicePixelRatio, 1.5);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();
    const pointer = (event: PointerEvent) => {
      mouseX = (event.clientX / innerWidth - 0.5) * 0.55;
      mouseY = (event.clientY / innerHeight - 0.5) * 0.18;
    };
    window.addEventListener("pointermove", pointer, { passive: true });
    const scene = canvas.closest(".cinema")!;
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    observer.observe(scene);
    gsap.registerPlugin(ScrollTrigger);
    const tween = gsap.to(model, {
      morph: 2,
      ease: "none",
      scrollTrigger: {
        trigger: scene,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.7,
      },
    });
    const render = (time: number) => {
      frame = requestAnimationFrame(render);
      if (
        !visible ||
        document.hidden ||
        motion.matches ||
        time - last < (mobile ? 32 : 20)
      )
        return;
      last = time;
      ctx.clearRect(0, 0, width, height);
      rotation += (mouseX - rotation) * 0.035;
      const angle =
        rotation + Math.sin(time * 0.00025) * 0.16 + model.morph * 0.55;
      const c = Math.cos(angle),
        s = Math.sin(angle),
        base = Math.min(width, height) * (mobile ? 0.24 : 0.29);
      const from = Math.min(1, Math.floor(model.morph)),
        mix = model.morph - from;
      const explode = Math.sin(mix * Math.PI) * 0.22;
      for (let i = 0; i < count; i++) {
        const a = forms[from][i],
          b = forms[from + 1][i];
        let x = a[0] + (b[0] - a[0]) * mix,
          y = a[1] + (b[1] - a[1]) * mix,
          z = a[2] + (b[2] - a[2]) * mix;
        x += Math.sin(i * 3.7 + time * 0.0006) * explode;
        y += Math.cos(i * 2.3 + time * 0.0005) * explode;
        const rx = x * c + z * s,
          rz = z * c - x * s,
          perspective = 4 / (4 + rz);
        const px = width * 0.5 + rx * base * perspective,
          py =
            height * 0.52 +
            (y + mouseY + Math.sin(time * 0.0008) * 0.035) * base * perspective;
        const alpha =
          (0.25 + (rz + 1.5) / 4) * (0.7 + Math.sin(i + time * 0.001) * 0.2);
        ctx.fillStyle = `rgba(211,170,111,${alpha})`;
        ctx.beginPath();
        ctx.arc(
          px,
          py,
          (i % 13 === 0 ? 1.45 : 0.7) * perspective,
          0,
          Math.PI * 2,
        );
        ctx.fill();
      }
    };
    frame = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      observer.disconnect();
      window.removeEventListener("pointermove", pointer);
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);
  return <canvas ref={ref} className="particle-sculpture" aria-hidden="true" />;
}
