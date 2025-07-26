"use client"

import { Badge } from "@/components/ui/badge";
import { CourseTag } from "@prisma/client"
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import qs from "query-string";

type TagItemProps = {
    tag: CourseTag;
}

export const TagItem = ({ tag }: TagItemProps) => {
    const router = useRouter();
    const pathName = usePathname();
    const searchParams = useSearchParams();
    const currentIds = searchParams.getAll("tags");

    const isSelected = currentIds.includes(tag.id);

    const onSelect = () => {
        const url = qs.stringifyUrl({
            url: pathName,
            query: {
                tags: isSelected ? currentIds.filter((id) => id !== tag.id) : [...currentIds, tag.id],
            }
        }, { skipEmptyString: true, skipNull: true, }
        )

        router.push(url);
    }

    return (
        <Badge variant={isSelected ? "default" : "outline"} className="whitespace-nowrap hover:border-primary !cursor-pointer" onClick={onSelect}>
            {tag.name}
        </Badge>
    )
}