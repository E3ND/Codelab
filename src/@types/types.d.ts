type Course = import("@prisma/client").Course;
type CourseModule = import("@prisma/client").CourseModule;
type CourseTag = import("@prisma/client").CourseTag;
type CourseLesson = import("@prisma/client").CourseLesson;
type CompletedLesson = import("@prisma/client").CompletedLesson;
type LessonComment = import("@prisma/client").LessonComment;
type User = import("@prisma/client").User;

type CourseWithTagsAndModules = Course & {
    tags: CourseTag[];
    modules: CourseModule[];
}

type CourseModuleWithLessons = CourseModule & {
    lessons: CourseLesson[];
}

type CourseWithModulesAndLessons = Course & {
    modules: CourseModuleWithLessons[];
}

type LessonCOmmentWithUserAndReplies = LessonCOmment & {
    user: User;
    replies?: LessonCommentWithUserAndReplies[]
}