'use client';

import React from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

interface LayoutProps {
  children: React.ReactNode;
  breadcrumbs?: { label: string; href?: string }[];
}

export const Layout: React.FC<LayoutProps> = ({ children, breadcrumbs }) => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="ml-64 w-full flex flex-col">
        <Header />
        <main className="flex-1 overflow-auto pt-20">
          {breadcrumbs && (
            <div className="bg-white border-b border-gray-200 px-8 py-4">
              <div className="flex items-center gap-2 text-sm">
                {breadcrumbs.map((breadcrumb, idx) => (
                  <React.Fragment key={idx}>
                    {idx > 0 && <span className="text-gray-400">/</span>}
                    {breadcrumb.href ? (
                      <a href={breadcrumb.href} className="text-accent hover:underline">
                        {breadcrumb.label}
                      </a>
                    ) : (
                      <span className="text-gray-700">{breadcrumb.label}</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}
          <div className="p-8">{children}</div>
        </main>
      </div>
    </div>
  );
};
