import "./globals";
import { afterTest as afterAuthTest, spf } from "./spf.test";

describe("Api integration tests", () => {
    test("spf action", spf);
    afterAll(async () => {
        try {
            await afterAuthTest();
        } catch (e) {
            console.log(e);
        }
    });
});
