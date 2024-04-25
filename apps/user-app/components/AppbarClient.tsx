"use client"
import { signIn, signOut, useSession } from "next-auth/react";
import { Appbar } from "@repo/ui/appbar";
import { useRouter, usePathname } from "next/navigation";

export function AppbarClient() {
  const session = useSession();
  const router = useRouter();
  const pathname = usePathname();
  return (
   <div>
    {!(pathname === "/dummywhserver") 
      ? <Appbar 
        onSignin={signIn} 
        onSignout={async () => {
          await signOut()
          router.push("/api/auth/signin")
        }} 
        user={session.data?.user} /> : null}  
   </div>
  );
}
