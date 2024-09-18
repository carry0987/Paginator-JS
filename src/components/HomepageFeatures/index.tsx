import { Fragment } from 'react';

type FeatureItem = {
    title: string;
    imageUrl?: string;
    icon?: React.JSX.Element;
    description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
    {
        title: 'Easy to Use',
        icon: (
            <Fragment>
                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
            </Fragment>
        ),
        description: (
            <Fragment>
                The simplicity of Paginator.js API will help you to develop advanced
                JavaScript tables in a few simple and straightforward steps.
            </Fragment>
        ),
    },
    {
        title: 'Extensible',
        icon: (
            <Fragment>
                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
            </Fragment>
        ),
        description: (
            <Fragment>
                Paginator.js takes advantage of an advanced pipeline to process data.
                The pipeline is very easy to extend and improve.
            </Fragment>
        ),
    },
    {
        title: 'Free and open-source',
        icon: (
            <Fragment>
                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
            </Fragment>
        ),
        description: (
            <Fragment>
                Paginator.js is Free and open-source, published under MIT license.
            </Fragment>
        ),
    }
];

function Feature({ icon, title, description }: FeatureItem) {
    return (
        <div className="mt-10 lg:mt-0">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white">
                {icon}
            </div>
            <div className="mt-5">
                <h5 className="text-lg leading-6 font-medium text-gray-900">{title}</h5>
                <p className="mt-2 text-base leading-6 text-gray-500">
                    {description}
                </p>
            </div>
        </div>
    );
}

export default function HomepageFeatures(): JSX.Element {
    return (
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="py-12 bg-white">
                <div className="max-w-xl mx-auto px-4 sm:px-6 lg:max-w-screen-xl lg:px-8">
                    <div className="lg:grid lg:grid-cols-3 lg:gap-8">
                        {FeatureList.map((props, idx) => (
                            <Feature key={idx} {...props} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
