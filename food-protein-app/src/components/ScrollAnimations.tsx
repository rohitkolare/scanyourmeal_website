"use client";

import { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

interface ScrollAnimationProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale';
}

export const ScrollAnimation: React.FC<ScrollAnimationProps> = ({ 
  children, 
  className = '', 
  delay = 0,
  direction = 'up'
}) => {
  const controls = useAnimation();

  const getInitialVariants = () => {
    switch (direction) {
      case 'up':
        return { opacity: 0, y: 50 };
      case 'down':
        return { opacity: 0, y: -50 };
      case 'left':
        return { opacity: 0, x: -50 };
      case 'right':
        return { opacity: 0, x: 50 };
      case 'scale':
        return { opacity: 0, scale: 0.8 };
      default:
        return { opacity: 0, y: 50 };
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            controls.start({
              opacity: 1,
              y: 0,
              x: 0,
              scale: 1,
              transition: {
                duration: 0.8,
                delay,
                ease: [0.25, 0.46, 0.45, 0.94]
              }
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById(`scroll-${Math.random().toString(36).substr(2, 9)}`);
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [controls, delay]);

  return (
    <motion.div
      className={className}
      initial={getInitialVariants()}
      animate={controls}
    >
      {children}
    </motion.div>
  );
};

export const useScrollTrigger = () => {
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      document.body.classList.toggle('scrolled', scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
};
