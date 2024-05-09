import { CalendarIcon } from 'lucide-react';

import { Loader } from '~/bundles/common/components/components.js';
import { Button } from '~/bundles/common/components/ui/button.js';
import { Calendar } from '~/bundles/common/components/ui/calendar.js';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '~/bundles/common/components/ui/card.js';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '~/bundles/common/components/ui/form.js';
import { Input } from '~/bundles/common/components/ui/input.js';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '~/bundles/common/components/ui/popover.js';
import {
    formatDate,
    getISODate,
    zodResolver,
} from '~/bundles/common/helpers/helpers.js';
import { useAppForm, useCallback } from '~/bundles/common/hooks/hooks.js';
import { cn } from '~/bundles/common/lib/utils.js';
import { type UserDetailsDto } from '~/bundles/users/types/types.js';
import { userDetailsValidationSchema } from '~/bundles/users/validation-schemas/validation-schemas.js';

import { DEFAULT_USER_DETAILS_PAYLOAD } from './constants/constants.js';

type Properties = {
    onSubmit: (data: UserDetailsDto) => void;
    isLoading: boolean;
};

const ConfirmEmailForm: React.FC<Properties> = ({ onSubmit, isLoading }) => {
    const form = useAppForm<UserDetailsDto>({
        resolver: zodResolver(userDetailsValidationSchema),
        defaultValues: DEFAULT_USER_DETAILS_PAYLOAD,
    });

    const handleSubmit = useCallback(
        (event_: React.BaseSyntheticEvent): void => {
            void form.handleSubmit(onSubmit)(event_);
        },
        [onSubmit, form],
    );

    return (
        <Form {...form}>
            <form onSubmit={handleSubmit}>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">
                            Confirm Email
                        </CardTitle>
                        <CardDescription>
                            Fill out your details to complete registration.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="firstName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>First name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter your first name"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="lastName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Last name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter your last name"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter your phone"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="dateOfBirth"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Date of birth</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={'outline'}
                                                    className={cn(
                                                        'pl-3 text-left font-normal',
                                                        !field.value &&
                                                            'text-muted-foreground',
                                                    )}
                                                >
                                                    {field.value ? (
                                                        formatDate(
                                                            new Date(
                                                                field.value,
                                                            ),
                                                        )
                                                    ) : (
                                                        <span>Pick a date</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent
                                            className="w-auto p-0"
                                            align="start"
                                        >
                                            <Calendar
                                                mode="single"
                                                selected={new Date(field.value)}
                                                onSelect={(day) => {
                                                    if (!day) {
                                                        return;
                                                    }
                                                    return form.setValue(
                                                        'dateOfBirth',
                                                        getISODate(day),
                                                    );
                                                }}
                                                disabled={(date: Date) =>
                                                    date > new Date() ||
                                                    date <
                                                        new Date('1900-01-01')
                                                }
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                    <CardFooter>
                        <div className="flex flex-col w-full">
                            <Button
                                type="submit"
                                className="w-full"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <Loader variant="secondary" />
                                ) : (
                                    'Complete registration'
                                )}
                            </Button>
                        </div>
                    </CardFooter>
                </Card>
            </form>
        </Form>
    );
};

export { ConfirmEmailForm };
