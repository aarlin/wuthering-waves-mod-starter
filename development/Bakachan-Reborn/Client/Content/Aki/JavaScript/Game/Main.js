"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const puerts_1 = require("puerts"),
	GameProcedure_1 = require("./GameProcedure");
function main() {
	var e = puerts_1.argv.getByName("GameInstance");
	GameProcedure_1.GameProcedure.Start(e);
}
main();
