import { ApiResponse, ApiPageInfo } from '../../core/index';

export class BaseController {

    public success(): ApiResponse {
        return this.single({
            success : true,
        });
    }

    public array(result: any[], pagination?: ApiPageInfo): ApiResponse {
        return {
            items: result,
            pageInfo: pagination,
        } as ApiResponse;
    }

    public single(result: any): ApiResponse {
        return result as ApiResponse;
    }
}
