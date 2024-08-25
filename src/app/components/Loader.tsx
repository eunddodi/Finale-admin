'use client'
import React from 'react'

interface LoaderProps {
  size?: number
  color?: string
}

const Loader: React.FC<LoaderProps> = ({ size = 40, color = '#82bdaa' }) => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%',
    }}>
      <div
        style={{
          display: 'inline-block',
          position: 'relative',
          width: `${size}px`,
          height: `${size}px`,
        }}
      >
        <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg) }
            100% { transform: rotate(360deg) }
          }
          div::after {
            content: " "
            display: block
            position: absolute
            width: ${size * 0.8}px
            height: ${size * 0.8}px
            border-radius: 50%
            border: ${size * 0.1}px solid ${color}
            border-color: ${color} transparent ${color} transparent
            animation: spin 1.2s linear infinite
          }
        `}</style>
      </div>
    </div>
  )
}

export default Loader
