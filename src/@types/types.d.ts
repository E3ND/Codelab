type Course = import("@prisma/client").Course;
type CourseModule = import("@prisma/client").CourseModule;
type CourseTag = import("@prisma/client").CourseTag;
type CourseLesson = import("@prisma/client").CourseLesson;
type CompletedLesson = import("@prisma/client").CompletedLesson;

type CourseWithTagsAndModules = Course & {
    tags: CourseTag[];
    modules: CourseModule[];
}

type CourseModuleWithLessons = CourseModule & {
    lessons: CourseLesson[];
}