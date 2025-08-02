import * as Accordion from "@radix-ui/react-accordion";

type ModuleItemProps = {
    data: CourseModuleWithLessons;
}

export const ModuleItem = ({ data }: ModuleItemProps) => {
    return (
        <Accordion.Item value={data.id} className="border border-border rounded-lg group">
            <Accordion.Trigger className="flex items-center gap-4 p-4 w-full hover:bg-muted/50 transition-all">
                <div className="w-10 h-10 min-w-10 rounded-full flex items-center justify-center font-semibold bg-black/70 transition-all">
                    {data.order}
                </div>
            </Accordion.Trigger>
            <Accordion.Content>Content</Accordion.Content>
        </Accordion.Item>
    )
}