'use client'
import React, { useCallback, useMemo } from 'react'
import dynamic from 'next/dynamic'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded'
import CustomMarker from '@/app/components/Location/CustomMarker'
import { useLocationContext } from '@/app/context/LocationContext'
import { useSupplierContext } from '@/app/context/SuppliersContext'
import { useRouter } from 'next/navigation'

const Map = dynamic(() => import('react-map-gl').then((mod) => mod.Map), { ssr: false })
const NavigationControl = dynamic(
  () => import('react-map-gl').then((mod) => mod.NavigationControl),
  { ssr: false }
)
const Marker = dynamic(() => import('react-map-gl').then((mod) => mod.Marker), { ssr: false })

const MapComponent = () => {
  const router = useRouter()
  const { suppliersData, search, filters, applyFilters } = useSupplierContext()
  const { clickedLocation, handleMapClick } = useLocationContext()

  const filteredSuppliers = useMemo(() => {
    const searchLower = search?.toLowerCase().trim() || ''

    return suppliersData
      ?.filter((supplier) => !supplier.isDeleted)
      ?.filter((supplier) =>
        searchLower
          ? supplier.name?.toLowerCase().includes(searchLower)
          : true
      )
      ?.filter((supplier) => applyFilters([supplier], filters).length > 0) || []
  }, [suppliersData, search, filters, applyFilters])

  const handleMarkerClick = useCallback((supplierId) => {
    router.push(`/supplier-page/${supplierId}`)
  }, [])

  return (
    <Map
      mapLib={maplibregl}
      initialViewState={{
        longitude: 121.04926773442318,
        latitude: 14.369772655622302,
        zoom: 18,
      }}
      style={{ width: '100%', height: '100vh' }}
      mapStyle="https://api.maptiler.com/maps/streets/style.json?key=9IUxvvqmM3IECgSRFz2n"
      onClick={handleMapClick}
    >
      <NavigationControl position="bottom-right" />

      {filteredSuppliers.map(({ id, latitude, longitude, name }) =>
        latitude && longitude ? (
          <CustomMarker
            key={id}
            latitude={latitude}
            longitude={longitude}
            name={name}
            supplierId={id}
            onClick={() => handleMarkerClick(id)}
          >
            <LocationOnRoundedIcon style={{ color: '#ea4335', fontSize: '33px' }} />
          </CustomMarker>
        ) : null
      )}

      {clickedLocation && (
        <Marker
          latitude={clickedLocation.latitude}
          longitude={clickedLocation.longitude}
          color="blue"
        />
      )}
    </Map>
  )
}

export default MapComponent
