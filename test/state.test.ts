import {STATE} from "../src/state";

let S=STATE

test("NOGROUP_test",()=>{
    let ST=S.TEMPFRAME
    ST.ADD(ST.MOVE_BEGIN)
    ST.ADD(ST.SHOW)
    expect(ST.NOGROUP()).toBe(false)
    ST.DEL(ST.MOVE_BEGIN)
    ST.ADD(ST.BTN_PINE)
    expect(ST.NOGROUP()).toBe(true)
})