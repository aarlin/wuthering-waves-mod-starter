"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PlayerMarkItem = void 0);
const Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	PlayerMarkItemView_1 = require("../MarkItemView/PlayerMarkItemView"),
	MarkItem_1 = require("./MarkItem");
class PlayerMarkItem extends MarkItem_1.MarkItem {
	constructor(e, t, a, i, r = 1) {
		super(e, a, i, r),
			(this.zLi = ["SP_MapFollowing1", "SP_MapFollowing2", "SP_MapFollowing3"]),
			(this.PlayerId = 0),
			(this.PlayerIndex = 0),
			(this.PlayerStartPosition = void 0),
			(this.IsHide = !0),
			(this.WDi = (e, t) => {
				this.PlayerId === e && (this.IsHide = !0);
			}),
			(this.ZLi = (e, t) => {
				this.PlayerId === e &&
					(this.SetTrackData(t), this.IsHide) &&
					(this.IsHide = !1);
			}),
			(this.PlayerId = t.PlayerId),
			(this.PlayerIndex = t.PlayerIndex),
			(this.PlayerStartPosition = Vector_1.Vector.Create(t.Position));
	}
	get MarkId() {
		return this.PlayerId;
	}
	get MarkType() {
		return 11;
	}
	Initialize() {
		1 === this.MapType && this.SetConfigScale(0.8);
		var e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
			this.zLi[this.PlayerIndex - 1],
		);
		(this.IconPath = e),
			this.eDi(),
			this.UpdateTrackState(),
			this.SetTrackData(this.PlayerStartPosition);
	}
	Destroy() {
		this.tDi(), super.Destroy();
	}
	OnCreateView() {
		this.InnerView = new PlayerMarkItemView_1.PlayerMarkItemView(this);
	}
	SetMarkData(e) {
		(this.PlayerId = e.PlayerId), (this.PlayerIndex = e.PlayerIndex);
	}
	UpdateTrackState() {
		this.IsCanShowView = this.CheckCanShowView() && !this.IsHide;
	}
	eDi() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.ScenePlayerLocationChanged,
			this.ZLi,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.ScenePlayerMarkItemStateChange,
				this.WDi,
			);
	}
	tDi() {
		EventSystem_1.EventSystem.Has(
			EventDefine_1.EEventName.ScenePlayerLocationChanged,
			this.ZLi,
		) &&
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.ScenePlayerLocationChanged,
				this.ZLi,
			),
			EventSystem_1.EventSystem.Has(
				EventDefine_1.EEventName.ScenePlayerMarkItemStateChange,
				this.WDi,
			) &&
				EventSystem_1.EventSystem.Remove(
					EventDefine_1.EEventName.ScenePlayerMarkItemStateChange,
					this.WDi,
				);
	}
	CheckCanShowView() {
		return !0;
	}
}
exports.PlayerMarkItem = PlayerMarkItem;
