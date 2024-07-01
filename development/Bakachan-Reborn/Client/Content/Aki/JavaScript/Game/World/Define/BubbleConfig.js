"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BubbleConfig = void 0);
const puerts_1 = require("puerts"),
	UE = require("ue"),
	Log_1 = require("../../../Core/Common/Log"),
	BubbleDataByActionGuid_1 = require("../../../Core/Define/ConfigQuery/BubbleDataByActionGuid"),
	ConfigBase_1 = require("../../../Core/Framework/ConfigBase"),
	IGlobal_1 = require("../../../UniverseEditor/Interface/IGlobal"),
	PublicUtil_1 = require("../../Common/PublicUtil");
class BubbleConfig extends ConfigBase_1.ConfigBase {
	constructor() {
		super(...arguments), (this.dpr = void 0);
	}
	OnInit() {
		return (this.dpr = new Map()), !0;
	}
	OnClear() {
		return !(this.dpr = void 0);
	}
	Cpr(e) {
		if (
			(e = BubbleDataByActionGuid_1.configBubbleDataByActionGuid.GetConfig(
				e,
				!1,
			))
		)
			return e;
	}
	GetBubbleData(e) {
		if (PublicUtil_1.PublicUtil.UseDbConfig()) {
			if (!this.dpr.get(e)) {
				const r = this.Cpr(e);
				if (!r) return;
				var i = JSON.parse(r.Params);
				this.dpr.set(e, i);
			}
			const r = this.dpr.get(e);
			return r || void 0;
		}
		this.EZo();
		const r = this.dpr.get(e);
		if (r) return r;
	}
	EZo() {
		let e = (0, PublicUtil_1.getConfigPath)(
			IGlobal_1.globalConfig.BubbleConfigPath,
		);
		if (
			(PublicUtil_1.PublicUtil.IsUseTempData() ||
				(e = (0, PublicUtil_1.getConfigPath)(
					IGlobal_1.globalConfigTemp.BubbleConfigPath,
				)),
			UE.BlueprintPathsLibrary.FileExists(e))
		) {
			var i,
				r = (0, puerts_1.$ref)("");
			r =
				(UE.KuroStaticLibrary.LoadFileToString(r, e),
				(r = (0, puerts_1.$unref)(r)),
				JSON.parse(r));
			for (const e of r)
				e.ActionGuid &&
					(i = e.Params) &&
					!this.dpr.has(e.ActionGuid) &&
					this.dpr.set(e.ActionGuid, i);
		} else
			Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"Entity",
					51,
					"[CharacterFlowDynamic] 不存在BubbleConfig.json文件。",
					["Path", e],
				);
	}
}
exports.BubbleConfig = BubbleConfig;
