"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.VisionCommonDragItem = void 0);
const UE = require("ue"),
	CustomPromise_1 = require("../../../../../Core/Common/CustomPromise"),
	Log_1 = require("../../../../../Core/Common/Log"),
	Time_1 = require("../../../../../Core/Common/Time"),
	TickSystem_1 = require("../../../../../Core/Tick/TickSystem"),
	Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
	Vector2D_1 = require("../../../../../Core/Utils/Math/Vector2D"),
	TimeUtil_1 = require("../../../../Common/TimeUtil"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	LguiEventSystemManager_1 = require("../../../../Ui/LguiEventSystem/LguiEventSystemManager"),
	UiLayer_1 = require("../../../../Ui/UiLayer"),
	LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
	CLICKTIME = 300,
	CLICKCALLGAP = 1,
	MOVEPARENTDELAYTIME = 1,
	HEIGHTCANVASSORT = 100;
class VisionCommonDragItem {
	constructor(t, e, o, i) {
		(this.CeaseAnimationPromise = void 0),
			(this.Zdo = void 0),
			(this.Xy = -1),
			(this.eCo = void 0),
			(this.tCo = void 0),
			(this.iCo = void 0),
			(this.oCo = void 0),
			(this.rCo = void 0),
			(this.nCo = void 0),
			(this.EBt = void 0),
			(this.sCo = void 0),
			(this.aCo = void 0),
			(this.hCo = void 0),
			(this.lCo = void 0),
			(this._Co = void 0),
			(this.uCo = void 0),
			(this.cCo = !1),
			(this.Uqe = 0),
			(this.mCo = !1),
			(this.dCo = !1),
			(this.LEt = TickSystem_1.TickSystem.InvalidId),
			(this.CCo = !1),
			(this.gCo = TickSystem_1.TickSystem.InvalidId),
			(this.cVe = 0),
			(this.fCo = Vector_1.Vector.Create()),
			(this.pCo = void 0),
			(this.vCo = 0),
			(this.MCo = 0),
			(this.SCo = new Vector2D_1.Vector2D(0, 0)),
			(this.ECo = new Vector2D_1.Vector2D(0, 0)),
			(this.yCo = new Array()),
			(this.ICo = !1),
			(this.TCo = !1),
			(this.EPe = void 0),
			(this.LCo = 0),
			(this.Y6i = void 0),
			(this.DCo = void 0),
			(this.RCo = void 0),
			(this.UCo = void 0),
			(this.ACo = void 0),
			(this.PCo = void 0),
			(this.xCo = void 0),
			(this.wCo = new Vector2D_1.Vector2D(0, 0)),
			(this.BCo = new Vector2D_1.Vector2D(0, 0)),
			(this.bCo = !1),
			(this.qCo = new Vector2D_1.Vector2D(0, 0)),
			(this.GCo = !1),
			(this.NCo = new Vector2D_1.Vector2D(0, 0)),
			(this.OCo = !1),
			(this.cTt = void 0),
			(this.kCo = !1),
			(this.FCo = (t) => {
				ModelManager_1.ModelManager.PhantomBattleModel.CheckIfCanDrag() &&
					!this.TCo &&
					(ModelManager_1.ModelManager.PhantomBattleModel.CheckIfCanDrag() &&
						ModelManager_1.ModelManager.PhantomBattleModel.SetCurrentDragIndex(
							this.Xy,
						),
					(this.cCo = !1),
					(this.Uqe = 0),
					(this.dCo = !1),
					(this.mCo = !1),
					(this.uCo = void 0),
					(this.CCo = !1),
					(this.LEt = TickSystem_1.TickSystem.Add(
						() => {
							this.VCo(), (this.Uqe += Time_1.Time.DeltaTime);
						},
						"DragTick",
						0,
						!0,
					).Id),
					this.Y6i) &&
					this.eCo?.(this.GetCurrentIndex());
			}),
			(this.HCo = (t) => {
				var e;
				this.jCo(),
					this.WCo(),
					Log_1.Log.CheckDebug() &&
						Log_1.Log.Debug("UiCommon", 28, "OnPointUp", [
							"OnPointUp",
							this.Xy,
						]),
					ModelManager_1.ModelManager.PhantomBattleModel.CheckIfCurrentDragIndex(
						this.Xy,
					) &&
						(ModelManager_1.ModelManager.PhantomBattleModel.ClearCurrentDragIndex(),
						this.kCo
							? this.KCo()
								? this.QCo(!0)
								: this.QCo()
							: this.Y6i
								? (Log_1.Log.CheckDebug() &&
										Log_1.Log.Debug("UiCommon", 28, "OnPointUp", [
											"this.IfBeginDrag",
											this.CCo,
										]),
									(e = this.Uqe < 300),
									Log_1.Log.CheckDebug() &&
										Log_1.Log.Debug("UiCommon", 28, "OnPointUp", [
											"timeState",
											e,
										]),
									this.CCo || this.QCo())
								: this.XCo() && this.QCo(!0));
			}),
			(this.pCt = (t) => {
				this.kCo ||
					(ModelManager_1.ModelManager.PhantomBattleModel.CheckIfCurrentDragIndex(
						this.Xy,
					) &&
						this.Y6i &&
						((this.uCo = t), this.Uqe < 300 || this.TickCheckDrag()));
			}),
			(this.vCt = (t) => {
				this.kCo ||
					(ModelManager_1.ModelManager.PhantomBattleModel.CheckIfCurrentDragIndex(
						this.Xy,
					) &&
						((this.yCo = []), (this.mCo = !0), (this.CCo = !0)));
			}),
			(this.$Co = (t) => {
				this.kCo ||
					(this.Y6i &&
						(this.mCo &&
							(this.Uqe < 300
								? this.QCo()
								: this.bCo || this._Co?.(this, this.yCo, this.bCo),
							(this.mCo = !1)),
						this.bCo) &&
						((this.bCo = !1),
						(this.ICo = !1),
						this.oCo?.(this.GetCurrentIndex(), this.Y6i)));
			}),
			(this.WFt = (t) => {
				"Cease" === t &&
					(this.CeaseAnimationPromise.SetResult(!0),
					this.lCo?.(this.GetCurrentIndex()));
			}),
			(this.TickDoCeaseAnimation = async (t) => {
				var e =
					await ControllerHolder_1.ControllerHolder.PhantomBattleController.GetProgressCurveValue(
						t,
						this.NCo.X,
						this.qCo.X,
					);
				t =
					await ControllerHolder_1.ControllerHolder.PhantomBattleController.GetProgressCurveValue(
						t,
						this.NCo.Y,
						this.qCo.Y,
					);
				this.GCo &&
					this.OCo &&
					this.xCo.SetLGUISpaceAbsolutePosition(new UE.Vector(e, t, 0));
			}),
			(this.PCo = new UE.Vector2D(0, 0)),
			(this.ACo = t),
			(this.Zdo = e),
			(this.Xy = i),
			(this.UCo = e.RootUIComp.GetParentAsUIItem()),
			e.OnPointerDownCallBack.Bind(this.FCo),
			e.OnPointerUpCallBack.Bind(this.HCo),
			e.OnPointerDragCallBack.Bind(this.pCt),
			e.OnPointerBeginDragCallBack.Bind(this.vCt),
			e.OnPointerEndDragCallBack.Bind(this.$Co),
			(t = this.Zdo.GetOwner().GetComponentByClass(UE.UIItem.StaticClass())),
			(this.xCo = t),
			(this.EPe = new LevelSequencePlayer_1.LevelSequencePlayer(t)),
			this.EPe.BindSequenceCloseEvent(this.WFt),
			(this.cTt = e
				.GetOwner()
				.GetComponentByClass(UE.LGUICanvas.StaticClass()));
	}
	GetNormalParent() {
		return this.ACo;
	}
	SetActive(t) {
		this.Zdo?.RootUIComp.SetUIActive(t);
	}
	SetScrollViewItem(t) {
		var e = t.GetLGUISpaceAbsolutePositionByPivot(
				new Vector2D_1.Vector2D(0.5, 0.5).ToUeVector2D(),
			),
			o = t.Width / 2,
			i = e.X - o,
			s = e.X + o;
		(this.wCo.X = i),
			(this.wCo.Y = s),
			(o = t.Height / 2),
			(i = e.Y - o),
			(s = e.Y + o);
		(this.BCo.X = i), (this.BCo.Y = s);
	}
	Refresh(t, e) {
		(this.Y6i = t), (this.kCo = e);
	}
	StartClickCheckTimer() {
		this.WCo(),
			(this.gCo = TickSystem_1.TickSystem.Add(
				() => {
					0 === this.YCo() && (this.HCo(void 0), this.WCo());
				},
				"DragTick",
				0,
				!0,
			).Id);
	}
	GetAnimationTargetPos() {
		return this.RCo;
	}
	SetDragItemHierarchyMax() {
		this.xCo.SetAsLastHierarchy(), this.cTt.SetSortOrder(101, !0);
	}
	GetCurrentData() {
		return this.Y6i;
	}
	CacheStartDragPosition() {
		var t = this.Zdo.RootUIComp.GetLGUISpaceAbsolutePosition(),
			e = this.Zdo.RootUIComp.GetLGUISpaceAbsolutePosition();
		(this.DCo = new Vector2D_1.Vector2D(e.X, e.Y)),
			(this.RCo = new Vector2D_1.Vector2D(t.X, t.Y));
	}
	JCo() {
		this.Zdo.RootUIComp.SetAnchorAlign(4, 4);
		var t = new UE.Vector(1, 1, 1);
		this.Zdo.RootUIComp.SetUIItemScale(t),
			this.Zdo.RootUIComp.SetHorizontalStretch(this.PCo),
			this.Zdo.RootUIComp.SetVerticalStretch(this.PCo),
			this.cTt.SetSortOrder(0, !0),
			this.Zdo.RootUIComp.SetBubbleUpToParent(!0);
	}
	StartDragState() {
		this.CacheStartDragPosition(),
			(this.TCo = !0),
			(this.bCo = !1),
			this.Zdo.RootUIComp.SetAnchorAlign(2, 2),
			(this.vCo = this.Zdo.RootUIComp.Width),
			(this.MCo = this.Zdo.RootUIComp.Height),
			(this.LCo = 0),
			this.cTt.SetSortOrder(100, !0),
			this.Zdo.RootUIComp.SetBubbleUpToParent(!1);
	}
	ResetPosition() {
		this.EPe.StopSequenceByKey("Drag", !1, !0),
			this.ICo && this.zCo(),
			(this.ICo = !1),
			this.TCo &&
				(this.JCo(),
				this.DCo && this.Zdo.RootUIComp.SetAnchorOffset(this.PCo),
				(this.TCo = !1));
	}
	SetToTargetParentAndSetStretch(t) {}
	SetToNormalParent() {
		this.SetToTargetParentAndSetStretch(this.UCo);
	}
	SetDragSuccessCallBack(t) {
		this._Co = t;
	}
	SetMoveToScrollViewCallBack(t) {
		this.rCo = t;
	}
	SetRemoveFromScrollViewCallBack(t) {
		this.nCo = t;
	}
	SetEndDragWhenOnScrollViewCallBack(t) {
		this.oCo = t;
	}
	SetOnUnOverlayCallBack(t) {
		this.iCo = t;
	}
	SetOnOverlayCallBack(t) {
		this.tCo = t;
	}
	SetPointerDownCallBack(t) {
		this.eCo = t;
	}
	SetOnDragAnimationStartFunction(t) {
		this.hCo = t;
	}
	SetOnDragAnimationEndFunction(t) {
		this.lCo = t;
	}
	SetOnClickCallBack(t) {
		this.EBt = t;
	}
	SetOnClickFailCallBack(t) {
		this.sCo = t;
	}
	SetOnBeginDragCall(t) {
		this.aCo = t;
	}
	SetDragCheckItem(t) {
		this.pCo = t;
	}
	GetCurrentIndex() {
		return this.Xy;
	}
	TickCheckDrag() {
		this.LCo <= 1 ? this.LCo++ : (this.SetItemToPointerPosition(), this.ZCo());
	}
	ClearStayingItem() {
		this.yCo = [];
	}
	GetStayingItem() {
		return this.yCo;
	}
	SetItemToPointerPosition() {
		var t, e, o;
		this.TCo &&
			((o =
				LguiEventSystemManager_1.LguiEventSystemManager.GetPointerEventDataPosition(
					0,
				)),
			(o = Vector2D_1.Vector2D.Create(o.X, o.Y)).FromUeVector2D(
				UiLayer_1.UiLayer.UiRootItem.GetCanvasScaler().ConvertPositionFromViewportToLGUICanvas(
					o.ToUeVector2D(!0),
				),
			),
			(e =
				ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionScrollerOffsetX() *
				ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionScrollerOffsetXDir()),
			(t =
				ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionScrollerOffsetY() *
				ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionScrollerOffsetYDir()),
			(e = o.X + e),
			(o = o.Y + t),
			(this.fCo.X === e && this.fCo.Y === o) ||
				((this.fCo.X = e),
				(this.fCo.Y = o),
				this.Zdo.RootUIComp.SetLGUISpaceAbsolutePosition(
					new UE.Vector(e, o, 0),
				)));
	}
	WCo() {
		this.gCo !== TickSystem_1.TickSystem.InvalidId &&
			(TickSystem_1.TickSystem.Remove(this.gCo),
			(this.gCo = TickSystem_1.TickSystem.InvalidId));
	}
	CheckAndGetCurrentClickState() {
		return this.cCo;
	}
	jCo() {
		this.LEt !== TickSystem_1.TickSystem.InvalidId &&
			(TickSystem_1.TickSystem.Remove(this.LEt),
			(this.LEt = TickSystem_1.TickSystem.InvalidId));
	}
	YCo() {
		let t = 0;
		return (
			LguiEventSystemManager_1.LguiEventSystemManager.IsPressComponentIsValid(
				0,
			) && t++,
			LguiEventSystemManager_1.LguiEventSystemManager.IsPressComponentIsValid(
				1,
			) && t++,
			t
		);
	}
	DoCeaseSequence() {
		(this.ICo = !1),
			(this.CeaseAnimationPromise = new CustomPromise_1.CustomPromise()),
			this.EPe.PlayLevelSequenceByName("Cease");
	}
	GetCeaseAnimationPromise() {
		return this.CeaseAnimationPromise;
	}
	zCo() {
		this.ICo &&
			(this.EPe.PlayLevelSequenceByName("Fail"),
			this.lCo?.(this.GetCurrentIndex()));
	}
	ego() {
		this.kCo ||
			(this.TickCheckDrag(),
			this.EPe.PlayLevelSequenceByName("Drag"),
			(this.ICo = !0),
			this.hCo?.(this.GetCurrentIndex()));
	}
	VCo() {
		2 <= this.YCo() || 0 === this.YCo()
			? this.jCo()
			: this.Uqe >= 300 &&
				(this.jCo(), this.Y6i) &&
				(this.dCo || (this.ego(), (this.dCo = !0)),
				this.aCo && this.aCo(this.Xy),
				this.uCo) &&
				this.pCt(this.uCo);
	}
	QCo(t = !1) {
		return t || this.XCo()
			? (this.EBt?.(this.Xy),
				(this.cVe = TimeUtil_1.TimeUtil.GetServerTime()),
				(this.cCo = !0))
			: ((this.cCo = !1), this.sCo?.(this.Xy), !1);
	}
	KCo() {
		return (
			!!ModelManager_1.ModelManager.PlatformModel.IsInGamepad() ||
			TimeUtil_1.TimeUtil.GetServerTime() - this.cVe > 1
		);
	}
	XCo() {
		return this.Uqe < 300 && this.KCo();
	}
	ZCo() {
		const t = new Array();
		this.pCo?.forEach((e) => {
			e.CheckIfSelfItem(this.Xy) ||
				(e.CheckOverlap(this.tgo(), this.igo()) && t.push(e));
		}),
			this.yCo.forEach((e) => {
				t.includes(e) || e.ogo();
			}),
			t.forEach((t) => {
				this.yCo.includes(t) || t.rgo();
			}),
			(this.yCo = t),
			0 !== this.wCo.X &&
				(this.CheckOverlap(this.wCo, this.BCo)
					? this.bCo || (this.rCo?.(this.GetCurrentIndex()), (this.bCo = !0))
					: this.bCo && (this.nCo?.(this.GetCurrentIndex()), (this.bCo = !1)));
	}
	CheckIfSelfItem(t) {
		return t === this.Xy;
	}
	CheckOverlap(t, e) {
		var o = t.X,
			i = ((t = t.Y), e.X),
			s = ((e = e.Y), this.tgo().X),
			C = this.tgo().Y,
			r = this.igo().X,
			h = this.igo().Y;
		return o < C && s < t && i < h && r < e;
	}
	tgo() {
		var t = this.Zdo.RootUIComp,
			e = this.vCo / 2,
			o = t.GetLGUISpaceCenterAbsolutePosition().X - e;
		t = t.GetLGUISpaceCenterAbsolutePosition().X + e;
		return (this.SCo.X = o), (this.SCo.Y = t), this.SCo;
	}
	igo() {
		var t = this.Zdo.RootUIComp,
			e = this.MCo / 2,
			o = t.GetLGUISpaceCenterAbsolutePosition().Y - e;
		t = t.GetLGUISpaceCenterAbsolutePosition().Y + e;
		return (this.ECo.X = o), (this.ECo.Y = t), this.ECo;
	}
	ogo() {
		this.iCo?.(this.GetCurrentIndex());
	}
	rgo() {
		this.tCo?.(this.GetCurrentIndex());
	}
	GetMiddlePosition() {
		return [
			this.Zdo.RootUIComp.GetLGUISpaceCenterAbsolutePosition().X,
			this.Zdo.RootUIComp.GetLGUISpaceCenterAbsolutePosition().Y,
		];
	}
	static GetOverlapIndex(t, e) {
		var o = e.length;
		t = t.GetMiddlePosition();
		let i = e[0].GetCurrentIndex();
		var s = e[0].GetMiddlePosition(),
			C = t[0] * t[0],
			r = t[1] * t[1];
		let h = Math.abs(C - s[0] * s[0]) + Math.abs(r - s[1] * s[1]);
		for (let t = 0; t < o; t++) {
			s = e[t].GetMiddlePosition();
			var n = Math.abs(C - s[0] * s[0]) + Math.abs(r - s[1] * s[1]);
			h > n && ((h = n), (i = e[t].GetCurrentIndex()));
		}
		return i;
	}
	SetDragComponentToTargetPositionParam(t) {
		(this.GCo = !0),
			(this.qCo.X = t.X),
			(this.qCo.Y = t.Y),
			(t = this.xCo.GetLGUISpaceAbsolutePosition()),
			(this.NCo.X = t.X),
			(this.NCo.Y = t.Y);
	}
	SetMovingState(t) {
		this.OCo = t;
	}
}
exports.VisionCommonDragItem = VisionCommonDragItem;
