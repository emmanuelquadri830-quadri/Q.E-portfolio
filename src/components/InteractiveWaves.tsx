import React, { useEffect, useRef } from 'react';

interface Point {
  x: number;
  y: number;
  ox: number; // original x
  oy: number; // original y
  vx: number;
  vy: number;
}

export const InteractiveWaves: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });
  const lastMouseRef = useRef({ x: 0, y: 0 });
  const velocityRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let points: Point[][] = [];
    let width = 0;
    let height = 0;
    let animationFrame: number;

    const spacing = 50;
    const mouseRadius = 150;
    const mouseStrength = 0.5;
    const springStiffness = 0.05;
    const friction = 0.9;
    const driftSpeed = 0.0004; // Slower, more majestic drift

    const initPoints = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

      points = [];
      const cols = Math.ceil(width / spacing) + 2;
      const rows = Math.ceil(height / spacing) + 2;

      for (let y = 0; y < rows; y++) {
        const row: Point[] = [];
        for (let x = 0; x < cols; x++) {
          const px = x * spacing;
          const py = y * spacing;
          row.push({
            x: px,
            y: py,
            ox: px,
            oy: py,
            vx: 0,
            vy: 0,
          });
        }
        points.push(row);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;

      // Calculate speed
      const dx = mouseRef.current.x - lastMouseRef.current.x;
      const dy = mouseRef.current.y - lastMouseRef.current.y;
      const speed = Math.sqrt(dx * dx + dy * dy);
      velocityRef.current = Math.min(speed / 10, 2); // Cap velocity impact

      lastMouseRef.current.x = mouseRef.current.x;
      lastMouseRef.current.y = mouseRef.current.y;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    const animate = (time: number) => {
      ctx.clearRect(0, 0, width, height);
      
      const { x: mx, y: my, active: mActive } = mouseRef.current;
      const speedImpact = velocityRef.current;

      // Update Points
      for (let y = 0; y < points.length; y++) {
        for (let x = 0; x < points[y].length; x++) {
          const p = points[y][x];
          
          // Ambient drift (idle motion) - Multi-frequency for organic feel
          const t = time * driftSpeed;
          const ambientX = Math.sin(t + p.oy * 0.012) * 15 + Math.sin(t * 0.4 + p.ox * 0.008) * 8;
          const ambientY = Math.cos(t + p.ox * 0.012) * 15 + Math.cos(t * 0.4 + p.oy * 0.008) * 8;

          // Mouse Interaction
          if (mActive) {
            const dx = p.x - mx;
            const dy = p.y - my;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < mouseRadius) {
              const force = (1 - dist / mouseRadius) * mouseStrength * (1 + speedImpact);
              p.vx += (dx / dist) * force;
              p.vy += (dy / dist) * force;
            }
          }

          // Spring physics (return to original)
          const springX = (p.ox + ambientX - p.x) * springStiffness;
          const springY = (p.oy + ambientY - p.y) * springStiffness;

          p.vx += springX;
          p.vy += springY;

          p.vx *= friction;
          p.vy *= friction;

          p.x += p.vx;
          p.y += p.vy;
        }
      }

      // Draw horizontal lines (waves)
      ctx.lineWidth = 1;
      
      // Use additive blending for glow at overlaps
      ctx.globalCompositeOperation = 'lighter';

      for (let y = 0; y < points.length; y++) {
        const row = points[y];
        
        // Dynamic opacity based on interaction
        const baseOpacity = y % 2 === 0 ? 0.08 : 0.04;
        
        ctx.beginPath();
        ctx.strokeStyle = `rgba(255, 255, 255, ${baseOpacity})`;
        ctx.moveTo(row[0].x, row[0].y);
        
        for (let x = 0; x < row.length - 1; x++) {
          const p1 = row[x];
          const p2 = row[x + 1];
          const midX = (p1.x + p2.x) / 2;
          const midY = (p1.y + p2.y) / 2;
          ctx.quadraticCurveTo(p1.x, p1.y, midX, midY);
        }
        ctx.stroke();

        // Optional: extra glow pass for lines near the mouse
        if (mActive) {
          const distToMouse = Math.abs(row[0].oy - my);
          if (distToMouse < mouseRadius) {
            const glowStrength = (1 - distToMouse / mouseRadius) * 0.1;
            ctx.beginPath();
            ctx.lineWidth = 2; // Thicker for glow
            ctx.strokeStyle = `rgba(255, 255, 255, ${glowStrength})`;
            ctx.moveTo(row[0].x, row[0].y);
            for (let x = 0; x < row.length - 1; x++) {
              const p1 = row[x];
              const p2 = row[x + 1];
              const midX = (p1.x + p2.x) / 2;
              const midY = (p1.y + p2.y) / 2;
              ctx.quadraticCurveTo(p1.x, p1.y, midX, midY);
            }
            ctx.stroke();
            ctx.lineWidth = 1; // Reset
          }
        }
      }

      // Draw vertical lines (waves)
      for (let x = 0; x < points[0].length; x++) {
        const baseOpacity = x % 2 === 0 ? 0.06 : 0.03;
        
        ctx.beginPath();
        ctx.strokeStyle = `rgba(255, 255, 255, ${baseOpacity})`;
        ctx.moveTo(points[0][x].x, points[0][x].y);

        for (let y = 0; y < points.length - 1; y++) {
          const p1 = points[y][x];
          const p2 = points[y + 1][x];
          const midX = (p1.x + p2.x) / 2;
          const midY = (p1.y + p2.y) / 2;
          ctx.quadraticCurveTo(p1.x, p1.y, midX, midY);
        }
        ctx.stroke();
      }

      // Reset composite operation for following passes
      ctx.globalCompositeOperation = 'source-over';

      // Add Color Overlay based on mouse position
      if (mActive) {
        ctx.globalCompositeOperation = 'source-atop';
        const gradient = ctx.createRadialGradient(mx, my, 0, mx, my, mouseRadius * 2);
        gradient.addColorStop(0, 'rgba(251, 191, 36, 0.4)'); // Warm Amber/Gold
        gradient.addColorStop(0.5, 'rgba(59, 130, 246, 0.2)'); // Cool Blue
        gradient.addColorStop(1, 'rgba(168, 85, 247, 0.1)'); // Deep Purple
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
        
        // Reset composite operation
        ctx.globalCompositeOperation = 'source-over';
      }

      // Optional: Draw vertical lines for a grid feel (but user asked for curved line waves)
      // I'll stick to horizontal for that "flowing" feel, but slightly offset rows for depth
      
      animationFrame = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', initPoints);
    
    initPoints();
    animate(0);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', initPoints);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  );
};
