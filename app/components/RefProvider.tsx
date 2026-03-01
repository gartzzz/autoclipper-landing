"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useSearchParams } from "next/navigation";

interface RefContextValue {
  refCode: string | null;
  affiliateName: string | null;
}

const RefContext = createContext<RefContextValue>({
  refCode: null,
  affiliateName: null,
});

export function useRefContext() {
  return useContext(RefContext);
}

async function fetchAffiliateName(code: string): Promise<string | null> {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) return null;

    const res = await fetch(
      `${url}/rest/v1/affiliate_display?referral_code=eq.${encodeURIComponent(code)}&select=affiliate_name`,
      { headers: { apikey: key } }
    );
    const data = await res.json();
    if (Array.isArray(data) && data.length > 0) {
      return data[0].affiliate_name || code;
    }
    return null;
  } catch {
    return null;
  }
}

export default function RefProvider({ children }: { children: ReactNode }) {
  const searchParams = useSearchParams();
  const [refCode, setRefCode] = useState<string | null>(null);
  const [affiliateName, setAffiliateName] = useState<string | null>(null);

  useEffect(() => {
    const urlRef = searchParams.get("ref");
    const storedRef = localStorage.getItem("autoclipper_ref");
    const code = urlRef || storedRef;

    if (urlRef) {
      localStorage.setItem("autoclipper_ref", urlRef);
    }

    if (code) {
      setRefCode(code);
      fetchAffiliateName(code).then(setAffiliateName);
    }
  }, [searchParams]);

  return (
    <RefContext.Provider value={{ refCode, affiliateName }}>
      {children}
    </RefContext.Provider>
  );
}
