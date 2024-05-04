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
import {
    type UseFieldArrayRemove,
    type UseFormReturn,
} from '~/bundles/common/types/types.js';
import { useUploadFileMutation } from '~/bundles/files/files-api.js';
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
};

const OrderItemForm: React.FC<Properties> = ({
    form,
    index,
    onRemove,
    productTypes,
}) => {
    const [cropperOpen, setCropperOpen] = useState(false);
    const [colorPickerOpen, setColorPickerOpen] = useState(false);
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

    const handleColorPicker = useCallback(() => {
        setColorPickerOpen(!colorPickerOpen);
    }, [colorPickerOpen]);

    const handleColorChange = useCallback(
        (color: string) => {
            form.setValue(`items.${index}.color`, color);
        },
        [form, index],
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
                        Position #{index + 1}
                        {index > 0 && (
                            <Button
                                variant="secondary"
                                type="button"
                                onClick={handleDeleteItem}
                                className="gap-1"
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
                <div className="grid gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-4">
                    <div className="grid gap-2">
                        <FormField
                            control={form.control}
                            name={`items.${index}.purpose`}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Purpose</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger
                                                id="purpose"
                                                aria-label="Select purpose"
                                            >
                                                <SelectValue placeholder="Select purpose" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {getPurposeTypes(
                                                wingsTypeValue,
                                                productTypes ?? null,
                                            ).map((item) => (
                                                <SelectItem
                                                    key={item}
                                                    value={item}
                                                >
                                                    {item}
                                                </SelectItem>
                                            ))}
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
                            name={`items.${index}.wingsType`}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Wings type</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger
                                                id="wingsType"
                                                aria-label="Select wings type"
                                            >
                                                <SelectValue placeholder="Select wings type" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {getWingsTypes(
                                                purposeValue,
                                                productTypes,
                                            ).map((item) => (
                                                <SelectItem
                                                    key={item}
                                                    value={item}
                                                >
                                                    {item}
                                                </SelectItem>
                                            ))}
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
                            name={`items.${index}.powerSource`}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Power source</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
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
                    <div className="grid gap-2 xl:col-span-4">
                        <h2 className="text-xl font-bold">Dimensions</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <FormField
                                    control={form.control}
                                    name={`items.${index}.length`}
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

                    <div className="grid gap-2">
                        <FormField
                            control={form.control}
                            name={`items.${index}.payloadCapacity`}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Payload capacity (kg)</FormLabel>
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
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Flight distance (km)</FormLabel>
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
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Flight time (minutes)</FormLabel>
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

                    <div className="grid col-span-4 xl:grid-cols-4">
                        <div className="mb-2 col-span-4">
                            <h2 className="text-xl font-bold">
                                Additional features
                            </h2>
                        </div>
                        <div className="grid gap-2">
                            <FormField
                                control={form.control}
                                name={`items.${index}.additionalEquipment.camera`}
                                render={({ field }) => (
                                    <FormItem className="space-x-2">
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
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
                                render={({ field }) => (
                                    <FormItem className="space-x-2">
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
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
                                render={({ field }) => (
                                    <FormItem className="space-x-2">
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
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
                                render={({ field }) => (
                                    <FormItem className="space-x-2">
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
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
                                render={({ field }) => (
                                    <FormItem className="space-x-2">
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
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
                                                onCheckedChange={field.onChange}
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
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        <FormLabel>GPS</FormLabel>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <FormField
                            control={form.control}
                            name={`items.${index}.amount`}
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
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Color</FormLabel>
                                    <FormControl>
                                        <div className="relative w-10 h-10">
                                            <ColorBox
                                                color={field.value}
                                                onClick={handleColorPicker}
                                            />
                                            {colorPickerOpen && (
                                                <HexColorPicker
                                                    className="absolute left-1/2 shadow-2xl"
                                                    color={field.value}
                                                    onChange={handleColorChange}
                                                />
                                            )}
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="grid gap-2 col-span-4 justify-items-start">
                        <div>
                            <FormField
                                control={form.control}
                                name={`items.${index}.coatingTexture`}
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
                        <div className="">
                            <Label>Upload image</Label>
                            <Input
                                placeholder="Upload image of product"
                                type="file"
                                accept="image/*"
                                onChange={handleLoadImage}
                                ref={imageInputReference}
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
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Additional info</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Enter additional info"
                                            className="resize-none"
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
