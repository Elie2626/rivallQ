'use client'

import React, { useState, useRef, useCallback, useEffect } from 'react'

interface ImageComparisonProps {
  beforeImage: string
  afterImage: string
  altBefore?: string
  altAfter?: string
}

export function ImageComparison({
  beforeImage,
  afterImage,
  altBefore = 'Avant',
  altAfter = 'Après',
}: ImageComparisonProps) {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMove = useCallback(
    (clientX: number) => {
      if (!isDragging || !containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const newPosition = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100))
      setSliderPosition(newPosition)
    },
    [isDragging],
  )

  const handleMouseUp = useCallback(() => setIsDragging(false), [])

  useEffect(() => {
    window.addEventListener('mouseup', handleMouseUp)
    return () => window.removeEventListener('mouseup', handleMouseUp)
  }, [handleMouseUp])

  return (
    <div
      ref={containerRef}
      className="relative w-full select-none rounded-xl overflow-hidden shadow-2xl cursor-ew-resize"
      style={{ aspectRatio: '16/9' }}
      onMouseMove={e => handleMove(e.clientX)}
      onMouseLeave={handleMouseUp}
      onTouchMove={e => handleMove(e.touches[0].clientX)}
      onTouchEnd={() => setIsDragging(false)}
    >
      {/* Labels */}
      <span className="absolute top-3 left-3 z-20 text-[11px] font-bold uppercase tracking-wider bg-black/60 text-red-400 border border-red-500/40 rounded-full px-2.5 py-1 pointer-events-none">
        Avant
      </span>
      <span className="absolute top-3 right-3 z-20 text-[11px] font-bold uppercase tracking-wider bg-black/60 text-emerald-400 border border-emerald-500/40 rounded-full px-2.5 py-1 pointer-events-none">
        Après
      </span>

      {/* After image (top) — clipped */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={afterImage}
          alt={altAfter}
          className="absolute inset-0 h-full w-full object-cover object-left-top"
          draggable={false}
        />
      </div>

      {/* Before image (bottom) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={beforeImage}
        alt={altBefore}
        className="block h-full w-full object-cover object-left-top"
        draggable={false}
      />

      {/* Divider line */}
      <div
        className="absolute top-0 bottom-0 w-px bg-white/70 pointer-events-none"
        style={{ left: `${sliderPosition}%` }}
      />

      {/* Handle */}
      <div
        className="absolute top-0 bottom-0 flex items-center justify-center"
        style={{ left: `calc(${sliderPosition}% - 20px)`, width: 40 }}
        onMouseDown={() => setIsDragging(true)}
        onTouchStart={() => setIsDragging(true)}
      >
        <div
          className={`h-10 w-10 rounded-full bg-white flex items-center justify-center shadow-xl border border-zinc-200 transition-transform duration-150 ${
            isDragging ? 'scale-110' : 'scale-100'
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-zinc-600"
            aria-hidden="true"
          >
            <path d="m9 18 6-6-6-6" />
            <path d="m15 18-6-6 6-6" transform="translate(-6,0) scale(-1,1) translate(6,0)" />
            <line x1="7" y1="12" x2="17" y2="12" />
          </svg>
        </div>
      </div>
    </div>
  )
}
