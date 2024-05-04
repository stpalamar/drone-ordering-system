import 'react-advanced-cropper/dist/style.css';

import {
    Cropper,
    type CropperRef,
    ImageRestriction,
} from 'react-advanced-cropper';

import { Button } from '~/bundles/common/components/ui/button.js';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '~/bundles/common/components/ui/dialog.js';
import { aspectRatio } from '~/bundles/common/constants/constants.js';
import { useCallback, useRef } from '~/bundles/common/hooks/hooks.js';

type Properties = {
    src: string | null;
    open: boolean;
    onOpenChange: (isOpen: boolean) => void;
    onCrop: (croppedImage: HTMLCanvasElement) => Promise<void>;
};

const DialogCropper: React.FC<Properties> = ({
    open,
    onOpenChange,
    src,
    onCrop,
}) => {
    const cropperReference = useRef<CropperRef>(null);

    const handleCrop = useCallback(() => {
        const croppedImage = cropperReference.current?.getCanvas();

        if (!croppedImage) {
            return;
        }

        void onCrop(croppedImage);
        onOpenChange(false);
    }, [onCrop, onOpenChange]);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Crop image</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    Crop the image to the desired size
                </DialogDescription>
                <Cropper
                    src={src}
                    ref={cropperReference}
                    imageRestriction={ImageRestriction.fillArea}
                    className={'cropper'}
                    stencilProps={{
                        resizable: true,
                        aspectRatio: aspectRatio,
                        grid: true,
                    }}
                />

                <DialogFooter className="justify-center">
                    <Button onClick={handleCrop}>Crop</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export { DialogCropper };
