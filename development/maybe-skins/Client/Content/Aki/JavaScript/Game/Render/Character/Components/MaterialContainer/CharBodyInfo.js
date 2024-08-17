"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CharBodyInfo = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../../Core/Common/Log"),
	Stats_1 = require("../../../../../Core/Common/Stats"),
	RenderConfig_1 = require("../../../Config/RenderConfig"),
	CharMaterialInfo_1 = require("./CharMaterialInfo");
class CharBodyInfo {
	constructor() {
		(this.ActorName = ""),
			(this.BodyName = ""),
			(this.BodyType = void 0),
			(this.MaterialSlotList = void 0),
			(this.SpecifiedSlotList = void 0),
			(this.SkeletalComp = void 0),
			(this.SkeletalMesh = void 0),
			(this.bar = void 0),
			(this.qar = !1),
			(this.Gar = !1),
			(this.Nar = !1),
			(this.Oar = !1),
			(this.kar = 0),
			(this.Far = 0),
			(this.Har = 0),
			(this.jar = 0),
			(this.War = void 0),
			(this.Kar = void 0),
			(this.Qar = void 0),
			(this.Xar = void 0),
			(this.$ar = void 0),
			(this.Yar = void 0),
			(this.Jar = void 0),
			(this.zar = void 0),
			(this.Zar = void 0),
			(this.Aar = void 0);
	}
	Init(t, e, r, a, i) {
		(this.Aar = i),
			(this.ActorName = t),
			(this.BodyName = e),
			(this.BodyType = RenderConfig_1.RenderConfig.GetBodyTypeByName(e)),
			(this.SkeletalComp = r),
			(this.SkeletalMesh = r.SkeletalMesh),
			(this.SpecifiedSlotList = new Array(4)),
			(this.SpecifiedSlotList[0] = new Array()),
			(this.SpecifiedSlotList[2] = new Array()),
			(this.SpecifiedSlotList[1] = new Array()),
			(this.SpecifiedSlotList[3] = new Array());
		var s = r.GetMaterialSlotNames(),
			o = s.Num();
		this.MaterialSlotList = new Array(o);
		for (let t = 0; t < o; t++) {
			var h =
				UE.KuroRenderingRuntimeBPPluginBPLibrary.GetSkeletalMaterialInterface(
					r.SkeletalMesh,
					t,
				);
			if (
				((this.MaterialSlotList[t] = new CharMaterialInfo_1.CharMaterialSlot()),
				h?.IsValid())
			) {
				let e;
				if (
					(e =
						a && h instanceof UE.MaterialInstanceDynamic
							? h
							: r.CreateDynamicMaterialInstance(t, h))?.IsValid()
				)
					switch (
						(this.MaterialSlotList[t].Init(t, s.Get(t).toString(), e),
						this.SpecifiedSlotList[0].push(t),
						this.MaterialSlotList[t].SlotType)
					) {
						case 1:
						case 4:
							this.SpecifiedSlotList[2].push(t),
								this.SpecifiedSlotList[1].push(t);
							break;
						case 2:
							this.SpecifiedSlotList[3].push(t),
								this.SpecifiedSlotList[1].push(t);
					}
				else
					Log_1.Log.CheckWarn() &&
						Log_1.Log.Warn(
							"RenderCharacter",
							41,
							"CharBodyInfo.Init: dynamicMaterial is not valid",
						);
			} else
				Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn(
						"RenderCharacter",
						41,
						"CharBodyInfo.Init: originalMat is not valid",
					);
		}
		var l = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetCharacterSectionCount(
			this.SkeletalMesh,
		);
		(this.bar = new Array(l)),
			(this.War = new Array(l)),
			(this.Kar = new Array(l)),
			(this.Qar = new Array(l)),
			(this.Xar = new Array(l));
		for (let t = 0; t < l; t++) {
			var n =
				UE.KuroRenderingRuntimeBPPluginBPLibrary.GetCharacterSectionMaterialIndex(
					this.SkeletalMesh,
					t,
				);
			(this.MaterialSlotList[n].SectionIndex = t),
				(this.bar[t] = n),
				(this.War[t] = 0),
				(this.Kar[t] = 0),
				(this.Qar[t] = 0),
				(this.Xar[t] = 0);
		}
		(this.qar = !0),
			(this.Gar = !0),
			(this.Nar = !0),
			(this.Oar = !0),
			(this.kar = 0),
			(this.Far = 0),
			(this.Har = 0),
			(this.jar = 0),
			this.ActorName,
			this.BodyName,
			(this.$ar = void 0),
			(this.Yar = void 0),
			(this.Zar = void 0),
			(this.Jar = void 0),
			(this.zar = void 0);
	}
	UseBattleMaskCommon() {
		++this.jar,
			(this.Oar = !0),
			this.jar >= RenderConfig_1.RenderConfig.RefErrorCount &&
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"RenderCharacter",
						14,
						"Battle类型引用异常，检查UseBattleMask调用情况",
						["Battle Mask Reference Count", this.jar],
						["Actor", this.ActorName],
					),
				this.ehr());
	}
	UseBattleMask(t) {
		var e = this.Xar.length;
		t < e
			? (++this.Xar[t],
				(this.Oar = !0),
				this.Xar[t] >= RenderConfig_1.RenderConfig.RefErrorCount &&
					Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"RenderCharacter",
						14,
						"BattleMask类型引用异常，检查UseBattleMask调用情况",
						["Battle Mask Reference Count", this.Xar[t]],
						["Actor", this.ActorName],
					))
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"RenderCharacter",
					14,
					"UseBattleMask索引超过最大值",
					["索引", t],
					["最大值", e - 1],
					["Actor", this.ActorName],
				);
	}
	RevertBattleMaskCommon() {
		0 < this.jar && (--this.jar, (this.Oar = !0)), this.UpdateBattleMask();
	}
	RevertBattleMask(t) {
		var e = this.Xar.length;
		t < e
			? 0 < this.Xar[t] && (--this.Xar[t], (this.Oar = !0))
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"RenderCharacter",
					14,
					"RevertBattleMask索引超过最大值",
					["索引", t],
					["最大值", e - 1],
					["Actor", this.ActorName],
				);
	}
	UseBattleCommon() {
		++this.Har,
			(this.Nar = !0),
			this.Har >= RenderConfig_1.RenderConfig.RefErrorCount &&
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"RenderCharacter",
						14,
						"Battle类型引用异常，检查UseBattleCommon调用情况",
						["Battle Reference Count", this.Har],
						["Actor", this.ActorName],
					),
				this.ehr());
	}
	UseBattle(t) {
		var e = this.Qar.length;
		t < e
			? (++this.Qar[t],
				(this.Nar = !0),
				this.Qar[t] >= RenderConfig_1.RenderConfig.RefErrorCount &&
					(Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"RenderCharacter",
							14,
							"Battle类型引用异常，检查UseBattle调用情况",
							["Battle Reference Count", this.Qar[t]],
							["Actor", this.ActorName],
						),
					this.ehr()))
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"RenderCharacter",
					14,
					"UseBattle索引超过最大值",
					["索引", t],
					["最大值", e - 1],
					["Actor", this.ActorName],
				);
	}
	RevertBattleCommon() {
		0 < this.Har && (--this.Har, (this.Nar = !0)), this.UpdateBattle();
	}
	RevertBattle(t) {
		var e = this.Qar.length;
		t < e
			? 0 < this.Qar[t] && (--this.Qar[t], (this.Nar = !0))
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"RenderCharacter",
					14,
					"RevertBattle索引超过最大值",
					["索引", t],
					["最大值", e - 1],
					["Actor", this.ActorName],
				);
	}
	UseAlphaTestCommon() {
		++this.kar,
			(this.qar = !0),
			this.kar >= RenderConfig_1.RenderConfig.RefErrorCount &&
				Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"RenderCharacter",
					14,
					"AlphaTest类型引用异常，检查UseAlphaTest调用情况",
					["AlphaTest Reference Count", this.kar],
					["Actor", this.ActorName],
				);
	}
	UseAlphaTest(t) {
		var e = this.War.length;
		t < e
			? (++this.War[t],
				(this.qar = !0),
				this.War[t] >= RenderConfig_1.RenderConfig.RefErrorCount &&
					Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"RenderCharacter",
						14,
						"AlphaTestMask类型引用异常，检查UseAlphaTest调用情况",
						["AlphaTest Reference Count", this.War[t]],
						["Actor", this.ActorName],
					))
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"RenderCharacter",
					14,
					"UseAlphaTestMask索引超过最大值",
					["索引", t],
					["最大值", e - 1],
					["Actor", this.ActorName],
				);
	}
	RevertAlphaTestCommon() {
		0 < this.kar && (--this.kar, (this.qar = !0)), this.UpdateAlphaTest();
	}
	RevertAlphaTest(t) {
		var e = this.War.length;
		t < e
			? 0 < this.War[t] && (--this.War[t], (this.qar = !0))
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"RenderCharacter",
					14,
					"RevertAlphaTestMask索引超过最大值",
					["索引", t],
					["最大值", e - 1],
					["Actor", this.ActorName],
				);
	}
	UseOutlineStencilTestCommon() {
		++this.Far,
			(this.Gar = !0),
			this.Far >= RenderConfig_1.RenderConfig.RefErrorCount &&
				Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"RenderCharacter",
					14,
					"StencilOutline类型引用异常，检查UseAlphaTest调用情况",
					["StencilOutline Reference Count", this.kar],
					["Actor", this.ActorName],
				);
	}
	UseOutlineStencilTest(t) {
		var e = this.Kar.length;
		t < e
			? (++this.Kar[t],
				(this.Gar = !0),
				this.Kar[t] >= RenderConfig_1.RenderConfig.RefErrorCount &&
					Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"RenderCharacter",
						14,
						"StencilOutlineMask类型引用异常，检查UseStencilOutline调用情况",
						["StencilOutline Reference Count", this.Kar[t]],
						["Actor", this.ActorName],
					))
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"RenderCharacter",
					14,
					"UseStencilOutlineMask索引超过最大值",
					["索引", t],
					["最大值", e - 1],
					["Actor", this.ActorName],
				);
	}
	RevertOutlineStencilTestCommon() {
		0 < this.Far && (--this.Far, (this.Gar = !0)),
			this.UpdateStencilOutlineTest();
	}
	RevertOutlineStencilTest(t) {
		var e = this.Kar.length;
		t < e
			? 0 < this.Kar[t] && (--this.Kar[t], (this.Gar = !0))
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"RenderCharacter",
					14,
					"RevertOutlineStencilMask索引超过最大值",
					["索引", t],
					["最大值", e - 1],
					["Actor", this.ActorName],
				);
	}
	SetColor(t, e, r) {
		var a = this.SpecifiedSlotList[r],
			i = a.length;
		for (let r = 0; r < i; r++) this.MaterialSlotList[a[r]].SetColor(t, e);
	}
	RevertColor(t, e) {
		var r = this.SpecifiedSlotList[e],
			a = r.length,
			i = t.toString();
		for (let t = 0; t < a; t++) this.MaterialSlotList[r[t]].RevertColor(i);
	}
	SetFloat(t, e, r) {
		var a = this.SpecifiedSlotList[r],
			i = a.length;
		for (let r = 0; r < i; r++) this.MaterialSlotList[a[r]].SetFloat(t, e);
	}
	RevertFloat(t, e) {
		var r = this.SpecifiedSlotList[e],
			a = r.length,
			i = t.toString();
		for (let t = 0; t < a; t++) this.MaterialSlotList[r[t]].RevertFloat(i);
	}
	SetTexture(t, e, r) {
		var a = this.SpecifiedSlotList[r],
			i = a.length;
		for (let r = 0; r < i; r++) this.MaterialSlotList[a[r]].SetTexture(t, e);
	}
	RevertTexture(t, e) {
		var r = this.SpecifiedSlotList[e],
			a = r.length,
			i = t.toString();
		for (let t = 0; t < a; t++) this.MaterialSlotList[r[t]].RevertTexture(i);
	}
	SetStarScarEnergy(t) {
		var e = this.MaterialSlotList.length;
		for (let r = 0; r < e; r++) this.MaterialSlotList[r].SetStarScarEnergy(t);
	}
	Update(t = void 0) {
		void 0 !== t &&
			this.SkeletalComp.IsValid() &&
			this.SkeletalComp.SetMeshShadingRate(t),
			this.thr(),
			this.UpdateAlphaTest(),
			this.UpdateStencilOutlineTest(),
			this.UpdateBattle(),
			this.UpdateBattleMask();
	}
	ResetAllState() {
		(this.qar = !0),
			(this.Gar = !0),
			(this.kar = 0),
			(this.Far = 0),
			this.War.fill(0),
			this.Kar.fill(0),
			this.Qar.fill(0),
			this.Xar.fill(0),
			this.Kar.fill(0),
			this.UpdateAlphaTest(),
			this.UpdateStencilOutlineTest(),
			this.UpdateBattle(),
			this.UpdateBattleMask();
	}
	ehr() {
		var t = this.Aar.GetRenderingComponent().GetComponent(
			RenderConfig_1.RenderConfig.IdMaterialController,
		);
		t && t.PrintCurrentInfo();
	}
	thr() {
		if (this.SkeletalComp && this.SkeletalComp.IsValid()) {
			var t = this.MaterialSlotList.length;
			for (let r = 0; r < t; r++) {
				var e = this.MaterialSlotList[r];
				e.UpdateMaterialParam(), e.SetSkeletalMeshMaterial(this.SkeletalComp);
			}
		}
	}
	UpdateBattleMask() {
		if (this.Oar) {
			let r = (this.Oar = !1),
				a = !1;
			var t = UE.NewArray(UE.BuiltinInt);
			if (0 < this.jar) (r = !0), (a = !1);
			else {
				var e = this.Xar.length;
				for (let r = 0; r < e; r++) 0 < this.Xar[r] && t.Add(r);
				(r = 0 < t.Num()), (a = r);
			}
			this.SkeletalComp?.IsValid() &&
				(this.SkeletalComp.SetUseEnableBattleMask(r),
				this.SkeletalComp.SetUseEnableBattleMaskSectionMask(a, t));
		}
	}
	UpdateBattle() {
		if (this.Nar) {
			let r = (this.Nar = !1),
				a = !1;
			var t = UE.NewArray(UE.BuiltinInt);
			if (0 < this.Har) (r = !0), (a = !1);
			else {
				var e = this.Qar.length;
				for (let r = 0; r < e; r++) 0 < this.Qar[r] && t.Add(r);
				(r = 0 < t.Num()), (a = r);
			}
			this.SkeletalComp?.IsValid() &&
				(this.SkeletalComp.SetUseEnableBattle(r),
				this.SkeletalComp.SetUseEnableBattleSectionMask(a, t));
		}
	}
	UpdateAlphaTest() {
		if (this.qar) {
			let r = (this.qar = !1),
				a = !1;
			var t = UE.NewArray(UE.BuiltinInt);
			if (0 < this.kar) (r = !0), (a = !1);
			else {
				var e = this.War.length;
				for (let r = 0; r < e; r++) 0 < this.War[r] && t.Add(r);
				(r = 0 < t.Num()), (a = r);
			}
			this.SkeletalComp?.IsValid() &&
				(this.SkeletalComp.SetUseCustomAlphaTest(r),
				this.SkeletalComp.SetUseCustomAlphaTestSectionMask(a, t));
		}
	}
	UpdateStencilOutlineTest() {
		if (this.Gar) {
			let r = (this.Gar = !1),
				a = !1;
			var t = UE.NewArray(UE.BuiltinInt);
			if (0 < this.Far) (r = !0), (a = !1);
			else {
				var e = this.Kar.length;
				for (let r = 0; r < e; r++) 0 < this.Kar[r] && t.Add(r);
				(r = 0 < t.Num()), (a = r);
			}
			this.SkeletalComp?.IsValid() &&
				(this.SkeletalComp.SetUseOutlineStencilTest(r),
				this.SkeletalComp.SetUseOutlineStencilTestSectionMask(a, t));
		}
	}
}
exports.CharBodyInfo = CharBodyInfo;
