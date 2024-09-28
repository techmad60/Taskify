// app/reset-password/page.js
"use client";
import { Suspense } from 'react';
import ResetPassword from '@/components/ResetPassword';
import Loading from '@/components/Loading';
//import Loading from './Loading'; // Your Loading component

export default function ResetPasswordPage() {
    return (
        <Suspense fallback={<Loading />}>
            <ResetPassword />
        </Suspense>
    );
}
