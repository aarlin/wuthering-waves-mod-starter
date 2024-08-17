"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AlterTipMark = void 0);
const puerts_1 = require("puerts"),
	UE = require("ue"),
	Rotator_1 = require("../../../../Core/Utils/Math/Rotator"),
	Vector_1 = require("../../../../Core/Utils/Math/Vector"),
	Vector2D_1 = require("../../../../Core/Utils/Math/Vector2D"),
	Global_1 = require("../../../Global"),
	GlobalData_1 = require("../../../GlobalData"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	UiLayer_1 = require("../../../Ui/UiLayer"),
	ActorUtils_1 = require("../../../Utils/ActorUtils"),
	GeneralLogicTreeUtil_1 = require("../../GeneralLogicTree/GeneralLogicTreeUtil"),
	CENTER_Y = 62.5,
	center = Vector2D_1.Vector2D.Create(0, 62.5);
class AlterTipMark extends UiPanelBase_1.UiPanelBase {
	constructor(e, t, r) {
		super(),
			(this.lXe = void 0),
			(this.mXe = Vector_1.Vector.Create()),
			(this._Xe = (0, puerts_1.$ref)(void 0)),
			(this.yB = Vector_1.Vector.Create()),
			(this.d$e = Vector_1.Vector.Create()),
			(this.C$e = Vector_1.Vector.Create()),
			(this.g$e = (0, puerts_1.$ref)(0)),
			(this.f$e = (0, puerts_1.$ref)(0)),
			(this.p$e = Vector2D_1.Vector2D.Create()),
			(this.v$e = Vector2D_1.Vector2D.Create()),
			(this.pXe = Vector2D_1.Vector2D.Create(1, -1)),
			(this.EXe = 0),
			(this.M$e = void 0),
			(this.S$e = void 0),
			(this.E$e = !1),
			(this.y$e = (e) => 6e-5 * e * e - 0.2 * e + 275),
			GlobalData_1.GlobalData.World &&
				(this.CreateThenShowByResourceIdAsync("UiItem_SneakTip", e),
				(this.lXe = t),
				(this.E$e = r));
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIItem],
		];
	}
	OnStart() {
		(this.S$e = this.GetItem(0)),
			(this.M$e = this.GetItem(1)),
			this.GetItem(0).SetUIActive(!1),
			this.GetItem(1).SetUIActive(!1);
	}
	Update() {
		GlobalData_1.GlobalData.World &&
			this.RootItem &&
			(this.I$e(), this.E$e || this.LXe());
	}
	I$e() {
		var e = UiLayer_1.UiLayer.UiRootItem,
			t = GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.GetPlayerLocation(),
			r = Global_1.Global.CharacterController,
			i =
				((i =
					((this.mXe = Vector_1.Vector.Create(this.lXe.K2_GetActorLocation())),
					UE.GameplayStatics.ProjectWorldToScreen(
						r,
						this.mXe.ToUeVector(),
						this._Xe,
					))) ||
					(this.mXe.Subtraction(t, this.yB),
					(i = Global_1.Global.CharacterCameraManager),
					Rotator_1.Rotator.Create(i.GetCameraRotation()).Vector(this.d$e),
					(i = UE.KismetMathLibrary.ProjectVectorOnToVector(
						this.yB.ToUeVector(),
						this.d$e.ToUeVector(),
					).op_Multiply(2)),
					this.C$e.Set(i.X, i.Y, i.Z),
					this.yB.SubtractionEqual(this.C$e),
					t.Addition(this.yB, this.mXe),
					UE.GameplayStatics.ProjectWorldToScreen(
						r,
						this.mXe.ToUeVector(),
						this._Xe,
					)),
				(0, puerts_1.$unref)(this._Xe));
		r.GetViewportSize(this.g$e, this.f$e),
			(r = (0, puerts_1.$unref)(this.g$e)),
			this.p$e.Set(i.X, i.Y),
			this.v$e.Set(0.5 * e.GetWidth(), 0.5 * e.GetHeight()),
			this.p$e
				.MultiplyEqual(e.GetWidth() / r)
				.SubtractionEqual(this.v$e)
				.MultiplyEqual(this.pXe),
			(i = this.p$e.AdditionEqual(center)),
			(e = Vector_1.Vector.Distance(t, this.mXe));
		i.AdditionEqual(Vector2D_1.Vector2D.Create(0, this.y$e(e))),
			this.RootItem.SetAnchorOffset(i.ToUeVector2D());
	}
	LXe() {
		var e = ActorUtils_1.ActorUtils.GetEntityByActor(
			this.lXe,
		).Entity.GetComponent(38).AiController.AiAlert.AlertValue;
		if (0 < e) {
			if (0 < this.EXe) return;
			this.S$e.SetUIActive(!0);
		} else this.S$e.SetUIActive(!1);
		this.M$e.SetUIActive(!1), (this.EXe = e);
	}
	ChangeToError() {
		this.S$e?.SetUIActive(!1), this.M$e?.SetUIActive(!0);
	}
}
exports.AlterTipMark = AlterTipMark;
