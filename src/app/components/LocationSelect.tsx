import { getLocations } from "@/api/location"
import { ILocation } from "@/api/location/types"
import { useSuspenseQuery } from "@tanstack/react-query"
import { useStudentsContext } from './StudentsContext'

export default function LocationSelect() {
  const { selectedLocation, setSelectedLocation, setSelectedLessonId } = useStudentsContext()
  const { data: locations } = useSuspenseQuery<ILocation[]>({
    queryKey: ['locations'],
    queryFn: getLocations,
  })

  return (
    <select
      className="p-2 border rounded"
      value={selectedLocation}
      onChange={(e) => {
        setSelectedLocation(e.target.value)
        setSelectedLessonId('')
      }}
    >
      <option value="">장소 선택</option>
      {locations?.map((location) => (
        <option key={location.id} value={location.name}>{location.name}</option>
      ))}
    </select>
  )
}