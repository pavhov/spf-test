import { Context, Next } from "koa";

import { Post, Presenter } from "../../../../../lib/decorators/Koa";
import SPF                 from "../../../../task/SPF";

/**
 * @name ProductPresenter
 */
@Presenter({path: "/spf"})
export default class SPFPresenter {
    /**
     * @name stories
     * @private
     */
    private stories: {};

    /**
     * @name SPFPresenter
     */
    constructor() {
    }

    /**
     * @name "/check"
     * @param context
     * @param next
     */
    @Post()
    async "/check"(context: Context, next: Next) {
        if (!context.request.body?.domains?.length) {
            throw new Error("'domains' key es required on post body");
        }
        context.body = await (new SPF(context.request.body?.domains)).check();
    }
}
