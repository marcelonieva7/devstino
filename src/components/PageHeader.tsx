import React from 'react';

export default function PageHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <>
      <h1 title={title} className="mb-4 text-4xl font-se7en text-white md:text-7xl glitch">
        {title}
      </h1>
      {subtitle && (
        <span title={subtitle} className="text-sm font-lacquer font-light text-white md:text-2xl glitch">
          {subtitle}
        </span>
      )}
    </>
  );
}
