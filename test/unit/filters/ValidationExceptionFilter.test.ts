import * as MockExpressResponse from 'mock-express-response';
import { ValidationExceptionFilter } from '../../../src/api/filters/index';
import { LogMock } from '../lib/LogMock';
import { ValidationException } from '../../../src/api/exceptions/index';

describe('ValidationExceptionFilter', () => {

    let log: LogMock;
    let filter: ValidationExceptionFilter;
    let err: ValidationException;
    let res: MockExpressResponse;
    beforeEach(() => {
        log = new LogMock();
        filter = new ValidationExceptionFilter(log);
        res = new MockExpressResponse();
        err = new ValidationException('Exception test');
    });

    test('Validation exception must return status 400', () => {
        filter.catch(err, res);
        const json = res._getJSON();
        expect(json.error.code).toBe(400);
        expect(json.error.message).toBe('Input parameters are not valid!');
        expect(log.errorMock).toHaveBeenCalled();
    });

});
