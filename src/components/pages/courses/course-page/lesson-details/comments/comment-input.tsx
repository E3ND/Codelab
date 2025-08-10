"use client"

import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@clerk/nextjs"
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { i18n$1 } from "@vidstack/react/types/vidstack-react.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createLessonComment } from "@/actions/course.comments";
import { queryKeys } from "@/constants/query-keys";
import { useParams } from "next/navigation";

const formSchema = z.object({
    content: z
        .string()
        .min(1, { message: "Comentário é obrigatório" })
        .max(500, { message: "COmentário ddeve ter no máximo 500 caracteres" }),
});

type FormData = z.infer<typeof formSchema>;

export const CommentInput = () => {
    const params = useParams();
    const { user } = useUser();
    const queryClient = useQueryClient();

    const { control, handleSubmit } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            content: "",
        }
    });

    const { mutate: createComment, isPending } = useMutation({
        mutationFn: createLessonComment,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.lessonComments(lessonId),
            })
        }
    })

    const onSubmit = (data: FormData) => {
        console.log(data);
    };

    return (
        <form className="flex gap-6" onSubmit={handleSubmit(onSubmit)}>
            <Avatar src={user?.imageUrl} fallback={user?.fullName} />

            <Controller 
                control={control}
                name="content"
                render={({ field }) => (
                     <Textarea { ...field } placeholder="Deixe seu comentário" className="min-h-[100px]" />
                )}
            />

            <Button type="submit">Comentar</Button>
        </form>
    )
}