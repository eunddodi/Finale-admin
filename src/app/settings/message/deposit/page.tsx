'use client'
import ErrorFallback from "@/app/components/ErrorFallback";
import Loader from "@/app/components/Loader";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import dynamic from "next/dynamic";

const DynamicMessageTemplateForm = dynamic(() => import('../components/MessageTemplateForm'), {
  loading: () => <Loader />,
  ssr: false,
});

export default function MessagePage() {
  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto p-4">
        <div className="mb-8">
          <h1 className="text-xl font-bold ">입금 확인 문자 수정하기</h1>
        </div>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Suspense fallback={<Loader />}>
            <DynamicMessageTemplateForm type="deposit" />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  )
}

