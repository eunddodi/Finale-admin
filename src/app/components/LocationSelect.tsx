import { useLocations } from "@/api/location"
interface Props {
  selectedLocation: string
  onChange: (location: string) => void
}

export default function LocationSelect({ selectedLocation, onChange }: Props) {
  const { data: locations } = useLocations()

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