import Tabular from '@/component/tabular';
import { ProcessorType } from '@/type/processor';
import { Processor, ProcessorProps } from '@carry0987/pipeline';

interface PaginationLimitProps extends ProcessorProps {
    page: number;
    limit: number;
}

class PaginationLimit extends Processor<Tabular, ProcessorType, PaginationLimitProps> {
    protected validateProps(): void {
        if (isNaN(Number(this.props.limit)) || isNaN(Number(this.props.page))) {
            throw Error('Invalid parameters passed');
        }
    }

    public get type(): ProcessorType {
        return ProcessorType.Limit;
    }

    protected async _process(tabular: Tabular): Promise<Tabular> {
        const pageNumber = this.props.page;
        const pageSize = this.props.limit;
        const totalNumber = tabular.data.length;
        const start = pageSize * (pageNumber - 1) + 1;
        const end = Math.min(pageNumber * pageSize, totalNumber);

        return new Tabular(tabular.data.slice(start - 1, end));
    }
}

export default PaginationLimit;
