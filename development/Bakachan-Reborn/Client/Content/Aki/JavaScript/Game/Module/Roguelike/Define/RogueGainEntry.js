"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RogueGainEntry = void 0);
const AffixEntry_1 = require("./AffixEntry"),
	RoguelikeDefine_1 = require("./RoguelikeDefine");
class RogueGainEntry {
	constructor(i, t = void 0) {
		(this.RoguelikeGainDataType = void 0),
			(this.ConfigId = void 0),
			(this.ElementDict = void 0),
			(this.AffixEntryList = void 0),
			(this.OriginalPrice = 0),
			(this.CurrentPrice = 0),
			(this.Index = void 0),
			(this.ShopItemCoinId = 0),
			(this.IsSell = void 0),
			(this.IsSelect = !1),
			(this.IsNew = !1),
			(this.Discounted = 0),
			(this.Cost = 0),
			(this.BindId = 0),
			(this.RestCount = 0),
			(this.IsValid = !1),
			(this.BindId = t),
			(this.RoguelikeGainDataType = i.Ikn),
			(this.ConfigId = i.R5n ?? void 0),
			(this.Index = i.Akn ?? void 0),
			(this.IsSell = i.cws ?? void 0),
			(this.ElementDict = new Map()),
			(this.IsSelect = i.dws),
			(this.IsNew = i.FRs),
			(this.Cost = i.mws),
			(this.RestCount = i.Cws),
			(this.IsValid = i.ZMs);
		for (const t of Object.keys(i.aws ?? {})) {
			var s = i.aws[t] ?? 0;
			s && this.ElementDict.set(Number(t), s);
		}
		if (i._ws) {
			this.AffixEntryList = new Array();
			for (const t of i._ws)
				this.AffixEntryList.push(new AffixEntry_1.AffixEntry(t));
			if (i.uws) {
				for (const t of Object.keys(i.uws.hws ?? {}))
					(this.ShopItemCoinId = Number(t)),
						(this.OriginalPrice = i.uws.hws[t]);
				(this.CurrentPrice =
					this.OriginalPrice -
					Math.floor(this.OriginalPrice * i.uws.lws * 0.01)),
					(this.Discounted = i.uws.lws);
			}
		}
	}
	GetSortElementInfoArrayByCount(i = !1) {
		var t,
			s,
			e = new Array();
		for ([t, s] of this.ElementDict)
			(i && 9 === t) || e.push(new RoguelikeDefine_1.ElementInfo(t, s));
		return e.sort((i, t) => t.Count - i.Count), e;
	}
	IsDiscounted() {
		return this.CurrentPrice !== this.OriginalPrice;
	}
}
exports.RogueGainEntry = RogueGainEntry;
