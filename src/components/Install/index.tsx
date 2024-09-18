import CodeBlock from '@theme/CodeBlock';

import style from './styles.module.css';

export default function Install(): JSX.Element {
    return (
        <div className="bg-white pt-8 pb-5 px-4 sm:px-6 lg:pt-12 lg:pb-14 lg:px-8">
            <div className="relative max-w-lg mx-auto lg:max-w-7xl">
                <div>
                    <h2 className="text-3xl leading-9 tracking-tight font-extrabold text-gray-900 sm:text-4xl sm:leading-10">
                        Install Paginator.js
                    </h2>
                    <p className="mt-3 text-xl leading-7 text-gray-500 sm:mt-4">
                        You can install Paginator.js in a few simple steps. Paginator.js
                        consists of two main files, the JavaScript part and the
                        CSS part which renders the elements nicely.
                    </p>
                </div>
                <div className="mt-12 grid gap-16 border-t-2 border-gray-100 pt-12 lg:grid-cols-2 lg:col-gap-5 lg:row-gap-12">
                    <div>
                        <h3 className="mt-4 text-xl leading-7 font-semibold text-gray-900">
                            <span className="inline-flex px-4 py-1 rounded-full text-sm leading-5 font-semibold tracking-wide uppercase bg-blue-100 text-blue-600">
                                1
                            </span>{' '}
                            Include the JavaScript and CSS
                        </h3>
                        <p className="mt-3 text-base leading-6 text-gray-500">
                            Paginator.js is available on{' '}
                            <a
                                rel="noreferrer"
                                href="https://www.npmjs.com/package/@carry0987/paginator"
                                target="_blank"
                            >
                                NPM
                            </a>{' '}
                            and most CDNs
                        </p>

                        <div className="mt-1 flex rounded-md shadow-sm">
                            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                                JavaScript
                            </span>
                            <input
                                readOnly={true}
                                className="form-input flex-1 block w-full rounded-none rounded-r-md transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                value="https://unpkg.com/@carry0987/paginator/dist/paginator.min.js"
                            />
                        </div>

                        <div className="mt-3 flex rounded-md shadow-sm">
                            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                                CSS
                            </span>
                            <input
                                readOnly={true}
                                className="form-input flex-1 block w-full rounded-none rounded-r-md transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                value="https://unpkg.com/@carry0987/paginator/dist/theme/paginator.min.css"
                            />
                        </div>
                    </div>
                    <div>
                        <h3 className="mt-4 text-xl leading-7 font-semibold text-gray-900">
                            <span className="inline-flex px-4 py-1 rounded-full text-sm leading-5 font-semibold tracking-wide uppercase bg-blue-100 text-blue-600">
                                2
                            </span>{' '}
                            Call the <code>render()</code> method
                        </h3>
                        <p className="mt-3 text-base leading-6 text-gray-500">
                            The <code>render()</code> method binds and renders a
                            Paginator.js instance
                        </p>

                        <div className={style.codeExample}>
                            <CodeBlock language={'ts'}>
                                {
`new Paginator({ 
    columns: ['Name', 'Email'],
    data: [
        ['John', 'john@example.com'],
        ['Mike', 'mike@gmail.com']
    ] 
}).render(document.getElementById('pages'));`}
                            </CodeBlock>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
