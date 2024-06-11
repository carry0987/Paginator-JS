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

    protected async _process(data: Tabular): Promise<Tabular> {
        const page = this.props.page;
        const start = page * this.props.limit;
        const end = (page + 1) * this.props.limit;

        return new Tabular(data.rows.slice(start, end));
    }
}

export default PaginationLimit;
