import { markLessonAsCompleted, unmarkLessonAsCompleted } from "@/actions/course-progress";
import { Tooltip } from "@/components/ui/tooltip";
import { queryKeys } from "@/constants/query-keys";
import { cn, formatDuration } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CircleCheckBig, CircleX, Video } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

type LessonItemProps = {
    lesson: CourseLesson & {
        completed: boolean;
    };
}

export const LessonItem = ({ lesson }: LessonItemProps) => {
    const queryClient = useQueryClient();
    
    const params = useParams();
    const courseSlug = params.slug as string;

    const lessonId = lesson.id;

    const currentLessonId = "asd";
    const completed = lesson.completed;

    const PrimaryIcon = completed ? CircleCheckBig : Video;
    const SecondaryIcon = completed ? CircleX : CircleCheckBig;

    const { mutate: handleCompleteLesson, isPending: isCompletingLessn } = useMutation({
        mutationFn: () => markLessonAsCompleted({ lessonId, courseSlug }),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.CourseProgress(courseSlug),
            })
        }
    })

    const { mutate: handleUnmarkLessonAsCompleted, isPending: isuUnmarkLessonAsCompleted } = useMutation({
        mutationFn: () => unmarkLessonAsCompleted(lessonId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.CourseProgress(courseSlug),
            })
        }
    })

    const isLoading = isCompletingLessn || isuUnmarkLessonAsCompleted;

    return (
        <Link 
            className={cn(
                "flex items-center gap-2 text-muted-foreground text-sm p-2 hover:bg-muted/50 transition-all rounded-md",
                lesson.id === currentLessonId && "text-white",
                completed && "text-primary"
            )}
            href={`/course/course-slug/module-id/lesson/${lesson.id}`}
        >
            <Tooltip content={completed ? "Marcar como não assistido" : "Marcar como assistido"}>
                <button 
                    type="button" 
                    className="w-4 min-w-4 h-4 relative group/lesson-button disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isLoading}
                    onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();

                        if(completed) {
                            handleUnmarkLessonAsCompleted();
                            return;
                        }

                        handleCompleteLesson();
                    }}
                >
                    <PrimaryIcon className="w-full h-full opacity-100 transition-all group-hover/lesson-button:opacity-0" />
                    <SecondaryIcon className="absolute inset-0 w-full h-full opacity-0 transition-all group-hover/lesson-button:opacity-100" />
                </button>                
            </Tooltip>

            <p className="line-clamp-1">{lesson.title}</p>
            <p className="text-xs text-muted-foreground ml-auto">
                {formatDuration(lesson.durationInMs, true)}
            </p>
        </Link>

    )
}