export const queryKeys = {
    CourseProgress: (courseSlug: string) => ["course-progress", courseSlug],
} as const;