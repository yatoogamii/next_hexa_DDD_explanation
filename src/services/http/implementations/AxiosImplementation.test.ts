import { AxiosImplementation } from "./AxiosImplementation";
import { startAPI, stopAPI } from "./mocks/APIMock";

beforeAll(async () => {
  await startAPI();
});

afterAll(async () => {
  await stopAPI();
});

describe("Axios Implementation", () => {
  test("get method success", async () => {
    const res = await AxiosImplementation()().get("http://localhost:6000/");

    expect(res).toEqual({ hello: "world" });
  });

  test("post method fail", async () => {
    expect.assertions(1);
    try {
      await AxiosImplementation()().post("http://localhost:6000/", {});
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});
