"use client";

import dynamic from "next/dynamic";

// Importar componenten sem SSR, pois quero usar uma propriedade do próprio navegador e com isso
// Preciso dizer para o next que esse componente não pode ser usado como server side
const VideoPlayer = dynamic(() => import("./video-player"), {ssr: false});

type LessonPlayerProps = {
    lesson: CourseLesson;
}

export const LessonPlayer = ({ lesson }: LessonPlayerProps) => {
    return (
        <div className="overflow-hidden w-full aspect-video bg-black">
            <VideoPlayer videoId={lesson.videoId} autoplay={false} />
        </div>
    )
}