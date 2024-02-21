import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function useLoginIsRequired() {
  const session = useSession();
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!session) router.push("/");
    }
  }, [router, session]);
}
