"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.Cursor = void 0);
const UE = require("ue"),
	ActorSystem_1 = require("../../../../Core/Actor/ActorSystem"),
	Log_1 = require("../../../../Core/Common/Log"),
	TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
	Vector_1 = require("../../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
	UiLayerType_1 = require("../../../Ui/Define/UiLayerType"),
	LguiResourceManager_1 = require("../../../Ui/LguiResourceManager"),
	UiLayer_1 = require("../../../Ui/UiLayer"),
	UiManager_1 = require("../../../Ui/UiManager"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	SPEED = 0.05,
	ALLOW_MOVE_TICK_LIMIT = 1e3;
class Cursor {
	constructor() {
		(this.GPo = void 0),
			(this.NPo = void 0),
			(this.OPo = void 0),
			(this.kPo = void 0),
			(this.FPo = void 0),
			(this.VPo = LguiResourceManager_1.LguiResourceManager.InvalidId),
			(this.HPo = 0),
			(this.jPo = !1),
			(this.WPo = !0),
			(this.KPo = !1),
			(this.IsMoveInstantly = !1),
			(this.QPo = 0),
			(this.XPo = void 0),
			(this.$Po = !1),
			(this.YPo = 0);
	}
	JPo() {
		(this.GPo && this.GPo.IsValid()) ||
			(this.VPo === LguiResourceManager_1.LguiResourceManager.InvalidId &&
				(this.VPo =
					LguiResourceManager_1.LguiResourceManager.LoadPrefabByResourceId(
						"UiItem_Cursor_Prefab",
						UiLayer_1.UiLayer.GetLayerRootUiItem(UiLayerType_1.ELayerType.Pool),
						(o) => {
							(this.VPo = LguiResourceManager_1.LguiResourceManager.InvalidId),
								LguiUtil_1.LguiUtil.SetActorIsPermanent(o, !0, !0),
								(this.GPo = o.GetComponentByClass(UE.UIItem.StaticClass())),
								(this.NPo = this.GPo.UIChildren.Get(0)),
								this.NPo.SetUIActive(!1);
						},
					)));
	}
	RefreshUseItem() {
		var o;
		(this.OPo && this.OPo.IsValid()) ||
			(this.JPo(),
			this.GPo?.IsValid() &&
				(this.NPo?.IsValid()
					? (Log_1.Log.CheckDebug() &&
							Log_1.Log.Debug("UiNavigation", 11, "拷贝一份新的光标"),
						(this.OPo = LguiUtil_1.LguiUtil.CopyItem(this.NPo, this.GPo)),
						LguiUtil_1.LguiUtil.SetActorIsPermanent(
							this.OPo.GetOwner(),
							!0,
							!0,
						),
						this.OPo.SetUIParent(
							UiLayer_1.UiLayer.GetLayerRootUiItem(
								UiLayerType_1.ELayerType.Float,
							),
						),
						(this.$Po = this.OPo.IsUIActiveSelf()),
						(o = void 0 !== this.kPo),
						this.zPo(o),
						Cursor.kRe.Set(0, 0, 0))
					: Log_1.Log.CheckError() &&
						Log_1.Log.Error("UiNavigation", 11, "光标原始节点出现问题")));
	}
	ZPo() {
		var o = this.kPo.K2_GetComponentLocation();
		Cursor.exo.Set(o.X + Cursor.txo, 0, o.Z + Cursor.ixo),
			Cursor.oxo.DeepCopy(Cursor.exo),
			Cursor.kRe.DeepCopy(Cursor.exo),
			this.OPo.GetOwner().K2_SetActorLocation(
				Cursor.exo.ToUeVector(),
				!1,
				void 0,
				!1,
			);
	}
	SetFollowItem(o) {
		(this.FPo = o),
			(this.kPo = o?.RootUIComp),
			(this.HPo = 0),
			(this.QPo = 0),
			(Cursor.iqn = 0),
			(Cursor.rqn = 0),
			o
				? ((this.jPo = !0),
					(this.WPo = o.Cursor.Switch),
					this.rxo(),
					this.zPo(!0),
					this.nxo())
				: this.zPo(!1);
	}
	RepeatMove() {
		(this.jPo = !0), (this.QPo = 0);
	}
	rxo() {
		var o,
			t,
			i,
			e,
			r = this.kPo.GetWidth(),
			s = this.kPo.GetHeight();
		(Cursor.iqn === r && Cursor.rqn === s) ||
			((o = this.kPo.GetPivot()),
			(e = this.FPo.GetCursorOffset()),
			(t = this.FPo.GetBoundOffset()),
			(i = e.X - MathUtils_1.MathUtils.Clamp(o.X, 0, 1)),
			(e = e.Y - MathUtils_1.MathUtils.Clamp(o.Y, 0, 1)),
			(Cursor.txo = i * r + t.X),
			(Cursor.ixo = e * s + t.Y),
			(Cursor.iqn = r),
			(Cursor.rqn = s));
	}
	SetIsUseMouse(o) {
		var t;
		this.KPo !== o &&
			((this.KPo = o),
			(t = !!this.kPo && this.kPo.bIsUIActive),
			this.zPo(t),
			Log_1.Log.CheckInfo()) &&
			Log_1.Log.Info("UiNavigation", 11, "[InputChange]使用鼠标标记发生变更!", [
				"使用鼠标",
				o,
			]);
	}
	nxo() {
		this.IsMoveInstantly && ((this.IsMoveInstantly = !1), this.ZPo());
	}
	sxo() {
		return !(
			!UiManager_1.UiManager.IsInited ||
			(this.RefreshUseItem(), !this.GPo) ||
			!this.kPo?.IsValid() ||
			(this.FPo
				? !this.jPo
				: (Log_1.Log.CheckError() &&
						Log_1.Log.Error("UiNavigation", 11, "光标, 找不到导航对象"),
					1))
		);
	}
	axo() {
		var o = this.kPo.K2_GetComponentLocation(),
			t = this.kPo.K2_GetComponentScale();
		Cursor.exo.Set(o.X + Cursor.txo * t.X, 0, o.Z + Cursor.ixo * t.Z),
			Vector_1.Vector.Lerp(Cursor.kRe, Cursor.exo, this.HPo, Cursor.oxo),
			(this.HPo += 0.05),
			Vector_1.Vector.PointsAreSame(Cursor.oxo, Cursor.exo) &&
				(Cursor.oxo.DeepCopy(Cursor.exo), this.hxo()),
			Cursor.kRe.DeepCopy(Cursor.oxo),
			this.OPo.GetOwner().K2_SetActorLocation(
				Cursor.oxo.ToUeVector(),
				!1,
				void 0,
				!1,
			),
			this.rxo();
	}
	Tick(o) {
		this.sxo() && (this.axo(), this.lxo(o));
	}
	Clear() {
		LguiResourceManager_1.LguiResourceManager.CancelLoadPrefab(this.VPo),
			this.GPo?.IsValid() && ActorSystem_1.ActorSystem.Put(this.GPo.GetOwner()),
			this.OPo?.IsValid() && ActorSystem_1.ActorSystem.Put(this.OPo.GetOwner()),
			this._xo(),
			(this.VPo = LguiResourceManager_1.LguiResourceManager.InvalidId),
			(this.YPo = 0),
			(this.GPo = void 0),
			(this.NPo = void 0),
			(this.OPo = void 0),
			(this.kPo = void 0),
			(this.FPo = void 0),
			(this.jPo = !1),
			(this.HPo = 0);
	}
	hxo() {
		this.QPo <= 0 && (this.QPo = 1e3);
	}
	lxo(o) {
		this.QPo <= 0 || ((this.QPo -= o), this.QPo <= 0 && (this.jPo = !1));
	}
	zPo(o) {
		this.OPo &&
			this.OPo.IsValid() &&
			((o = o && this.WPo && !this.KPo), this.$Po !== o) &&
			(this._xo(), (this.$Po = o) ? this.uxo() : this.cxo(o));
	}
	cxo(o) {
		this.OPo.SetUIActive(o),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("UiNavigation", 11, "[InputChange]鼠标显隐发生变更!", [
					"active",
					this.$Po,
				]);
	}
	uxo() {
		0 === this.YPo
			? this.cxo(!0)
			: (this.cxo(!1),
				(this.XPo = TimerSystem_1.TimerSystem.Delay(() => {
					(this.XPo = void 0), this.cxo(!0);
				}, this.YPo)),
				(this.YPo = 0));
	}
	_xo() {
		this.XPo &&
			(TimerSystem_1.TimerSystem.Remove(this.XPo), (this.XPo = void 0));
	}
	SetCursorActiveDelayTime(o) {
		this.YPo = o;
	}
}
((exports.Cursor = Cursor).kRe = Vector_1.Vector.Create()),
	(Cursor.exo = Vector_1.Vector.Create()),
	(Cursor.txo = 0),
	(Cursor.ixo = 0),
	(Cursor.oxo = Vector_1.Vector.Create()),
	(Cursor.iqn = 0),
	(Cursor.rqn = 0);
