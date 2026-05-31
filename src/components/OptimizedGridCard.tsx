import React, { useMemo } from 'react';

interface OptimizedGridCardProps {
  title: string;
  description?: string;
  badge?: string;
  accentColor?: 'blue' | 'emerald' | 'purple';
  children?: React.ReactNode;
  footerMetrics?: Array<{ label: string; value: string; highlight?: boolean }>;
}

/**
 * OptimizedGridCard
 * Built specifically for Tailwind CSS v4.
 * Uses hardware rasterization layers (will-change and translate-z) to prevent layout thrashing
 * during high-performance UI renders and mouse-overs.
 */
export const OptimizedGridCard: React.FC<OptimizedGridCardProps> = React.memo(({
  title,
  description,
  badge,
  accentColor = 'blue',
  children,
  footerMetrics = [],
}) => {
  // Resolve CSS v4 theme variables on compilation state rather than expensive class lookups
  const colorVariables = useMemo(() => {
    switch (accentColor) {
      case 'emerald':
        return {
          bg: 'rgba(5, 150, 105, 0.08)',
          text: 'var(--color-accent-emerald)',
          border: 'rgba(5, 150, 105, 0.2)',
        };
      case 'purple':
        return {
          bg: 'rgba(124, 58, 237, 0.08)',
          text: 'var(--color-accent-purple)',
          border: 'rgba(124, 58, 237, 0.2)',
        };
      case 'blue':
      default:
        return {
          bg: 'rgba(37, 99, 235, 0.08)',
          text: 'var(--color-accent-blue)',
          border: 'rgba(37, 99, 235, 0.2)',
        };
    }
  }, [accentColor]);

  return (
    <div 
      className="group relative bg-[var(--color-card)] clean-border rounded-3xl p-8 elevated-shadow overflow-hidden transition-all duration-300 ease-out hover:scale-[1.015] hover:border-[color:var(--local-accent-border)] transform-gpu will-change-transform will-change-opacity origin-center"
      style={{
        '--local-accent-border': colorVariables.border,
      } as React.CSSProperties}
    >
      {/* Dynamic hardware composite background glow layer */}
      <div 
        className="absolute -top-12 -right-12 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-15 transition-opacity duration-500 ease-out pointer-events-none transform-gpu"
        style={{
          background: colorVariables.text,
        }}
      />

      <div className="flex items-start gap-6 relative z-10">
        {children && (
          <div 
            className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform duration-500 ease-out group-hover:scale-105 transform-gpu"
            style={{ 
              backgroundColor: colorVariables.bg,
              color: colorVariables.text,
            }}
          >
            {children}
          </div>
        )}
        
        <div className="flex-1 min-w-0">
          {badge && (
            <p className="text-sm font-medium text-[var(--color-muted-foreground)] mb-1 truncate">
              {badge}
            </p>
          )}
          <h3 className="text-2xl font-black text-[var(--color-foreground)] leading-snug mb-3 group-hover:text-[color:var(--local-accent-border)] transition-colors duration-200">
            {title}
          </h3>
          
          {description && (
            <p className="text-base text-[var(--color-muted-foreground)] leading-relaxed mb-4">
              {description}
            </p>
          )}

          {footerMetrics.length > 0 && (
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm border-t border-[var(--color-border)] pt-4 mt-2">
              {footerMetrics.map((tech, index) => (
                <div key={index} className="flex flex-col">
                  <span className="text-[var(--color-muted-foreground)] text-xs uppercase tracking-wider mb-0.5">
                    {tech.label}
                  </span>
                  <span className={`font-bold transition-all duration-300 ${
                    tech.highlight 
                      ? 'text-[var(--color-accent-emerald)] font-extrabold scale-[1.01]' 
                      : 'text-[var(--color-foreground)]'
                  }`}>
                    {tech.value}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

OptimizedGridCard.displayName = 'OptimizedGridCard';
