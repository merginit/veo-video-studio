import React, { useEffect, useState } from 'react';

export const InstallPrompt: React.FC = () => {
  const [canInstall, setCanInstall] = useState(false);
  const [promptEvent, setPromptEvent] = useState<any | null>(null);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setPromptEvent(e);
      setCanInstall(true);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const onInstall = async () => {
    if (!promptEvent) return;
    await promptEvent.prompt();
    await promptEvent.userChoice;
    setCanInstall(false);
    setPromptEvent(null);
  };

  if (!canInstall) return null;

  return (
    <button
      onClick={onInstall}
      className="text-xs text-zinc-600 hover:text-white transition-colors font-mono uppercase"
    >
      Install App
    </button>
  );
};
