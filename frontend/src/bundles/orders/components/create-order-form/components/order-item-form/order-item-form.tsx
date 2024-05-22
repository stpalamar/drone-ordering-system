import { Trash } from 'lucide-react';

import placeholder from '~/assets/img/placeholder.svg';
import {
    ColorBox,
    DialogCropper,
    HexColorPicker,
} from '~/bundles/common/components/components.js';
import { Button } from '~/bundles/common/components/ui/button.js';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '~/bundles/common/components/ui/card.js';
import { Checkbox } from '~/bundles/common/components/ui/checkbox.js';
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '~/bundles/common/components/ui/form.js';
import { Input } from '~/bundles/common/components/ui/input.js';
import { Label } from '~/bundles/common/components/ui/label.js';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '~/bundles/common/components/ui/popover.js';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '~/bundles/common/components/ui/select.js';
import { Textarea } from '~/bundles/common/components/ui/textarea.js';
import { getFileForm } from '~/bundles/common/helpers/helpers.js';
import {
    useCallback,
    useEffect,
    useRef,
    useState,
    useWatch,
} from '~/bundles/common/hooks/hooks.js';
import { cn } from '~/bundles/common/lib/utils.js';
import {
    type UseFieldArrayRemove,
    type UseFormReturn,
} from '~/bundles/common/types/types.js';
import { useUploadFileMutation } from '~/bundles/files/files-api.js';
import { ComboboxField } from '~/bundles/orders/components/components.js';
import {
    getPurposeTypes,
    getWingsTypes,
} from '~/bundles/orders/components/create-order-form/helpers/helpers.js';
import { type CreateOrderPayload } from '~/bundles/orders/components/create-order-form/types/types.js';
import { type OrderRequestDto } from '~/bundles/orders/types/types.js';
import { type ProductTypesDto } from '~/bundles/products/types/types.js';

type Properties = {
    form: UseFormReturn<
        CreateOrderPayload,
        CreateOrderPayload,
        OrderRequestDto
    >;
    index: number;
    productTypes: ProductTypesDto | null;
    onRemove: UseFieldArrayRemove;
    disabled?: boolean;
};

const OrderItemForm: React.FC<Properties> = ({
    form,
    index,
    onRemove,
    productTypes,
    disabled = false,
}) => {
    const [cropperOpen, setCropperOpen] = useState(false);
    const imageInputReference = useRef<HTMLInputElement>(null);
    const [image, setImage] = useState<{
        src: string;
        type?: string;
    } | null>(null);

    const [uploadFile] = useUploadFileMutation();

    const purposeValue = useWatch({
        control: form.control,
        name: `items.${index}.purpose`,
    });

    const wingsTypeValue = useWatch({
        control: form.control,
        name: `items.${index}.wingsType`,
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
                void form.setValue(`items.${index}.coatingTexture`, {
                    id,
                    key,
                    url,
                });
            }
        },
        [form, index, uploadFile],
    );

    useEffect(() => {
        return () => {
            if (image && image.src) {
                URL.revokeObjectURL(image.src);
            }
        };
    }, [image]);

    const handleDeleteItem = useCallback(() => {
        onRemove(index);
    }, [onRemove, index]);

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <div className="flex flex-row justify-between items-center">
                        Drone #{index + 1}
                        {index > 0 && (
                            <Button
                                variant="secondary"
                                type="button"
                                onClick={handleDeleteItem}
                                className="gap-1"
                                disabled={disabled}
                            >
                                <Trash className="h-4 w-4" />
                                <span>Remove</span>
                            </Button>
                        )}
                    </div>
                </CardTitle>
                <CardDescription>Details of the item</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-4 lg:gap-8">
                    <div className="grid lg:grid-cols-4 gap-8 col-span-4">
                        <div className="grid gap-2">
                            <FormField
                                control={form.control}
                                name={`items.${index}.purpose`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Purpose</FormLabel>
                                        <ComboboxField
                                            field={field}
                                            form={form}
                                            label="Purpose"
                                            options={getPurposeTypes(
                                                wingsTypeValue,
                                                productTypes ?? null,
                                            )}
                                            disabled={disabled}
                                        />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="grid gap-2">
                            <FormField
                                control={form.control}
                                name={`items.${index}.wingsType`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Wings type</FormLabel>
                                        <ComboboxField
                                            field={field}
                                            form={form}
                                            label="Wings type"
                                            options={getWingsTypes(
                                                purposeValue,
                                                productTypes ?? null,
                                            )}
                                            disabled={disabled}
                                        />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="grid gap-2">
                            <FormField
                                control={form.control}
                                name={`items.${index}.powerSource`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Power source</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            disabled={disabled}
                                        >
                                            <FormControl>
                                                <SelectTrigger
                                                    id="powerSource"
                                                    aria-label="Select power source"
                                                >
                                                    <SelectValue placeholder="Select power source" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="battery">
                                                    Battery
                                                </SelectItem>
                                                <SelectItem value="gasoline">
                                                    Gasoline
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="grid gap-2">
                            <FormField
                                control={form.control}
                                name={`items.${index}.materialType`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Material type</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            disabled={disabled}
                                        >
                                            <FormControl>
                                                <SelectTrigger
                                                    id="materialType"
                                                    aria-label="Select material type"
                                                >
                                                    <SelectValue placeholder="Select material type" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="carbon">
                                                    Carbon
                                                </SelectItem>
                                                <SelectItem value="aluminum">
                                                    Aluminum
                                                </SelectItem>
                                                <SelectItem value="plastic">
                                                    Plastic
                                                </SelectItem>
                                                <SelectItem value="Titanium">
                                                    Titanium
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    <div className="grid gap-2 col-span-4">
                        <h2 className="text-xl font-bold">Dimensions</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <FormField
                                    control={form.control}
                                    name={`items.${index}.length`}
                                    disabled={disabled}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Length (cm)</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="text"
                                                    placeholder="Enter length"
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
                                    name={`items.${index}.width`}
                                    disabled={disabled}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Width (cm)</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="text"
                                                    placeholder="Enter width"
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
                    <div className="grid gap-4 col-span-4 md:grid-cols-3">
                        <div className="grid gap-2">
                            <FormField
                                control={form.control}
                                name={`items.${index}.payloadCapacity`}
                                disabled={disabled}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Payload capacity (kg)
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                placeholder="Enter payload capacity"
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
                                name={`items.${index}.flightDistance`}
                                disabled={disabled}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Flight distance (km)
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                placeholder="Enter flight distance"
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
                                name={`items.${index}.flightTime`}
                                disabled={disabled}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Flight time (minutes)
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                placeholder="Enter flight time"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    <div className="grid col-span-4">
                        <div className="mb-2 col-span-4">
                            <h2 className="text-xl font-bold">
                                Additional features
                            </h2>
                        </div>
                        <div className="grid gap-y-2 gap-x-4 md:grid-cols-3 lg:grid-cols-4">
                            <div className="grid gap-2">
                                <FormField
                                    control={form.control}
                                    name={`items.${index}.additionalEquipment.camera`}
                                    disabled={disabled}
                                    render={({ field }) => (
                                        <FormItem className="space-x-2">
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={
                                                        field.onChange
                                                    }
                                                    disabled={disabled}
                                                />
                                            </FormControl>
                                            <FormLabel>Camera</FormLabel>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="grid gap-2">
                                <FormField
                                    control={form.control}
                                    name={`items.${index}.additionalEquipment.thermographicCamera`}
                                    disabled={disabled}
                                    render={({ field }) => (
                                        <FormItem className="space-x-2">
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={
                                                        field.onChange
                                                    }
                                                    disabled={disabled}
                                                />
                                            </FormControl>
                                            <FormLabel>
                                                Thermographic camera
                                            </FormLabel>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="grid gap-2">
                                <FormField
                                    control={form.control}
                                    name={`items.${index}.additionalEquipment.nightVision`}
                                    disabled={disabled}
                                    render={({ field }) => (
                                        <FormItem className="space-x-2">
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={
                                                        field.onChange
                                                    }
                                                    disabled={disabled}
                                                />
                                            </FormControl>
                                            <FormLabel>Night vision</FormLabel>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="grid gap-2">
                                <FormField
                                    control={form.control}
                                    name={`items.${index}.additionalEquipment.parachute`}
                                    disabled={disabled}
                                    render={({ field }) => (
                                        <FormItem className="space-x-2">
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={
                                                        field.onChange
                                                    }
                                                    disabled={disabled}
                                                />
                                            </FormControl>
                                            <FormLabel>Parachute</FormLabel>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="grid gap-2">
                                <FormField
                                    control={form.control}
                                    name={`items.${index}.additionalEquipment.autopilot`}
                                    disabled={disabled}
                                    render={({ field }) => (
                                        <FormItem className="space-x-2">
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={
                                                        field.onChange
                                                    }
                                                    disabled={disabled}
                                                />
                                            </FormControl>
                                            <FormLabel>Autopilot</FormLabel>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="grid gap-2">
                                <FormField
                                    control={form.control}
                                    name={`items.${index}.additionalEquipment.targetIdentification`}
                                    render={({ field }) => (
                                        <FormItem className="space-x-2">
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={
                                                        field.onChange
                                                    }
                                                    disabled={disabled}
                                                />
                                            </FormControl>
                                            <FormLabel>
                                                AI target identification
                                            </FormLabel>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="grid gap-2">
                                <FormField
                                    control={form.control}
                                    name={`items.${index}.additionalEquipment.gps`}
                                    render={({ field }) => (
                                        <FormItem className="space-x-2">
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={
                                                        field.onChange
                                                    }
                                                    disabled={disabled}
                                                />
                                            </FormControl>
                                            <FormLabel>GPS</FormLabel>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-4 grid-cols-2">
                        <div className="grid gap-2">
                            <FormField
                                control={form.control}
                                name={`items.${index}.amount`}
                                disabled={disabled}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Amount</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                placeholder="Enter amount"
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
                                name={`items.${index}.color`}
                                disabled={disabled}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Color</FormLabel>
                                        <FormControl>
                                            <div className="relative w-10 h-10">
                                                <Popover>
                                                    <PopoverTrigger
                                                        disabled={disabled}
                                                        className={cn(
                                                            disabled &&
                                                                'cursor-not-allowed',
                                                        )}
                                                    >
                                                        <ColorBox
                                                            color={field.value}
                                                        />
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-min">
                                                        <HexColorPicker
                                                            color={field.value}
                                                            onChange={(
                                                                newColor: string,
                                                            ) =>
                                                                field.onChange(
                                                                    newColor,
                                                                )
                                                            }
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    <div className="grid gap-2 col-span-4 justify-items-start">
                        <div>
                            <FormField
                                control={form.control}
                                name={`items.${index}.coatingTexture`}
                                disabled={disabled}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Coating texture</FormLabel>
                                        <div className="size-40 rounded-md border border-gray-300">
                                            <img
                                                src={
                                                    field.value
                                                        ? field.value.url
                                                        : placeholder
                                                }
                                                alt="Coating texture"
                                            />
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div>
                            <Label>Upload image</Label>
                            <Input
                                placeholder="Upload image of coating texture"
                                type="file"
                                accept="image/*"
                                onChange={handleLoadImage}
                                ref={imageInputReference}
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
                    <div className="grid gap-2 col-span-4">
                        <FormField
                            control={form.control}
                            name={`items.${index}.additionalInfo`}
                            disabled={disabled}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Additional info</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Enter additional info"
                                            className="resize-none min-h-[6rem]"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export { OrderItemForm };
