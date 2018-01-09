import { ApiError } from './ApiError';
import { ApiPageInfo } from './ApiPageInfo';

/**
 * API response design followed by https://google.github.io/styleguide/jsoncstyleguide.xml
 */
export class ApiResponse {
    public items?: any[];
    public pageInfo?: ApiPageInfo;
    public error?: ApiError;
}
