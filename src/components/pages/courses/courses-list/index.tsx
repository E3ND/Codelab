import { getCourses } from "@/actions/courses";

type CoursesListProps = {
    query: string;
    tags: string[] | string;
};

export const CoursesList = async({ query, tags }: CoursesListProps) => {
    const courses = await getCourses({ query, tags });

    return (
        <section>
            <p>Test</p>
        </section>
    )
}