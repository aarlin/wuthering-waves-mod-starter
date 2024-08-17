"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.Http = void 0);
const puerts_1 = require("puerts"),
	ue_1 = require("ue");
class Http {
	static Get(e, t, s) {
		let u = void 0;
		if (t) {
			u = (0, ue_1.NewMap)(ue_1.BuiltinString, ue_1.BuiltinString);
			for (var [i, _] of t) u.Add(i, _);
		} else u = ue_1.KuroHttp.GetDefaultHeader();
		if (s) {
			const r = (e, t, u) => {
				s(e, t, u), (0, puerts_1.releaseManualReleaseDelegate)(r);
			};
			ue_1.KuroHttp.Get(e, u, (0, puerts_1.toManualReleaseDelegate)(r));
		} else ue_1.KuroHttp.Get(e, u, void 0);
	}
	static Post(e, t, u, s) {
		let i = void 0;
		if (u) {
			i = (0, ue_1.NewMap)(ue_1.BuiltinString, ue_1.BuiltinString);
			for (var [_, r] of u) i.Add(_, r);
		} else i = ue_1.KuroHttp.GetDefaultHeader();
		if (s) {
			const o = (e, t, u) => {
				s(e, t, u), (0, puerts_1.releaseManualReleaseDelegate)(o);
			};
			ue_1.KuroHttp.Post(e, i, t, (0, puerts_1.toManualReleaseDelegate)(o));
		} else ue_1.KuroHttp.Post(e, i, t, void 0);
	}
	static SetHttpThreadActiveMinimumSleepTimeInSeconds(e) {
		ue_1.KuroStaticLibrary.SetHttpThreadActiveMinimumSleepTimeInSeconds(e);
	}
	static SetHttpThreadIdleMinimumSleepTimeInSeconds(e) {
		ue_1.KuroStaticLibrary.SetHttpThreadIdleMinimumSleepTimeInSeconds(e);
	}
}
exports.Http = Http;
//# sourceMappingURL=Http.js.map
