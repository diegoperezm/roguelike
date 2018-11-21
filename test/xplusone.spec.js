var test = require("tape");
/*
 list of objects  and his positions x y
 */

let state = {
     "id": "humanInstance",
     "pos": {
       "x": 6,
       "y": 5
      },
      "width": 10,
      "height": 10
  };
let xPlusOne = (a,b) =>  {
 let  newState = Object
  		     .assign(
  		      {},
  		      state,
  		       {"pos": {"x": state.pos.x +1, "y": state.pos.y}} 
  ); 

return newState;
};

test("xPlusOne test", function(t){
   t.plan(1);
   t.equal(typeof xPlusOne(), "object","xPlusOne() should return an object." );
   t.end();
});
