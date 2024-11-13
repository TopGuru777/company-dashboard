import React, { Suspense } from "react";
const CompanyList = React.lazy(() => import('@/components/CompanyList'));

export default function Home() {
  return (
    <div>
      <h1 className="text-center text-2xl fond-bold my-4">Companies</h1>
      <Suspense fallback={<div className="text-center">Loading company list...</div>}>
        <CompanyList />
      </Suspense>
    </div>
  );
}
