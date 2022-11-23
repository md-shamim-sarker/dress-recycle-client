import React from 'react';

const Loading = () => {
    return (
        <div className="rounded animate-pulse">
            <div className="space-y-4">
                <div className="w-full h-16 rounded-2xl dark:bg-gray-400"></div>
                <div className="w-full h-16 rounded-2xl dark:bg-gray-400"></div>
                <div className="w-full h-16 rounded-2xl dark:bg-gray-400"></div>
                <div className="w-full h-16 rounded-2xl dark:bg-gray-400"></div>
            </div>
        </div>
    );
};

export default Loading;