'use client'

import { memo, useMemo } from 'react'
import { ComposableMap, Geographies, Geography, ZoomableGroup, Marker } from 'react-simple-maps'

// Lightweight world topojson
const WORLD_TOPO_JSON = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'

interface WorldMapBackgroundProps {
  className?: string
}

function generateMarkers(): { name: string; coordinates: [number, number] }[] {
  // Sample global coordinates; can be extended or fetched
  return [
    { name: 'Washington', coordinates: [-77.0369, 38.9072] },
    { name: 'London', coordinates: [-0.1276, 51.5074] },
    { name: 'Berlin', coordinates: [13.405, 52.52] },
    { name: 'Tokyo', coordinates: [139.6917, 35.6895] },
    { name: 'Sydney', coordinates: [151.2093, -33.8688] },
    { name: 'Sao Paulo', coordinates: [-46.6333, -23.55] },
    { name: 'Ottawa', coordinates: [-75.6972, 45.4215] },
    { name: 'Dubai', coordinates: [55.2708, 25.2048] },
    { name: 'Delhi', coordinates: [77.1025, 28.7041] },
  ]
}

const WorldMapBackground = memo(function WorldMapBackground({ className = '' }: WorldMapBackgroundProps) {
  const markers = useMemo(generateMarkers, [])

  return (
    <div className={`absolute inset-0 z-0 pointer-events-none mix-blend-screen opacity-90 ${className}`}>
      {/* Gradient color scheme background */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-600 via-slate-800 to-orange-700 opacity-60" />
      <ComposableMap
        projectionConfig={{ scale: 155 }}
        className="w-full h-full"
        style={{ width: '100%', height: '100%' }}
      >
        <ZoomableGroup zoom={1} center={[0, 20]}>
          <Geographies geography={WORLD_TOPO_JSON}>
            {({ geographies }: { geographies: any[] }) =>
              geographies.map((geo: any) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  style={{
                    default: { fill: 'rgba(255,255,255,0.06)', stroke: 'rgba(255,255,255,0.95)', strokeWidth: 1.1 },
                    hover: { fill: 'rgba(255,255,255,0.08)', stroke: 'rgba(255,255,255,1)', strokeWidth: 1.25 },
                    pressed: { fill: 'rgba(255,255,255,0.08)', stroke: 'rgba(255,255,255,1)', strokeWidth: 1.25 },
                  }}
                />
              ))
            }
          </Geographies>

          {markers.map(({ name, coordinates }, idx) => (
            <Marker key={name} coordinates={coordinates}>
              <circle r={4} fill="#fff" opacity={0.95} className="animate-pulse" />
              {/* Animated ripple */}
              <circle r={4} fill="none" stroke="#fff" strokeOpacity={0.8} className="animate-ripple" />
            </Marker>
          ))}
        </ZoomableGroup>
      </ComposableMap>
      {/* subtle vignette */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/40 via-transparent to-black/60" />
    </div>
  )
})

export default WorldMapBackground


