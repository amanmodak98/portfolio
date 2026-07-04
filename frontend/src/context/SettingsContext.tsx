import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { getSettings } from "../services/resources";
import type { SiteSettings } from "../types";

const fallback: SiteSettings = {
  id: 1,
  fullName: "Your Name",
  role: "Full-Stack Developer",
  tagline: "I build things for the web.",
  bio: "",
  location: null,
  email: "you@example.com",
  githubUrl: null,
  linkedinUrl: null,
  twitterUrl: null,
  resumeUrl: "/resume.pdf",
  updatedAt: "",
};

const SettingsContext = createContext<{ settings: SiteSettings; loading: boolean }>({
  settings: fallback,
  loading: true,
});

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<SiteSettings>(fallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSettings()
      .then(setSettings)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <SettingsContext.Provider value={{ settings, loading }}>
      {children}
    </SettingsContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSettings() {
  return useContext(SettingsContext);
}
