import { FunctionComponent } from 'preact';
import '@/theme/index.scss';

const HelloWorld: FunctionComponent = () => {
    return (
        <div class={'helloWorld'}>
            <span>Hello World</span>
        </div>
    );
};

export default HelloWorld;
