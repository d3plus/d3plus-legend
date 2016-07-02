import {test} from "tape";
import {default as legend} from "../src/legend.js";

test("legend", (assert) => {

  legend()
    (() => {

      assert.true(true, "function success");
      assert.end();

    });

});
