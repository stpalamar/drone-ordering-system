import { type CropperRef } from 'react-advanced-cropper';
import { toast } from 'sonner';

import { Loader } from '~/bundles/common/components/components.js';
import { Button } from '~/bundles/common/components/ui/button.js';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '~/bundles/common/components/ui/form.js';
import { Input } from '~/bundles/common/components/ui/input.js';
import { Label } from '~/bundles/common/components/ui/label.js';
import { zodResolver } from '~/bundles/common/helpers/helpers.js';
import {
    useAppForm,
    useCallback,
    useEffect,
    useRef,
    useState,
} from '~/bundles/common/hooks/hooks.js';
import { cn } from '~/bundles/common/lib/utils.js';
import { type ProductRequestDto } from '~/bundles/products/types/types.js';

import { ImageCropper } from './components/components.js';
import { DEFAULT_CREATE_PRODUCT_PAYLOAD } from './constants/constants.js';
import { type CreateProductPayload } from './types/create-product-payload.type.js';
import { createProductValidationSchema } from './validation-schemas/validation-schemas.js';

type Properties = {
    onSubmit: (
        payload: ProductRequestDto,
        image: HTMLCanvasElement,
    ) => Promise<void>;
    isLoading: boolean;
    className?: string;
};

const CreateProductForm: React.FC<Properties> = ({
    onSubmit,
    isLoading,
    className,
}) => {
    const imageInputReference = useRef<HTMLInputElement>(null);
    const cropperReference = useRef<CropperRef>(null);

    const [image, setImage] = useState<{
        src: string;
        type?: string;
    } | null>(null);

    const form = useAppForm<
        CreateProductPayload,
        CreateProductPayload,
        ProductRequestDto
    >({
        resolver: zodResolver(createProductValidationSchema),
        defaultValues: DEFAULT_CREATE_PRODUCT_PAYLOAD,
    });

    const handleLoadImage = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const { files } = event.target;

            if (files?.[0]) {
                const blob = URL.createObjectURL(files[0]);

                setImage({
                    src: blob,
                    type: files[0].type,
                });
            }

            event.target.value = '';
        },
        [],
    );

    useEffect(() => {
        return () => {
            if (image && image.src) {
                URL.revokeObjectURL(image.src);
            }
        };
    }, [image]);

    const handleSubmit = useCallback(
        (event_: React.BaseSyntheticEvent): void => {
            const canvas = cropperReference.current?.getCanvas();
            if (canvas) {
                void form.handleSubmit((payload) => {
                    void onSubmit(payload, canvas);
                })(event_);
            } else {
                event_.preventDefault();
                toast('Please upload image of product');
            }
        },
        [form, onSubmit],
    );

    return (
        <Form {...form}>
            <form
                className={cn('grid items-start gap-4', className)}
                onSubmit={handleSubmit}
            >
                <div className="grid gap-2 ">
                    <FormField
                        control={form.control}
                        name="purpose"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Purpose</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter purpose"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="grid gap-2">
                    <FormField
                        control={form.control}
                        name="wingsType"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Wings type</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter wings type"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="grid gap-2">
                    <FormField
                        control={form.control}
                        name="basePrice"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Base price</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter wings type"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="size-96">
                    <ImageCropper
                        src={image && image.src}
                        cropperReference={cropperReference}
                    />
                </div>
                <div className="grid gap-2">
                    <Label>Upload image of product</Label>
                    <Input
                        placeholder="Upload image of product"
                        type="file"
                        accept="image/*"
                        onChange={handleLoadImage}
                        ref={imageInputReference}
                    />
                </div>

                <Button type="submit" disabled={isLoading}>
                    {isLoading ? <Loader variant="secondary" /> : 'Create'}
                </Button>
            </form>
        </Form>
    );
};

export { CreateProductForm };
