"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AlterMark = void 0);
const puerts_1 = require("puerts"),
	UE = require("ue"),
	Vector_1 = require("../../../../Core/Utils/Math/Vector"),
	Vector2D_1 = require("../../../../Core/Utils/Math/Vector2D"),
	ObjectUtils_1 = require("../../../../Core/Utils/ObjectUtils"),
	Global_1 = require("../../../Global"),
	GlobalData_1 = require("../../../GlobalData"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	UiLayer_1 = require("../../../Ui/UiLayer"),
	ActorUtils_1 = require("../../../Utils/ActorUtils"),
	GeneralLogicTreeUtil_1 = require("../../GeneralLogicTree/GeneralLogicTreeUtil"),
	CENTER_Y = 62.5,
	MAX_A = 1176,
	MARGIN_A = 1008,
	MAX_B = 712.5,
	MARGIN_B = 495,
	center = Vector2D_1.Vector2D.Create(0, 62.5),
	RAD_2_DEG = 180 / Math.PI,
	MAX_ALERT = 100,
	START_FILL_AMOUNT = 0.5,
	NORMAL_COLOR = "B7E6E7FF",
	WARNING_COLOR = "EDDC4DFF",
	ERROR_COLOR = "F01D1BFF";
class AlterMark extends UiPanelBase_1.UiPanelBase {
	constructor(e, t, i) {
		super(),
			(this.hXe = void 0),
			(this.lXe = void 0),
			(this._Xe = (0, puerts_1.$ref)(void 0)),
			(this.uXe = 0),
			(this.cXe = 0),
			(this.mXe = Vector_1.Vector.Create()),
			(this.dXe = void 0),
			(this.CXe = void 0),
			(this.$Pe = void 0),
			(this.gXe = void 0),
			(this.fXe = new UE.Vector2D(0, 0)),
			(this.pXe = new UE.Vector2D(1, -1)),
			(this.CQe = (0, puerts_1.$ref)(0)),
			(this.Due = Vector_1.Vector.Create()),
			(this.Nme = Vector_1.Vector.Create()),
			(this.vXe = Vector_1.Vector.Create()),
			(this.MXe = void 0),
			(this.SXe = Vector_1.Vector.Create()),
			(this.EXe = 0),
			GlobalData_1.GlobalData.World &&
				(this.CreateThenShowByResourceIdAsync("UiItem_SneakItem_Prefab", e),
				(this.hXe = t ? t.ToUeVector() : new UE.Vector()),
				(this.lXe = i),
				(e = UiLayer_1.UiLayer.UiRootItem),
				(this.uXe = Math.min(1176, ((e?.GetWidth() ?? 0) - 1008) / 2)),
				(this.cXe = Math.min(712.5, ((e?.GetHeight() ?? 0) - 495) / 2)),
				(this.gXe = Global_1.Global.CharacterController),
				(this.MXe = Global_1.Global.CharacterCameraManager));
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UISprite],
			[2, UE.UISprite],
		];
	}
	OnStart() {
		(this.$Pe = this.GetItem(0)),
			(this.dXe = this.GetSprite(1)),
			(this.CXe = this.GetSprite(2)),
			this.CXe.SetFillAmount(0),
			this.dXe.SetFillAmount(0),
			this.CXe.SetColor(UE.Color.FromHex("B7E6E7FF")),
			this.dXe.SetColor(UE.Color.FromHex("B7E6E7FF")),
			this.GetItem(0).SetUIActive(!1),
			this.GetSprite(1).SetUIActive(!1),
			this.GetSprite(2).SetUIActive(!1);
	}
	OnBeforeDestroy() {
		(this.hXe = void 0),
			(this.lXe = void 0),
			(this._Xe = void 0),
			(this.mXe = void 0),
			(this.dXe = void 0),
			(this.CXe = void 0),
			(this.$Pe = void 0),
			(this.gXe = void 0),
			(this.fXe = void 0),
			(this.pXe = void 0),
			(this.CQe = void 0),
			(this.Due = void 0),
			(this.Nme = void 0),
			(this.vXe = void 0),
			(this.MXe = void 0),
			(this.SXe = void 0);
	}
	Update() {
		var e;
		GlobalData_1.GlobalData.World &&
			this.RootItem &&
			(GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.GetPlayerLocation() ||
				this.RootItem.SetUIActive(!1),
			(e = this.yXe()),
			this.mXe.Set(e.X, e.Y, e.Z),
			this.RootItem.SetUIActive(!0),
			this.$Pe.SetUIActive(!0),
			this.dXe.SetUIActive(!0),
			this.CXe.SetUIActive(!0),
			(e = this.IXe(this.lXe)),
			(e = this.TXe(e)),
			this.RootItem.SetUIRelativeRotation(
				new UE.Rotator(0, Math.atan2(e.Y, e.X) * RAD_2_DEG - 90, 0),
			),
			this.LXe());
	}
	yXe() {
		return ObjectUtils_1.ObjectUtils.IsValid(this.lXe)
			? this.lXe.K2_GetActorLocation()
			: this.hXe;
	}
	IXe(e) {
		return e.K2_GetActorLocation();
	}
	TXe(e) {
		if (UE.GameplayStatics.ProjectWorldToScreen(this.gXe, e, this._Xe)) {
			const e = (0, puerts_1.$unref)(this._Xe);
			return this.DXe(e, !0);
		}
		(e = this.RXe(e)),
			UE.GameplayStatics.ProjectWorldToScreen(
				this.gXe,
				e.ToUeVector(),
				this._Xe,
			);
		const t = (0, puerts_1.$unref)(this._Xe);
		return this.DXe(t, !1);
	}
	DXe(e, t) {
		var i = this.UXe(),
			r = this.AXe();
		e = e
			.op_Multiply(r.X / i)
			.op_Subtraction(r.op_Multiply(0.5))
			.op_Multiply(this.pXe);
		return this.PXe(e, this.uXe, this.cXe, t).op_Addition(
			center.ToUeVector2D(),
		);
	}
	UXe() {
		return (
			this.gXe.GetViewportSize(this.CQe, void 0), (0, puerts_1.$unref)(this.CQe)
		);
	}
	AXe() {
		var e = UiLayer_1.UiLayer.UiRootItem;
		return (this.fXe.X = e.GetWidth()), (this.fXe.Y = e.GetHeight()), this.fXe;
	}
	PXe(e, t, i, r) {
		var o = e.X,
			s = e.Y;
		return r && (o * o) / (t * t) + (s * s) / (i * i) <= 1
			? e
			: ((r = (t * i) / Math.sqrt(i * i * o * o + t * t * s * s)),
				e.op_Multiply(r));
	}
	RXe(e) {
		this.Due.Set(e.X, e.Y, e.Z);
		e = this.xXe();
		var t = this.wXe(this.Due),
			i = this.BXe();
		i = UE.KismetMathLibrary.ProjectVectorOnToVector(
			t.ToUeVector(),
			i,
		).op_Multiply(2);
		return (
			this.SXe.Set(i.X, i.Y, i.Z),
			t.SubtractionEqual(this.SXe),
			e.Addition(t, this.Due),
			this.Due
		);
	}
	xXe() {
		var e =
			ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Entity.GetComponent(
				1,
			).ActorLocation;
		return this.Nme.Set(e.X, e.Y, e.Z), this.Nme;
	}
	wXe(e) {
		var t = this.xXe();
		return e.Subtraction(t, this.vXe), this.vXe;
	}
	BXe() {
		return this.MXe.GetCameraRotation().Vector();
	}
	LXe() {
		var e = ActorUtils_1.ActorUtils.GetEntityByActor(
			this.lXe,
		).Entity.GetComponent(38).AiController.AiAlert.AlertValue;
		this.CXe.SetFillAmount(0.5 + e / 100 / 2),
			this.dXe.SetFillAmount(0.5 + e / 100 / 2),
			e < 50
				? 0 !== this.EXe &&
					((this.EXe = 0),
					this.CXe.SetColor(UE.Color.FromHex("B7E6E7FF")),
					this.dXe.SetColor(UE.Color.FromHex("B7E6E7FF")))
				: e < 80
					? 50 !== this.EXe &&
						((this.EXe = 50),
						this.CXe.SetColor(UE.Color.FromHex("EDDC4DFF")),
						this.dXe.SetColor(UE.Color.FromHex("EDDC4DFF")))
					: 80 !== this.EXe &&
						((this.EXe = 80),
						this.CXe.SetColor(UE.Color.FromHex("F01D1BFF")),
						this.dXe.SetColor(UE.Color.FromHex("F01D1BFF")));
	}
}
exports.AlterMark = AlterMark;
