import {test} from "tape";
import {default as shape} from "../src/shape.js";

test("shape", (assert) => {

  shape()
    (() => {

      assert.true(true, "function success");
      assert.end();

    });

});
