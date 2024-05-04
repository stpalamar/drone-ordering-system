import 'react-advanced-cropper/dist/style.css';

import { type CropperRef } from 'react-advanced-cropper';
import { Cropper } from 'react-advanced-cropper';

import { aspectRatio } from '~/bundles/common/constants/constants.js';

type Properties = {
    src: string | null;
    cropperReference: React.RefObject<CropperRef>;
};

const ImageCropper: React.FC<Properties> = ({ src, cropperReference }) => {
    return (
        <Cropper
            src={src}
            ref={cropperReference}
            className={'cropper'}
            stencilProps={{
                resizable: true,
                aspectRatio: aspectRatio,
                grid: true,
            }}
        />
    );
};

export { ImageCropper };
