"use client"
import React from 'react'
import dynamic from "next/dynamic";

const PBDonationContainer = dynamic(() => import("@/modules/public/pbdonation/PBDonationContainer"), {
    ssr: false,
});

export default function PBDonationWrapper() {
  return (
      <PBDonationContainer />
  )
}
