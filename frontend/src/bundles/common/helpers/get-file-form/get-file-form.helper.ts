const getFileForm = (croppedImage: HTMLCanvasElement): Promise<FormData> => {
    return new Promise((resolve) => {
        croppedImage.toBlob((blob) => {
            if (blob) {
                const formData = new FormData();
                formData.append('file', blob);
                resolve(formData);
            }
        });
    });
};

export { getFileForm };
