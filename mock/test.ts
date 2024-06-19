import { MockMethod } from "vite-plugin-mock";
import Mock from "mockjs";

export default [
  {
    url: "/location/tag/staticCount",
    method: "get",
    response: () => {
      return {
        code: 200,
        msg: "SUCCESS",
        data: Mock.mock({
          "total|10-6000": 10,
          "online|10-6000": 10,
          "offline|10-6000": 10,
          "disable|10-6000": 10
        }),
        success: true
      };
    }
  }
] as MockMethod[];
