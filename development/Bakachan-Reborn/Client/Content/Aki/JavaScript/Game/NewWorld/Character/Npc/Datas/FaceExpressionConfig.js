"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FaceExpressionConfig = void 0);
const puerts_1 = require("puerts"),
	UE = require("ue"),
	Log_1 = require("../../../../../Core/Common/Log"),
	FaceExpressionDataById_1 = require("../../../../../Core/Define/ConfigQuery/FaceExpressionDataById"),
	ConfigBase_1 = require("../../../../../Core/Framework/ConfigBase"),
	IGlobal_1 = require("../../../../../UniverseEditor/Interface/IGlobal"),
	PublicUtil_1 = require("../../../../Common/PublicUtil");
class FaceExpressionConfig extends ConfigBase_1.ConfigBase {
	constructor() {
		super(...arguments), (this.MZo = void 0), (this.SZo = !1);
	}
	OnInit() {
		return (this.MZo = new Map()), !0;
	}
	OnClear() {
		return !(this.MZo = void 0);
	}
	GetFaceExpressionConfig(e) {
		if (PublicUtil_1.PublicUtil.UseDbConfig()) {
			var i = FaceExpressionDataById_1.configFaceExpressionDataById.GetConfig(
				e,
				!1,
			);
			if (!i || !i.FaceExpression) return;
			let o;
			return (
				i.MaleVariant && (o = JSON.parse(i.MaleVariant)),
				{
					Id: i.Id,
					FaceExpression: JSON.parse(i.FaceExpression),
					MaleVariant: o,
				}
			);
		}
		return this.EZo(), this.MZo.get(e);
	}
	EZo() {
		if (!this.SZo) {
			this.SZo = !0;
			let i = (0, PublicUtil_1.getConfigPath)(
				IGlobal_1.globalConfig.FaceExpressionConfigPath,
			);
			if (
				(PublicUtil_1.PublicUtil.IsUseTempData() ||
					(i = (0, PublicUtil_1.getConfigPath)(
						IGlobal_1.globalConfigTemp.FaceExpressionConfigPath,
					)),
				UE.BlueprintPathsLibrary.FileExists(i))
			) {
				var e = (0, puerts_1.$ref)("");
				e =
					(UE.KuroStaticLibrary.LoadFileToString(e, i),
					(e = (0, puerts_1.$unref)(e)),
					JSON.parse(e));
				for (const i of e) i && !this.MZo.has(i.Id) && this.MZo.set(i.Id, i);
			} else
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"NPC",
						51,
						"[FaceExpressionConfig] 不存在FaceExpressionConfig.json文件。",
						["Path", i],
					);
		}
	}
}
exports.FaceExpressionConfig = FaceExpressionConfig;
