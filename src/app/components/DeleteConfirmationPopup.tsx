import React from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

interface Props {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

const DeleteConfirmationPopup = ({ isOpen, onClose, onConfirm }: Props) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="bg-white rounded-lg shadow-xl p-4 sm:p-6 max-w-[90vw] sm:max-w-md w-full mx-auto">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-lg sm:text-xl font-semibold text-gray-900">
            정말 삭제하시겠습니까?
          </AlertDialogTitle>
          <AlertDialogDescription className="mt-2 text-sm sm:text-base text-gray-500">
            이 작업은 되돌릴 수 없습니다.<br />
            삭제 후에는 복구가 불가능합니다.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-2 flex flex-row justify-end gap-3">
          <AlertDialogCancel
            onClick={onClose}
            className="flex-1 mt-0 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors duration-200 font-medium text-sm sm:text-base"
          >
            취소
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="flex-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-200 font-medium text-sm sm:text-base"
          >
            삭제
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteConfirmationPopup