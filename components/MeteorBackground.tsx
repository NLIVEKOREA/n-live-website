"use client";
import { useEffect, useRef } from "react";

/**
 * Meteor / shooting-star background for the hero.
 * - 4 brand colors fall as meteors with glowing trails.
 * - When two meteors of different colors collide, they trigger a burst
 *   representing brand × seller synergy.
 * - Respects prefers-reduced-motion.
 */
export default function MeteorBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx2d = canvas.getContext("2d");
    if (!ctx2d) return;
    const ctx: CanvasRenderingContext2D = ctx2d;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Brand palette — neon
    const COLORS = [
      { core: "#FFB627", rgb: "255,182,39", name: "amber" },
      { core: "#00D67A", rgb: "0,214,122", name: "emerald" },
      { core: "#2D7BFF", rgb: "45,123,255", name: "azure" },
      { core: "#FF4D3A", rgb: "255,77,58", name: "coral" },
    ];

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    type Color = (typeof COLORS)[number];

    interface Meteor {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
      tail: number;
      color: Color;
      size: number;
      dead: boolean;
    }

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
      color: Color;
      size: number;
    }

    interface Burst {
      x: number;
      y: number;
      life: number;
      maxLife: number;
      c1: Color;
      c2: Color;
    }

    interface Star {
      x: number;
      y: number;
      base: number;
      twinkle: number;
      speed: number;
      color: Color;
    }

    const meteors: Meteor[] = [];
    const particles: Particle[] = [];
    const bursts: Burst[] = [];
    const stars: Star[] = [];

    // Build a sparse field of static twinkle stars in our brand colors
    const STAR_COUNT = reduce ? 18 : 36;
    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: Math.random(),
        y: Math.random(),
        base: 0.15 + Math.random() * 0.4,
        twinkle: Math.random() * Math.PI * 2,
        speed: 0.005 + Math.random() * 0.01,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      });
    }

    function spawnMeteor() {
      // Most meteors come from the top-right, falling diagonally down-left,
      // but mix in a few from the top-left for variety.
      const fromRight = Math.random() > 0.35;
      const angle = fromRight
        ? Math.PI * 0.72 + (Math.random() - 0.5) * 0.25 // down-left
        : Math.PI * 0.28 + (Math.random() - 0.5) * 0.25; // down-right
      const speed = 2.2 + Math.random() * 1.8;

      const x = fromRight
        ? width * (0.55 + Math.random() * 0.55)
        : width * (Math.random() * 0.45 - 0.05);
      const y = -40 - Math.random() * 80;

      meteors.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0,
        maxLife: 320 + Math.random() * 160,
        tail: 90 + Math.random() * 80,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: 1.4 + Math.random() * 1.4,
        dead: false,
      });
    }

    function spawnBurst(x: number, y: number, c1: Color, c2: Color) {
      bursts.push({ x, y, life: 0, maxLife: 70, c1, c2 });

      const N = 28;
      for (let i = 0; i < N; i++) {
        const a = (Math.PI * 2 * i) / N + Math.random() * 0.2;
        const sp = 2.4 + Math.random() * 3.4;
        particles.push({
          x,
          y,
          vx: Math.cos(a) * sp,
          vy: Math.sin(a) * sp,
          life: 0,
          maxLife: 70 + Math.random() * 40,
          color: i % 2 === 0 ? c1 : c2,
          size: 1.4 + Math.random() * 2.2,
        });
      }
      // Inner sparkles
      for (let i = 0; i < 14; i++) {
        const a = Math.random() * Math.PI * 2;
        const sp = 0.6 + Math.random() * 1.6;
        particles.push({
          x,
          y,
          vx: Math.cos(a) * sp,
          vy: Math.sin(a) * sp,
          life: 0,
          maxLife: 100 + Math.random() * 60,
          color: Math.random() > 0.5 ? c1 : c2,
          size: 0.8 + Math.random() * 1.2,
        });
      }
    }

    let raf = 0;
    let lastSpawn = 0;
    let lastTime = 0;
    const SPAWN_MIN = reduce ? 4500 : 1700;
    const SPAWN_JITTER = reduce ? 4000 : 1800;
    const COLLISION_R2 = 18 * 18; // squared collision radius (px)

    function tick(t: number) {
      const dt = lastTime ? Math.min(t - lastTime, 50) : 16;
      lastTime = t;

      ctx.clearRect(0, 0, width, height);

      // Twinkle stars
      for (const s of stars) {
        s.twinkle += s.speed * dt;
        const alpha = s.base + Math.sin(s.twinkle) * 0.25;
        const a = Math.max(0, Math.min(0.7, alpha));
        ctx.fillStyle = `rgba(${s.color.rgb},${a})`;
        ctx.beginPath();
        ctx.arc(s.x * width, s.y * height, 1.1, 0, Math.PI * 2);
        ctx.fill();
      }

      // Spawn meteors at intervals
      if (t - lastSpawn > SPAWN_MIN + Math.random() * SPAWN_JITTER) {
        spawnMeteor();
        // Occasionally double-spawn so collisions can happen
        if (Math.random() > 0.55) {
          setTimeout(() => spawnMeteor(), 120 + Math.random() * 240);
        }
        lastSpawn = t;
      }

      // Collision check (different color = synergy burst)
      for (let i = 0; i < meteors.length; i++) {
        const a = meteors[i];
        if (a.dead) continue;
        for (let j = i + 1; j < meteors.length; j++) {
          const b = meteors[j];
          if (b.dead) continue;
          if (a.color.name === b.color.name) continue; // only different colors collide
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          if (dx * dx + dy * dy < COLLISION_R2) {
            spawnBurst((a.x + b.x) / 2, (a.y + b.y) / 2, a.color, b.color);
            a.dead = true;
            b.dead = true;
            break;
          }
        }
      }

      // Update + draw meteors
      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        if (m.dead) {
          meteors.splice(i, 1);
          continue;
        }
        m.x += m.vx;
        m.y += m.vy;
        m.life++;
        if (
          m.life > m.maxLife ||
          m.y > height + 80 ||
          m.x < -120 ||
          m.x > width + 120
        ) {
          meteors.splice(i, 1);
          continue;
        }

        const speed = Math.hypot(m.vx, m.vy) || 1;
        const tx = m.x - (m.vx / speed) * m.tail;
        const ty = m.y - (m.vy / speed) * m.tail;

        // Trail gradient
        const grad = ctx.createLinearGradient(tx, ty, m.x, m.y);
        grad.addColorStop(0, `rgba(${m.color.rgb},0)`);
        grad.addColorStop(0.55, `rgba(${m.color.rgb},0.35)`);
        grad.addColorStop(1, `rgba(${m.color.rgb},0.95)`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = m.size;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(m.x, m.y);
        ctx.stroke();

        // Head with glow
        ctx.shadowColor = m.color.core;
        ctx.shadowBlur = 18;
        ctx.fillStyle = m.color.core;
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.size * 1.4, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Update + draw bursts (impact rings)
      for (let i = bursts.length - 1; i >= 0; i--) {
        const b = bursts[i];
        b.life++;
        if (b.life > b.maxLife) {
          bursts.splice(i, 1);
          continue;
        }
        const p = b.life / b.maxLife;
        const eased = 1 - Math.pow(1 - p, 3);
        const r1 = eased * 90;
        const r2 = eased * 60;
        const alpha = (1 - p) * 0.7;

        ctx.lineWidth = 2;
        ctx.strokeStyle = `rgba(${b.c1.rgb},${alpha})`;
        ctx.shadowColor = b.c1.core;
        ctx.shadowBlur = 22;
        ctx.beginPath();
        ctx.arc(b.x, b.y, r1, 0, Math.PI * 2);
        ctx.stroke();

        ctx.strokeStyle = `rgba(${b.c2.rgb},${alpha})`;
        ctx.shadowColor = b.c2.core;
        ctx.beginPath();
        ctx.arc(b.x, b.y, r2, 0, Math.PI * 2);
        ctx.stroke();

        // Bright core flash early
        if (p < 0.2) {
          const flashAlpha = (1 - p / 0.2) * 0.9;
          const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, 30);
          grad.addColorStop(0, `rgba(255,255,255,${flashAlpha})`);
          grad.addColorStop(0.5, `rgba(${b.c1.rgb},${flashAlpha * 0.6})`);
          grad.addColorStop(1, `rgba(${b.c2.rgb},0)`);
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(b.x, b.y, 30, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.shadowBlur = 0;
      }

      // Update + draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.965;
        p.vy *= 0.965;
        p.vy += 0.02; // slight gravity for elegance
        p.life++;
        if (p.life > p.maxLife) {
          particles.splice(i, 1);
          continue;
        }
        const alpha = 1 - p.life / p.maxLife;
        ctx.shadowColor = p.color.core;
        ctx.shadowBlur = 10;
        ctx.fillStyle = `rgba(${p.color.rgb},${alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="meteor-bg" aria-hidden="true" />;
}
