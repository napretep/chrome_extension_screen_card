"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var state_1 = require("../src/state");
var S = state_1.STATE;
test("NOGROUP_test", function () {
    var ST = S.TEMPFRAME;
    ST.ADD(ST.MOVE_BEGIN);
    ST.ADD(ST.SHOW);
    expect(ST.NOGROUP()).toBe(false);
    ST.DEL(ST.MOVE_BEGIN);
    ST.ADD(ST.BTN_PINE);
    expect(ST.NOGROUP()).toBe(true);
});
//# sourceMappingURL=state.test.js.map