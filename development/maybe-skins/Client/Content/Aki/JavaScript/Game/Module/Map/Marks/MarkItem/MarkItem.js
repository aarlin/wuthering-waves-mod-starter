"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MarkItem = void 0);
const Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
	Vector2D_1 = require("../../../../../Core/Utils/Math/Vector2D"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	GeneralLogicTreeUtil_1 = require("../../../GeneralLogicTree/GeneralLogicTreeUtil"),
	MapController_1 = require("../../Controller/MapController"),
	MapDefine_1 = require("../../MapDefine"),
	MapUtil_1 = require("../../MapUtil");
class MarkItem {
	constructor(e, t, i, r = 1) {
		(this.MapType = 2),
			(this.kLi = 1),
			(this.ShowPriority = 0),
			(this.IsDestroy = !1),
			(this.IsIgnoreScaleShow = !1),
			(this.ConfigScale = 1),
			(this.FLi = void 0),
			(this.WorldPositionVector = void 0),
			(this.VLi = !1),
			(this.GridId = 0),
			(this.MapId = 0),
			(this.NeedPlayShowOrHideSeq = void 0),
			(this.h9s = 1),
			(this.HLi = () => {
				this.VLi = !0;
			}),
			(this.jLi = () => {
				this.VLi = !1;
			}),
			(this.WLi = !1),
			(this.KLi = !1),
			(this.TrackTarget = void 0),
			(this.TrackSourceInner = 2),
			(this.QLi = void 0),
			(this.InnerView = void 0),
			(this.UBt = ""),
			(this.IsOutOfBound = !1),
			(this.XLi = !1),
			(this.IsCanShowViewFinally = !1),
			(this.MapType = t),
			(this.kLi = i),
			(this.QLi = e),
			(this.TrackSourceInner = r),
			(this.IsOutOfBound = !1),
			(this.IsInAoiRange = !1),
			(this.FLi = Vector_1.Vector.Create()),
			(this.WorldPositionVector = Vector_1.Vector.Create()),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.TeleportStart,
				this.HLi,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.TeleportComplete,
				this.jLi,
			);
	}
	get LogicWorldScale() {
		return this.h9s;
	}
	set LogicWorldScale(e) {
		this.h9s = e;
	}
	get MarkScale() {
		return this.kLi;
	}
	get UiPosition() {
		return this.WorldPosition
			? MapUtil_1.MapUtil.WorldPosition2UiPosition(this.WorldPosition, this.FLi)
			: Vector_1.Vector.ZeroVectorProxy;
	}
	get IsViewCreate() {
		return !!this.InnerView && this.InnerView.IsShowOrShowing;
	}
	$Li(e, t) {
		return (
			(t = t.Tuple),
			(e = e.Tuple),
			Math.pow(e[0] - t[0], 2) + Math.pow(e[1] - t[1], 2)
		);
	}
	get WorldPosition() {
		2 !== this.MapType &&
			this.TrackTarget instanceof Vector2D_1.Vector2D &&
			((e = GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.GetPlayerLocation()),
			this.$Li(e, this.TrackTarget) *
				MapDefine_1.FLOAT_0_01 *
				MapDefine_1.FLOAT_0_01 <
				3600) &&
			!this.VLi &&
			((e = MapUtil_1.MapUtil.WorldPosition2UiPosition(
				Vector_1.Vector.Create(this.TrackTarget.X, this.TrackTarget.Y, 0),
			)),
			(e = MapController_1.MapController.GetMarkPosition(e.X, -e.Y))
				? this.UpdateCustomMapMarkPosition(e)
				: (this.TrackTarget = Vector_1.Vector.Create(
						this.TrackTarget.X,
						this.TrackTarget.Y,
						0,
					)));
		var e =
			this.MapId === ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
		return MapUtil_1.MapUtil.GetTrackPositionByTrackTarget(
			this.TrackTarget,
			!1,
			this.WorldPositionVector,
			e,
		);
	}
	UpdateCustomMapMarkPosition(e) {
		var t;
		9 === this.MarkType &&
			((t = Vector_1.Vector.Create(e.X, -e.Y, e.Z)),
			(e = Vector_1.Vector.Create(e.X, e.Y, e.Z)),
			(t = MapUtil_1.MapUtil.UiPosition2WorldPosition(t)),
			(this.TrackTarget = t),
			MapController_1.MapController.UpdateCustomMapMarkPosition(this.MarkId, e),
			(t = Vector_1.Vector.Create()),
			this.TrackTarget.Multiply(MapDefine_1.FLOAT_0_01, t),
			ModelManager_1.ModelManager.MapModel.UpdateCustomMarkInfo(this.MarkId, t),
			ModelManager_1.ModelManager.TrackModel.UpdateTrackData(
				this.TrackSourceInner,
				this.MarkId,
				this.TrackTarget,
			));
	}
	SetTrackData(e) {
		this.TrackTarget = e;
	}
	LogicUpdate(e) {
		this.OnUpdate(e), this.UpdateTrackState();
	}
	ViewUpdate(e, t = !1, i = !1) {
		this.InnerView?.OnUpdate(e, t, i);
	}
	async ViewUpdateAsync(e, t = !1) {
		await this.View?.LoadingPromise, this.InnerView?.OnUpdate(e, t);
	}
	Destroy() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.TeleportStart,
			this.HLi,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.TeleportComplete,
				this.jLi,
			),
			(this.IsDestroy = !0),
			this.OnDestroy(),
			this.ClearView(!0),
			(this.QLi = void 0);
	}
	get IsInAoiRange() {
		return this.WLi;
	}
	set IsInAoiRange(e) {
		(this.WLi = e) ? this.YLi() : this.ClearView();
	}
	YLi() {
		this.View ||
			(this.IsCanShowView &&
				(this.IsTracked || this.IsInAoiRange) &&
				(this.OnCreateView(), this.InnerView?.InitializeMarkItemViewAsync()));
	}
	ClearView(e = !1) {
		!this.InnerView ||
			(!e && (this.IsTracked || this.IsInAoiRange)) ||
			(this.InnerView.Destroy(), (this.InnerView = void 0));
	}
	get TrackSource() {
		return this.TrackSourceInner;
	}
	get IsTracked() {
		return this.KLi;
	}
	set IsTracked(e) {
		var t = this.KLi;
		(this.KLi = e) && this.YLi(),
			t !== this.KLi && (e ? this.OnStartTrack() : this.OnEndTrack());
	}
	UpdateTrackState() {
		(this.IsCanShowView = this.CheckCanShowView()),
			(this.IsTracked = ModelManager_1.ModelManager.TrackModel.IsTracking(
				this.TrackSource,
				this.MarkId,
			)),
			(1 === this.MapType && !this.IsTracked) || (this.IsInAoiRange = !0);
	}
	OnStartTrack() {
		this.View?.OnStartTrack();
	}
	OnEndTrack() {
		this.View?.OnEndTrack();
	}
	OnUpdate(e) {}
	OnDestroy() {}
	get ViewRoot() {
		return this.QLi;
	}
	get View() {
		return this.InnerView;
	}
	get IconPath() {
		return this.UBt;
	}
	set IconPath(e) {
		this.UBt !== e && (this.UBt = e);
	}
	SetSelected(e) {
		this.InnerView && (this.View.IsSelected = e);
	}
	async GetRootItemAsync() {
		if (this.View)
			return (
				this.View.IsCreating && (await this.View.LoadingPromise),
				this.View.GetRootItem()
			);
	}
	GetTitleText() {}
	GetLocaleDesc() {}
	SetConfigScale(e) {
		this.ConfigScale = e;
	}
	get JLi() {
		return ModelManager_1.ModelManager.MapModel.GetMarkForceVisible(
			this.MarkType,
			this.MarkId,
		);
	}
	get IsCanShowViewIntermediately() {
		return this.XLi && this.JLi;
	}
	get IsCanShowView() {
		return this.IsCanShowViewIntermediately || this.IsCanShowViewFinally;
	}
	set IsCanShowView(e) {
		this.XLi && !e && (this.XLi = e), (this.XLi = e) && this.JLi && this.YLi();
	}
	CheckCanShowView() {
		return 2 === this.MapType;
	}
	GetShowScale() {
		var e = this.GetCurrentMapShowScale();
		return Math.max(0, e);
	}
	GetCurrentMapShowScale() {
		return 100 * ModelManager_1.ModelManager.WorldMapModel.MapScale - 100;
	}
	OnLevelSequenceStart(e) {
		("ShowView" !== e && "HideView" !== e) || (this.IsCanShowViewFinally = !0);
	}
	OnLevelSequenceStop(e) {
		("ShowView" !== e && "HideView" !== e) || (this.IsCanShowViewFinally = !1);
	}
}
exports.MarkItem = MarkItem;
