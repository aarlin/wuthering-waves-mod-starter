"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.NpcFacialExpressionController = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../../Core/Common/Log"),
	EntitySystem_1 = require("../../../../../Core/Entity/EntitySystem"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	PLAYER_USED_ID = -1;
class NpcFacialExpressionController {
	constructor(e) {
		(this.yZo = new UE.FName("AniSwitch_Face")),
			(this.IZo = new UE.FName("UseFaceAniMap")),
			(this.TZo = new UE.FName("FaceAniMap")),
			(this.LZo = new UE.FName("MI_Face")),
			(this.E0 = void 0),
			(this.wDe = void 0),
			(this.DZo = !1),
			(this.RZo = void 0),
			(this.UZo = void 0),
			(this.E0 = e),
			(e = EntitySystem_1.EntitySystem.Get(this.E0)),
			(this.wDe = e?.GetComponent(0)?.GetPbDataId());
	}
	YLe() {
		return -1 === this.wDe;
	}
	InitFaceExpressionData(e) {
		e && (this.RZo = e);
	}
	ChangeFacialExpression() {
		var e, t;
		this.E0 &&
			!this.YLe() &&
			this.RZo &&
			((e = EntitySystem_1.EntitySystem.Get(this.E0)),
			(t =
				ConfigManager_1.ConfigManager.FaceExpressionConfig?.GetFaceExpressionConfig(
					this.RZo,
				)) && t.FaceExpression
				? "Texture" === (t = t?.FaceExpression).Type
					? ((this.DZo = !0), this.AZo(t.FaceIndex))
					: "Morph" === t.Type &&
						((this.DZo = !1),
						this.UZo &&
							Log_1.Log.CheckWarn() &&
							Log_1.Log.Warn(
								"Plot",
								51,
								"通过变形器设置新表情时，前个表情未正确重置",
								["PreExpressionInfo", this.UZo],
								["CurExpressionInfo", t.MorphData],
							),
						(this.UZo = t.MorphData),
						this.PZo(t.MorphData))
				: ((t = e?.GetComponent(2)?.CreatureData?.GetPbDataId()),
					Log_1.Log.CheckWarn() &&
						Log_1.Log.Warn(
							"Plot",
							51,
							"获取表情配置失败",
							["FaceExpressionId", this.RZo],
							["PbDataId", t],
						)));
	}
	ResetFacialExpression() {
		if (this.E0 && !this.YLe() && this.RZo)
			if (this.DZo) this.AZo(1);
			else if (this.UZo) {
				let e = "";
				for (const t of this.UZo.split(",")) {
					e += t.split(":")[0].trim() + ":0,";
				}
				(e = e.slice(0, -1)), this.PZo(e), (this.UZo = void 0);
			}
	}
	PZo(e) {
		if (!e) return !1;
		var t = this.xZo();
		if (!t?.IsValid()) return !1;
		for (const s of e.split(",")) {
			var i = (o = s.split(":"))[0].trim(),
				o = Number(o[1].trim());
			t.SetMorphTarget(new UE.FName(i), o);
		}
		return !0;
	}
	AZo(e) {
		var t;
		return (
			!!this.E0 &&
			!!(t = EntitySystem_1.EntitySystem.Get(this.E0))?.Valid &&
			!(
				!t?.GetComponent(2).Owner?.IsValid() ||
				!(t = this.wZo())?.IsValid() ||
				(t.K2_GetScalarParameterValue(this.IZo) ||
					t.SetScalarParameterValue(this.IZo, 1),
				t.K2_GetTextureParameterValue(this.TZo)?.IsValid()
					? (t.SetScalarParameterValue(this.yZo, e), 0)
					: (Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"LevelEvent",
								51,
								"Face Mesh未配置或错误配置FaceAniMap贴图",
							),
						1))
			)
		);
	}
	xZo() {
		if (this.E0) {
			var e = EntitySystem_1.EntitySystem.Get(this.E0);
			if (e?.Valid) {
				var t = e?.GetComponent(2).Owner;
				if (t?.IsValid()) {
					var i = t.K2_GetComponentsByClass(
							UE.SkeletalMeshComponent.StaticClass(),
						),
						o = i.Num();
					if (o) {
						let a;
						if (
							((t = e
								.GetComponent(0)
								?.GetModelConfig()
								?.DA.AssetPathName?.toString()),
							t?.length && "None" !== t)
						)
							for (let e = 0; e < o; ++e) {
								var s = i.Get(e);
								if ("Face" === s.GetName()) {
									a = s;
									break;
								}
							}
						else a = i.Get(0);
						if (a?.IsValid()) return a;
					}
				}
			}
		}
	}
	wZo() {
		var e = this.xZo();
		e = e?.GetMaterial(e.GetMaterialIndex(this.LZo));
		if (e?.IsValid()) return e;
	}
}
exports.NpcFacialExpressionController = NpcFacialExpressionController;
