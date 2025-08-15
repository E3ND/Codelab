"use server";

import { prisma } from "@/lib/prisma";
import { getUser } from "./user";
import { checkRole } from "@/lib/clerk";

type CompleteLessonPayload = {
    courseSlug: string;
    lessonId: string;
}

export const markLessonAsCompleted = async ({ lessonId, courseSlug }: CompleteLessonPayload) => {
    const { userId } = await getUser();

    const course = await prisma.course.findUnique({
        where: {
            slug: courseSlug
        }
    });

    if(!course) throw new Error("Course not found");

    const isAlreadyCompleted = await prisma.completedLesson.findFirst({
        where: {
            lessonId,
            userId,
        }
    });

    if(isAlreadyCompleted) return isAlreadyCompleted;

    const completedLesson = await prisma.completedLesson.create({
        data: {
            lessonId,
            userId,
            courseId: course.id
        }
    });

    return completedLesson;
}

export const unmarkLessonAsCompleted = async (lessonId: string) => {
    const { userId } = await getUser();

    const completedLesson = await prisma.completedLesson.findFirst({
        where: {
            lessonId,
            userId,
        }
    });

    if(!completedLesson) return;

    await prisma.completedLesson.delete({
        where: {
            id: completedLesson.id,
        }
    });
}

export const getCourseProgress = async (courseSlug: string) => {
    const { userId } = await getUser();

    const course = await prisma.course.findUnique({
        where: {
            slug: courseSlug
        },
        include: {
            modules: {
                select: {
                    lessons: {
                        select: {
                            id: true,
                        }
                    }
                }
            }
        }
    })

    if(!course) throw new Error("Course not found");

    const completedLesson = await prisma.completedLesson.findMany({
        where: {
            userId,
            courseId: course.id
        }
    })

    const totalLesson = course.modules.flatMap((mod) => mod.lessons).length;
    const completedLessonCount = completedLesson.length;
    const progress = Math.round((completedLessonCount / totalLesson) * 100);

    return { completedLesson, progress }
}

export const deleteComment = async (commentId: string) => {
    const { userId } = await getUser();

    const isAdmin = await checkRole("admin");

    const comment = await prisma.lessonComment.findUnique({
        where: {
            id: commentId
        }
    });

    if(!comment) {
        throw new Error("Comentário não encontrado");
    }

    if(!isAdmin && comment.userId !== userId) {
        throw new Error("Você não tem permissão para deletar este comentário");
    }

    await prisma.lessonComment.delete({
        where: {
            id: commentId
        }
    })
}