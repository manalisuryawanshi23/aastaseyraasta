import React, { useState, useEffect } from 'react';
import { Database, CheckCircle2, AlertTriangle, RefreshCw } from 'lucide-react';

interface DbHealth {
  database: string;
  tables_count: number;
  connected: boolean;
}

export const AdminDbStatusBanner: React.FC = () => {
  const [health, setHealth] = useState<DbHealth | null>(null);
  const [checking, setChecking] = useState(true);
  const [lastChecked, setLastChecked] = useState<string>('');

  const checkHealth = async () => {
    setChecking(true);
    try {
      const res = await fetch('/api/health');
      const json = await res.json();
      setHealth({
        database: json.database || 'Unknown',
        tables_count: json.tables_count || 0,
        connected: json.database_details?.connected === true,
      });
      setLastChecked(new Date().toLocaleTimeString('en-IN'));
    } catch {
      setHealth({ database: 'Unreachable', tables_count: 0, connected: false });
    } finally {
      setChecking(false);
    }
  };

  useEffect(() => {
    checkHealth();
    // Re-check on tab focus
    const onFocus = () => checkHealth();
    window.addEventListener('focus', onFocus);
    // Also re-check every 60 seconds
    const interval = setInterval(checkHealth, 60000);
    return () => {
      window.removeEventListener('focus', onFocus);
      clearInterval(interval);
    };
  }, []);

  const isConnected = health?.connected === true;

  return (
    <div
      className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border text-xs font-medium transition-all ${
        checking
          ? 'bg-stone-100 dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-500'
          : isConnected
          ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300'
          : 'bg-red-50 dark:bg-red-950/40 border-red-200 dark:border-red-800 text-red-700 dark:text-red-300'
      }`}
    >
      <Database className={`w-3.5 h-3.5 shrink-0 ${checking ? 'animate-pulse' : ''}`} />
      {checking ? (
        <span>Checking database status...</span>
      ) : isConnected ? (
        <>
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
          <span>
            <strong>MySQL Connected</strong> — {health?.tables_count} tables — All changes save directly to database
          </span>
        </>
      ) : (
        <>
          <AlertTriangle className="w-3.5 h-3.5 text-red-500 shrink-0" />
          <span>
            <strong>Database Offline</strong> — Changes will NOT persist. Contact your hosting provider.
          </span>
        </>
      )}
      {lastChecked && !checking && (
        <span className="ml-auto text-[10px] opacity-60 shrink-0">Checked {lastChecked}</span>
      )}
      <button
        onClick={checkHealth}
        disabled={checking}
        title="Re-check database connection"
        className="ml-1 p-1 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 transition-colors disabled:opacity-40 cursor-pointer"
      >
        <RefreshCw className={`w-3 h-3 ${checking ? 'animate-spin' : ''}`} />
      </button>
    </div>
  );
};
