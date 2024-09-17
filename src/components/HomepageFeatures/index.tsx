import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
    title: string;
    description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
    {
        title: 'Modern and Lightweight',
        description: (
            <>
                Serapha is built with modern PHP 8 features and practices,
                offering a lightweight, modular architecture to streamline your
                development process.
            </>
        ),
    },
    {
        title: 'Easy Integration',
        description: (
            <>
                Integrated with Composer for easy dependency management and
                rapid development, Serapha allows you to leverage a wide range
                of libraries and tools effortlessly.
            </>
        ),
    },
    {
        title: 'Rich Feature Set',
        description: (
            <>
                Serapha includes robust features like a template engine, i18n
                support, RESTful API integration, and advanced ORM capabilities,
                making it suitable for diverse web development tasks.
            </>
        ),
    },
    {
        title: 'Dependency Injection',
        description: (
            <>
                Effortlessly manage your dependencies with Serapha's built-in
                Dependency Injection container, simplifying your controller and
                service management.
            </>
        ),
    },
    {
        title: 'Redis Support',
        description: (
            <>
                Use Serapha's built-in support for Redis to manage caching and
                other Redis-based features effortlessly, enhancing your
                application's performance and scalability.
            </>
        ),
    },
    {
        title: 'Database Migration',
        description: (
            <>
                Utilize <a href="https://github.com/cakephp/phinx">Phinx</a> for
                hassle-free database schema migrations, ensuring your databases
                stay up-to-date with versioned migrations.
            </>
        ),
    }
];

function Feature({ title, description, idx, chunkLength }: FeatureItem & { idx: number; chunkLength: number }) {
    const offsetClass = (chunkLength === 2 && idx === 0) ? 'col--offset-2' : '';

    return (
        <div className={clsx('col col--4', offsetClass)}>
            <div className="text--center padding-horiz--md">
                <Heading as="h3">{title}</Heading>
                <p>{description}</p>
            </div>
        </div>
    );
}

export default function HomepageFeatures(): JSX.Element {
    const chunkLength = 3;
    // Function to chunk the feature list into groups of three
    const chunkArray = (arr: FeatureItem[], size: number) => {
        const result: FeatureItem[][] = [];
        for (let i = 0; i < arr.length; i += size) {
            result.push(arr.slice(i, i + size));
        }

        return result;
    };

    const chunkedFeatures = chunkArray(FeatureList, chunkLength);

    return (
        <section className={styles.features}>
            <div className="container">
                {chunkedFeatures.map((chunk, rowIndex) => (
                    <div className="row margin-top--lg margin-bottom--lg" key={rowIndex}>
                        {chunk.map((props, idx) => (
                            <Feature key={idx} {...props} {...{ idx, chunkLength: chunk.length }} />
                        ))}
                    </div>
                ))}
            </div>
        </section>
    );
}
