"use client";
import { useContext, useEffect } from "react";
import Header from "../Header";
import { useParams, usePathname, useRouter } from "next/navigation";
import { allRoutes } from "@/data/routes";
import { MainContext } from "@/store/context";
import Footer from "../footer-1";

export default function Layout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const { slug } = useParams();
  const { user, isUserLoading } = useContext(MainContext);
  useEffect(() => {
    if (
      pathname === "/login" ||
      pathname === "/signup" ||
      pathname === "/verify"
    ) {
      return;
    }
    // if (isUserLoading) return;

    // Find the current route in the AllRoutes array
    const currentRoute = allRoutes?.find(
      (route) => route.link === pathname.replace(slug, "[slug]"),
    );

    if (user && currentRoute?.roles?.length && !user?.is_verified)
      return router.push("/verify");

    // If the current route is not found in the array or the user's role is not allowed for this route
    if (
      currentRoute &&
      currentRoute.roles.length &&
      (!currentRoute || !currentRoute?.roles?.includes(user?.role))
    ) {
      localStorage.clear();
      router.replace("/login");
    }
  }, [pathname, user, isUserLoading, slug]);

  return (
    <div>
      <Header />
      <main className="min-h-screen bg-white">
        <div className="h-full">{children}</div>
        <Footer />
      </main>
    </div>
  );
}
