"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.HudUnitHandleBase = void 0);
const puerts_1 = require("puerts"),
	UE = require("ue"),
	CommonDefine_1 = require("../../../../Core/Define/CommonDefine"),
	CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
	Vector_1 = require("../../../../Core/Utils/Math/Vector"),
	Global_1 = require("../../../Global"),
	UiLayer_1 = require("../../../Ui/UiLayer"),
	HudEntitySet_1 = require("../HudUnitEntity/HudEntitySet"),
	CENTER_Y = 62.5;
class HudUnitHandleBase {
	constructor() {
		(this.Iii = new Set()),
			(this.HudEntitySet = void 0),
			(this.gXe = void 0),
			(this.MXe = void 0),
			(this._Xe = (0, puerts_1.$ref)(void 0)),
			(this.Tii = void 0),
			(this.Due = Vector_1.Vector.Create()),
			(this.CQe = (0, puerts_1.$ref)(0)),
			(this.fXe = new UE.Vector2D(0, 0)),
			(this.pXe = new UE.Vector2D(1, -1)),
			(this.Lii = -0),
			(this.Dii = -0),
			(this.bG = new UE.Vector2D(0, 62.5)),
			(this.Rii = Vector_1.Vector.Create()),
			(this.SXe = Vector_1.Vector.Create()),
			(this.IsHudVisible = !1),
			(this.IsDestroyed = !1);
	}
	Initialize() {
		(this.gXe = Global_1.Global.CharacterController),
			(this.MXe = Global_1.Global.CharacterCameraManager),
			(this.Tii = UiLayer_1.UiLayer.GetBattleViewUnit(1));
		var t =
				CommonParamById_1.configCommonParamById.GetIntConfig(
					"MonsterCursorWidthToScreenPercent",
				) / CommonDefine_1.PERCENTAGE_FACTOR,
			i =
				CommonParamById_1.configCommonParamById.GetIntConfig(
					"MonsterCursorHeightToScreenPercent",
				) / CommonDefine_1.PERCENTAGE_FACTOR;
		(this.Lii = this.Tii.GetWidth() * t),
			(this.Dii = this.Tii.GetHeight() * i),
			this.OnAddEvents(),
			this.OnInitialize();
	}
	Destroy() {
		this.OnDestroyed(),
			this.OnRemoveEvents(),
			this.DestroyAllHudUnit(),
			(this.IsDestroyed = !0),
			this.HudEntitySet?.Clear(),
			(this.HudEntitySet = void 0);
	}
	Tick(t) {
		this.OnTick(t);
		for (const i of this.Iii) i.Tick(t);
	}
	AfterTick(t) {
		this.OnAfterTick(t);
		for (const i of this.Iii) i.AfterTick(t);
	}
	OnInitialize() {}
	OnDestroyed() {}
	OnTick(t) {}
	OnAfterTick(t) {}
	OnShowHud() {
		this.IsHudVisible = !0;
	}
	OnHideHud() {
		this.IsHudVisible = !1;
	}
	async NewHudUnit(t, i, e = !0) {
		if (((t = new t()), await t.Initialize(i, e), !this.IsDestroyed))
			return this.Iii.add(t), t;
		t.Destroy();
	}
	NewHudUnitWithReturn(t, i, e = !0, o) {
		const r = (t = new t());
		return (
			t.Initialize(i, e).then(
				() => {
					o && o(r);
				},
				() => {},
			),
			this.Iii.add(t),
			r
		);
	}
	DestroyHudUnit(t) {
		t && (t.Destroy(), this.Iii.delete(t));
	}
	DestroyAllHudUnit() {
		for (const t of this.Iii) t.Destroy();
		this.Iii.clear();
	}
	NewHudEntitySet() {
		(this.HudEntitySet = new HudEntitySet_1.HudEntitySet()),
			this.HudEntitySet.Initialize();
	}
	UXe() {
		return (
			this.gXe.GetViewportSize(this.CQe, void 0), (0, puerts_1.$unref)(this.CQe)
		);
	}
	AXe() {
		return (
			(this.fXe.X = this.Tii.GetWidth()),
			(this.fXe.Y = this.Tii.GetHeight()),
			this.fXe
		);
	}
	PXe(t, i, e, o) {
		var r = t.X,
			s = t.Y;
		return o && (r * r) / (i * i) + (s * s) / (e * e) <= 1
			? t
			: ((o = (i * e) / Math.sqrt(e * e * r * r + i * i * s * s)),
				t.op_Multiply(o));
	}
	ScreenPositionToEllipsePosition(t, i) {
		var e = this.UXe(),
			o = this.AXe();
		t = t
			.op_Multiply(o.X / e)
			.op_Subtraction(o.op_Multiply(0.5))
			.op_Multiply(this.pXe);
		return this.PXe(t, this.Lii, this.Dii, i).op_Addition(this.bG);
	}
	Uii(t, i) {
		return i.Subtraction(t, this.Rii), this.Rii;
	}
	BXe() {
		return this.MXe.GetCameraRotation().Vector();
	}
	GetProjectionToFrontPosition(t, i) {
		this.Due.Set(i.X, i.Y, i.Z);
		i = this.Uii(t, this.Due);
		var e = this.BXe();
		e = UE.KismetMathLibrary.ProjectVectorOnToVector(
			i.ToUeVector(),
			e,
		).op_Multiply(2);
		return (
			this.SXe.Set(e.X, e.Y, e.Z),
			i.SubtractionEqual(this.SXe),
			t.Addition(i, this.Due),
			this.Due
		);
	}
	ProjectWorldToScreen(t) {
		if (UE.GameplayStatics.ProjectWorldToScreen(this.gXe, t, this._Xe))
			return (
				(t = (0, puerts_1.$unref)(this._Xe)),
				this.Tii.GetCanvasScaler().ConvertPositionFromViewportToLGUICanvas(t)
			);
	}
	GetInEllipsePosition(t, i) {
		var e = UE.GameplayStatics.ProjectWorldToScreen(this.gXe, i, this._Xe),
			o = (0, puerts_1.$unref)(this._Xe);
		return e
			? [this.ScreenPositionToEllipsePosition(o, !0), o]
			: ((e = this.GetProjectionToFrontPosition(t, i)),
				UE.GameplayStatics.ProjectWorldToScreen(
					this.gXe,
					e.ToUeVector(),
					this._Xe,
				),
				[this.ScreenPositionToEllipsePosition(o, !1), void 0]);
	}
}
exports.HudUnitHandleBase = HudUnitHandleBase;
