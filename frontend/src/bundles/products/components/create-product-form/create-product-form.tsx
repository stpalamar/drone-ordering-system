import { ChevronLeft, CircleAlert } from 'lucide-react';

import placeholder from '~/assets/img/placeholder.svg';
import {
    DialogCropper,
    Loader,
} from '~/bundles/common/components/components.js';
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from '~/bundles/common/components/ui/alert.js';
import { Button } from '~/bundles/common/components/ui/button.js';
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
import { Label } from '~/bundles/common/components/ui/label.js';
import { Separator } from '~/bundles/common/components/ui/separator.js';
import { AppRoute } from '~/bundles/common/enums/enums.js';
import { getFileForm, zodResolver } from '~/bundles/common/helpers/helpers.js';
import {
    useAppForm,
    useCallback,
    useEffect,
    useNavigate,
    useRef,
    useState,
} from '~/bundles/common/hooks/hooks.js';
import { useUploadFileMutation } from '~/bundles/files/files-api.js';
import { type ProductRequestDto } from '~/bundles/products/types/types.js';
import { productValidationSchema } from '~/bundles/products/validation-schemas/validation-schemas.js';

import { DEFAULT_CREATE_PRODUCT_PAYLOAD } from './constants/constants.js';
import { type CreateProductPayload } from './types/create-product-payload.type.js';

type Properties = {
    onSubmit: (payload: ProductRequestDto) => Promise<void>;
    isLoading: boolean;
    canEdit?: boolean;
    defaultValues?: CreateProductPayload;
    disabled?: boolean;
    isEdit?: boolean;
};

const CreateProductForm: React.FC<Properties> = ({
    onSubmit,
    isLoading,
    defaultValues = DEFAULT_CREATE_PRODUCT_PAYLOAD,
    canEdit = true,
    disabled = false,
    isEdit = false,
}) => {
    const navigate = useNavigate();
    const [cropperOpen, setCropperOpen] = useState(false);
    const imageInputReference = useRef<HTMLInputElement>(null);
    const [image, setImage] = useState<{
        src: string;
        type?: string;
    } | null>(null);

    const [uploadFile] = useUploadFileMutation();

    const form = useAppForm<
        CreateProductPayload,
        CreateProductPayload,
        ProductRequestDto
    >({
        resolver: zodResolver(productValidationSchema),
        defaultValues: defaultValues,
    });

    const handleBack = useCallback(() => {
        navigate(AppRoute.PRODUCTS);
    }, [navigate]);

    const handleSubmit = useCallback(
        (event_: React.BaseSyntheticEvent): void => {
            void form.handleSubmit(onSubmit)(event_);
        },
        [form, onSubmit],
    );

    const handleLoadImage = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const { files } = event.target;

            if (files?.[0]) {
                const blob = URL.createObjectURL(files[0]);

                setImage({
                    src: blob,
                    type: files[0].type,
                });
                setCropperOpen(true);
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
                void form.setValue('image', {
                    id,
                    key,
                    url,
                });
            }
        },
        [form, uploadFile],
    );

    useEffect(() => {
        return () => {
            if (image && image.src) {
                URL.revokeObjectURL(image.src);
            }
        };
    }, [image]);

    const buttonLabel = isEdit ? 'Save changes' : 'Create product';

    return (
        <Form {...form}>
            <form className="grid items-start gap-4" onSubmit={handleSubmit}>
                <Card className="p-2">
                    <CardHeader>
                        <CardTitle>
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-6 w-6"
                                    onClick={handleBack}
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                    <span className="sr-only">Back</span>
                                </Button>
                                {isEdit ? 'Edit product' : 'Create product'}
                            </div>
                        </CardTitle>
                        <CardDescription>
                            Fill in the details below to{' '}
                            {isEdit
                                ? 'edit the product'
                                : 'create a new product'}
                        </CardDescription>
                        {!canEdit && (
                            <Alert variant="destructive">
                                <CircleAlert className="h-4 w-4" />
                                <AlertTitle>
                                    You do not have permission to edit products
                                </AlertTitle>
                                <AlertDescription>
                                    You do not have permission to edit products.
                                    Please contact your administrator for more
                                    information.
                                </AlertDescription>
                            </Alert>
                        )}
                        {disabled && isEdit && canEdit && (
                            <Alert>
                                <CircleAlert className="h-4 w-4" />
                                <AlertTitle>
                                    Product cannot be updated because it has
                                    sales
                                </AlertTitle>
                                <AlertDescription>
                                    If you need to make changes to this product,
                                    you should archive it and create a new one.
                                </AlertDescription>
                            </Alert>
                        )}
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 xl:grid-cols-3 gap-x-16 gap-y-12 items-start">
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <FormField
                                    control={form.control}
                                    name="purpose"
                                    disabled={disabled}
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
                                    disabled={disabled}
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
                                    name="image"
                                    disabled={disabled}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Image</FormLabel>
                                            <div className="size-72 rounded-md border border-gray-300">
                                                <img
                                                    src={
                                                        field.value
                                                            ? field.value.url
                                                            : placeholder
                                                    }
                                                    alt="Product"
                                                />
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div>
                                    <Label>Upload image</Label>
                                    <Input
                                        placeholder="Upload image of coating texture"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleLoadImage}
                                        ref={imageInputReference}
                                        className="w-min"
                                        disabled={disabled}
                                    />
                                </div>
                                <DialogCropper
                                    open={cropperOpen}
                                    onOpenChange={setCropperOpen}
                                    src={image && image.src}
                                    onCrop={handleCrop}
                                />
                            </div>
                        </div>
                        <div className="col-span-2">
                            <div className="grid gap-4">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end">
                                    <FormField
                                        control={form.control}
                                        name="price.basePrice"
                                        disabled={disabled}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Base price
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Enter base price"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="price.colorPrice"
                                        disabled={disabled}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Price for color
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Enter color price"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="price.coatingTexturePrice"
                                        disabled={disabled}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Price for coating texture
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Enter coating texture price"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <Separator className="my-4" />
                                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                                    Prices for one unit
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 items-end">
                                    <FormField
                                        control={form.control}
                                        name="price.lengthUnitPrice"
                                        disabled={disabled}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Price for 1 cm length
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Enter length price"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="price.widthUnitPrice"
                                        disabled={disabled}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Price for 1 cm width
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Enter width price"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="price.payloadCapacityUnitPrice"
                                        disabled={disabled}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Price for 1 kg payload
                                                    capacity
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Enter payload capacity price"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="price.flightDistanceUnitPrice"
                                        disabled={disabled}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Price for 1 km flight
                                                    distance
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Enter flight distance price"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="price.flightTimeUnitPrice"
                                        disabled={disabled}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Price for 1 minute flight
                                                    time
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Enter flight time price"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <Separator className="my-4" />
                                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                                    Prices for additional features
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 items-end">
                                    <FormField
                                        control={form.control}
                                        name="price.additionalEquipmentPrices.camera"
                                        disabled={disabled}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Price for camera equipment
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Enter camera price"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="price.additionalEquipmentPrices.thermographicCamera"
                                        disabled={disabled}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Price for thermographic
                                                    camera
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Enter thermographic camera price"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="price.additionalEquipmentPrices.nightVision"
                                        disabled={disabled}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Price for night vision
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Enter night vision price"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="price.additionalEquipmentPrices.parachute"
                                        disabled={disabled}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Price for parachute
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Enter parachute price"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="price.additionalEquipmentPrices.autopilot"
                                        disabled={disabled}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Price for autopilot
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Enter autopilot price"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="price.additionalEquipmentPrices.targetIdentification"
                                        disabled={disabled}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Price for target
                                                    identification
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Enter target identification price"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="price.additionalEquipmentPrices.gps"
                                        disabled={disabled}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Price for GPS
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Enter GPS price"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" disabled={isLoading || disabled}>
                            {isLoading ? <Loader /> : buttonLabel}
                        </Button>
                    </CardFooter>
                </Card>
            </form>
        </Form>
    );
};

export { CreateProductForm };
