import { ProcessorType } from '@/type/processor';
import { StorageResponse } from '@/interface/storage';
import { OneDArray, TCell, TData, TDataArray, TDataObject, TwoDArray } from '@/type/types';
import { TColumn } from '@/interface/interfaces';
import logger from '@/module/utils/log';
import { Processor, ProcessorProps } from '@carry0987/pipeline';

export interface ArrayResponse {
    data: TwoDArray<TCell>;
    total: number;
}

interface StorageResponseToArrayTransformerProps extends ProcessorProps {}

class StorageResponseToArrayTransformer extends Processor<ArrayResponse, ProcessorType, StorageResponseToArrayTransformerProps> {
    public get type(): ProcessorType {
        return ProcessorType.Transformer;
    }

    private castData(data: TData): TwoDArray<TCell> {
        if (!data || !data.length) {
            return [];
        }

        const columns: OneDArray<TColumn> = [];

        // if it's a 2d array already
        if (data[0] instanceof Array) {
            return (data as TDataArray).map((row) => {
                let pad = 0;

                return columns.map((column, i) => {
                    // default `data` is provided for this column
                    if (column.data !== undefined) {
                        pad++;

                        if (typeof column.data === 'function') {
                            return column.data(row);
                        } else {
                            return column.data;
                        }
                    }

                    return row[i - pad];
                });
            });
        }

        // if it's an array of objects (but not array of arrays, i.e JSON payload)
        if (typeof data[0] === 'object' && !(data[0] instanceof Array)) {
            return (data as TDataObject).map((row) =>
                columns.map((column, i) => {
                    if (column.data !== undefined) {
                        if (typeof column.data === 'function') {
                            return column.data(row);
                        } else {
                            return column.data;
                        }
                    } else if (column.id) {
                        return row[column.id];
                    } else {
                        logger.error(`Could not find the correct cell for column at position ${i}. Make sure either 'id' or 'selector' is defined for all columns.`);
                        return null;
                    }
                })
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
