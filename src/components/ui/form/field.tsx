"use client";

import { ReactNode } from "react";
import { Control, ControllerFieldState, ControllerRenderProps } from "react-hook-form";
import {
    FormField as FormFieldPrimitives,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage
} from "./primitives"
import { Input } from "../input";

export type FormFieldProps = {
    name: string;
    label?: string;
    required?: boolean;
    className?: string;
    control?: Control<any, any>;
    children?: (params: {
        field: ControllerRenderProps<any, any>;
        fieldState: ControllerFieldState;
    }) => ReactNode;
}

export const FormField = ({
    name,
    children,
    className,
    control,
    label,
    ...props
}: FormFieldProps) => {
    return (
        <FormFieldPrimitives
            control={control}
            name={name}
            render={({ field, fieldState }) => (
                <FormItem className={className}>
                    {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
                    <FormControl>
                        {children ? (
                            children({ field, fieldState })
                        ): (
                            <Input {...field} {...props} id={name} />
                        )}
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}