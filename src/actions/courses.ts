"use server";

import { prisma } from "@/lib/prisma";
import { CourseStatus } from "@prisma/client";

type GetCoursesPayload = {
    query?: string;
    tags?: string[] | string;
}

export const getCourses = async ({ query, tags: rawTags }: GetCoursesPayload) => {
    const tags = !rawTags ? [] : Array.isArray(rawTags) ? rawTags : [rawTags];
    const hasTags = !!tags.length;
    const hasQuery = !!query?.trim();

    const course = await prisma.course.findMany({
        where: {
            status: CourseStatus.PUBLISHED,
            tags: hasTags ? {
                some: {
                    id: {
                        in: tags,
                    }
                }
            } : undefined,
            OR: hasQuery ? [
                { title: { search: query } }, { description: { search: query } }
            ] : undefined
        },
        include: {
            tags: true,
            modules: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    })

    return course;
}

export const getCourse = async (query: string, queryType: "slug" | "id" = "slug") => {
    const course = await prisma.course.findUnique({
        where: {
            slug: queryType === "slug" ? query : undefined,
            id: queryType === "id" ? query : undefined,
        },
        include: {
            modules: {
                include: {
                    lessons: {
                        orderBy: {
                            order: "asc",
                        }
                    }
                },
                orderBy: {
                    order: "asc",
                }
            },
            tags: true,
        }
    });

    return { course };
}