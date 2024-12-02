interface StoryCard {
    story: string;
}

export default function StoryCard(story:StoryCard) {
    const currentDate = new Date().toLocaleDateString(); // Get current date

    return (
        <div className="mx-auto max-w-5xl p-5  h-screen
        bg-gradient-to-r from-orange-50 via-amber-50 to-amber-20 
        shadow-lg rounded-lg">
            <div className="flex justify-end">
            <p className="text-lg text-gray-500 mt-4 ">
                Date: {currentDate}
            </p>
            </div>

            <p className="text-lg text-gray-700 mt-2">{story.story}</p>
            {/* Display current date */}
            
        </div>
    );
}
