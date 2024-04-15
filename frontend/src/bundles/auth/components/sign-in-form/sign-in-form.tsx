import { yupResolver } from '@hookform/resolvers/yup';
import { type InferType } from 'yup';

import { Link, Loader } from '~/bundles/common/components/components.js';
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
import { AppRoute } from '~/bundles/common/enums/enums.js';
import { useAppForm, useCallback } from '~/bundles/common/hooks/hooks.js';
import {
    type UserSignInRequestDto,
    userSignInValidationSchema,
} from '~/bundles/users/users.js';

type Properties = {
    onSubmit: (payload: UserSignInRequestDto) => void;
    isLoading: boolean;
};

const SignInForm: React.FC<Properties> = ({ onSubmit, isLoading }) => {
    const form = useAppForm<InferType<typeof userSignInValidationSchema>>({
        resolver: yupResolver(userSignInValidationSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const handleSubmit = useCallback(
        (event_: React.BaseSyntheticEvent): void => {
            void form.handleSubmit(onSubmit)(event_);
        },
        [onSubmit, form],
    );

    return (
        <Form {...form}>
            <form onSubmit={handleSubmit} className="space-y-8">
                <Card className="w-full max-w-sm">
                    <CardHeader>
                        <CardTitle className="text-2xl">Login</CardTitle>
                        <CardDescription>
                            Enter your email below to login to your account.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <div className="grid gap-2">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter your email address"
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
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                placeholder="Enter your password"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <div className="flex flex-col w-full">
                            <Button type="submit" className="w-full">
                                {isLoading ? <Loader /> : 'Sign in'}
                            </Button>
                            <div className="mt-4 text-center text-sm">
                                Don&apos;t have an account?{' '}
                                <Link
                                    to={AppRoute.SIGN_UP}
                                    className="underline"
                                >
                                    Sign up
                                </Link>
                            </div>
                        </div>
                    </CardFooter>
                </Card>
            </form>
        </Form>
    );
};

export { SignInForm };
