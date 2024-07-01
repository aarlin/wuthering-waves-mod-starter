"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MultiTextCsvModule = void 0);
const puerts_1 = require("puerts"),
	UE = require("ue"),
	LanguageSystem_1 = require("../../../Core/Common/LanguageSystem"),
	StringUtils_1 = require("../../../Core/Utils/StringUtils"),
	MultiTextDefine_1 = require("./MultiTextDefine");
class MultiTextCsvModule {
	constructor() {
		(this.Ude = new Set()), (this.Ade = new Map());
	}
	Pde(e) {
		var t = StringUtils_1.StringUtils.ParseCsvContent(e);
		const i = t[MultiTextDefine_1.CSV_LANG_INDEX];
		for (let e = MultiTextDefine_1.CVS_START_INDEX; e < t.length; e++) {
			var r = t[e];
			if (!(r.length < 2)) {
				var s = r[1];
				if (!StringUtils_1.StringUtils.IsBlank(s)) {
					const e = new Map();
					r.forEach((t, r) => {
						1 < r &&
							((t = t.replace(/\\n/g, "\n")),
							e.set(i[r], t ?? "test/NoLocalTextNoLocalTextNoLocalText"));
					}),
						this.Ade.set(s, e);
				}
			}
		}
	}
	RegisterTextLocalConfig(e, t = !1) {
		var i;
		(!t && this.Ude.has(e)) ||
			(this.Ude.add(e),
			(i = ((t = void 0), puerts_1.$ref)(void 0)),
			UE.KuroStaticLibrary.LoadFileToString(i, e),
			(t = (0, puerts_1.$unref)(i)),
			this.Pde(t));
	}
	GetLocalText(e) {
		var t = LanguageSystem_1.LanguageSystem.PackageLanguage,
			i = this.Ade.get(e);
		return i && 0 < i.size ? i.get(t) : e;
	}
}
exports.MultiTextCsvModule = MultiTextCsvModule;
