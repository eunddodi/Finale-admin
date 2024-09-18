import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Drawer, DrawerContent, DrawerHeader, DrawerDescription, DrawerFooter, DrawerTitle } from '@/components/ui/drawer'
import { Input } from "@/components/ui/input"
import { CreateLocationDto } from '@/api/location/types'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (locationData: CreateLocationDto) => void
}

const initialLocationData: CreateLocationDto = {
  name: '',
  city: '',
  district: '',
  address: ''
}

export default function LocationBottomSheet({ open, onOpenChange, onSave }: Props) {
  const [locationData, setLocationData] = useState<CreateLocationDto>(initialLocationData)

  const handleChange = (name: keyof CreateLocationDto, value: string) => {
    setLocationData(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    onSave(locationData)
    onOpenChange(false)
    setLocationData(initialLocationData) // 폼 초기화
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[90vh]">
        <DrawerHeader>
          <DrawerTitle>새 수업 장소 생성</DrawerTitle>
          <DrawerDescription>이름은 수업명에, 그 외 정보는 수강신청 페이지에 표시됩니다.</DrawerDescription>
        </DrawerHeader>
        <div className="p-4 overflow-y-auto pb-32">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">
                이름
              </label>
              <Input
                id="name"
                value={locationData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="w-full"
                placeholder="예: 고려대학교"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="city">
                도시
              </label>
              <Input
                id="city"
                value={locationData.city}
                onChange={(e) => handleChange('city', e.target.value)}
                className="w-full"
                placeholder="예: 서울특별시"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="district">
                구/군
              </label>
              <Input
                id="district"
                value={locationData.district}
                onChange={(e) => handleChange('district', e.target.value)}
                className="w-full"
                placeholder="예: 성북구"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="address">
                주소
              </label>
              <Input
                id="address"
                value={locationData.address}
                onChange={(e) => handleChange('address', e.target.value)}
                className="w-full"
                placeholder="예: 안암로 145"
              />
            </div>
          </div>
        </div>
        <DrawerFooter className="absolute bottom-0 p-0 w-full bg-white">
          <Button onClick={handleSave} className="rounded-none py-8">
            생성
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
