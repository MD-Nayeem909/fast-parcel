import Link from "next/link";
import React from "react";

const TrackingNotFound = ({id}) => {
  return (
    <div className="min-h-[calc(100vh-81px)] flex flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold text-error">Tracking Not Found</h1>
      <div className="text-base-content/80 text-center font-medium">
        <p className="">Could not find parcel with</p>
        <p>ID: {id}</p>
      </div>

      <Link href="/" className="btn btn-primary">
        Back Home
      </Link>
    </div>
  );
};

export default TrackingNotFound;
