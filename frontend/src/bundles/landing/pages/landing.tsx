import { Link } from '~/bundles/common/components/components.js';
import { buttonVariants } from '~/bundles/common/components/ui/button.js';
import { AppRoute } from '~/bundles/common/enums/enums.js';

const Landing: React.FC = () => {
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
                        to={AppRoute.MY_ORDER_CREATE}
                        className={`w-full md:w-1/3 ${buttonVariants({ variant: 'default' })}`}
                    >
                        Create your drone now
                    </Link>
                </div>
            </div>
        </section>
    );
};

export { Landing };
