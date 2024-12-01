export default function StoryCard() {
    const currentDate = new Date().toLocaleDateString(); // Get current date

    return (
        <div className="mx-auto p-5 w-full h-screen
        bg-gradient-to-r from-orange-50 via-amber-50 to-amber-20 
        shadow-lg rounded-lg">
            <div className="flex justify-end">
            <p className="text-lg text-gray-500 mt-4 ">
                Date: {currentDate}
            </p>
            </div>
            <h1 className="text-2xl font-bold mt-4">Story Card</h1>
            <p className="text-lg text-gray-700 mt-2">Today's Story</p>
            {/* Display current date */}
            
        </div>
    );
}
