import landingBackground from '~/assets/img/landing-background.png';
import { Link } from '~/bundles/common/components/components.js';
import { buttonVariants } from '~/bundles/common/components/ui/button.js';
import { AppRoute } from '~/bundles/common/enums/enums.js';
import { useAppSelector } from '~/bundles/common/hooks/hooks.js';
import { cn } from '~/bundles/common/lib/utils.js';

const Landing: React.FC = () => {
    const { user } = useAppSelector(({ auth }) => auth);

    const styles = {
        bgGradient:
            'after:absolute after:size-full after:inset-0 after:translate-y-[4rem] after:z-[-10] after:rounded-full after:bg-gradient-to-b after:from-[#1116ae] after:to-[#585ce0] after:blur-[10rem] after:opacity-30',
    };

    return (
        <section className="container grid lg:grid-cols-2 place-items-center py-20 md:py-32 gap-10">
            <div className="text-center lg:text-start space-y-6">
                <main className="text-5xl md:text-6xl font-bold">
                    <h1 className="inline">
                        <span className="inline bg-gradient-to-r from-[#1116ae]  to-[#585ce0] text-transparent bg-clip-text">
                            Drone
                        </span>{' '}
                        ordering system
                    </h1>
                </main>

                <p className="text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
                    Conveniently order custom drones for your needs. Choose the
                    desired parameters, features and track the order
                </p>

                <div className="space-y-4 md:space-y-0 md:space-x-4">
                    <Link
                        to={user ? AppRoute.MY_ORDER_CREATE : AppRoute.SIGN_IN}
                        className={`w-full md:w-1/3 ${buttonVariants({ variant: 'default' })}`}
                    >
                        Create your drone now
                    </Link>
                </div>
            </div>
            <div className={cn('relative', styles.bgGradient)}>
                <img
                    src={landingBackground}
                    alt="Drone"
                    className="w-full h-full object-contain scale-x-[-1] grayscale"
                />
            </div>
        </section>
    );
};

export { Landing };
