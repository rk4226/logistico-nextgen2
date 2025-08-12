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
    <div className={`absolute inset-0 -z-10 pointer-events-none ${className}`}>
      {/* Gradient color scheme background */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-500 via-slate-700 to-orange-500" />
      <ComposableMap
        projectionConfig={{ scale: 155 }}
        className="w-full h-full"
        style={{ width: '100%', height: '100%' }}
      >
        <ZoomableGroup zoom={1} center={[0, 20]}>
          <Geographies geography={WORLD_TOPO_JSON}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  style={{
                    default: { fill: 'transparent', stroke: 'rgba(255,255,255,0.45)', strokeWidth: 0.6 },
                    hover: { fill: 'transparent', stroke: 'rgba(255,255,255,0.6)', strokeWidth: 0.7 },
                    pressed: { fill: 'transparent', stroke: 'rgba(255,255,255,0.6)', strokeWidth: 0.7 },
                  }}
                />
              ))
            }
          </Geographies>

          {markers.map(({ name, coordinates }, idx) => (
            <Marker key={name} coordinates={coordinates}>
              <circle r={3} fill="#fff" opacity={0.9} className="animate-pulse" />
              {/* Animated ripple */}
              <circle r={3} fill="none" stroke="#fff" strokeOpacity={0.6} className="animate-[ripple_2.5s_ease-out_infinite]" />
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


