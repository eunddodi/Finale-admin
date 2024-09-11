import React, { useEffect, useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Drawer, DrawerContent, DrawerHeader, DrawerFooter, DrawerTitle } from '@/components/ui/drawer'
import { Input } from "@/components/ui/input"
import { CreateDTO } from '@/api/lesson/types'
import { useLessonDetail } from '@/api/lesson'
import LocationSelect from '@/app/components/LocationSelect'
import { toast } from 'react-toastify'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (lessonData: CreateDTO) => void
  lessonId?: number // Optional: if provided, it's an update operation
}

const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토']

const initialLessonData: CreateDTO = {
  days: 0,
  locationName: '',
  maxStudents: 1,
  cost: '',
  lessonDates: [{ date: '', startTime: '', endTime: '' }],
}

export default function LessonBottomSheet({ open, onOpenChange, lessonId, onSave }: Props) {
  const [lessonData, setLessonData] = useState<CreateDTO>(initialLessonData)
  const { data: lesson } = useLessonDetail(lessonId)

  useEffect(() => {
    if (!lessonId) {
      setLessonData(initialLessonData)
      return
    }
    if (lessonId && lesson) {
      setLessonData({ days: lesson.day, locationName: lesson.locationName, maxStudents: lesson.maxStudents, cost: lesson.cost, lessonDates: lesson.lessonDates })
    }
  }, [lesson, lessonId])

  const handleChange = (name: keyof CreateDTO, value: any) => {
    setLessonData(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    if (lessonData.lessonDates.length === 0 || lessonData.lessonDates.some(date => date.date === '' || date.startTime === '' || date.endTime === '') || lessonData.locationName === '' || isNaN(parseInt(lessonData.cost))) {
      toast.error('입력값을 확인해주세요.')
      return
    }
    onSave(lessonData)
    onOpenChange(false)
    if (!lessonId) setLessonData(initialLessonData)
  }

  if (lessonId && !lesson) return null

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[90vh]">
        <DrawerHeader>
          <DrawerTitle>{lessonId ? '레슨 정보 수정' : '새 레슨 생성'}</DrawerTitle>
        </DrawerHeader>
        <div className="p-4 overflow-y-auto pb-32">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="day">
                요일
              </label>
              <Select onValueChange={(value) => handleChange('days', parseInt(value))} value={lessonData.days.toString()}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="요일 선택" />
                </SelectTrigger>
                <SelectContent>
                  {daysOfWeek.map((day, index) => (
                    <SelectItem key={index} value={index.toString()}>{day}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="locationName">
                장소
              </label>
              <LocationSelect
                selectedLocation={lessonData.locationName}
                onChange={(location: string) => handleChange('locationName', location)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="maxStudents">
                최대 학생 수
              </label>
              <Input
                type="number"
                id="maxStudents"
                value={lessonData.maxStudents}
                onChange={(e) => handleChange('maxStudents', parseInt(e.target.value))}
                className="w-full"
                min="1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="cost">
                수강료
              </label>
              <Input
                id="cost"
                value={lessonData.cost}
                onChange={(e) => handleChange('cost', e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                레슨 날짜
              </label>
              <div className="space-y-2">
                {lessonData.lessonDates.map((lessonDate, index) => (
                  <div key={index} className="flex space-x-2">
                    <Input
                      type="date"
                      value={lessonDate.date}
                      onChange={(e) => {
                        const newDates = [...lessonData.lessonDates]
                        newDates[index] = { ...newDates[index], date: e.target.value }
                        handleChange('lessonDates', newDates)
                      }}
                    />
                    <Input
                      type="time"
                      value={lessonDate.startTime}
                      onChange={(e) => {
                        const newDates = [...lessonData.lessonDates]
                        newDates[index] = { ...newDates[index], startTime: e.target.value }
                        handleChange('lessonDates', newDates)
                      }}
                    />
                    <Input
                      type="time"
                      value={lessonDate.endTime}
                      onChange={(e) => {
                        const newDates = [...lessonData.lessonDates]
                        newDates[index] = { ...newDates[index], endTime: e.target.value }
                        handleChange('lessonDates', newDates)
                      }}
                    />
                  </div>
                ))}
                <Button onClick={() => handleChange('lessonDates', [...lessonData.lessonDates, { date: '', startTime: '', endTime: '' }])}>
                  날짜 추가
                </Button>
              </div>
            </div>
          </div>
        </div>
        <DrawerFooter className="absolute bottom-0 p-0 w-full bg-white">
          <Button onClick={handleSave} className="rounded-none py-8">
            {lessonId ? '수정' : '생성'}
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
