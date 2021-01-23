import dns  from "dns";
import util from "util";

const resolveTxt = util.promisify(dns.resolveTxt);

export default class SPF {
    private _domains: string[];

    get domains(): string[] {
        return this._domains;
    }

    set domains(value: string[]) {
        this._domains = value;
    }

    constructor(domain: string[]) {
        this.domains = domain;
    }

    public async check() {
        return Promise.all(this._domains.map(async value => {
            try {
                const vals = await resolveTxt(value);
                return {domain: value, status: vals.join(" ").includes("v=spf")};
            } catch (err) {
                if (/queryTxt ENOTFOUND/.test(err)) {
                    return {status: false, domain: value, reason: "spf not found"};
                } else if (/queryTxt ENODATA/.test(err)) {
                    return {status: false, domain: value, reason: "spf not valid"};
                } else {
                    return {status: false, domain: value, reason: err};
                }
            }
        }));
    }
}
