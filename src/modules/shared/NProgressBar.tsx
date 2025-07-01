"use client"

import React from 'react';
import { useTopLoader } from 'nextjs-toploader';

export const NextProgressBar = () => {
    const loader = useTopLoader();
    return (
        <div>
            <button type="button" onClick={() => loader.start()}>
                Start
            </button>
            <button type="button" onClick={() => loader.setProgress(0.5)}>
                Set Progress
            </button>
        </div>
    );
};
