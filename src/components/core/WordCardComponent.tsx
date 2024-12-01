import { Volume2 } from 'lucide-react';

export default function WordCardComponent() {
  return (
    <div>
        
      <div className="max-w-md mx-auto bg-white rounded-xl p-5 border border-customGray 
      shadow-lg overflow-hidden">
        
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold text-gray-">{"Word"}</h1>
            <p className="text-sm text-gray-500">{"Definition"}</p>
        </div>
        
      </div>
    </div>
  );
}
