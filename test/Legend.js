import zora from "zora";
import {default as Legend} from "../src/Legend.js";

export default zora()
  .test("Legend", function *(assert) {

    yield cb => new Legend().render(cb);
    assert.ok(true, "function success");

  });
