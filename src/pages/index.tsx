import clsx from 'clsx';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Install from '@site/src/components/Install';
import Heading from '@theme/Heading';
import { faker } from '@faker-js/faker';

// Import paginator styles
import '@carry0987/paginator/theme/paginator.min.css';
import styles from './index.module.css';

const generateData = (): string[] => {
    const limit = 15;
    const data = [];

    for (let i = 0; i < limit; i++) {
        const country = faker.location.country();
        const job = faker.person.jobArea();

        data.push([
            faker.person.firstName(),
            job.length > 9 ? `${job.slice(0, 9)}...` : `${job}`,
            country.length > 9 ? `${country.slice(0, 9)}...` : `${country}`
        ]);
    }

    return data;
};

const HomepageHeader = () => {
    const { siteConfig } = useDocusaurusContext();

    return (
        <header className={clsx('hero hero--dark', styles.heroBanner)}>
            <div className="container">
                <Heading as="h1" className="hero__title">
                    {siteConfig.title}
                </Heading>
                <p className="hero__subtitle">{siteConfig.tagline}</p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-center">
                    <div className="rounded-md shadow">
                        <a href="docs"
                            className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-gray-50 bg-green-500 hover:bg-green-600 hover:text-white focus:outline-none focus:shadow-outline transition duration-150 ease-in-out md:py-4 md:text-lg md:px-10">
                            Get started
                        </a>
                    </div>
                    <div className="mt-3 sm:mt-0 sm:ml-3">
                        <a href="docs/examples/hello-world"
                            className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-green-700 bg-green-100 hover:text-green-600 hover:bg-green-50 focus:outline-none focus:shadow-outline focus:border-emerald-300 transition duration-150 ease-in-out md:py-4 md:text-lg md:px-10">
                            Examples
                        </a>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default function Home(): JSX.Element {
    const { siteConfig } = useDocusaurusContext();

    return (
        <Layout>
            <Head>
                <title>{siteConfig.title} - {siteConfig.tagline}</title>
                <meta
                    property="og:title"
                    content={siteConfig.title}
                />
                <meta
                    property="og:description"
                    content={siteConfig.tagline}
                />
                <meta
                    name="description"
                    content={siteConfig.tagline}
                />
            </Head>
            <HomepageHeader />
            <main>
                <Install />
                <HomepageFeatures />
            </main>
        </Layout>
    );
}
