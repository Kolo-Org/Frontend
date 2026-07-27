import { Suspense } from "react";
import { AuthForm } from "@/components/auth/AuthForm";

export default function Register() {
  return (
    <Suspense>
      <AuthForm mode="register" />
    </Suspense>
  );
}
