import {test} from "tape";
import {default as Legend} from "../src/Legend.js";

test("Legend", assert => {

  new Legend()
    .render(() => {

      assert.true(true, "function success");
      assert.end();

    });

});
