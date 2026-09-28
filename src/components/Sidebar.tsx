import React from 'react';
import { FolderGit2, Building2, Settings, Layers } from 'lucide-react';

interface SidebarProps {
  activeTab: 'folders' | 'all-students' | 'filiais' | 'settings';
  onSelectTab: (tab: 'folders' | 'all-students' | 'filiais' | 'settings') => void;
  onOpenSettings: () => void;
  onCloseMobileDrawer?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  onOpenSettings,
  onCloseMobileDrawer,
}) => {
  const navItems = [
    {
      id: 'folders' as const,
      label: 'Lotes por Faixa',
      icon: Layers,
    },
    {
      id: 'all-students' as const,
      label: 'Todos Graduandos',
      icon: FolderGit2,
    },
    {
      id: 'filiais' as const,
      label: 'Filiais e Mestres',
      icon: Building2,
    },
  ];

  const handleNavClick = (tab: 'folders' | 'all-students' | 'filiais') => {
    onSelectTab(tab);
    if (onCloseMobileDrawer) onCloseMobileDrawer();
  };

  return (
    <aside className="w-64 bg-white border-r border-slate-100 flex flex-col justify-between p-4 h-full select-none">
      {/* Brand Header */}
      <div>
        <div className="flex items-center gap-3 px-3 py-3 mb-6">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-700 to-blue-500 text-white flex items-center justify-center font-black text-sm shadow-md shadow-blue-500/30">
            🥋
          </div>
          <div>
            <span className="font-extrabold text-slate-900 text-sm tracking-tight block">
              Certificado Pro
            </span>
            <span className="text-[10px] text-slate-400 font-medium block">
              Jiu-Jitsu Edition
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-1">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-blue-50 text-blue-600 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Area: Settings & Printer Status */}
      <div className="space-y-3 pt-4 border-t border-slate-100">
        <button
          onClick={() => {
            onOpenSettings();
            if (onCloseMobileDrawer) onCloseMobileDrawer();
          }}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all"
        >
          <Settings className="w-4 h-4 text-slate-400" />
          <span>Configurar Modelo</span>
        </button>

        {/* User / Gym Profile Box */}
        <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-slate-900 text-amber-400 flex items-center justify-center font-black text-xs shadow-xs">
            BJJ
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-bold text-slate-800 truncate">Irmão & Mestre</p>
            <p className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Epson L3250 Conectada
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};
