"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoguelikeChooseData = void 0);
const RogueGainEntry_1 = require("./RogueGainEntry");
class RoguelikeChooseData {
	constructor(e) {
		(this.CostCurrency = []),
			(this.CallBack = void 0),
			(this.Index = e.Akn ?? void 0),
			(this.RoguelikeGainDataType = e.Ikn ?? void 0),
			(this.MaxTime = e.yws),
			(this.UseTime = e.Iws),
			(this.EventId = e.Tws),
			(this.Layer = e.k8n),
			(this.IsSelect = e.dws),
			(this.RogueGainEntryList = new Array());
		for (const s of e.Lws)
			this.RogueGainEntryList.push(
				new RogueGainEntry_1.RogueGainEntry(s, this.Index),
			);
		this.CostCurrency = e.Rws;
	}
}
exports.RoguelikeChooseData = RoguelikeChooseData;
