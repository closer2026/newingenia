"use client";

import { useEffect } from "react";

/**
 * Désenregistre tout service worker fantôme et vide les caches du navigateur
 * pour éviter des bundles obsolètes (par exemple un ancien rendu Sidebar).
 */
export function ServiceWorkerCleaner() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("serviceWorker" in navigator)) return;

    navigator.serviceWorker
      .getRegistrations()
      .then((registrations) => {
        registrations.forEach((registration) => {
          registration.unregister().catch(() => undefined);
        });
      })
      .catch(() => undefined);

    if (typeof window.caches !== "undefined") {
      window.caches
        .keys()
        .then((keys) => Promise.all(keys.map((key) => window.caches.delete(key))))
        .catch(() => undefined);
    }
  }, []);

  return null;
}
