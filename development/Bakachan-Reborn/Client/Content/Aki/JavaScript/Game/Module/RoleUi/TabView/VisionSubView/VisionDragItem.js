"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.VisionDragItem = void 0);
const UE = require("ue"),
	CustomPromise_1 = require("../../../../../Core/Common/CustomPromise"),
	Log_1 = require("../../../../../Core/Common/Log"),
	Time_1 = require("../../../../../Core/Common/Time"),
	TickSystem_1 = require("../../../../../Core/Tick/TickSystem"),
	Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
	Vector2D_1 = require("../../../../../Core/Utils/Math/Vector2D"),
	TimeUtil_1 = require("../../../../Common/TimeUtil"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
	LguiEventSystemManager_1 = require("../../../../Ui/LguiEventSystem/LguiEventSystemManager"),
	LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
	CLICKTIME = 300,
	CLICKCALLGAP = 1,
	MOVEPARENTDELAYTIME = 1;
class VisionDragItem extends UiPanelBase_1.UiPanelBase {
	constructor(t, e, o, i, s) {
		super(),
			(this.CeaseAnimationPromise = void 0),
			(this.Zdo = void 0),
			(this.ngo = void 0),
			(this.sgo = void 0),
			(this.Xy = -1),
			(this.Y6i = void 0),
			(this.eCo = void 0),
			(this.OnOverlayCallBack = void 0),
			(this.OnUnOverlayCallBack = void 0),
			(this.ClickFunction = void 0),
			(this.ClickFailFunction = void 0),
			(this.aCo = void 0),
			(this.SCo = new Vector2D_1.Vector2D(0, 0)),
			(this.ECo = new Vector2D_1.Vector2D(0, 0)),
			(this.EPe = void 0),
			(this.DCo = void 0),
			(this.ago = void 0),
			(this.RCo = void 0),
			(this.LEt = TickSystem_1.TickSystem.InvalidId),
			(this.gCo = TickSystem_1.TickSystem.InvalidId),
			(this.uCo = void 0),
			(this.yCo = new Array()),
			(this.Uqe = 0),
			(this.pCo = void 0),
			(this._Co = void 0),
			(this.hCo = void 0),
			(this.lCo = void 0),
			(this.ACo = void 0),
			(this.fCo = Vector_1.Vector.Create()),
			(this.hgo = Vector_1.Vector.Create()),
			(this.xCo = void 0),
			(this.TCo = !1),
			(this.mCo = !1),
			(this.cCo = !1),
			(this.cVe = 0),
			(this.dCo = !1),
			(this.ICo = !1),
			(this.PCo = void 0),
			(this.wqe = void 0),
			(this.vCo = 0),
			(this.MCo = 0),
			(this.LCo = 0),
			(this.WFt = (t) => {
				"Cease" === t &&
					(this.CeaseAnimationPromise.SetResult(!0),
					this.lCo?.(this.GetCurrentIndex()));
			}),
			(this.OnDragBegin = (t) => {
				ModelManager_1.ModelManager.PhantomBattleModel.CheckIfCurrentDragIndex(
					this.Xy,
				) &&
					((this.hgo.X = this.Zdo.RootUIComp.GetAnchorOffsetX()),
					(this.hgo.Y = this.Zdo.RootUIComp.GetAnchorOffsetY()),
					(this.yCo = []),
					(this.mCo = !0),
					this.OnBeginDrag());
			}),
			(this.OnPointerDown = (t) => {
				ModelManager_1.ModelManager.PhantomBattleModel.CheckIfCanDrag() &&
					(ModelManager_1.ModelManager.PhantomBattleModel.CheckIfCanDrag() &&
						ModelManager_1.ModelManager.PhantomBattleModel.SetCurrentDragIndex(
							this.Xy,
						),
					(this.cCo = !1),
					(this.Uqe = 0),
					(this.dCo = !1),
					(this.mCo = !1),
					(this.CeaseAnimationPromise = void 0),
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
			(this.OnPointUp = (t) => {
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
						this.Y6i
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
			(this.CCo = !1),
			(this.OnDragEnd = (t) => {
				this.Y6i &&
					this.mCo &&
					(this.Uqe < 300 ? this.QCo() : this._Co?.(this, this.yCo),
					(this.mCo = !1));
			}),
			(this.pCt = (t) => {
				ModelManager_1.ModelManager.PhantomBattleModel.CheckIfCurrentDragIndex(
					this.Xy,
				) &&
					this.Y6i &&
					((this.uCo = t), this.Uqe < 300 || this.TickCheckDrag());
			}),
			(this.Zdo = e),
			(this.xCo = this.Zdo.GetOwner().GetComponentByClass(
				UE.UIItem.StaticClass(),
			)),
			(this.ngo = o),
			(this.sgo = i),
			(this.Xy = s),
			(this.ACo = t),
			(this.EPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.xCo)),
			this.EPe.BindSequenceCloseEvent(this.WFt),
			(this.wqe = t),
			(this.PCo = Vector2D_1.Vector2D.Create(0, 0).ToUeVector2D()),
			(this.vCo = t.Width),
			(this.MCo = t.Width);
	}
	Init() {
		this.CreateThenShowByActor(this.wqe.GetOwner());
	}
	SetDragItemHierarchyMax() {
		this.GetDragRoot().SetAsLastHierarchy();
	}
	GetDragRoot() {
		return this.xCo;
	}
	SetDragCheckItem(t) {
		this.pCo = t;
	}
	SetDraggingParent(t) {
		this.ago = t;
	}
	SetOnDragAnimationStartFunction(t) {
		this.hCo = t;
	}
	SetOnDragAnimationEndFunction(t) {
		this.lCo = t;
	}
	SetOnClickCallBack(t) {
		this.ClickFunction = t;
	}
	SetOnClickFailCallBack(t) {
		this.ClickFailFunction = t;
	}
	SetOnBeginDragCall(t) {
		this.aCo = t;
	}
	QCo(t = !1) {
		return t || this.XCo()
			? (this.ClickFunction?.(this.Xy),
				(this.cVe = TimeUtil_1.TimeUtil.GetServerTime()),
				(this.cCo = !0))
			: ((this.cCo = !1), this.ClickFailFunction?.(this.Xy), !1);
	}
	CheckAndGetCurrentClickState() {
		return this.cCo;
	}
	SetDragSuccessCallBack(t) {
		this._Co = t;
	}
	GetAnimationTargetPos() {
		return this.RCo;
	}
	ClearStayingItem() {
		this.yCo = [];
	}
	GetStayingItem() {
		return this.yCo;
	}
	DoDragSequence() {
		this.TickCheckDrag(),
			this.EPe.PlayLevelSequenceByName("Drag"),
			(this.ICo = !0),
			this.hCo?.(this.GetCurrentIndex());
	}
	DoCeaseSequence() {
		(this.ICo = !1),
			(this.CeaseAnimationPromise = new CustomPromise_1.CustomPromise()),
			this.EPe.PlayLevelSequenceByName("Cease");
	}
	zCo() {
		this.ICo &&
			(this.EPe.PlayLevelSequenceByName("Fail"),
			this.lCo?.(this.GetCurrentIndex()));
	}
	ResetPositionThenStartDragState() {
		this.ResetPosition(), this.StartDragState();
	}
	CacheStartDragPosition() {
		this.Zdo.RootUIComp.SetAnchorAlign(2, 2);
		var t = this.Zdo.RootUIComp.GetLGUISpaceAbsolutePosition(),
			e =
				(this.Zdo.RootUIComp.SetUIParent(this.ago, !0),
				this.Zdo.RootUIComp.SetLGUISpaceAbsolutePosition(t),
				this.Zdo.RootUIComp.GetLGUISpaceAbsolutePosition());
		(this.DCo = new Vector2D_1.Vector2D(e.X, e.Y)),
			(this.RCo = new Vector2D_1.Vector2D(t.X, t.Y)),
			this.JCo(),
			(e = new UE.Vector(1, 1, 1));
		this.Zdo.RootUIComp.SetUIItemScale(e);
	}
	StartDragState() {
		(this.TCo = !0), this.Zdo.RootUIComp.SetAnchorAlign(2, 2);
		var t = this.Zdo.RootUIComp.GetLGUISpaceAbsolutePosition();
		this.Zdo.RootUIComp.SetUIParent(this.ago, !0),
			this.Zdo.RootUIComp.SetLGUISpaceAbsolutePosition(t),
			(this.LCo = 0);
	}
	SetItemToSourceSize() {
		this.Zdo.RootUIComp.SetWidth(this.vCo),
			this.Zdo.RootUIComp.SetHeight(this.MCo);
	}
	StartClickCheckTimer() {
		this.WCo(),
			(this.gCo = TickSystem_1.TickSystem.Add(
				() => {
					0 === this.lgo() && (this.OnPointUp(void 0), this.WCo());
				},
				"DragTick",
				0,
				!0,
			).Id);
	}
	SetPointerDownCallBack(t) {
		this.eCo = t;
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
	VCo() {
		2 <= this.YCo() || 0 === this.YCo()
			? this.jCo()
			: this.Uqe >= 300 &&
				(this.jCo(), this.Y6i) &&
				(this.dCo || (this.DoDragSequence(), (this.dCo = !0)),
				this.aCo && this.aCo(this.Xy),
				this.uCo) &&
				this.pCt(this.uCo);
	}
	lgo() {
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
	SetToTargetParentAndSetStretch(t) {
		this.Zdo.RootUIComp.SetAnchorAlign(4, 4),
			this.Zdo.RootUIComp.SetUIParent(t, !0),
			this.Zdo.RootUIComp.SetVerticalStretch(this.PCo),
			this.Zdo.RootUIComp.SetHorizontalStretch(this.PCo);
	}
	SetToNormalParent() {
		this.SetToTargetParentAndSetStretch(this.ACo);
	}
	ResetPosition() {
		this.ICo && this.zCo(),
			(this.ICo = !1),
			this.TCo &&
				(this._go(),
				this.DCo && this.Zdo.RootUIComp.SetAnchorOffset(this.PCo),
				(this.TCo = !1));
	}
	_go() {
		this.JCo();
	}
	JCo() {
		this.Zdo.RootUIComp.SetAnchorAlign(4, 4),
			this.Zdo.RootUIComp.SetUIParent(this.ACo, !0);
		var t = new UE.Vector(1, 1, 1);
		this.Zdo.RootUIComp.SetUIItemScale(t),
			this.Zdo.RootUIComp.SetHorizontalStretch(this.PCo),
			this.Zdo.RootUIComp.SetVerticalStretch(this.PCo);
	}
	XCo() {
		return this.Uqe < 300 && this.KCo();
	}
	KCo() {
		return (
			!!ModelManager_1.ModelManager.PlatformModel.IsInGamepad() ||
			TimeUtil_1.TimeUtil.GetServerTime() - this.cVe > 1
		);
	}
	OnBeginDrag() {
		this.CCo = !0;
	}
	WCo() {
		this.gCo !== TickSystem_1.TickSystem.InvalidId &&
			(TickSystem_1.TickSystem.Remove(this.gCo),
			(this.gCo = TickSystem_1.TickSystem.InvalidId));
	}
	jCo() {
		this.LEt !== TickSystem_1.TickSystem.InvalidId &&
			(TickSystem_1.TickSystem.Remove(this.LEt),
			(this.LEt = TickSystem_1.TickSystem.InvalidId));
	}
	SetItemToPointerPosition() {
		var t, e, o;
		this.TCo &&
			((o =
				LguiEventSystemManager_1.LguiEventSystemManager.GetPointerEventData(
					0,
				).GetWorldPointInPlane()),
			(e =
				ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionScrollerOffsetX() *
				ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionScrollerOffsetXDir()),
			(t =
				ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionScrollerOffsetY() *
				ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionScrollerOffsetYDir()),
			(e = o.X + e),
			(o = o.Z + t),
			(this.fCo.X === e && this.fCo.Y === o) ||
				((this.fCo.X = e),
				(this.fCo.Y = o),
				this.Zdo.RootUIComp.SetAnchorOffsetX(this.fCo.X),
				this.Zdo.RootUIComp.SetAnchorOffsetY(this.fCo.Y)));
	}
	TickCheckDrag() {
		this.LCo <= 1 ? this.LCo++ : (this.SetItemToPointerPosition(), this.ZCo());
	}
	GetMiddlePosition() {
		return [
			this.Zdo.RootUIComp.GetLGUISpaceCenterAbsolutePosition().X,
			this.Zdo.RootUIComp.GetLGUISpaceCenterAbsolutePosition().Y,
		];
	}
	ZCo() {
		const t = new Array();
		this.pCo?.forEach((e) => {
			e.CheckIfSelfItem(this.Xy) ||
				(e.CheckOverlap(this.tgo(), this.igo()) && t.push(e));
		}),
			this.yCo.forEach((e) => {
				t.includes(e) || e.OnUnOverlay();
			}),
			t.forEach((t) => {
				this.yCo.includes(t) || t.OnOverlay();
			}),
			(this.yCo = t);
	}
	CheckIfSelfItem(t) {
		return t === this.Xy;
	}
	GetCurrentIndex() {
		return this.Xy;
	}
	Refresh(t) {
		(this.Y6i = t), this.Kbe(t), this.Pqt(t);
	}
	GetCurrentData() {
		return this.Y6i;
	}
	OnUnOverlay() {
		this.OnUnOverlayCallBack?.();
	}
	OnOverlay() {
		this.OnOverlayCallBack?.();
	}
	CheckOverlap(t, e) {
		var o = t.X,
			i = ((t = t.Y), e.X),
			s = ((e = e.Y), this.tgo().X),
			h = this.tgo().Y,
			n = this.igo().X,
			r = this.igo().Y;
		return o < h && s < t && i < r && n < e;
	}
	Kbe(t) {
		this.sgo.SetUIActive(void 0 !== t),
			t &&
				((t = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(
					t.GetConfigId(!0),
				)),
				this.SetTextureByPath(t.IconMiddle, this.sgo, "VisionEquipmentView"));
	}
	Pqt(t) {
		this.ngo.SetUIActive(void 0 !== t);
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
}
exports.VisionDragItem = VisionDragItem;
