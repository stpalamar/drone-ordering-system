import { Check, Clipboard, MessageSquareWarning } from 'lucide-react';

import { Loader } from '~/bundles/common/components/components.js';
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from '~/bundles/common/components/ui/alert.js';
import { Button } from '~/bundles/common/components/ui/button.js';
import { Input } from '~/bundles/common/components/ui/input.js';
import { useCallback, useState } from '~/bundles/common/hooks/hooks.js';
import { useCreateRegistrationUrlMutation } from '~/bundles/managers/managers-api.js';

const CreateRegistrationUrl: React.FC = () => {
    const [isCopied, setIsCopied] = useState(false);

    const [createRegistrationUrl, { isLoading, data }] =
        useCreateRegistrationUrlMutation();

    const handleGenerate = useCallback(() => {
        void createRegistrationUrl();
    }, [createRegistrationUrl]);

    const handleCopyToClipboard = useCallback(() => {
        if (!data) {
            return;
        }
        void navigator.clipboard.writeText(data.url);
        setIsCopied(true);
    }, [data, setIsCopied]);

    const getContent = (): React.ReactNode => {
        if (!data) {
            return (
                <Button
                    className="w-full"
                    variant="secondary"
                    onClick={handleGenerate}
                    disabled={isLoading}
                >
                    {isLoading ? <Loader /> : 'Generate Registration URL'}
                </Button>
            );
        }
        if (data) {
            return (
                <div className="flex space-x-2">
                    <Input value={data.url} readOnly />
                    <Button
                        className=""
                        variant="secondary"
                        onClick={handleCopyToClipboard}
                    >
                        {isCopied ? (
                            <>
                                Copied
                                <Check className="ml-2 h-4 w-4" />
                            </>
                        ) : (
                            <>
                                Copy URL
                                <Clipboard className="ml-2 h-4 w-4" />
                            </>
                        )}
                    </Button>
                </div>
            );
        }
    };

    return (
        <div className="mt-4">
            {getContent()}
            <Alert className="mt-4">
                <MessageSquareWarning className="h-4 w-4" />
                <AlertTitle>Pay attention!</AlertTitle>
                <AlertDescription>
                    This URL is unique and can be used only once. After the
                    registration is completed, the URL will be disabled.
                </AlertDescription>
            </Alert>
        </div>
    );
};

export { CreateRegistrationUrl };
