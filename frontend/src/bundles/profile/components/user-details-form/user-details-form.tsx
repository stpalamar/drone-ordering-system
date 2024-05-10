import { CalendarIcon } from 'lucide-react';

import {
    DialogCropper,
    Loader,
} from '~/bundles/common/components/components.js';
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
    getFileForm,
    getFirstLetter,
    getISODate,
    zodResolver,
} from '~/bundles/common/helpers/helpers.js';
import {
    useAppForm,
    useCallback,
    useEffect,
    useRef,
    useState,
} from '~/bundles/common/hooks/hooks.js';
import { cn } from '~/bundles/common/lib/utils.js';
import { useUploadFileMutation } from '~/bundles/files/files-api.js';
import { type UserDetailsDto } from '~/bundles/users/types/types.js';
import { userDetailsValidationSchema } from '~/bundles/users/validation-schemas/validation-schemas.js';

import { AvatarPreviewField } from '../components.js';

type Properties = {
    onSubmit: (data: UserDetailsDto) => void;
    userDetails: UserDetailsDto;
    isLoading: boolean;
};

const UserDetailsForm: React.FC<Properties> = ({
    onSubmit,
    userDetails,
    isLoading,
}) => {
    const [cropOpen, setCropOpen] = useState(false);
    const [avatarToCrop, setAvatarToCrop] = useState<string | null>(null);
    const avatarInputReference = useRef<HTMLInputElement>(null);

    const [uploadFile] = useUploadFileMutation();

    const form = useAppForm<UserDetailsDto>({
        resolver: zodResolver(userDetailsValidationSchema),
        defaultValues: {
            ...userDetails,
            dateOfBirth: getISODate(new Date(userDetails.dateOfBirth)),
        },
    });

    const handleSubmit = useCallback(
        (event_: React.BaseSyntheticEvent): void => {
            void form.handleSubmit(onSubmit)(event_);
        },
        [onSubmit, form],
    );

    const handleUploadAvatar = useCallback((): void => {
        if (avatarInputReference.current) {
            avatarInputReference.current.click();
        }
    }, [avatarInputReference]);

    const handleAvatarInputChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const { files } = event.target;
            if (files?.[0]) {
                const blob = URL.createObjectURL(files[0]);
                setAvatarToCrop(blob);
                setCropOpen(true);
            }
            event.target.value = '';
        },
        [],
    );

    const handleCrop = useCallback(
        async (croppedImage: HTMLCanvasElement) => {
            const fileForm = await getFileForm(croppedImage);
            const image = await uploadFile(fileForm).unwrap();
            if (image) {
                const { id, key, url } = image;
                void form.setValue('avatar', { id, key, url });
            }
        },
        [form, uploadFile],
    );

    const handleDeleteAvatar = useCallback(() => {
        form.setValue('avatar', null);
    }, [form]);

    useEffect(() => {
        return () => {
            if (avatarToCrop) {
                URL.revokeObjectURL(avatarToCrop);
            }
        };
    }, [avatarToCrop]);

    const avatarFallback =
        getFirstLetter(userDetails.firstName) +
        getFirstLetter(userDetails.lastName);

    return (
        <Form {...form}>
            <form onSubmit={handleSubmit}>
                <Card>
                    <CardHeader>
                        <CardTitle>Personal information</CardTitle>
                        <CardDescription>
                            Update your personal details
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="">
                        <div className="mb-12 flex items-center gap-8">
                            <FormField
                                control={form.control}
                                name="avatar"
                                render={({ field }) => (
                                    <AvatarPreviewField
                                        field={field}
                                        onDeleteAvatar={handleDeleteAvatar}
                                        avatarFallback={avatarFallback}
                                    />
                                )}
                            />
                            <Input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                ref={avatarInputReference}
                                onChange={handleAvatarInputChange}
                            />
                            <Button
                                variant="outline"
                                type="button"
                                onClick={handleUploadAvatar}
                            >
                                Upload avatar
                            </Button>
                        </div>
                        <div className="grid gap-4 md:grid-cols-2">
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
                                    <FormItem className="flex flex-col justify-end">
                                        <FormLabel>Date of birth</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant="outline"
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
                                                            <span>
                                                                Pick a date
                                                            </span>
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
                                                    selected={
                                                        new Date(field.value)
                                                    }
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
                                                            new Date(
                                                                '1900-01-01',
                                                            )
                                                    }
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </CardContent>
                    <CardFooter className="border-t px-6 py-4">
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-24"
                        >
                            {isLoading ? (
                                <Loader variant="secondary" />
                            ) : (
                                'Save'
                            )}
                        </Button>
                    </CardFooter>
                </Card>
            </form>
            <DialogCropper
                open={cropOpen}
                onOpenChange={setCropOpen}
                src={avatarToCrop}
                onCrop={handleCrop}
                isCircle
            />
        </Form>
    );
};

export { UserDetailsForm };
