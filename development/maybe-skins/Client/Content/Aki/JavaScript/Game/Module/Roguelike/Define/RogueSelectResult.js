"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RogueSelectResult = void 0);
class RogueSelectResult {
	constructor(e, t, o, s = !1) {
		(this.IsShowCommon = !1),
			(this.CallBack = void 0),
			(this.NewRogueGainEntry = e),
			(this.OldRogueGainEntry = t),
			(this.SelectRogueGainEntry = o),
			(this.IsShowCommon = s);
	}
	GetNewUnlockAffixEntry() {
		var e = new Set(),
			t = this.NewRogueGainEntry.AffixEntryList,
			o = this.OldRogueGainEntry.AffixEntryList;
		for (let i = 0; i < t.length && i < o.length; i++) {
			var s = t[i],
				n = o[i];
			s.IsUnlock && !n.IsUnlock && e.add(s.Id);
		}
		return e;
	}
}
exports.RogueSelectResult = RogueSelectResult;
