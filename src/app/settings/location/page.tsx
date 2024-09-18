"use client"
import { useAddLocation, useLocations } from "@/api/location"
import Loader from "@/app/components/Loader"
import { Suspense, useState } from "react"
import LocationBottomSheet from "./components/LocationBottomSheet"
import { CreateLocationDto } from "@/api/location/types"
import { toast } from "react-toastify"

const YourPage: React.FC = () => {
  const createMutation = useAddLocation()
  const handleAdd = () => {
    setIsOpen(true)
  }

  const handleSaveLocation = async (locationData: CreateLocationDto) => {
    await createMutation.mutateAsync(locationData, {
      onSuccess: () => {
        toast.success('수업 장소 추가 성공')
      },
      onError: () => {
        toast.error('수업 장소 추가 실패')
      }
    })
  }

  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="container mx-auto p-2">
      <div className="flex mb-8 items-center justify-between">
        <h1 className="text-2xl font-bold mb-0">수업 장소 목록</h1>
        <button onClick={handleAdd}
          className={`${false ? 'bg-gray-400 cursor-not-allowed' : 'bg-main hover:bg-main-dark'
            } text-white font-semibold p-2 rounded-lg transition duration-300 flex justify-center items-center`}
        >추가</button>
      </div>
      <Suspense fallback={<Loader />}>
        <LocationList />
      </Suspense>
      <LocationBottomSheet
        open={isOpen}
        onOpenChange={setIsOpen}
        onSave={handleSaveLocation}
      />
    </div>
  )
}

export default YourPage

const LocationList = () => {
  const { data: locations } = useLocations()

  const handleDelete = (id: number) => { alert('준비 중인 기능입니다.') }
  return (
    <div>
      {locations.map((location) => (
        <div
          key={location.id}
          className="w-full py-2 flex justify-between"
        >
          {location.name}
          <button onClick={() => handleDelete(location.id)} className="text-sm px-2 font-semibold py-1 rounded-lg">삭제</button>
        </div>
      ))}

    </div>
  )
}
