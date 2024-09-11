import { getLocations } from "@/api/location"
import { ILocation } from "@/api/location/types"
import { useSuspenseQuery } from "@tanstack/react-query"
interface Props {
  selectedLocation: string
  onChange: (location: string) => void
}

export default function LocationSelect({ selectedLocation, onChange }: Props) {
  const { data: locations } = useSuspenseQuery<ILocation[]>({
    queryKey: ['locations'],
    queryFn: getLocations,
  })

  return (
    <select
      className="p-2 border rounded"
      value={selectedLocation}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">장소 선택</option>
      {locations?.map((location) => (
        <option key={location.id} value={location.name}>{location.name}</option>
      ))}
    </select>
  )
}