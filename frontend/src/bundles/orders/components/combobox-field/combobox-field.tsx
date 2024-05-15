import { Check, ChevronsUpDown } from 'lucide-react';

import { Button } from '~/bundles/common/components/ui/button.js';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '~/bundles/common/components/ui/command.js';
import { FormControl } from '~/bundles/common/components/ui/form.js';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '~/bundles/common/components/ui/popover.js';
import { useState } from '~/bundles/common/hooks/hooks.js';
import { cn } from '~/bundles/common/lib/utils.js';
import {
    type ControllerRenderProps,
    type UseFormReturn,
} from '~/bundles/common/types/types.js';
import { type OrderRequestDto } from '~/bundles/orders/types/types.js';

import { type CreateOrderPayload } from '../create-order-form/types/types.js';

type Properties = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    field: ControllerRenderProps<CreateOrderPayload, any>;
    form: UseFormReturn<
        CreateOrderPayload,
        CreateOrderPayload,
        OrderRequestDto
    >;
    options: string[];
    label: string;
    disabled?: boolean;
};

const ComboboxField: React.FC<Properties> = ({
    field,
    form,
    options,
    label,
    disabled = false,
}) => {
    const [open, setOpen] = useState(false);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <FormControl>
                    <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                            'w-full justify-between font-normal flex',
                            !field.value && 'text-muted-foreground',
                        )}
                        disabled={disabled}
                    >
                        {field.value
                            ? options.find((option) => option === field.value)
                            : `Select ${label}`}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[12.5rem] p-0">
                <Command>
                    <CommandInput placeholder={`Search ${label}...`} />
                    <CommandEmpty>No {label} found.</CommandEmpty>
                    <CommandGroup>
                        <CommandList>
                            {options &&
                                options.map((option) => (
                                    <CommandItem
                                        value={option}
                                        key={option}
                                        onSelect={() => {
                                            form.setValue(
                                                field.name,
                                                option === field.value
                                                    ? ''
                                                    : option,
                                            );
                                            setOpen(false);
                                        }}
                                    >
                                        <Check
                                            className={cn(
                                                'mr-2 h-4 w-4',
                                                option === field.value
                                                    ? 'opacity-100'
                                                    : 'opacity-0',
                                            )}
                                        />
                                        {option}
                                    </CommandItem>
                                ))}
                        </CommandList>
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    );
};

export { ComboboxField };
