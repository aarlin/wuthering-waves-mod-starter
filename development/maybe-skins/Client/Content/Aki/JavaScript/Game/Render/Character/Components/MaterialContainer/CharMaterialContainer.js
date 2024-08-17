"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CharMaterialContainer = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../../Core/Common/Log"),
	Stats_1 = require("../../../../../Core/Common/Stats"),
	FNameUtil_1 = require("../../../../../Core/Utils/FNameUtil"),
	Global_1 = require("../../../../Global"),
	RenderConfig_1 = require("../../../Config/RenderConfig"),
	RenderModuleConfig_1 = require("../../../Manager/RenderModuleConfig"),
	RenderUtil_1 = require("../../../Utils/RenderUtil"),
	CharRenderBase_1 = require("../../Manager/CharRenderBase"),
	CharRenderingComponent_1 = require("../../Manager/CharRenderingComponent"),
	CharBodyInfo_1 = require("./CharBodyInfo");
class CharMaterialContainer extends CharRenderBase_1.CharRenderBase {
	constructor() {
		super(...arguments),
			(this.AllBodyInfoList = void 0),
			(this.ihr = ""),
			(this.J7s = new Array()),
			(this.xW = void 0);
	}
	Awake(e) {
		if ((super.Awake(e), (e = this.RenderComponent.GetOwner()), e?.IsValid())) {
			(this.ihr = e.GetName()), (this.AllBodyInfoList = new Map());
			var t = e.K2_GetComponentsByClass(UE.SkeletalMeshComponent.StaticClass()),
				r = t.Num();
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"RenderCharacter",
					41,
					"CharMaterialContainer.Awake",
					["Actor", this.ihr],
					["skeletalCompsNum", r],
				);
			let a = !1;
			for (let e = 0; e < r; e++) {
				var o,
					n = t.Get(e);
				n?.IsValid()
					? ((o = n.GetName()),
						n.SkeletalMesh?.IsValid()
							? ((n = this.AddSkeletalComponent(n, o)),
								(a = a || n),
								n ||
									(Log_1.Log.CheckInfo() &&
										Log_1.Log.Info(
											"RenderCharacter",
											14,
											"材质容器部位初始化失败",
											["Actor", this.ihr],
											["部位名称", o],
										)))
							: Log_1.Log.CheckWarn() &&
								Log_1.Log.Warn(
									"RenderCharacter",
									41,
									"资产的SkeletalMeshComponent的SkeletalMesh为空",
									["Actor", this.ihr],
									["SkeletalName", o],
								))
					: Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"RenderCharacter",
							41,
							"材质容器初始化失败，组件不可用",
							["Actor", this.ihr],
						);
			}
			this.OnInitSuccess(),
				a ||
					(Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"RenderCharacter",
							14,
							"无Mesh类型材质控制器初始化",
							["Actor", this.ihr],
						)),
				this.ihr,
				(this.xW = void 0);
		} else
			Log_1.Log.CheckError() &&
				Log_1.Log.Error("RenderCharacter", 14, "Actor 为空");
	}
	AddSkeletalComponent(e, t, r = !0) {
		var o, n;
		return t
			? e
				? e.GetOwner()
					? e.SkeletalMesh
						? ((o = e.bHiddenInGame),
							Log_1.Log.CheckInfo() &&
								Log_1.Log.Info(
									"RenderCharacter",
									41,
									"AddSkeletalMeshComponent",
									["Actor", this.ihr],
									["SkeletalName", t],
									["SkeletalComponent", e.SkeletalMesh.GetName()],
									["isHidden", o],
								),
							o && e.SetHiddenInGame(!1),
							(n = new CharBodyInfo_1.CharBodyInfo()).Init(
								this.ihr,
								t,
								e,
								r,
								this,
							),
							this.AllBodyInfoList.set(t, n),
							o && e.SetHiddenInGame(!0),
							!0)
						: (Log_1.Log.CheckError() &&
								Log_1.Log.Error(
									"RenderCharacter",
									14,
									"外部传入的SkeletalMeshComponent的SkeletalMesh为空",
									["Actor", this.ihr],
									["SkeletalName", t],
								),
							!1)
					: (Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"RenderCharacter",
								41,
								"外部传入的SkeletalMeshComponent的Owner为空",
								["Actor", this.ihr],
							),
						!1)
				: (Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"RenderCharacter",
							14,
							"外部传入了空的SkeletalMeshComponent",
							["Actor", this.ihr],
						),
					!1)
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error("RenderCharacter", 14, "角色骨骼名称错误", [
						"Actor",
						this.ihr,
					]),
				!1);
	}
	RemoveSkeletalComponent(e) {
		return (
			!!this.AllBodyInfoList.has(e) && (this.AllBodyInfoList.delete(e), !0)
		);
	}
	ResetAllState() {
		for (const e of this.AllBodyInfoList.values()) e.ResetAllState();
	}
	UseAlphaTestCommon() {
		for (const e of this.AllBodyInfoList.values()) e.UseAlphaTestCommon();
	}
	RevertAlphaTestCommon() {
		for (const e of this.AllBodyInfoList.values()) e.RevertAlphaTestCommon();
	}
	SetColor(e, t, r = 0, o = -1, n = 0) {
		if (!FNameUtil_1.FNameUtil.IsEmpty(e)) {
			0 <= o &&
				Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"RenderCharacter",
					41,
					"SetColor: 不支持指定SectionIndex",
				);
			var a = RenderConfig_1.RenderConfig.GetBodyNamesByBodyType(r);
			for (let r = 0; r < a.length; r++) {
				var i = this.AllBodyInfoList.get(a[r]);
				i && i.SetColor(e, t, n);
			}
		}
	}
	RevertColor(e, t = 0, r = -1, o = 0) {
		if (!FNameUtil_1.FNameUtil.IsEmpty(e)) {
			0 <= r &&
				Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"RenderCharacter",
					41,
					"SetColor: 不支持指定SectionIndex",
				);
			var n = RenderConfig_1.RenderConfig.GetBodyNamesByBodyType(t);
			for (let t = 0; t < n.length; t++) {
				var a = this.AllBodyInfoList.get(n[t]);
				a && a.RevertColor(e, o);
			}
		}
	}
	SetFloat(e, t, r = 0, o = -1, n = 0) {
		if (!FNameUtil_1.FNameUtil.IsEmpty(e)) {
			0 <= o &&
				Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"RenderCharacter",
					41,
					"SetColor: 不支持指定SectionIndex",
				);
			var a = RenderConfig_1.RenderConfig.GetBodyNamesByBodyType(r);
			for (let r = 0; r < a.length; r++) {
				var i = this.AllBodyInfoList.get(a[r]);
				i && i.SetFloat(e, t, n);
			}
		}
	}
	RevertFloat(e, t = 0, r = -1, o = 0) {
		if (!FNameUtil_1.FNameUtil.IsEmpty(e)) {
			0 <= r &&
				Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"RenderCharacter",
					41,
					"SetColor: 不支持指定SectionIndex",
				);
			var n = RenderConfig_1.RenderConfig.GetBodyNamesByBodyType(t);
			for (let t = 0; t < n.length; t++) {
				var a = this.AllBodyInfoList.get(n[t]);
				a && a.RevertFloat(e, o);
			}
		}
	}
	SetTexture(e, t, r = 0, o = -1, n = 0) {
		if (!FNameUtil_1.FNameUtil.IsEmpty(e) && void 0 !== t) {
			0 <= o &&
				Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"RenderCharacter",
					41,
					"SetColor: 不支持指定SectionIndex",
				);
			var a = RenderConfig_1.RenderConfig.GetBodyNamesByBodyType(r);
			for (let r = 0; r < a.length; r++) {
				var i = this.AllBodyInfoList.get(a[r]);
				i && i.SetTexture(e, t, n);
			}
		}
	}
	RevertTexture(e, t = 0, r = -1, o = 0) {
		if (!FNameUtil_1.FNameUtil.IsEmpty(e)) {
			0 <= r &&
				Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"RenderCharacter",
					41,
					"SetColor: 不支持指定SectionIndex",
				);
			var n = RenderConfig_1.RenderConfig.GetBodyNamesByBodyType(t);
			for (let t = 0; t < n.length; t++) {
				var a = this.AllBodyInfoList.get(n[t]);
				a && a.RevertTexture(e, o);
			}
		}
	}
	SetStarScarEnergy(e) {
		for (const t of this.AllBodyInfoList.values()) t.SetStarScarEnergy(e);
	}
	LateUpdate() {
		var e = this.GetRenderingComponent().GetCachedOwner();
		let t;
		if (e instanceof UE.Character && e !== Global_1.Global.BaseCharacter) {
			var r = e.GetVelocity().SizeSquared(),
				o =
					CharRenderingComponent_1.CharRenderingComponent.MotionVelocitySquared;
			t = 0;
			for (let e = o.length - 1; 0 <= e; e--)
				if (r > o[e]) {
					t =
						CharRenderingComponent_1.CharRenderingComponent
							.MotionMeshShadingRate[e];
					break;
				}
		}
		for (const e of this.AllBodyInfoList.values()) e.Update(t);
	}
	Destroy() {
		for (const e of this.AllBodyInfoList.values())
			e.SkeletalComp && e.SkeletalComp.IsValid() && e.Update();
		this.AllBodyInfoList.clear();
	}
	GetComponentId() {
		return RenderConfig_1.RenderConfig.IdMaterialContainer;
	}
	GetStatName() {
		return "CharMaterialContainer";
	}
	StateEnter(e) {
		var t = e.DataCache;
		0 === t.MaterialModifyType
			? (t.UseRim && this.ohr(e),
				t.UseDissolve && this.rhr(e),
				t.UseOutline && this.nhr(e),
				t.UseColor && this.shr(e),
				t.UseTextureSample && this.ahr(e),
				t.UseMotionOffset && this.hhr(e),
				t.UseDitherEffect && this.lhr(e))
			: 1 === t.MaterialModifyType && this._hr(e);
	}
	StateUpdate(e) {
		var t = e.DataCache;
		0 === t.MaterialModifyType
			? (t.UseRim && this.uhr(e),
				t.UseDissolve && this.chr(e),
				t.UseOutline && this.mhr(e),
				t.UseColor && this.dhr(e),
				t.UseTextureSample && this.Chr(e),
				t.UseMotionOffset && this.ghr(e),
				t.UseDitherEffect && this.fhr(e),
				t.UseCustomMaterialEffect && this.phr(e))
			: 1 === t.MaterialModifyType && this.vhr(e);
	}
	StateRevert(e) {
		var t = e.DataCache;
		if (e.HasReverted)
			Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"RenderCharacter",
					14,
					"已经执行过Revert逻辑",
					["Actor", this.ihr],
					["DataAsset", t.DataName],
				);
		else if (
			((e.HasReverted = !0),
			0 === t.MaterialModifyType
				? (t.UseRim && this.Mhr(e),
					t.UseDissolve && this.Shr(e),
					t.UseOutline && this.Ehr(e),
					t.UseColor && this.yhr(e),
					t.UseTextureSample && this.Ihr(e),
					t.UseMotionOffset && this.Thr(e),
					t.UseDitherEffect && this.Lhr(e),
					t.UseCustomMaterialEffect && this.Dhr(e))
				: 1 === t.MaterialModifyType && this.Rhr(e),
			t.HiddenAfterEffect)
		) {
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("RenderCharacter", 41, "播放完效果后，隐藏mesh", [
					"DataAsset",
					t.DataName,
				]);
			for (const t of e.SpecifiedMaterialIndexMap.keys()) {
				var r = this.AllBodyInfoList.get(t);
				r.SkeletalComp.IsValid() && r.SkeletalComp.SetHiddenInGame(!0);
			}
		}
	}
	_hr(e) {
		var t = e.DataCache;
		if (t.ReplaceMaterialInterface)
			if (
				((e.ReplaceMaterial =
					UE.KismetMaterialLibrary.CreateDynamicMaterialInstance(
						this.GetRenderingComponent(),
						t.ReplaceMaterialInterface,
					)),
				e.ReplaceMaterial)
			) {
				this.J7s.length = 0;
				for (const a of e.SpecifiedMaterialIndexMap.keys()) {
					var r = e.SpecifiedMaterialIndexMap.get(a),
						o = this.AllBodyInfoList.get(a);
					this.J7s.push(a);
					for (let a = 0; a < r.length; a++) {
						var n = o.MaterialSlotList[r[a]];
						t.RevertMaterial
							? n.SetReplaceMaterial(e.ReplaceMaterial)
							: n.SetDynamicMaterial(e.ReplaceMaterial);
					}
				}
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"RenderCharacter",
						41,
						"材质替换",
						["Actor", this.ihr],
						["替换材质名称", t.DataName],
						["材质名称", e.ReplaceMaterial?.GetName()],
						["是否永久性的", !t.RevertMaterial],
						["body array", this.J7s.join()],
					);
			} else
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"RenderCharacter",
						14,
						"材质替换失败，不存在替换材质:",
						["替换材质名称", t.DataName],
					);
		else
			Log_1.Log.CheckError() &&
				Log_1.Log.Error("RenderCharacter", 14, "材质替换失败，不存在替换材质", [
					"替换材质名称",
					t.DataName,
				]);
	}
	vhr(e) {
		var t = e.DataCache;
		if (t.UseParameterModify) {
			var r = e.ReplaceMaterial,
				o = e.InterpolateFactor;
			if (void 0 !== t.FloatParameterNames)
				for (let e = 0; e < t.FloatParameterNames.length; e++) {
					var n = RenderUtil_1.RenderUtil.GetFloatFromGroup(
						t.FloatParameterValues[e],
						o,
					);
					r.SetScalarParameterValue(t.FloatParameterNames[e], n);
				}
			if (void 0 !== t.ColorParameterNames)
				for (let e = 0; e < t.ColorParameterNames.length; e++) {
					var a = RenderUtil_1.RenderUtil.GetColorFromGroup(
						t.ColorParameterValues[e],
						o,
					);
					r.SetVectorParameterValue(t.ColorParameterNames[e], a);
				}
		}
	}
	Rhr(e) {
		var t = e.DataCache;
		if (t.RevertMaterial) {
			let n = !1;
			for (const t of e.SpecifiedMaterialIndexMap.keys()) {
				var r = e.SpecifiedMaterialIndexMap.get(t),
					o = this.AllBodyInfoList.get(t);
				for (let t = 0; t < r.length; t++)
					o.MaterialSlotList[r[t]].RevertReplaceMaterial(e.ReplaceMaterial) ||
						(n = !0);
			}
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"RenderCharacter",
					41,
					"材质替换Revert",
					["Actor", this.ihr],
					["替换材质名称", t.DataName],
					["材质名称", e.ReplaceMaterial?.GetName()],
					["是否永久性的", !t.RevertMaterial],
					["MaterialMiss", n],
				),
				(e.ReplaceMaterial = void 0);
		}
	}
	ohr(e) {
		var t = e.SelectedAllParts;
		for (const a of e.SpecifiedMaterialIndexMap.keys()) {
			var r = e.SpecifiedMaterialIndexMap.get(a),
				o = this.AllBodyInfoList.get(a);
			if (t) o.UseBattleCommon();
			else
				for (let e = 0; e < r.length; e++) {
					var n = o.MaterialSlotList[r[e]];
					n.SectionIndex !== RenderConfig_1.INVALID_SECTION_INDEX &&
						o.UseBattle(n.SectionIndex);
				}
		}
	}
	uhr(e) {
		var t = e.DataCache,
			r = e.InterpolateFactor,
			o = RenderUtil_1.RenderUtil.GetFloatFromGroup(t.RimRange, r),
			n = RenderUtil_1.RenderUtil.GetColorFromGroup(t.RimColor, r),
			a = RenderUtil_1.RenderUtil.GetFloatFromGroup(t.RimIntensity, r);
		for (const r of e.SpecifiedMaterialIndexMap.keys()) {
			var i = e.SpecifiedMaterialIndexMap.get(r),
				l = this.AllBodyInfoList.get(r);
			for (let e = 0; e < i.length; e++) {
				var s = l.MaterialSlotList[i[e]];
				s.SetFloat(RenderConfig_1.RenderConfig.UseRim, 1),
					s.SetFloat(RenderConfig_1.RenderConfig.RimUseTex, t.RimUseTex),
					s.SetColor(RenderConfig_1.RenderConfig.RimChannel, t.RimChannel),
					s.SetFloat(RenderConfig_1.RenderConfig.RimRange, o),
					s.SetColor(RenderConfig_1.RenderConfig.RimColor, n),
					s.SetFloat(RenderConfig_1.RenderConfig.RimIntensity, a);
			}
		}
	}
	Mhr(e) {
		var t = e.SelectedAllParts;
		for (const a of e.SpecifiedMaterialIndexMap.keys()) {
			var r = e.SpecifiedMaterialIndexMap.get(a),
				o = this.AllBodyInfoList.get(a);
			t && o.RevertBattleCommon();
			for (let e = 0; e < r.length; e++) {
				var n = o.MaterialSlotList[r[e]];
				n.RevertProperty(RenderConfig_1.RenderConfig.UseRim),
					n.RevertProperty(RenderConfig_1.RenderConfig.RimUseTex),
					n.RevertProperty(RenderConfig_1.RenderConfig.RimChannel),
					n.RevertProperty(RenderConfig_1.RenderConfig.RimRange),
					n.RevertProperty(RenderConfig_1.RenderConfig.RimColor),
					n.RevertProperty(RenderConfig_1.RenderConfig.RimIntensity),
					t ||
						n.SectionIndex === RenderConfig_1.INVALID_SECTION_INDEX ||
						o.RevertBattle(n.SectionIndex);
			}
		}
	}
	rhr(e) {
		var t = e.SelectedAllParts;
		for (const a of e.SpecifiedMaterialIndexMap.keys()) {
			var r = e.SpecifiedMaterialIndexMap.get(a),
				o = this.AllBodyInfoList.get(a);
			if (t) o.UseBattleMaskCommon();
			else
				for (let e = 0; e < r.length; e++) {
					var n = o.MaterialSlotList[r[e]];
					n.SectionIndex !== RenderConfig_1.INVALID_SECTION_INDEX &&
						o.UseBattleMask(n.SectionIndex);
				}
		}
	}
	chr(e) {
		var t = e.DataCache,
			r = e.InterpolateFactor,
			o = RenderUtil_1.RenderUtil.GetFloatFromGroup(t.DissolveProgress, r),
			n = RenderUtil_1.RenderUtil.GetFloatFromGroup(t.DissolveSmooth, r),
			a = RenderUtil_1.RenderUtil.GetFloatFromGroup(
				t.DissolveColorIntensity,
				r,
			),
			i = RenderUtil_1.RenderUtil.GetColorFromGroup(t.DissolveColor, r);
		for (const r of e.SpecifiedMaterialIndexMap.keys()) {
			var l = e.SpecifiedMaterialIndexMap.get(r),
				s = this.AllBodyInfoList.get(r);
			for (let e = 0; e < l.length; e++) {
				var d = s.MaterialSlotList[l[e]];
				d.SetFloat(RenderConfig_1.RenderConfig.UseDissolve, 1),
					d.SetColor(
						RenderConfig_1.RenderConfig.DissolveChannelSwitch,
						t.DissolveChannel,
					),
					d.SetFloat(RenderConfig_1.RenderConfig.DissolveProgress, o),
					d.SetFloat(RenderConfig_1.RenderConfig.DissolveSmooth, n),
					d.SetFloat(RenderConfig_1.RenderConfig.DissolveMulti, a),
					d.SetColor(RenderConfig_1.RenderConfig.DissolveEmission, i);
			}
		}
	}
	Shr(e) {
		var t = e.SelectedAllParts;
		for (const a of e.SpecifiedMaterialIndexMap.keys()) {
			var r = e.SpecifiedMaterialIndexMap.get(a),
				o = this.AllBodyInfoList.get(a);
			t && o.RevertBattleMaskCommon();
			for (let e = 0; e < r.length; e++) {
				var n = o.MaterialSlotList[r[e]];
				n.RevertProperty(RenderConfig_1.RenderConfig.UseDissolve),
					n.RevertProperty(RenderConfig_1.RenderConfig.DissolveChannelSwitch),
					n.RevertProperty(RenderConfig_1.RenderConfig.DissolveProgress),
					n.RevertProperty(RenderConfig_1.RenderConfig.DissolveSmooth),
					n.RevertProperty(RenderConfig_1.RenderConfig.DissolveMulti),
					n.RevertProperty(RenderConfig_1.RenderConfig.DissolveEmission),
					t ||
						n.SectionIndex === RenderConfig_1.INVALID_SECTION_INDEX ||
						o.RevertBattleMask(n.SectionIndex);
			}
		}
	}
	nhr(e) {
		if (e.DataCache.UseOuterOutlineEffect) {
			var t = e.SelectedAllParts;
			for (const a of e.SpecifiedMaterialIndexMap.keys()) {
				var r = e.SpecifiedMaterialIndexMap.get(a),
					o = this.AllBodyInfoList.get(a);
				if (t) o.UseOutlineStencilTestCommon();
				else
					for (let e = 0; e < r.length; e++) {
						var n = o.MaterialSlotList[r[e]];
						n.SectionIndex !== RenderConfig_1.INVALID_SECTION_INDEX &&
							o.UseOutlineStencilTest(n.SectionIndex);
					}
			}
		}
	}
	mhr(e) {
		var t = e.DataCache,
			r = e.InterpolateFactor,
			o = RenderUtil_1.RenderUtil.GetFloatFromGroup(t.OutlineWidth, r),
			n = RenderUtil_1.RenderUtil.GetColorFromGroup(t.OutlineColor, r),
			a = RenderUtil_1.RenderUtil.GetFloatFromGroup(t.OutlineIntensity, r);
		for (const r of e.SpecifiedMaterialIndexMap.keys()) {
			var i = e.SpecifiedMaterialIndexMap.get(r),
				l = this.AllBodyInfoList.get(r);
			for (let e = 0; e < i.length; e++) {
				var s = l.MaterialSlotList[i[e]];
				s.SetFloat(RenderConfig_1.RenderConfig.OutlineUseTex, t.OutlineUseTex),
					s.SetFloat(RenderConfig_1.RenderConfig.OutlineWidth, o),
					s.SetColor(RenderConfig_1.RenderConfig.OutlineColor, n),
					s.SetFloat(RenderConfig_1.RenderConfig.OutlineColorIntensity, a);
			}
		}
	}
	Ehr(e) {
		var t = e.SelectedAllParts;
		for (const a of e.SpecifiedMaterialIndexMap.keys()) {
			var r = e.SpecifiedMaterialIndexMap.get(a),
				o = this.AllBodyInfoList.get(a);
			t && o.RevertOutlineStencilTestCommon();
			for (let e = 0; e < r.length; e++) {
				var n = o.MaterialSlotList[r[e]];
				n.RevertProperty(RenderConfig_1.RenderConfig.OutlineUseTex),
					n.RevertProperty(RenderConfig_1.RenderConfig.OutlineWidth),
					n.RevertProperty(RenderConfig_1.RenderConfig.OutlineColor),
					n.RevertProperty(RenderConfig_1.RenderConfig.OutlineColorIntensity),
					t ||
						n.SectionIndex === RenderConfig_1.INVALID_SECTION_INDEX ||
						o.RevertOutlineStencilTest(n.SectionIndex);
			}
		}
	}
	shr(e) {
		var t = e.SelectedAllParts;
		for (const a of e.SpecifiedMaterialIndexMap.keys()) {
			var r = e.SpecifiedMaterialIndexMap.get(a),
				o = this.AllBodyInfoList.get(a);
			if (t) o.UseBattleCommon();
			else
				for (let e = 0; e < r.length; e++) {
					var n = o.MaterialSlotList[r[e]];
					n.SectionIndex !== RenderConfig_1.INVALID_SECTION_INDEX &&
						o.UseBattle(n.SectionIndex);
				}
		}
	}
	dhr(e) {
		var t = e.DataCache;
		if (t.UseColor) {
			var r = e.InterpolateFactor,
				o = RenderUtil_1.RenderUtil.GetColorFromGroup(t.BaseColor, r),
				n = RenderUtil_1.RenderUtil.GetColorFromGroup(t.EmissionColor, r),
				a = RenderUtil_1.RenderUtil.GetFloatFromGroup(t.EmissionIntensity, r),
				i = RenderUtil_1.RenderUtil.GetFloatFromGroup(t.BaseColorIntensity, r);
			for (const r of e.SpecifiedMaterialIndexMap.keys()) {
				var l = e.SpecifiedMaterialIndexMap.get(r),
					s = this.AllBodyInfoList.get(r);
				for (let e = 0; e < l.length; e++) {
					var d = s.MaterialSlotList[l[e]];
					d.SetFloat(RenderConfig_1.RenderConfig.BaseUseTex, t.BaseUseTex),
						d.SetColor(RenderConfig_1.RenderConfig.BaseColor, o),
						d.SetFloat(RenderConfig_1.RenderConfig.BaseColorIntensity, i),
						d.SetFloat(
							RenderConfig_1.RenderConfig.EmissionUseTex,
							t.EmissionUseTex,
						),
						d.SetColor(RenderConfig_1.RenderConfig.EmissionColor, n),
						d.SetFloat(RenderConfig_1.RenderConfig.EmissionIntensity, a);
				}
			}
		}
	}
	yhr(e) {
		var t = e.SelectedAllParts;
		for (const a of e.SpecifiedMaterialIndexMap.keys()) {
			var r = e.SpecifiedMaterialIndexMap.get(a),
				o = this.AllBodyInfoList.get(a);
			t && o.RevertBattleCommon();
			for (let e = 0; e < r.length; e++) {
				var n = o.MaterialSlotList[r[e]];
				n.RevertProperty(RenderConfig_1.RenderConfig.BaseUseTex),
					n.RevertProperty(RenderConfig_1.RenderConfig.BaseColor),
					n.RevertProperty(RenderConfig_1.RenderConfig.BaseColorIntensity),
					n.RevertProperty(RenderConfig_1.RenderConfig.EmissionUseTex),
					n.RevertProperty(RenderConfig_1.RenderConfig.EmissionColor),
					n.RevertProperty(RenderConfig_1.RenderConfig.EmissionIntensity),
					t ||
						n.SectionIndex === RenderConfig_1.INVALID_SECTION_INDEX ||
						o.RevertBattle(n.SectionIndex);
			}
		}
	}
	ahr(e) {
		var t = e.SelectedAllParts;
		for (const a of e.SpecifiedMaterialIndexMap.keys()) {
			var r = e.SpecifiedMaterialIndexMap.get(a),
				o = this.AllBodyInfoList.get(a);
			if (t) o.UseBattleCommon();
			else
				for (let e = 0; e < r.length; e++) {
					var n = o.MaterialSlotList[r[e]];
					n.SectionIndex !== RenderConfig_1.INVALID_SECTION_INDEX &&
						o.UseBattle(n.SectionIndex);
				}
		}
	}
	Chr(e) {
		var t = e.DataCache,
			r = e.InterpolateFactor,
			o = RenderUtil_1.RenderUtil.GetColorFromGroup(t.TextureScaleAndOffset, r),
			n = RenderUtil_1.RenderUtil.GetColorFromGroup(t.TextureSpeed, r),
			a = RenderUtil_1.RenderUtil.GetColorFromGroup(t.TextureColorTint, r),
			i = RenderUtil_1.RenderUtil.GetFloatFromGroup(t.Rotation, r),
			l = RenderUtil_1.RenderUtil.GetFloatFromGroup(t.TextureMaskRange, r),
			s = t.MaskTexture;
		for (const r of e.SpecifiedMaterialIndexMap.keys()) {
			var d = e.SpecifiedMaterialIndexMap.get(r),
				f = this.AllBodyInfoList.get(r);
			for (let e = 0; e < d.length; e++) {
				var C = f.MaterialSlotList[d[e]];
				C.SetFloat(RenderConfig_1.RenderConfig.UseTexture, 1),
					C.SetFloat(
						RenderConfig_1.RenderConfig.TextureUseMask,
						t.UseAlphaToMask,
					),
					C.SetFloat(RenderConfig_1.RenderConfig.TextureMaskRange, l),
					C.SetColor(RenderConfig_1.RenderConfig.TextureScaleAndOffset, o),
					C.SetColor(RenderConfig_1.RenderConfig.TextureSpeed, n),
					C.SetColor(RenderConfig_1.RenderConfig.TextureColor, a),
					C.SetFloat(RenderConfig_1.RenderConfig.TextureRotation, i),
					C.SetFloat(
						RenderConfig_1.RenderConfig.TextureUseScreenUv,
						t.UseScreenUv,
					),
					s && C.SetTexture(RenderConfig_1.RenderConfig.NoiseTexture, s),
					C.SetColor(
						RenderConfig_1.RenderConfig.TextureUvSwitch,
						t.UvSelection,
					);
			}
		}
	}
	Ihr(e) {
		var t = e.SelectedAllParts;
		for (const a of e.SpecifiedMaterialIndexMap.keys()) {
			var r = e.SpecifiedMaterialIndexMap.get(a),
				o = this.AllBodyInfoList.get(a);
			t && o.RevertBattleCommon();
			for (let e = 0; e < r.length; e++) {
				var n = o.MaterialSlotList[r[e]];
				n.RevertProperty(RenderConfig_1.RenderConfig.UseTexture),
					n.RevertProperty(RenderConfig_1.RenderConfig.TextureUseScreenUv),
					n.RevertProperty(RenderConfig_1.RenderConfig.TextureUseMask),
					n.RevertProperty(RenderConfig_1.RenderConfig.TextureMaskRange),
					n.RevertProperty(RenderConfig_1.RenderConfig.TextureUvSwitch),
					n.RevertProperty(RenderConfig_1.RenderConfig.TextureScaleAndOffset),
					n.RevertProperty(RenderConfig_1.RenderConfig.TextureSpeed),
					n.RevertProperty(RenderConfig_1.RenderConfig.TextureColor),
					n.RevertProperty(RenderConfig_1.RenderConfig.TextureRotation),
					n.RevertProperty(RenderConfig_1.RenderConfig.NoiseTexture),
					t ||
						n.SectionIndex === RenderConfig_1.INVALID_SECTION_INDEX ||
						o.RevertBattle(n.SectionIndex);
			}
		}
	}
	hhr(e) {
		for (const r of e.SpecifiedMaterialIndexMap.keys()) {
			var t = this.AllBodyInfoList.get(r);
			if (t.SkeletalComp?.IsValid()) {
				(e.TargetSkeletalMesh = t.SkeletalComp),
					(e.MotionStartLocation = e.TargetSkeletalMesh.GetSocketLocation(
						RenderConfig_1.RenderConfig.RootName,
					)),
					void 0 === e.MotionEndLocation &&
						(e.MotionEndLocation = new Array(3));
				break;
			}
		}
	}
	ghr(e) {
		var t = e.DataCache;
		if (e.TargetSkeletalMesh) {
			var r = e.InterpolateFactor,
				o = Math.pow(r.Factor, t.MotionOffsetLength),
				n = e.TargetSkeletalMesh.GetSocketLocation(
					RenderConfig_1.RenderConfig.RootName,
				),
				a =
					((o =
						(RenderUtil_1.RenderUtil.LerpVector(
							e.MotionStartLocation,
							n,
							o,
							e.MotionEndLocation,
						),
						e.MotionEndLocation[0] - n.X)),
					e.MotionEndLocation[1] - n.Y),
				i =
					((n = e.MotionEndLocation[2] - n.Z),
					Math.sqrt(o * o + a * a + n * n)),
				l = new UE.LinearColor(o, a, n, i),
				s = RenderUtil_1.RenderUtil.GetFloatFromGroup(t.MotionNoiseSpeed, r);
			for (const r of e.SpecifiedMaterialIndexMap.keys()) {
				var d = e.SpecifiedMaterialIndexMap.get(r),
					f = this.AllBodyInfoList.get(r);
				for (let e = 0; e < d.length; e++) {
					var C = f.MaterialSlotList[d[e]];
					C.SetFloat(
						RenderConfig_1.RenderConfig.MotionRange,
						t.MotionAffectVertexRange,
					),
						C.SetColor(RenderConfig_1.RenderConfig.MotionOffset, l),
						C.SetFloat(RenderConfig_1.RenderConfig.MotionNoiseSpeed, s);
				}
			}
		}
	}
	Thr(e) {
		for (const n of e.SpecifiedMaterialIndexMap.keys()) {
			var t = e.SpecifiedMaterialIndexMap.get(n),
				r = this.AllBodyInfoList.get(n);
			for (let e = 0; e < t.length; e++) {
				var o = r.MaterialSlotList[t[e]];
				o.RevertProperty(RenderConfig_1.RenderConfig.MotionRange),
					o.RevertProperty(RenderConfig_1.RenderConfig.MotionOffset),
					o.RevertProperty(RenderConfig_1.RenderConfig.MotionNoiseSpeed);
			}
		}
	}
	lhr(e) {
		var t = e.SelectedAllParts;
		for (const a of e.SpecifiedMaterialIndexMap.keys()) {
			var r = e.SpecifiedMaterialIndexMap.get(a),
				o = this.AllBodyInfoList.get(a);
			if (t) o.UseAlphaTestCommon();
			else
				for (let e = 0; e < r.length; e++) {
					var n = o.MaterialSlotList[r[e]];
					n.SectionIndex !== RenderConfig_1.INVALID_SECTION_INDEX &&
						o.UseAlphaTest(n.SectionIndex);
				}
		}
	}
	fhr(e) {
		var t = e.DataCache,
			r = e.InterpolateFactor,
			o = RenderUtil_1.RenderUtil.GetFloatFromGroup(t.DitherValue, r);
		for (const t of e.SpecifiedMaterialIndexMap.keys()) {
			var n = e.SpecifiedMaterialIndexMap.get(t),
				a = this.AllBodyInfoList.get(t);
			for (let e = 0; e < n.length; e++) {
				var i = a.MaterialSlotList[n[e]];
				i.SetFloat(RenderConfig_1.RenderConfig.UseDitherEffect2, 1),
					i.SetFloat(RenderConfig_1.RenderConfig.DitherValue2, o);
			}
		}
	}
	Lhr(e) {
		var t = e.SelectedAllParts;
		for (const a of e.SpecifiedMaterialIndexMap.keys()) {
			var r = e.SpecifiedMaterialIndexMap.get(a),
				o = this.AllBodyInfoList.get(a);
			t && o.RevertAlphaTestCommon();
			for (let e = 0; e < r.length; e++) {
				var n = o.MaterialSlotList[r[e]];
				n.RevertProperty(RenderConfig_1.RenderConfig.DitherValue2),
					n.RevertProperty(RenderConfig_1.RenderConfig.UseDitherEffect2),
					t ||
						n.SectionIndex === RenderConfig_1.INVALID_SECTION_INDEX ||
						o.RevertAlphaTest(n.SectionIndex);
			}
		}
	}
	phr(e) {
		var t = e.DataCache,
			r = e.InterpolateFactor;
		for (const d of e.SpecifiedMaterialIndexMap.keys()) {
			var o = e.SpecifiedMaterialIndexMap.get(d),
				n = this.AllBodyInfoList.get(d);
			for (let e = 0; e < o.length; e++) {
				var a = n.MaterialSlotList[o[e]];
				if (void 0 !== t.CustomTextureParameterNames)
					for (let e = 0; e < t.CustomTextureParameterNames.length; e++) {
						var i = RenderUtil_1.RenderUtil.GetTextureFromGroup(
							t.CustomTextureParameterValues[e],
							r,
						);
						i && a.SetTexture(t.CustomTextureParameterNames[e], i);
					}
				if (void 0 !== t.CustomFloatParameterNames)
					for (let e = 0; e < t.CustomFloatParameterNames.length; e++) {
						var l = RenderUtil_1.RenderUtil.GetFloatFromGroup(
							t.CustomFloatParameterValues[e],
							r,
						);
						a.SetFloat(t.CustomFloatParameterNames[e], l);
					}
				if (void 0 !== t.CustomColorParameterNames)
					for (let e = 0; e < t.CustomColorParameterNames.length; e++) {
						var s = RenderUtil_1.RenderUtil.GetColorFromGroup(
							t.CustomColorParameterValues[e],
							r,
						);
						a.SetColor(t.CustomColorParameterNames[e], s);
					}
			}
		}
	}
	Dhr(e) {
		var t = e.DataCache;
		for (const a of e.SpecifiedMaterialIndexMap.keys()) {
			var r = e.SpecifiedMaterialIndexMap.get(a),
				o = this.AllBodyInfoList.get(a);
			for (let e = 0; e < r.length; e++) {
				var n = o.MaterialSlotList[r[e]];
				if (void 0 !== t.CustomTextureParameterNames)
					for (let e = 0; e < t.CustomTextureParameterNames.length; e++)
						n.RevertProperty(t.CustomTextureParameterNames[e]);
				if (void 0 !== t.CustomFloatParameterNames)
					for (let e = 0; e < t.CustomFloatParameterNames.length; e++)
						n.RevertProperty(t.CustomFloatParameterNames[e]);
				if (void 0 !== t.CustomColorParameterNames)
					for (let e = 0; e < t.CustomColorParameterNames.length; e++)
						n.RevertProperty(t.CustomColorParameterNames[e]);
			}
		}
	}
}
exports.CharMaterialContainer = CharMaterialContainer;
