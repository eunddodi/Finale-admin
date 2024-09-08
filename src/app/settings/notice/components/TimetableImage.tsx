import { getTimetableImage } from "@/api/notice"
import { useSuspenseQuery } from "@tanstack/react-query"
import { useState } from "react"

const TimetableImage: React.FC<{ onFileSelect: (file: File) => void }> = ({ onFileSelect }) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { data: imageUrl } = useSuspenseQuery({ queryKey: ['timetableImage'], queryFn: getTimetableImage });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      onFileSelect(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };

  const renderImageContent = () => {
    if (previewUrl || imageUrl) {
      return (
        <div className="mt-4">
          <img
            src={previewUrl || imageUrl}
            alt="Timetable"
            className="rounded-lg shadow-md"
          />
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg bg-gray-50">
        <svg className="w-12 h-12 mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <p className="mb-2 text-sm text-gray-500">시간표 이미지가 없습니다</p>
        <p className="text-xs text-gray-400">이미지를 업로드하여 시간표를 추가해주세요</p>
      </div>
    );
  };

  return (
    <div className="mb-4">
      <label htmlFor="image" className="block mb-2 font-semibold">시간표 이미지</label>
      <div className="flex items-center justify-center w-full">
        <label htmlFor="image" className="flex flex-col items-center justify-center w-full cursor-pointer">
          {renderImageContent()}
          <input id="image" type="file" className="hidden" onChange={handleFileChange} />
        </label>
      </div>
      {(previewUrl || imageUrl) && (
        <p className="mt-2 text-sm text-gray-500 text-center">이미지를 변경하려면 클릭하세요</p>
      )}
    </div>
  );
};

export default TimetableImage;