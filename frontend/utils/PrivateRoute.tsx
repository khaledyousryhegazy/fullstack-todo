"use client";

import React, { FC, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthProvider";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: FC<PrivateRouteProps> = ({ children }) => {
  const router = useRouter();
  const user = useAuth();

  if (!user?.token) {
    router.push("/login");
    return null;
  }

  return <>{children}</>;
};

export default PrivateRoute;
