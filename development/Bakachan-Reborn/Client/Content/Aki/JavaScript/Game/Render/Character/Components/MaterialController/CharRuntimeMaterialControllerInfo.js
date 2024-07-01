"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CharMaterialControlRuntimeData =
		exports.CharMaterialControlDataCache =
		exports.CharMaterialControlTextureGroup =
		exports.CharMaterialControlColorGroup =
		exports.CharMaterialControlFloatGroup =
		exports.InterpolateFactor =
			void 0);
const UE = require("ue"),
	Log_1 = require("../../../../../Core/Common/Log"),
	Stats_1 = require("../../../../../Core/Common/Stats"),
	TickSystem_1 = require("../../../../../Core/Tick/TickSystem"),
	FNameUtil_1 = require("../../../../../Core/Utils/FNameUtil"),
	MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
	GlobalData_1 = require("../../../../GlobalData"),
	RenderConfig_1 = require("../../../Config/RenderConfig"),
	RenderModuleConfig_1 = require("../../../Manager/RenderModuleConfig"),
	RenderModuleController_1 = require("../../../Manager/RenderModuleController"),
	RenderUtil_1 = require("../../../Utils/RenderUtil");
class InterpolateFactor {
	constructor() {
		(this.M6o = 0), (this.Factor = 0);
	}
	get Type() {
		return this.M6o;
	}
	set Type(t) {
		this.M6o !== t && (this.M6o = t);
	}
}
exports.InterpolateFactor = InterpolateFactor;
class CharMaterialControlFloatGroup {
	constructor(t, e, a) {
		(this.End = void 0),
			(this.Loop = void 0),
			(this.Start = void 0),
			(this.EndConstant = void 0),
			(this.LoopConstant = void 0),
			(this.StartConstant = void 0) === t || t.bUseCurve
				? (this.End = t)
				: (this.EndConstant = t.Constant),
			void 0 === e || e.bUseCurve
				? (this.Loop = e)
				: (this.LoopConstant = e.Constant),
			void 0 === a || a.bUseCurve
				? (this.Start = a)
				: (this.StartConstant = a.Constant);
	}
}
exports.CharMaterialControlFloatGroup = CharMaterialControlFloatGroup;
class CharMaterialControlColorGroup {
	constructor(t, e, a) {
		(this.End = void 0),
			(this.Loop = void 0),
			(this.Start = void 0),
			(this.EndConstant = void 0),
			(this.LoopConstant = void 0),
			(this.StartConstant = void 0) === t || t.bUseCurve
				? (this.End = t)
				: (this.EndConstant = t.Constant),
			void 0 === e || e.bUseCurve
				? (this.Loop = e)
				: (this.LoopConstant = e.Constant),
			void 0 === a || a.bUseCurve
				? (this.Start = a)
				: (this.StartConstant = a.Constant);
	}
}
exports.CharMaterialControlColorGroup = CharMaterialControlColorGroup;
class CharMaterialControlTextureGroup {
	constructor(t, e, a) {
		(this.End = void 0),
			(this.Loop = void 0),
			(this.Start = void 0),
			(this.End = t),
			(this.Loop = e),
			(this.Start = a);
	}
}
exports.CharMaterialControlTextureGroup = CharMaterialControlTextureGroup;
class CharMaterialControlDataCache {
	constructor(t, e) {
		(this.Data = void 0),
			(this.DataName = void 0),
			(this.RefCount = 0),
			(this.StatCharMaterialControlCacheData = void 0),
			(this.StatCharMaterialControlUpdate = void 0),
			(this.WholeLoopTime = 0),
			(this.DataLoopEnd = void 0),
			(this.DataLoopStart = void 0),
			(this.DataLoopTime = void 0),
			(this.IgnoreTimeDilation = !1),
			(this.DataType = void 0),
			(this.OtherCases = void 0),
			(this.WeaponCases = void 0),
			(this.SpecifiedParts = void 0),
			(this.CustomPartNames = void 0),
			(this.HiddenAfterEffect = !1),
			(this.SpecifiedBodyType = void 0),
			(this.SpecifiedSlotType = void 0),
			(this.MaterialModifyType = void 0),
			(this.UseRim = !1),
			(this.RimRange = void 0),
			(this.RimColor = void 0),
			(this.RimIntensity = void 0),
			(this.RimUseTex = 0),
			(this.RimChannel = void 0),
			(this.RimRevertProperty = !1),
			(this.UseDissolve = !1),
			(this.DissolveChannel = void 0),
			(this.DissolveProgress = void 0),
			(this.DissolveSmooth = void 0),
			(this.DissolveColorIntensity = void 0),
			(this.DissolveColor = void 0),
			(this.DissolveRevertProperty = !1),
			(this.UseOutline = !1),
			(this.OutlineRevertProperty = !1),
			(this.OutlineUseTex = 0),
			(this.UseOuterOutlineEffect = !1),
			(this.OutlineWidth = void 0),
			(this.OutlineColor = void 0),
			(this.OutlineIntensity = void 0),
			(this.ReplaceMaterialInterface = void 0),
			(this.UseParameterModify = !1),
			(this.ColorParameterNames = void 0),
			(this.ColorParameterValues = void 0),
			(this.FloatParameterNames = void 0),
			(this.FloatParameterValues = void 0),
			(this.RevertMaterial = !1),
			(this.BaseColor = void 0),
			(this.EmissionColor = void 0),
			(this.EmissionIntensity = void 0),
			(this.BaseColorIntensity = void 0),
			(this.BaseUseTex = 0),
			(this.EmissionUseTex = 0),
			(this.UseColor = !1),
			(this.ColorRevertProperty = !1),
			(this.UseTextureSample = !1),
			(this.MaskTexture = void 0),
			(this.UvSelection = void 0),
			(this.UseScreenUv = 0),
			(this.TextureScaleAndOffset = void 0),
			(this.TextureSpeed = void 0),
			(this.TextureColorTint = void 0),
			(this.Rotation = void 0),
			(this.UseAlphaToMask = 0),
			(this.TextureMaskRange = void 0),
			(this.TextureSampleRevertProperty = !1),
			(this.UseMotionOffset = !1),
			(this.MotionAffectVertexRange = 0),
			(this.MotionOffsetLength = 0),
			(this.MotionNoiseSpeed = void 0),
			(this.MotionOffsetRevertProperty = !1),
			(this.UseDitherEffect = !1),
			(this.DitherValue = void 0),
			(this.DitherRevertProperty = !1),
			(this.UseCustomMaterialEffect = !1),
			(this.CustomRevertProperty = !1),
			(this.CustomColorParameterNames = void 0),
			(this.CustomColorParameterValues = void 0),
			(this.CustomFloatParameterNames = void 0),
			(this.CustomFloatParameterValues = void 0),
			(this.CustomTextureParameterNames = void 0),
			(this.CustomTextureParameterValues = void 0),
			(this.Data = e),
			(this.DataName = t),
			(this.StatCharMaterialControlUpdate = void 0),
			(this.StatCharMaterialControlCacheData = void 0),
			(this.RefCount = 0),
			(this.DataType = e.DataType);
		t = e.LoopTime;
		var a =
			((this.DataLoopEnd = t.End),
			(this.DataLoopStart = t.Start),
			(this.DataLoopTime = t.Loop),
			(this.WholeLoopTime =
				this.DataLoopStart + this.DataLoopTime + this.DataLoopEnd),
			(this.IgnoreTimeDilation = e.IgnoreTimeDilation),
			(this.SpecifiedBodyType = e.SpecifiedBodyType),
			(this.SpecifiedSlotType = e.SpecifiedSlotType),
			(this.MaterialModifyType = e.MaterialModifyType),
			e.OtherCases);
		let o = a.Num();
		if (0 < o) {
			this.OtherCases = new Set();
			for (let t = 0; t < o; t++) this.OtherCases.add(a.Get(t));
		}
		var i = e.WeaponCases;
		if (0 < (o = i.Num())) {
			this.WeaponCases = new Set();
			for (let t = 0; t < o; t++) this.WeaponCases.add(i.Get(t));
		}
		var r = e.SpecifiedParts;
		if (0 < (o = r.Num())) {
			this.SpecifiedParts = new Array(o);
			for (let t = 0; t < o; t++) this.SpecifiedParts[t] = r.Get(t);
		}
		var s = e.CustomPartNames;
		if (0 < (o = s.Num())) {
			this.CustomPartNames = new Array(o);
			for (let t = 0; t < o; t++) this.CustomPartNames[t] = s.Get(t);
		}
		if (
			((this.UseRim = e.UseRim),
			this.UseRim &&
				((this.RimUseTex = e.RimUseTex ? 1 : 0),
				(this.RimChannel = RenderUtil_1.RenderUtil.GetSelectedChannel(
					e.RimChannel,
				)),
				(this.RimRevertProperty = e.RimRevertProperty),
				(t = e.RimRange),
				(this.RimRange = new CharMaterialControlFloatGroup(
					this.DataLoopEnd ? t.End : void 0,
					this.DataLoopTime ? t.Loop : void 0,
					this.DataLoopStart ? t.Start : void 0,
				)),
				(t = e.RimColor),
				(this.RimColor = new CharMaterialControlColorGroup(
					this.DataLoopEnd ? t.End : void 0,
					this.DataLoopTime ? t.Loop : void 0,
					this.DataLoopStart ? t.Start : void 0,
				)),
				(t = e.RimIntensity),
				(this.RimIntensity = new CharMaterialControlFloatGroup(
					this.DataLoopEnd ? t.End : void 0,
					this.DataLoopTime ? t.Loop : void 0,
					this.DataLoopStart ? t.Start : void 0,
				))),
			(this.UseDissolve = e.UseDissolve),
			this.UseDissolve &&
				((t = e.DissolveChannel),
				(this.DissolveChannel =
					0 === t
						? new UE.LinearColor(1, 0, 0, 0)
						: RenderUtil_1.RenderUtil.GetSelectedChannel(e.DissolveChannel)),
				(t = e.DissolveProgress),
				(this.DissolveProgress = new CharMaterialControlFloatGroup(
					this.DataLoopEnd ? t.End : void 0,
					this.DataLoopTime ? t.Loop : void 0,
					this.DataLoopStart ? t.Start : void 0,
				)),
				(t = e.DissolveSmooth),
				(this.DissolveSmooth = new CharMaterialControlFloatGroup(
					this.DataLoopEnd ? t.End : void 0,
					this.DataLoopTime ? t.Loop : void 0,
					this.DataLoopStart ? t.Start : void 0,
				)),
				(t = e.DissolveColorIntensity),
				(this.DissolveColorIntensity = new CharMaterialControlFloatGroup(
					this.DataLoopEnd ? t.End : void 0,
					this.DataLoopTime ? t.Loop : void 0,
					this.DataLoopStart ? t.Start : void 0,
				)),
				(t = e.DissolveColor),
				(this.DissolveColor = new CharMaterialControlColorGroup(
					this.DataLoopEnd ? t.End : void 0,
					this.DataLoopTime ? t.Loop : void 0,
					this.DataLoopStart ? t.Start : void 0,
				)),
				(this.DissolveRevertProperty = e.DissolveRevertProperty)),
			(this.UseOutline = e.UseOutline),
			this.UseOutline &&
				((this.OutlineRevertProperty = e.OutlineRevertProperty),
				(this.OutlineUseTex = e.OutlineUseTex ? 1 : 0),
				(this.UseOuterOutlineEffect = e.UseOuterOutlineEffect),
				(t = e.OutlineWidth),
				(this.OutlineWidth = new CharMaterialControlFloatGroup(
					this.DataLoopEnd ? t.End : void 0,
					this.DataLoopTime ? t.Loop : void 0,
					this.DataLoopStart ? t.Start : void 0,
				)),
				(t = e.OutlineColor),
				(this.OutlineColor = new CharMaterialControlColorGroup(
					this.DataLoopEnd ? t.End : void 0,
					this.DataLoopTime ? t.Loop : void 0,
					this.DataLoopStart ? t.Start : void 0,
				)),
				(t = e.OutlineIntensity),
				(this.OutlineIntensity = new CharMaterialControlFloatGroup(
					this.DataLoopEnd ? t.End : void 0,
					this.DataLoopTime ? t.Loop : void 0,
					this.DataLoopStart ? t.Start : void 0,
				))),
			GlobalData_1.GlobalData.IsEs3 &&
			e.MobileUseDifferentMaterial &&
			e.ReplaceMaterialMobile
				? (this.ReplaceMaterialInterface = e.ReplaceMaterialMobile)
				: (this.ReplaceMaterialInterface = e.ReplaceMaterial),
			this.ReplaceMaterialInterface)
		) {
			(this.UseParameterModify = e.UseParameterModify),
				(this.RevertMaterial = e.RevertMaterial);
			var h = e.ColorParameters;
			if (0 < (o = h.Num())) {
				(this.ColorParameterNames = new Array()),
					(this.ColorParameterValues = new Array());
				for (let t = 0; t < o; t++) {
					var l = h.Get(t);
					l.ParameterName.op_Equality(FNameUtil_1.FNameUtil.NONE) ||
						(this.ColorParameterNames.push(l.ParameterName),
						(l = l.ParameterValue),
						this.ColorParameterValues.push(
							new CharMaterialControlColorGroup(
								this.DataLoopEnd ? l.End : void 0,
								this.DataLoopTime ? l.Loop : void 0,
								this.DataLoopStart ? l.Start : void 0,
							),
						));
				}
			}
			var n = e.FloatParameters;
			if (0 < (o = n.Num())) {
				(this.FloatParameterNames = new Array()),
					(this.FloatParameterValues = new Array());
				for (let t = 0; t < o; t++) {
					var C = n.Get(t);
					C.ParameterName.op_Equality(FNameUtil_1.FNameUtil.NONE) ||
						(this.FloatParameterNames.push(C.ParameterName),
						(C = C.ParameterValue),
						this.FloatParameterValues.push(
							new CharMaterialControlFloatGroup(
								this.DataLoopEnd ? C.End : void 0,
								this.DataLoopTime ? C.Loop : void 0,
								this.DataLoopStart ? C.Start : void 0,
							),
						));
				}
			}
		}
		if (
			((this.UseColor = e.UseColor),
			this.UseColor &&
				((t = e.BaseColor),
				(this.BaseColor = new CharMaterialControlColorGroup(
					this.DataLoopEnd ? t.End : void 0,
					this.DataLoopTime ? t.Loop : void 0,
					this.DataLoopStart ? t.Start : void 0,
				)),
				(t = e.EmissionColor),
				(this.EmissionColor = new CharMaterialControlColorGroup(
					this.DataLoopEnd ? t.End : void 0,
					this.DataLoopTime ? t.Loop : void 0,
					this.DataLoopStart ? t.Start : void 0,
				)),
				(t = e.EmissionIntensity),
				(this.EmissionIntensity = new CharMaterialControlFloatGroup(
					this.DataLoopEnd ? t.End : void 0,
					this.DataLoopTime ? t.Loop : void 0,
					this.DataLoopStart ? t.Start : void 0,
				)),
				(t = e.BaseColorIntensity),
				(this.BaseColorIntensity = new CharMaterialControlFloatGroup(
					this.DataLoopEnd ? t.End : void 0,
					this.DataLoopTime ? t.Loop : void 0,
					this.DataLoopStart ? t.Start : void 0,
				)),
				(this.BaseUseTex = e.BaseUseTex ? 1 : 0),
				(this.EmissionUseTex = e.EmissionUseTex ? 1 : 0),
				(this.ColorRevertProperty = e.ColorRevertProperty)),
			(this.UseTextureSample = e.UseTextureSample),
			this.UseTextureSample)
		) {
			switch (
				((this.MaskTexture = e.MaskTexture),
				(this.UseScreenUv = 0),
				e.UVSelection)
			) {
				case 0:
					this.UvSelection = new UE.LinearColor(1, 0, 0, 0);
					break;
				case 1:
					this.UvSelection = new UE.LinearColor(0, 1, 0, 0);
					break;
				case 2:
					this.UvSelection = new UE.LinearColor(0, 0, 1, 0);
					break;
				case 3:
					this.UvSelection = new UE.LinearColor(0, 0, 0, 1);
					break;
				case 4:
					(this.UseScreenUv = 1),
						(this.UvSelection = new UE.LinearColor(0, 0, 0, 0));
					break;
				default:
					this.UvSelection = new UE.LinearColor(0, 0, 0, 0);
			}
			(t = e.TextureScaleAndOffset),
				(t =
					((this.TextureScaleAndOffset = new CharMaterialControlColorGroup(
						this.DataLoopEnd ? t.End : void 0,
						this.DataLoopTime ? t.Loop : void 0,
						this.DataLoopStart ? t.Start : void 0,
					)),
					e.TextureSpeed)),
				(t =
					((this.TextureSpeed = new CharMaterialControlColorGroup(
						this.DataLoopEnd ? t.End : void 0,
						this.DataLoopTime ? t.Loop : void 0,
						this.DataLoopStart ? t.Start : void 0,
					)),
					e.TextureColorTint)),
				(t =
					((this.TextureColorTint = new CharMaterialControlColorGroup(
						this.DataLoopEnd ? t.End : void 0,
						this.DataLoopTime ? t.Loop : void 0,
						this.DataLoopStart ? t.Start : void 0,
					)),
					e.Rotation)),
				(t =
					((this.Rotation = new CharMaterialControlFloatGroup(
						this.DataLoopEnd ? t.End : void 0,
						this.DataLoopTime ? t.Loop : void 0,
						this.DataLoopStart ? t.Start : void 0,
					)),
					e.TextureMaskRange));
			(this.TextureMaskRange = new CharMaterialControlFloatGroup(
				this.DataLoopEnd ? t.End : void 0,
				this.DataLoopTime ? t.Loop : void 0,
				this.DataLoopStart ? t.Start : void 0,
			)),
				(this.UseAlphaToMask = e.UseAlphaToMask ? 1 : 0),
				(this.TextureSampleRevertProperty = e.TextureSampleRevertProperty);
		}
		if (
			((this.UseMotionOffset = e.UseMotionOffset),
			this.UseMotionOffset &&
				((this.MotionAffectVertexRange = e.MotionAffectVertexRange),
				(this.MotionOffsetLength = e.MotionOffsetLength),
				(t = e.MotionNoiseSpeed),
				(this.MotionNoiseSpeed = new CharMaterialControlFloatGroup(
					this.DataLoopEnd ? t.End : void 0,
					this.DataLoopTime ? t.Loop : void 0,
					this.DataLoopStart ? t.Start : void 0,
				)),
				(this.MotionOffsetRevertProperty = e.MotionOffsetRevertProperty)),
			(this.UseDitherEffect = e.UseDitherEffect),
			this.UseDitherEffect &&
				((t = e.DitherValue),
				(this.DitherValue = new CharMaterialControlFloatGroup(
					this.DataLoopEnd ? t.End : void 0,
					this.DataLoopTime ? t.Loop : void 0,
					this.DataLoopStart ? t.Start : void 0,
				)),
				(this.DitherRevertProperty = e.DitherRevertProperty)),
			(this.UseCustomMaterialEffect = e.UseCustomMaterialEffect),
			this.UseCustomMaterialEffect)
		) {
			this.CustomRevertProperty = e.CustomRevertProperty;
			var d = e.CustomColorParameters;
			if (0 < (o = d.Num())) {
				(this.CustomColorParameterNames = new Array()),
					(this.CustomColorParameterValues = new Array());
				for (let t = 0; t < o; t++) {
					var p = d.Get(t);
					p.ParameterName.op_Equality(FNameUtil_1.FNameUtil.NONE) ||
						(this.CustomColorParameterNames.push(p.ParameterName),
						(p = p.ParameterValue),
						this.CustomColorParameterValues.push(
							new CharMaterialControlColorGroup(
								this.DataLoopEnd ? p.End : void 0,
								this.DataLoopTime ? p.Loop : void 0,
								this.DataLoopStart ? p.Start : void 0,
							),
						));
				}
			}
			var m = e.CustomFloatParameters;
			if (0 < (o = m.Num())) {
				(this.CustomFloatParameterNames = new Array()),
					(this.CustomFloatParameterValues = new Array());
				for (let t = 0; t < o; t++) {
					var D = m.Get(t);
					D.ParameterName.op_Equality(FNameUtil_1.FNameUtil.NONE) ||
						(this.CustomFloatParameterNames.push(D.ParameterName),
						(D = D.ParameterValue),
						this.CustomFloatParameterValues.push(
							new CharMaterialControlFloatGroup(
								this.DataLoopEnd ? D.End : void 0,
								this.DataLoopTime ? D.Loop : void 0,
								this.DataLoopStart ? D.Start : void 0,
							),
						));
				}
			}
			var c = e.CustomTextureParameters;
			if (0 < (o = c.Num())) {
				(this.CustomTextureParameterNames = new Array()),
					(this.CustomTextureParameterValues = new Array());
				for (let t = 0; t < o; t++) {
					var v = c.Get(t);
					v.ParameterName.op_Equality(FNameUtil_1.FNameUtil.NONE) ||
						(this.CustomTextureParameterNames.push(v.ParameterName),
						(v = v.ParameterValue),
						this.CustomTextureParameterValues.push(
							new CharMaterialControlTextureGroup(
								this.DataLoopEnd ? v.End : void 0,
								this.DataLoopTime ? v.Loop : void 0,
								this.DataLoopStart ? v.Start : void 0,
							),
						));
				}
			}
		}
		this.HiddenAfterEffect = e.HiddenAfterEffect;
	}
}
exports.CharMaterialControlDataCache = CharMaterialControlDataCache;
class CharMaterialControlDataCacheMgr {
	constructor() {
		(this.DataCacheMap = new Map()),
			(this.DataCacheGcCountDownTime = new Map()),
			(this.WaitingRemoveDataCacheNames = new Array()),
			(this.gW = void 0),
			(this.e8 = 0),
			(this.r6 = (t) => {
				if (((this.e8 -= t), !(0 < this.e8))) {
					var e =
						(t = GlobalData_1.GlobalData.IsPlayInEditor
							? CharMaterialControlDataCacheMgr.Ohr
							: CharMaterialControlDataCacheMgr.khr) - this.e8;
					for (const t of this.DataCacheGcCountDownTime.keys()) {
						var a = this.DataCacheGcCountDownTime.get(t) - e;
						a <= 0
							? this.WaitingRemoveDataCacheNames.push(t)
							: this.DataCacheGcCountDownTime.set(t, a);
					}
					if (0 < this.WaitingRemoveDataCacheNames.length) {
						for (const t of this.WaitingRemoveDataCacheNames)
							this.DataCacheGcCountDownTime.delete(t),
								this.DataCacheMap.has(t) && this.DataCacheMap.delete(t);
						Log_1.Log.CheckInfo() &&
							Log_1.Log.Info("RenderCharacter", 41, "DataCache删除", [
								"数量",
								this.WaitingRemoveDataCacheNames.length,
							]),
							(this.WaitingRemoveDataCacheNames.length = 0);
					}
					this.e8 = t;
				}
			}),
			(this.e8 = GlobalData_1.GlobalData.IsPlayInEditor
				? CharMaterialControlDataCacheMgr.Ohr
				: CharMaterialControlDataCacheMgr.khr),
			(this.gW = void 0);
	}
	static Get() {
		return (
			this.Me ||
				((this.Me = new CharMaterialControlDataCacheMgr()),
				TickSystem_1.TickSystem.Add(
					this.Me.r6,
					"CharMaterialControlDataCacheMgr.Tick",
					3,
				)),
			this.Me
		);
	}
	GetOrCreateDataCache(t) {
		if (t) {
			var e = t.GetName();
			let a = this.DataCacheMap.get(e);
			return (
				a ||
					((a = new CharMaterialControlDataCache(e, t)),
					this.DataCacheMap.set(e, a)),
				++a.RefCount,
				this.DataCacheGcCountDownTime.has(e) &&
					this.DataCacheGcCountDownTime.delete(e),
				a
			);
		}
	}
	RecycleDataCache(t) {
		var e,
			a = this.DataCacheMap.get(t);
		a
			? (--a.RefCount,
				a.RefCount <= 0 &&
					((e = GlobalData_1.GlobalData.IsPlayInEditor
						? CharMaterialControlDataCacheMgr.Fhr
						: CharMaterialControlDataCacheMgr.Vhr),
					this.DataCacheGcCountDownTime.set(t, e),
					a.RefCount < 0) &&
					Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"RenderCharacter",
						41,
						"RecycleDataCache: dataCache引用计数出错",
					))
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"RenderCharacter",
					41,
					"RecycleDataCache: dataCache不存在",
				);
	}
}
(CharMaterialControlDataCacheMgr.Vhr = 6e4),
	(CharMaterialControlDataCacheMgr.Fhr = 0),
	(CharMaterialControlDataCacheMgr.khr = 1e4),
	(CharMaterialControlDataCacheMgr.Ohr = 10),
	(CharMaterialControlDataCacheMgr.Me = void 0);
class CharMaterialControlRuntimeData {
	constructor() {
		(this.Id = 0),
			(this.DataCache = void 0),
			(this.UserData = void 0),
			(this.CurrentTimeCounter = 0),
			(this.WholeLoopTimeCounter = 0),
			(this.InterpolateFactor = void 0),
			(this.LoopTimeCounter = 0),
			(this.SpecifiedMaterialIndexMap = void 0),
			(this.SelectedAllBodies = !1),
			(this.SelectedAllParts = !1),
			(this.ReadyToDie = !1),
			(this.HasEntered = !1),
			(this.IsDead = !1),
			(this.HasReverted = !1),
			(this.ReplaceMaterial = void 0),
			(this.MotionStartLocation = void 0),
			(this.TargetSkeletalMesh = void 0),
			(this.MotionEndLocation = void 0),
			(this.Hhr = void 0),
			(this.jhr = void 0);
	}
	Init(t, e, a) {
		(this.Id = t),
			(this.DataCache =
				CharMaterialControlDataCacheMgr.Get().GetOrCreateDataCache(e)),
			(this.CurrentTimeCounter = 0),
			(this.WholeLoopTimeCounter = 0),
			(this.LoopTimeCounter = 0),
			(this.UserData = a),
			(this.InterpolateFactor = new InterpolateFactor()),
			(this.InterpolateFactor.Type = 0),
			(this.InterpolateFactor.Factor = 0),
			(this.HasEntered = !1),
			(this.HasReverted = !1),
			(this.IsDead = !1),
			(this.ReadyToDie = !1),
			(this.SelectedAllBodies = !1),
			(this.SelectedAllParts = !1),
			(this.SpecifiedMaterialIndexMap = new Map()),
			(this.ReplaceMaterial = void 0),
			(this.jhr = void 0),
			(this.Hhr = void 0);
	}
	Destroy() {
		if (
			(CharMaterialControlDataCacheMgr.Get().RecycleDataCache(
				this.DataCache.DataName,
			),
			(this.DataCache = void 0),
			this.jhr && this.jhr)
		) {
			for (const t of this.jhr) t(this.Id);
			this.ClearDestroyCallback();
		}
	}
	ClearDestroyCallback() {
		this.jhr = void 0;
	}
	AddDestroyCallback(t) {
		return (
			!!t &&
			(this.jhr || (this.jhr = new Set()), !this.jhr.has(t)) &&
			(this.jhr.add(t), !0)
		);
	}
	RemoveDestroyCallback(t) {
		return !!t && !!this.jhr && this.jhr.delete(t);
	}
	SetSpecifiedMaterialIndex(t) {
		(this.SelectedAllBodies =
			0 === this.DataCache.SpecifiedBodyType &&
			void 0 === this.DataCache.WeaponCases &&
			void 0 === this.DataCache.OtherCases),
			(this.SelectedAllParts =
				0 === this.DataCache.SpecifiedSlotType &&
				void 0 === this.DataCache.SpecifiedParts &&
				void 0 === this.DataCache.CustomPartNames);
		var e = RenderConfig_1.RenderConfig.GetBodyNamesByBodyType(
			this.DataCache.SpecifiedBodyType,
		);
		if (e)
			for (let m = 0; m < e.length; m++) {
				var a = e[m],
					o = t.AllBodyInfoList.get(a);
				if (o) {
					var i = o.BodyType;
					if (
						(1 !== i ||
							void 0 === this.DataCache.WeaponCases ||
							this.DataCache.WeaponCases.has(a)) &&
						(3 !== i ||
							void 0 === this.DataCache.OtherCases ||
							this.DataCache.OtherCases.has(a))
					) {
						var r = o.SpecifiedSlotList[this.DataCache.SpecifiedSlotType],
							s = new Array();
						for (let t = 0; t < r.length; t++) {
							var h = r[t],
								l = o.MaterialSlotList[h];
							let e = !1,
								a = !0;
							var n = this.DataCache.SpecifiedParts;
							if (void 0 !== n) {
								var C = n.length;
								if (0 < C) {
									a = !1;
									for (let t = 0; t < C; t++)
										if (l.MaterialPartType === n[t]) {
											e = !0;
											break;
										}
								}
							}
							var d = this.DataCache.CustomPartNames;
							if (void 0 !== d) {
								var p = d.length;
								if (0 < p) {
									a = !1;
									for (let t = 0; t < p; t++)
										if (l.SlotName.includes(d[t])) {
											e = !0;
											break;
										}
								}
							}
							(e || a) && s.push(h);
						}
						this.SpecifiedMaterialIndexMap.set(a, s);
					}
				}
			}
		else
			Log_1.Log.CheckError() &&
				Log_1.Log.Error("RenderUtil", 14, "", [
					"BODY类型未配置:",
					this.DataCache.SpecifiedBodyType,
				]);
	}
	UpdateState(t, e) {
		if (this.IsDead)
			Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"RenderCharacter",
					41,
					"RuntimeData UpdateState: 已经结束的效果，还在更新",
					["id", this.Id],
				);
		else if (2 !== this.DataCache.DataType)
			if (this.DataCache.WholeLoopTime <= 0)
				Log_1.Log.CheckError() &&
					Log_1.Log.Error("RenderCharacter", 41, "材质控制器的总时长需大于0", [
						"data",
						this.DataCache.DataName,
					]),
					(this.IsDead = !0);
			else if (
				1 === this.DataCache.DataType &&
				this.DataCache.DataLoopTime <= 0
			)
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"RenderCharacter",
						41,
						"Runtime类型材质控制器的Loop时长需大于0",
						["data", this.DataCache.DataName],
					),
					(this.IsDead = !0);
			else if (
				this.DataCache.IgnoreTimeDilation ||
				!RenderModuleController_1.RenderModuleController.IsGamePaused
			) {
				let a = t;
				this.DataCache.IgnoreTimeDilation || (a = t * e),
					this.Whr(a),
					(this.CurrentTimeCounter += a),
					(this.WholeLoopTimeCounter += a),
					(this.LoopTimeCounter += a),
					(t = this.GetSpecifiedLoopTime(this.InterpolateFactor.Type)),
					(this.LoopTimeCounter %= t),
					(this.InterpolateFactor.Factor = RenderUtil_1.RenderUtil.Clamp(
						this.LoopTimeCounter / t,
						0,
						1,
					)),
					0 === this.DataCache.DataType &&
						this.CurrentTimeCounter >= this.DataCache.WholeLoopTime - a &&
						(this.IsDead = !0),
					this.ReadyToDie &&
						this.CurrentTimeCounter >= this.DataCache.DataLoopEnd &&
						(this.IsDead = !0);
			}
	}
	UpdateEffect(t) {
		this.HasEntered || (t.StateEnter(this), (this.HasEntered = !0)),
			this.IsDead ? t.StateRevert(this) : t.StateUpdate(this);
	}
	Whr(t) {
		var e = this.DataCache.DataLoopStart,
			a = this.DataCache.DataLoopTime;
		!this.ReadyToDie && this.WholeLoopTimeCounter <= e - t
			? (0 !== this.InterpolateFactor.Type && (this.LoopTimeCounter = 0),
				(this.InterpolateFactor.Type = 0))
			: !this.ReadyToDie && this.WholeLoopTimeCounter <= e + a - t
				? (1 !== this.InterpolateFactor.Type && (this.LoopTimeCounter = 0),
					(this.InterpolateFactor.Type = 1))
				: this.WholeLoopTimeCounter <= this.DataCache.WholeLoopTime &&
					(2 !== this.InterpolateFactor.Type && (this.LoopTimeCounter = 0),
					this.ReadyToDie || 1 !== this.DataCache.DataType
						? (this.InterpolateFactor.Type = 2)
						: ((this.InterpolateFactor.Type = 1),
							(this.WholeLoopTimeCounter -= a)));
	}
	SetReadyToDie() {
		if (((this.ReadyToDie = !0), 2 === this.InterpolateFactor.Type)) {
			var t = this.DataCache.WholeLoopTime - this.WholeLoopTimeCounter;
			if (t < this.DataCache.DataLoopEnd)
				return void (this.CurrentTimeCounter = this.DataCache.DataLoopEnd - t);
			Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"RenderCharacter",
					41,
					"SetReadyToDie: End阶段的剩余时间小于End时间",
					["leftTime", t],
					["WholeLoopTimeCounter", this.WholeLoopTimeCounter],
					["WholeLoopTime", this.DataCache.WholeLoopTime],
					["DataLoopEnd", this.DataCache.DataLoopEnd],
				);
		}
		this.CurrentTimeCounter = 0;
	}
	SetProgress(t) {
		2 === this.DataCache.DataType &&
			((t = MathUtils_1.MathUtils.Clamp(t, 0, 1)),
			(t = this.DataCache.WholeLoopTime * t),
			this.Khr(t));
	}
	Khr(t) {
		var e = this.DataCache.DataLoopStart,
			a = this.DataCache.DataLoopTime;
		t <= e
			? ((this.InterpolateFactor.Type = 0),
				(this.InterpolateFactor.Factor = MathUtils_1.MathUtils.SafeDivide(
					t,
					e,
				)))
			: t <= e + a
				? ((this.InterpolateFactor.Type = 1),
					(this.InterpolateFactor.Factor = MathUtils_1.MathUtils.SafeDivide(
						t - e,
						a,
					)))
				: t <= this.DataCache.WholeLoopTime &&
					((this.InterpolateFactor.Type = 2),
					(this.InterpolateFactor.Factor = MathUtils_1.MathUtils.SafeDivide(
						t - e - a,
						this.DataCache.DataLoopEnd,
					))),
			(this.InterpolateFactor.Factor = MathUtils_1.MathUtils.Clamp(
				this.InterpolateFactor.Factor,
				0,
				1,
			));
	}
	GetSpecifiedLoopTime(t) {
		switch (t) {
			case 0:
				return this.DataCache.DataLoopStart ?? 0;
			case 1:
				return this.DataCache.DataLoopTime ?? 0;
			case 2:
				return this.DataCache.DataLoopEnd ?? 0;
			default:
				return 0;
		}
	}
}
exports.CharMaterialControlRuntimeData = CharMaterialControlRuntimeData;
