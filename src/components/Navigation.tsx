import React from 'react';
import { 
  LayoutDashboard, 
  AlertTriangle, 
  TrendingUp, 
  Activity, 
  GitFork, 
  TableProperties,
  Printer
} from 'lucide-react';

export type TabType = 'overview' | 'risk' | 'trend' | 'behavior' | 'correlation' | 'table';

interface NavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  riskCount: number;
  totalFiltered: number;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  onTabChange,
  riskCount,
  totalFiltered,
}) => {
  const navItems: { id: TabType; label: string; icon: React.ReactNode; badge?: string | number; badgeColor?: string }[] = [
    {
      id: 'overview',
      label: 'ภาพรวม & KPI',
      icon: <LayoutDashboard className="w-4 h-4" />
    },
    {
      id: 'risk',
      label: 'การวิเคราะห์ความเสี่ยง (Health Risk)',
      icon: <AlertTriangle className="w-4 h-4" />,
      badge: `${riskCount} เสี่ยงสูง`,
      badgeColor: 'bg-rose-100 text-rose-700 border-rose-200'
    },
    {
      id: 'trend',
      label: 'แนวโน้มสุขภาพ (Health Trend)',
      icon: <TrendingUp className="w-4 h-4" />
    },
    {
      id: 'behavior',
      label: 'พฤติกรรมสุขภาพ (Health Behavior)',
      icon: <Activity className="w-4 h-4" />
    },
    {
      id: 'correlation',
      label: 'ความสัมพันธ์เชิงลึก (Correlations)',
      icon: <GitFork className="w-4 h-4" />
    },
    {
      id: 'table',
      label: 'ตารางข้อมูลรายบุคคล (Data Table)',
      icon: <TableProperties className="w-4 h-4" />,
      badge: `${totalFiltered} ราย`,
      badgeColor: 'bg-pink-50 text-pink-700 border-pink-200'
    }
  ];

  return (
    <nav className="bg-white/90 backdrop-blur-md rounded-2xl p-2 shadow-sm border border-pink-100/80 sticky top-3 z-30 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2">
      <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1 md:pb-0">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md shadow-pink-500/25'
                  : 'text-gray-600 hover:text-pink-600 hover:bg-pink-50/70 active:bg-pink-100/50'
              }`}
            >
              <span className={isActive ? 'text-white' : 'text-pink-500'}>
                {item.icon}
              </span>
              <span>{item.label}</span>
              {item.badge && (
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-semibold border ${
                    isActive
                      ? 'bg-white text-rose-600 border-white/40'
                      : item.badgeColor
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="hidden lg:flex items-center gap-2 pr-1">
        <button
          onClick={() => window.print()}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-pink-200 text-pink-700 bg-pink-50/50 hover:bg-pink-100/70 text-xs font-medium transition-colors"
          title="พิมพ์หรือบันทึกสรุปหน้านี้"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>พิมพ์รายงาน</span>
        </button>
      </div>
    </nav>
  );
};
