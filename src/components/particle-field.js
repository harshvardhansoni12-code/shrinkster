"use client";

import { useEffect, useState } from "react";

export default function ParticleField() {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const generated = Array.from({ length: 30 }, (_, i) => {
      const seed = (i + 1) * 137.508;
      const r1 = (((Math.sin(seed) * 10000) % 1) + 1) % 1;
      const r2 = (((Math.sin(seed * 2) * 10000) % 1) + 1) % 1;
      const r3 = (((Math.sin(seed * 3) * 10000) % 1) + 1) % 1;
      const r4 = (((Math.sin(seed * 4) * 10000) % 1) + 1) % 1;

      return {
        id: i,
        left: `${r1 * 100}%`,
        delay: `${r2 * 15}s`,
        duration: `${12 + r3 * 18}s`,
        size: r4 > 0.7 ? 3 : 2,
        opacity: 0.3 + r4 * 0.4,
      };
    });

    setParticles(generated);
  }, []);

  return (
    <>
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="particle"
          style={{
            left: particle.left,
            bottom: "-5%",
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            animationDelay: particle.delay,
            animationDuration: particle.duration,
          }}
        />
      ))}
    </>
  );
}
