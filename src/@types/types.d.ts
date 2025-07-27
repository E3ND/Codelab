type Course = import("@prisma/client").Course;
type CourseModule = import("@prisma/client").CourseModule;
type CourseTag = import("@prisma/client").CourseTag;

type CourseWithTagsAndModules = Course & {
    tags: CourseTag[];
    modules: CourseModule[];
}