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
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    // Brand palette — MAX fluorescent for meteors only
    // (Site palette stays warmer; canvas uses pumped neon for visibility)
    const COLORS = [
      { core: "#FFE500", rgb: "255,229,0", name: "amber" },     // electric yellow-gold
      { core: "#00FF88", rgb: "0,255,136", name: "emerald" },   // neon green
      { core: "#00E5FF", rgb: "0,229,255", name: "azure" },     // electric cyan
      { core: "#FF1F8E", rgb: "255,31,142", name: "coral" },    // hot magenta
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
      id: number;
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
      homing: boolean;
      maxSpeed: number;
      targetId: number | null;
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
      mega: boolean;
    }

    interface Star {
      x: number;
      y: number;
      r: number;
      base: number;
      twinkle: number;
      speed: number;
      color: Color | null; // null = white
      glow: boolean;
    }

    const meteors: Meteor[] = [];
    const particles: Particle[] = [];
    const bursts: Burst[] = [];
    const stars: Star[] = [];

    // Deep space neon starfield: tiered (distant tiny, mid, neon accents)
    const STAR_COUNT = reduce ? 90 : isMobile ? 80 : 240;
    for (let i = 0; i < STAR_COUNT; i++) {
      const tier = Math.random();
      let r: number, base: number, glow: boolean;
      if (tier < 0.55) {
        // distant tiny — soft glow even on these
        r = 0.6 + Math.random() * 0.7;
        base = 0.3 + Math.random() * 0.35;
        glow = true;
      } else if (tier < 0.88) {
        // mid — clear neon glow
        r = 1.0 + Math.random() * 0.8;
        base = 0.55 + Math.random() * 0.3;
        glow = true;
      } else {
        // bright neon-sign accents
        r = 1.6 + Math.random() * 1.1;
        base = 0.75 + Math.random() * 0.25;
        glow = true;
      }
      // ~55% white, ~45% colored brand tint (much more neon variety)
      const colored = Math.random() < 0.45;
      stars.push({
        x: Math.random(),
        y: Math.random(),
        r,
        base,
        twinkle: Math.random() * Math.PI * 2,
        speed: 0.002 + Math.random() * 0.008,
        color: colored ? COLORS[Math.floor(Math.random() * COLORS.length)] : null,
        glow,
      });
    }

    let nextId = 1;
    function makeMeteor(
      x: number,
      y: number,
      vx: number,
      vy: number,
      color: Color
    ): Meteor {
      return {
        id: nextId++,
        x,
        y,
        vx,
        vy,
        life: 0,
        maxLife: 360 + Math.random() * 160,
        tail: 90 + Math.random() * 80,
        color,
        size: 1.5 + Math.random() * 1.4,
        dead: false,
        homing: false,
        maxSpeed: Math.hypot(vx, vy),
        targetId: null,
      };
    }

    function pickTwoColors(): [Color, Color] {
      const i = Math.floor(Math.random() * COLORS.length);
      let j = Math.floor(Math.random() * COLORS.length);
      while (j === i) j = Math.floor(Math.random() * COLORS.length);
      return [COLORS[i], COLORS[j]];
    }

    function spawnSolo() {
      // Random direction meteor for ambient flow
      const fromRight = Math.random() > 0.35;
      const angle = fromRight
        ? Math.PI * 0.72 + (Math.random() - 0.5) * 0.25
        : Math.PI * 0.28 + (Math.random() - 0.5) * 0.25;
      const speed = 2.2 + Math.random() * 1.8;
      const x = fromRight
        ? width * (0.55 + Math.random() * 0.55)
        : width * (Math.random() * 0.45 - 0.05);
      const y = -40 - Math.random() * 80;
      meteors.push(
        makeMeteor(
          x,
          y,
          Math.cos(angle) * speed,
          Math.sin(angle) * speed,
          COLORS[Math.floor(Math.random() * COLORS.length)]
        )
      );
    }

    function spawnConvergentPair() {
      // Two meteors aimed to meet near a target point — guarantees a collision
      const mx = width * (0.25 + Math.random() * 0.5);
      const my = height * (0.28 + Math.random() * 0.4);
      const T = 90 + Math.random() * 50; // frames until meeting

      const [c1, c2] = pickTwoColors();
      const speed = 2.3 + Math.random() * 0.9;

      // Meteor A: down-right
      const aVx = speed * (0.7 + Math.random() * 0.3);
      const aVy = speed * (0.7 + Math.random() * 0.3);
      // Meteor B: down-left
      const bVx = -speed * (0.7 + Math.random() * 0.3);
      const bVy = speed * (0.7 + Math.random() * 0.3);

      meteors.push(makeMeteor(mx - aVx * T, my - aVy * T, aVx, aVy, c1));
      meteors.push(makeMeteor(mx - bVx * T, my - bVy * T, bVx, bVy, c2));
    }

    function spawnHomingPair() {
      // A regular "target" meteor + a fast oversized homing missile
      // that actively tracks the target and triggers a MEGA burst.
      const [c1, c2] = pickTwoColors();

      // Target: normal speed, falling diagonally
      const targetSpeed = 1.6 + Math.random() * 0.6;
      const tAngle = Math.PI * 0.45 + (Math.random() - 0.5) * 0.5;
      const targetX = width * (0.2 + Math.random() * 0.6);
      const targetY = -40 - Math.random() * 60;
      const target = makeMeteor(
        targetX,
        targetY,
        Math.cos(tAngle) * targetSpeed,
        Math.sin(tAngle) * targetSpeed,
        c1
      );
      meteors.push(target);

      // Homing missile: VERY fast, big, glows hard, comes from a side edge
      const fromLeft = Math.random() > 0.5;
      const missileSpeed = 10 + Math.random() * 2.5; // was 6.5+1.5 — much faster
      const startX = fromLeft ? -80 : width + 80;
      const startY = Math.random() * height * 0.55;
      const dx0 = targetX - startX;
      const dy0 = targetY - startY;
      const d0 = Math.hypot(dx0, dy0) || 1;
      const missile = makeMeteor(
        startX,
        startY,
        (dx0 / d0) * missileSpeed,
        (dy0 / d0) * missileSpeed,
        c2
      );
      missile.homing = true;
      missile.targetId = target.id;
      missile.maxSpeed = missileSpeed;
      missile.size = 4.2 + Math.random() * 1.0; // bigger
      missile.tail = 240 + Math.random() * 100; // longer trail
      missile.maxLife = 500;
      meteors.push(missile);
    }

    function spawnMeteor() {
      // 20% homing missile + target pair (guaranteed mega collision)
      // 56% convergent pair (normal collisions, ~70% of remaining 80%)
      // 24% solo (ambient flow)
      const r = Math.random();
      if (r < 0.2) spawnHomingPair();
      else if (r < 0.76) spawnConvergentPair();
      else spawnSolo();
    }

    function spawnBurst(x: number, y: number, c1: Color, c2: Color, mega = false) {
      bursts.push({
        x,
        y,
        life: 0,
        maxLife: mega ? 160 : 70,
        c1,
        c2,
        mega,
      });

      const N = mega ? 56 : 28;
      const speedMul = mega ? 2.2 : 1;
      for (let i = 0; i < N; i++) {
        const a = (Math.PI * 2 * i) / N + Math.random() * 0.25;
        const sp = (2.4 + Math.random() * 3.4) * speedMul;
        particles.push({
          x,
          y,
          vx: Math.cos(a) * sp,
          vy: Math.sin(a) * sp,
          life: 0,
          maxLife: (mega ? 130 : 70) + Math.random() * (mega ? 80 : 40),
          color: i % 2 === 0 ? c1 : c2,
          size: (mega ? 2.0 : 1.4) + Math.random() * (mega ? 3.2 : 2.2),
        });
      }
      // Inner sparkles
      const innerN = mega ? 30 : 14;
      for (let i = 0; i < innerN; i++) {
        const a = Math.random() * Math.PI * 2;
        const sp = (0.6 + Math.random() * 1.6) * (mega ? 1.6 : 1);
        particles.push({
          x,
          y,
          vx: Math.cos(a) * sp,
          vy: Math.sin(a) * sp,
          life: 0,
          maxLife: (mega ? 180 : 100) + Math.random() * 60,
          color: Math.random() > 0.5 ? c1 : c2,
          size: (mega ? 1.4 : 0.8) + Math.random() * (mega ? 2.0 : 1.2),
        });
      }
    }

    let raf = 0;
    let lastSpawn = 0;
    let lastTime = 0;
    const SPAWN_MIN = reduce ? 4500 : 1400;
    const SPAWN_JITTER = reduce ? 4000 : 1600;
    const COLLISION_R2 = 36 * 36; // squared collision radius (px) — generous

    function tick(t: number) {
      const dt = lastTime ? Math.min(t - lastTime, 50) : 16;
      lastTime = t;

      ctx.clearRect(0, 0, width, height);

      // Neon-sign starfield with strong twinkle glow
      for (const s of stars) {
        s.twinkle += s.speed * dt;
        const alpha = s.base + Math.sin(s.twinkle) * 0.3;
        const a = Math.max(0.1, Math.min(1, alpha));
        const px = s.x * width;
        const py = s.y * height;
        const rgb = s.color ? s.color.rgb : "255,255,255";
        const glowColor = s.color ? s.color.core : "#ffffff";

        // Outer halo — soft glow ring (neon tube look)
        const haloR = s.r * 4.5;
        const halo = ctx.createRadialGradient(px, py, 0, px, py, haloR);
        halo.addColorStop(0, `rgba(${rgb},${a * 0.55})`);
        halo.addColorStop(0.4, `rgba(${rgb},${a * 0.18})`);
        halo.addColorStop(1, `rgba(${rgb},0)`);
        ctx.fillStyle = halo;
        ctx.beginPath();
        ctx.arc(px, py, haloR, 0, Math.PI * 2);
        ctx.fill();

        // Bright neon core
        ctx.shadowColor = glowColor;
        ctx.shadowBlur = s.r > 1.4 ? 16 : 10;
        ctx.fillStyle = s.color
          ? `rgba(${rgb},${Math.min(1, a * 1.15)})`
          : `rgba(255,255,255,${a})`;
        ctx.beginPath();
        ctx.arc(px, py, s.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // White-hot pinpoint center for biggest stars
        if (s.r > 1.6) {
          ctx.fillStyle = `rgba(255,255,255,${a})`;
          ctx.beginPath();
          ctx.arc(px, py, s.r * 0.45, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Spawn meteors at intervals (skip entirely on mobile — stars only)
      if (!isMobile && t - lastSpawn > SPAWN_MIN + Math.random() * SPAWN_JITTER) {
        spawnMeteor();
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
          // Homing missiles get a much larger collision radius for guaranteed hit
          const homingHit = a.homing || b.homing;
          const r2 = homingHit ? 80 * 80 : COLLISION_R2;
          if (dx * dx + dy * dy < r2) {
            spawnBurst(
              (a.x + b.x) / 2,
              (a.y + b.y) / 2,
              a.color,
              b.color,
              homingHit // homing collision = MEGA burst
            );
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

        // Homing steering — chase the target
        if (m.homing && m.targetId !== null) {
          let target: Meteor | null = null;
          for (const x of meteors) {
            if (x.id === m.targetId && !x.dead) {
              target = x;
              break;
            }
          }
          if (target) {
            const dx = target.x - m.x;
            const dy = target.y - m.y;
            const d = Math.hypot(dx, dy) || 1;
            const desVx = (dx / d) * m.maxSpeed;
            const desVy = (dy / d) * m.maxSpeed;
            // Steering: lerp velocity toward desired
            m.vx += (desVx - m.vx) * 0.12;
            m.vy += (desVy - m.vy) * 0.12;
            const sp = Math.hypot(m.vx, m.vy);
            if (sp > m.maxSpeed) {
              m.vx = (m.vx / sp) * m.maxSpeed;
              m.vy = (m.vy / sp) * m.maxSpeed;
            }
          }
        }

        m.x += m.vx;
        m.y += m.vy;
        m.life++;
        if (
          m.life > m.maxLife ||
          m.y > height + 80 ||
          m.x < -200 ||
          m.x > width + 200
        ) {
          meteors.splice(i, 1);
          continue;
        }

        const speed = Math.hypot(m.vx, m.vy) || 1;
        const tx = m.x - (m.vx / speed) * m.tail;
        const ty = m.y - (m.vy / speed) * m.tail;

        // Pulsing brightness for that "alive" neon flicker
        const pulse = 0.85 + Math.sin(m.life * 0.35) * 0.15;

        // Trail gradient
        const grad = ctx.createLinearGradient(tx, ty, m.x, m.y);
        grad.addColorStop(0, `rgba(${m.color.rgb},0)`);
        grad.addColorStop(
          0.5,
          `rgba(${m.color.rgb},${(m.homing ? 0.65 : 0.45) * pulse})`
        );
        grad.addColorStop(1, `rgba(${m.color.rgb},${m.homing ? 1 : 0.98})`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = m.size;
        ctx.lineCap = "round";
        // Extra shadow to make trail itself glow
        ctx.shadowColor = m.color.core;
        ctx.shadowBlur = m.homing ? 26 : 12;
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(m.x, m.y);
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Outer aura — bigger, brighter for everyone
        const auraR = m.size * (m.homing ? 10 : 5);
        const aura = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, auraR);
        aura.addColorStop(0, `rgba(${m.color.rgb},${(m.homing ? 0.7 : 0.55) * pulse})`);
        aura.addColorStop(0.35, `rgba(${m.color.rgb},${(m.homing ? 0.32 : 0.22) * pulse})`);
        aura.addColorStop(1, `rgba(${m.color.rgb},0)`);
        ctx.fillStyle = aura;
        ctx.beginPath();
        ctx.arc(m.x, m.y, auraR, 0, Math.PI * 2);
        ctx.fill();

        // Head with strong glow
        ctx.shadowColor = m.color.core;
        ctx.shadowBlur = m.homing ? 50 : 26;
        ctx.fillStyle = m.color.core;
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.size * (m.homing ? 1.8 : 1.5) * pulse, 0, Math.PI * 2);
        ctx.fill();
        // Double-stamp head for extra glow intensity
        ctx.fillStyle = `rgba(255,255,255,${m.homing ? 0.7 : 0.45})`;
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.size * (m.homing ? 0.9 : 0.7), 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // White-hot core for missiles
        if (m.homing) {
          ctx.fillStyle = "rgba(255,255,255,1)";
          ctx.beginPath();
          ctx.arc(m.x, m.y, m.size * 0.6, 0, Math.PI * 2);
          ctx.fill();
        }

        // SPARKLE TRAIL — twinkly little particles drifting behind
        const sparkleChance = m.homing ? 0.85 : 0.45;
        if (Math.random() < sparkleChance) {
          const offset = (Math.random() - 0.5) * m.size * 2;
          const perpX = -m.vy / speed;
          const perpY = m.vx / speed;
          // Spawn slightly behind the head
          const sx = m.x - (m.vx / speed) * (4 + Math.random() * 12) + perpX * offset;
          const sy = m.y - (m.vy / speed) * (4 + Math.random() * 12) + perpY * offset;
          // Mostly white sparkles, sometimes the meteor color
          const sparkColor =
            Math.random() < 0.65
              ? { core: "#ffffff", rgb: "255,255,255", name: "white" }
              : m.color;
          particles.push({
            x: sx,
            y: sy,
            vx: -m.vx * 0.04 + (Math.random() - 0.5) * 0.6,
            vy: -m.vy * 0.04 + (Math.random() - 0.5) * 0.6,
            life: 0,
            maxLife: 25 + Math.random() * 30,
            color: sparkColor as Color,
            size: 0.5 + Math.random() * (m.homing ? 1.6 : 1.0),
          });
        }
      }

      // Update + draw bursts (impact rings + flash + shockwave)
      for (let i = bursts.length - 1; i >= 0; i--) {
        const b = bursts[i];
        b.life++;
        if (b.life > b.maxLife) {
          bursts.splice(i, 1);
          continue;
        }
        const p = b.life / b.maxLife;
        const eased = 1 - Math.pow(1 - p, 3);

        const baseR = b.mega ? 260 : 90;
        const baseR2 = b.mega ? 180 : 60;
        const r1 = eased * baseR;
        const r2 = eased * baseR2;
        const alpha = (1 - p) * (b.mega ? 0.85 : 0.7);

        ctx.lineWidth = b.mega ? 3.5 : 2;
        ctx.strokeStyle = `rgba(${b.c1.rgb},${alpha})`;
        ctx.shadowColor = b.c1.core;
        ctx.shadowBlur = b.mega ? 38 : 22;
        ctx.beginPath();
        ctx.arc(b.x, b.y, r1, 0, Math.PI * 2);
        ctx.stroke();

        ctx.strokeStyle = `rgba(${b.c2.rgb},${alpha})`;
        ctx.shadowColor = b.c2.core;
        ctx.beginPath();
        ctx.arc(b.x, b.y, r2, 0, Math.PI * 2);
        ctx.stroke();

        // MEGA gets a 3rd huge shockwave ring
        if (b.mega) {
          ctx.strokeStyle = `rgba(255,255,255,${alpha * 0.55})`;
          ctx.lineWidth = 1.5;
          ctx.shadowBlur = 24;
          ctx.shadowColor = "#ffffff";
          ctx.beginPath();
          ctx.arc(b.x, b.y, eased * 340, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Bright core flash early
        const flashWindow = b.mega ? 0.35 : 0.2;
        if (p < flashWindow) {
          const flashAlpha = (1 - p / flashWindow) * (b.mega ? 1 : 0.9);
          const flashR = b.mega ? 110 : 30;
          const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, flashR);
          grad.addColorStop(0, `rgba(255,255,255,${flashAlpha})`);
          grad.addColorStop(0.4, `rgba(${b.c1.rgb},${flashAlpha * 0.75})`);
          grad.addColorStop(0.8, `rgba(${b.c2.rgb},${flashAlpha * 0.4})`);
          grad.addColorStop(1, `rgba(${b.c2.rgb},0)`);
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(b.x, b.y, flashR, 0, Math.PI * 2);
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
