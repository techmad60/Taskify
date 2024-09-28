"use client";
import {  Suspense } from "react";
import SignUp from '@/components/ResetPassword';
import Loading from '@/components/Loading';


export default function SignupPage() {
  return (
    <Suspense fallback={<Loading />}>
      <SignUp />
    </Suspense>
  )

}
