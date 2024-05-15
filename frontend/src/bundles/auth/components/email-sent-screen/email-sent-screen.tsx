import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '~/bundles/common/components/ui/card.js';

const EmailSentScreen: React.FC = () => {
    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle className="text-2xl">Confirm your email</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
                Link for account activation has been sent to your email. Check
                you inbox and follow the instructions to complete the process.
                <CardDescription>
                    If you haven&apos;t received the email, please check your
                    spam folder.
                </CardDescription>
            </CardContent>
        </Card>
    );
};

export { EmailSentScreen };
