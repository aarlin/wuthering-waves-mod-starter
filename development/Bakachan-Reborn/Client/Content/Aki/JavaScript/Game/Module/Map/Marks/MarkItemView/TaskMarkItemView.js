"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TaskMarkItemView = void 0);
const UE = require("ue"),
	Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	GeneralLogicTreeUtil_1 = require("../../../GeneralLogicTree/GeneralLogicTreeUtil"),
	MapDefine_1 = require("../../MapDefine"),
	MarkRangeImageComponent_1 = require("./Components/MarkRangeImageComponent"),
	ServerMarkItemView_1 = require("./ServerMarkItemView");
class TaskMarkItemView extends ServerMarkItemView_1.ServerMarkItemView {
	constructor() {
		super(...arguments),
			(this.QuestStepId = 0),
			(this.NDi = !1),
			(this.ODi = !1),
			(this.ige = !1),
			(this.kDi = void 0),
			(this.FDi = void 0);
	}
	OnInitialize() {
		super.OnInitialize(),
			this.VDi(),
			this.OnIconPathChanged(this.Holder.IconPath);
	}
	VDi() {
		var e = this.Holder.MarkRange;
		(this.NDi = 0 < e),
			e &&
				((this.kDi = new UE.Vector2D(
					this.Holder.UiPosition.X,
					this.Holder.UiPosition.Y,
				)),
				this.HDi(
					GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.GetPlayerLocation() ??
						Vector_1.Vector.ZeroVectorProxy,
				),
				(this.ige = !0));
	}
	async GetRangeComponentAsync() {
		var e;
		return (
			this.RangeComponentInternal ||
				((this.RangeComponentInternal =
					new MarkRangeImageComponent_1.MarkRangeImageComponent()),
				await this.RangeComponentInternal.CreateThenShowByResourceIdAsync(
					"UiItem_MarkArea_Prefab",
					this.RootItem.GetParentAsUIItem(),
					!0,
				),
				this.RangeComponentInternal?.GetRootItem().SetAnchorOffset(
					this.RootItem.GetAnchorOffset(),
				),
				this.RangeComponentInternal?.GetRootItem().SetAsFirstHierarchy(),
				this.SetScale(this.Holder.MarkScale),
				(e = this.Holder.MarkRange),
				this.RangeComponentInternal.RangeImage.SetWidth(2 * e),
				this.RangeComponentInternal.RangeImage.SetHeight(2 * e)),
			this.RangeComponentInternal
		);
	}
	OnSafeUpdate(e, t = !1) {
		this.HDi(e, t);
	}
	IsRangeImageActive() {
		return this.FDi;
	}
	HDi(e, t = 0) {
		if (this.NDi)
			if (this.Holder.IsCanShowView) {
				var i,
					n = this.Holder,
					r = n.RangeMarkShowDis,
					o = r + 2;
				let t = 0,
					s = !1,
					a = !0;
				(s =
					0 !== n.RangeMarkShowDisUp || 0 !== n.RangeMarkShowDisDown
						? ((i =
								(e.Z - this.Holder.WorldPosition.Z) * MapDefine_1.FLOAT_0_01),
							(t =
								Vector_1.Vector.Dist2D(e, this.Holder.WorldPosition) *
								MapDefine_1.FLOAT_0_01),
							(a = i < n.RangeMarkShowDisUp && i > n.RangeMarkShowDisDown),
							t > r && i > n.RangeMarkShowDisUp && i < n.RangeMarkShowDisDown)
						: (t =
								Vector_1.Vector.Dist(e, this.Holder.WorldPosition) *
								MapDefine_1.FLOAT_0_01) > r),
					this.GetTrackComponentAsync().then((e) => {
						e.SetActive(s && this.Holder.IsTracked);
					}),
					this.ige ? (this.jDi(!s), (this.ige = !1)) : this.jDi(t < o && a);
			} else this.jDi(!1);
	}
	jDi(e) {
		var t;
		this.NDi &&
			this.ODi !== e &&
			((this.ODi = e),
			(void 0 !== this.FDi && this.FDi === e) ||
				(this.GetRangeComponentAsync().then((e) => {
					e.SetActive(this.FDi),
						this.RangeComponentInternal?.GetRootItem()?.SetAnchorOffset(
							this.kDi,
						);
				}),
				(this.FDi = e),
				1 === this.Holder.MapType &&
					((t = this.Holder),
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.TaskRangeTrackStateChange,
						t.TrackSource,
						t.TreeIncId,
						t.NodeId,
						t.MarkId,
						e,
					))),
			(t = this.Holder.IsOutOfBound || !e),
			this.GetSprite(1).SetUIActive(t),
			(this.IsShowIcon = t));
	}
	OnBeforeDestroy() {
		this.RangeComponentInternal?.Destroy(), super.OnBeforeDestroy();
	}
}
exports.TaskMarkItemView = TaskMarkItemView;
