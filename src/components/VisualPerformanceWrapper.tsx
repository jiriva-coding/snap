import React, { useId } from 'react';

interface VisualPerformanceWrapperProps {
  children: React.ReactNode;
  ambientLightGlow?: boolean;
  glassNavbarVariant?: boolean;
  className?: string;
  intensity?: 'low' | 'medium' | 'high';
}

/**
 * VisualPerformanceWrapper
 * 
 * Performance isolates expensive overlay painting operations like backdrop-filter glass/blur reflections
 * and ambient SVG film grains/glowing gradients. 
 * Prevents main-thread layout thrashing during hover calculations.
 */
export const VisualPerformanceWrapper: React.FC<VisualPerformanceWrapperProps> = React.memo(({
  children,
  ambientLightGlow = false,
  glassNavbarVariant = false,
  className = '',
  intensity = 'medium',
}) => {
  const layerId = useId();

  const animationClass = intensity === 'high' 
    ? 'animate-pulse [animation-duration:4s]' 
    : intensity === 'low'
      ? 'animate-pulse [animation-duration:12s]'
      : 'animate-pulse [animation-duration:8s]';

  return (
    <div 
      className={`relative rounded-3xl overflow-hidden isolation-auto transform-gpu will-change-transform will-change-opacity translate-z-0 ${className}`}
    >
      {/* 1. Backdrop Glass Blur Canvas - isolated as a separate visual compositor layer */}
      <div 
        className={`absolute inset-0 z-0 pointer-events-none transform-gpu translate-z-0 ${
          glassNavbarVariant ? 'glass-navbar' : 'glass-effect'
        }`}
        style={{
          contentVisibility: 'auto', // CSS Containment optimizes layout paint cycles in modern browsers
        }}
      />

      {/* 2. Isolated ambient lighting canvas (optional) */}
      {ambientLightGlow && (
        <div 
          aria-hidden="true"
          className={`absolute -inset-[20%] z-0 pointer-events-none mix-blend-screen opacity-10 bg-radial from-white to-transparent transform-gpu translate-z-0 ${animationClass}`}
          style={{
            transform: 'translate3d(0, 0, 0)',
          }}
        />
      )}

      {/* 3. Core Content Render Box */}
      <div className="relative z-10 w-full h-full transform-gpu translate-z-0">
        {children}
      </div>
    </div>
  );
});

VisualPerformanceWrapper.displayName = 'VisualPerformanceWrapper';
