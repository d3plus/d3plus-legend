import {test} from "tape";
import {default as ShapeLegend} from "../src/ShapeLegend.js";

test("ShapeLegend", assert => {

  new ShapeLegend()
    .render(() => {

      assert.true(true, "function success");
      assert.end();

    });

});
