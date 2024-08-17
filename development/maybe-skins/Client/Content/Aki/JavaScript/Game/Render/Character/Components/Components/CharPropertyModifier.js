"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CharPropertyModifier = exports.PropertyTimeCounter = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
	RenderConfig_1 = require("../../../Config/RenderConfig"),
	RenderUtil_1 = require("../../../Utils/RenderUtil"),
	CharRenderBase_1 = require("../../Manager/CharRenderBase");
class PropertyTimeCounter {
	constructor() {
		(this.Id = 0),
			(this.Factor = -0),
			(this.WholeTime = -0),
			(this.Counter = -0),
			(this.BodyType = 0),
			(this.SectionIndex = 0),
			(this.SlotType = 0),
			(this.PropertyName = void 0),
			(this.CurveFloatData = void 0),
			(this.CurveColorData = void 0),
			(this.DataType = 0);
	}
	Init(e, t, r, o, i, a, s, n, h) {
		switch (
			((this.Id = e),
			(this.BodyType = t),
			(this.SectionIndex = r),
			(this.SlotType = o),
			(this.PropertyName = i),
			(this.WholeTime = n),
			(this.DataType = h),
			(this.Counter = 0),
			this.DataType)
		) {
			case 0:
				(this.CurveFloatData = a), (this.CurveColorData = void 0);
				break;
			case 1:
				(this.CurveColorData = s), (this.CurveFloatData = void 0);
		}
	}
}
exports.PropertyTimeCounter = PropertyTimeCounter;
class CharPropertyModifier extends CharRenderBase_1.CharRenderBase {
	constructor() {
		super(...arguments),
			(this.Aar = void 0),
			(this.Par = void 0),
			(this.xar = 0),
			(this.war = void 0);
	}
	Start() {
		(this.xar = 0), (this.Par = new Map()), (this.war = []);
		var e = this.RenderComponent.GetComponent(
			RenderConfig_1.RenderConfig.IdMaterialContainer,
		);
		void 0 === e
			? Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"RenderCharacter",
					14,
					"材质属性编辑器初始化失败，不存在CharMaterialContainer",
					["Actor", this.GetRenderingComponent().GetOwner().GetName()],
				)
			: ((this.Aar = e), this.OnInitSuccess());
	}
	UpdateCurveData(e, t) {
		var r;
		(t.Factor = t.Counter / t.WholeTime),
			0 === t.DataType
				? ((r = RenderUtil_1.RenderUtil.GetFloat(t.CurveFloatData, t.Factor)),
					this.SetPropertyFloat(
						t.BodyType,
						t.SectionIndex,
						t.SlotType,
						t.PropertyName,
						r,
					))
				: ((r = RenderUtil_1.RenderUtil.GetColor(t.CurveColorData, t.Factor)),
					this.SetPropertyColor(
						t.BodyType,
						t.SectionIndex,
						t.SlotType,
						t.PropertyName,
						r,
					)),
			(t.Counter += e);
	}
	Update() {
		var e = this.GetDeltaTime();
		for (const t of this.Par.values()) this.UpdateCurveData(e, t);
		for (const e of this.Par.values())
			e.Counter >= e.WholeTime && this.war.push(e.Id);
		if (0 < this.war.length) {
			for (const e of this.war) this.Par.delete(e);
			this.war = [];
		}
	}
	SetPropertyFloat(e, t, r, o, i) {
		return void 0 !== this.Aar && (this.Aar.SetFloat(o, i, e, t, r), !0);
	}
	SetPropertyColor(e, t, r, o, i) {
		return void 0 !== this.Aar && (this.Aar.SetColor(o, i, e, t, r), !0);
	}
	SetPropertyLinearFloat(e, t, r, o, i, a = -1) {
		if (void 0 !== this.Aar) {
			if (!(a < 0))
				return (
					(a = RenderUtil_1.RenderUtil.GetFloat(i.FloatData, a)),
					this.Aar.SetFloat(o, a, e, t, r),
					!0
				);
			this.xar++,
				(a = new PropertyTimeCounter()).Init(
					this.xar,
					e,
					t,
					r,
					o,
					i.FloatData,
					void 0,
					i.Time,
					0,
				),
				this.Par.set(this.xar, a);
		}
		return !1;
	}
	SetPropertyLinearColor(e, t, r, o, i, a = -1) {
		if (void 0 !== this.Aar) {
			if (!(a < 0))
				return (
					(a = RenderUtil_1.RenderUtil.GetColor(i.LinearColor, a)),
					this.Aar.SetColor(o, a, e, t, r),
					!0
				);
			this.xar++,
				(a = new PropertyTimeCounter()).Init(
					this.xar,
					e,
					t,
					r,
					o,
					void 0,
					i.LinearColor,
					i.Time,
					1,
				),
				this.Par.set(this.xar, a);
		}
		return !1;
	}
	GetComponentId() {
		return RenderConfig_1.RenderConfig.IdPropertyModifier;
	}
	GetStatName() {
		return "CharPropertyModifier";
	}
}
exports.CharPropertyModifier = CharPropertyModifier;
