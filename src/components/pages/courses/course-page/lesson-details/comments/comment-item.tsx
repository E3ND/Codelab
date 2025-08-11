"use client";

import { Avatar } from "@/components/ui/avatar";
import { cn, formatName } from "@/lib/utils";
import { Tooltip } from "@/components/ui/tooltip";
import { formatDistanceToNow } from "date-fns";
import { MessageSquareQuote, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

type CommentItemProps = {
    comment: LessonCOmmentWithUserAndReplies;
}

export const CommentItem = ({ comment }: CommentItemProps) => {
    const user = comment.user
    const authorName = formatName(user.firstName, user.lastName);
    const distanceToNew = formatDistanceToNow(comment.createdAt, {
        addSuffix: true
    })

    const [isReplaying, setIsReplying] = useState(false);

    const actions = [
        {
            label: "Deletar",
            icon: Trash,
            onclick: () => {},
            hidden: false,
            disabled: false,
        },
        {
            label: "Responder",
            icon: MessageSquareQuote,
            onclick: () => setIsReplying(true),
            hidden: false,
            disabled: false,
        },
    ]

    return (
        <div className={cn(
            "p-4 rounded-lg bg-card flex flex-col gap-3 text-sm"
        )}>
            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                    <Avatar src={user.imageUrl} fallback={authorName} />
                    <p>{authorName}</p>
                    <span className="text-xs text-muted-foreground">{distanceToNew}</span>
                </div>

                <div className="flex items-center gap-2">
                    {actions.map((action) => {
                        if(action.hidden) return null;

                        return (
                            <Tooltip content={action.label} key={`comment-${comment.id}-action-${action.label}`}>
                                <Button variant="outline" size="icon" onClick={action.onclick} disabled={action.disabled}>
                                    <action.icon />
                                </Button>
                            </Tooltip>
                        )
                    })}
                </div>

                <p className="text-muted-foreground">{comment.content}</p>

                {isReplaying && (
                    <CommentInput 
                        parentComentId={comment.id}
                        autoFocus
                        onCancel={() => setIsReplying(false)}
                        onSuccess={() => setIsReplying(false)}
                        className="bg-muted p-4 rounded-lg flex-col sm:flex-row"
                    />
                )}
            </div>
        </div>
    )
}