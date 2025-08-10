"use client";

import { markLessonAsCompleted } from "@/actions/course-progress";
import { queryKeys } from "@/constants/query-keys";
import { usePreferencesStore } from "@/stores/preferences";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { useParams, useRouter } from "next/navigation";

// Importar componenten sem SSR, pois quero usar uma propriedade do próprio navegador e com isso
// Preciso dizer para o next que esse componente não pode ser usado como server side
const VideoPlayer = dynamic(() => import("./video-player"), {ssr: false});

type LessonPlayerProps = {
    lesson: CourseLesson;
    nextLesson?: CourseLesson;
}

export const LessonPlayer = ({ lesson, nextLesson }: LessonPlayerProps) => {
    const params = useParams();
    const queryClient = useQueryClient();
    const router = useRouter();
    const autoplay = usePreferencesStore((state) => state.autoplay);
    const setExpandedModule = usePreferencesStore((state) => state.setExpandedModule);

    const courseSlug = params.slug as string;
    const videoId = lesson.videoId;

    const { mutateAsync: handleCompleteLesson } = useMutation({
        mutationFn: () => markLessonAsCompleted({ lessonId: lesson.id, courseSlug }),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.CourseProgress(courseSlug),
            })
        }
    })

    const handleMoveToNextLesson = async () => {
        await handleCompleteLesson();

        if(!autoplay || !nextLesson) return;

        if(nextLesson.moduleId !== lesson.moduleId) {
            setExpandedModule(nextLesson.moduleId);
        }

        router.push(`/courses/${courseSlug}/${nextLesson.moduleId}/lesson/${nextLesson.id}`);
    }

    return (
        <div key={videoId} className="overflow-hidden w-full aspect-video bg-black">
            <VideoPlayer videoId={lesson.videoId} autoplay={autoplay} onEnd={handleMoveToNextLesson} />
        </div>
    )
}