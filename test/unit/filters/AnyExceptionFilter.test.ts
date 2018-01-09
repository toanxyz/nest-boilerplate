import * as MockExpressResponse from 'mock-express-response';
import { HttpException } from '@nestjs/common';
import { AnyExceptionFilter } from '../../../src/api/filters/index';
import { LogMock } from '../lib/LogMock';

describe('AnyExceptionFilter', () => {

    let log: LogMock;
    let filter: AnyExceptionFilter;
    let err: HttpException;
    let res: MockExpressResponse;
    beforeEach(() => {
        log = new LogMock();
        filter = new AnyExceptionFilter(log);
        res = new MockExpressResponse();
        err = new HttpException('Exception', 400);
    });

    test('Always return json with error instead of internal server error', () => {
        filter.catch(err, res);
        const json = res._getJSON();
        expect(json.error.code).toBe(500);
        expect(json.error.message).toBe('Internal Server Error');
        expect(log.errorMock).toHaveBeenCalled();
    });

});
