import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import api from "../services/api";

const getVisitorId = () => {
  let id = localStorage.getItem("visitorId");
  if (!id) {
    id = `v-${Math.random().toString(36).slice(2)}-${Date.now()}`;
    localStorage.setItem("visitorId", id);
  }
  return id;
};

// Fire-and-forget page-view tracking on every route change.
export function useAnalytics() {
  const location = useLocation();
  useEffect(() => {
    api
      .post("/analytics/track", {
        visitorId: getVisitorId(),
        page: location.pathname,
        browser: navigator.userAgent.slice(0, 120),
        device: /Mobi/i.test(navigator.userAgent) ? "mobile" : "desktop",
      })
      .catch(() => {});
  }, [location.pathname]);
}
