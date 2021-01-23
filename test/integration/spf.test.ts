import chai                   from "chai";
import fetch, { RequestInit } from "node-fetch";

export const spf = async () => {
    const mockReq: RequestInit[] = [{
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            domains: [
                "fb.me",
                "google.com",
            ]
        }),
    }];

    for await (const reqBody of mockReq) {
        await spfTest(reqBody);
    }
};
const spfTest = async (reqBody) => {
    const response = await fetch("http://127.0.0.1:5001/api/spf/check", reqBody);

    const body = await response.json();

    await chai.expect(body.success, JSON.stringify(body.error)).is.true;
    await chai.expect(body.result).is.not.empty;
    await chai.expect(body.result).to.be.a("array");
};

export const afterTest = async () => {

};
