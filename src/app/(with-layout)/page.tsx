import { CoursesList } from "@/components/pages/courses/courses-list";
import { CourseTagsList } from "@/components/pages/courses/tags-list";

type CoursesPageProps = {
  searchParams: Promise<{
    query: string;
    tags: string | string[]
  }>
};

export default async function CoursesPage({ searchParams }: CoursesPageProps) {
  const { query, tags } = await searchParams;

  return (
    <div>
      <CourseTagsList />

      <CoursesList query={query} tags={tags} />
    </div>
  );
}
