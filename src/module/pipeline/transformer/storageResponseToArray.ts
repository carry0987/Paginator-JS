import Header from '@/component/header';
import log from '@/module/utils/log';
import { ProcessorType } from '@/type/processor';
import { TCell, TData, TDataArray, TDataObject, TwoDArray } from '@/type/types';
import { ArrayResponse, StorageResponse } from '@/interface/response';
import { Processor, ProcessorProps } from '@carry0987/pipeline';

interface StorageResponseToArrayTransformerProps extends ProcessorProps {
    header: Header;
}

class StorageResponseToArrayTransformer extends Processor<
    ArrayResponse,
    ProcessorType,
    StorageResponseToArrayTransformerProps
> {
    public get type(): ProcessorType {
        return ProcessorType.Transformer;
    }

    private castData(data: TData): TwoDArray<TCell> {
        if (!data || !data.length) {
            return [];
        }

        if (!this.props.header || !this.props.header.columns) {
            return data as TwoDArray<TCell>;
        }

        const columns = Header.leafColumns(this.props.header.columns);

        // If it's a 2d array already
        if (data[0] instanceof Array) {
            return (data as TDataArray).map((row, i) => {
                let pad = 0;

                return columns.map((column, j) => {
                    // Default `data` is provided for this column
                    if (column.data !== undefined) {
                        pad++;

                        if (typeof column.data === 'function') {
                            return column.data(row);
                        } else {
                            return column.data;
                        }
                    } else if (column.formatter && typeof column.formatter === 'function') {
                        return column.formatter(
                            data[i],
                            row,
                            column,
                        );
                    }

                    return row[j - pad];
                });
            });
        }

        // If it's an array of objects (but not array of arrays, i.e JSON payload)
        if (typeof data[0] === 'object' && !(data[0] instanceof Array)) {
            return (data as TDataObject).map((row, i) =>
                columns.map((column, j) => {
                    if (column.data !== undefined) {
                        if (typeof column.data === 'function') {
                            return column.data(row);
                        } else {
                            return column.data;
                        }
                    } else if (column.formatter && typeof column.formatter === 'function') {
                        return column.formatter(
                            data[i],
                            row,
                            column,
                        );
                    } else if (column.id) {
                        return row[column.id];
                    } else {
                        log.error(
                            `Could not find the correct cell for column at position ${j}. Make sure either 'id' or 'selector' is defined for all columns.`,
                        );
                        return null;
                    }
                }),
            );
        }

        return [];
    }

    protected async _process(storageResponse: StorageResponse): Promise<ArrayResponse> {
        return {
            data: this.castData(storageResponse.data),
            total: storageResponse.total,
        };
    }
}

export default StorageResponseToArrayTransformer;
