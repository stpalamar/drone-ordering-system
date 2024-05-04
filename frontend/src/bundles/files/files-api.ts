import { ApiPath } from '~/bundles/common/enums/enums.js';
import { baseApi } from '~/framework/base-api/base-api.package.js';

import { type FileResponseDto } from './types/types.js';

const filesApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        uploadFile: build.mutation<FileResponseDto, FormData>({
            query: (payload) => ({
                url: `${ApiPath.FILES}/upload`,
                method: 'POST',
                body: payload,
            }),
        }),
    }),
});

const { useUploadFileMutation } = filesApi;

export { filesApi, useUploadFileMutation };
