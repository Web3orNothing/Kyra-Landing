import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface GlowingCardProps {
  children: React.ReactNode;
  className?: string;
}

const GlowingCard: React.FC<GlowingCardProps> = ({
  children,
  className = "",
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = React.useState(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isHovered) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const angle = Math.atan2(y - centerY, x - centerX);
      const deg = angle * (180 / Math.PI) + 90;

      card.style.setProperty("--angle", `${deg}deg`);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isHovered]);

  return (
    <motion.div
      ref={cardRef}
      className={`glowing-card ${className}`}
      onMouseEnter={() => {
        setIsHovered(true);
        if (cardRef.current) {
          cardRef.current.style.setProperty("--active", "1");
        }
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        if (cardRef.current) {
          cardRef.current.style.setProperty("--active", "0");
        }
      }}
    >
      <div className="glow-effect" />
      {children}
    </motion.div>
  );
};

export default GlowingCard;
