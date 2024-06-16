"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TeleportMarkItemView = void 0);
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController"),
	ConfigMarkItemView_1 = require("./ConfigMarkItemView"),
	SUB_ICON_PATH = "SP_MarkRecommend";
class TeleportMarkItemView extends ConfigMarkItemView_1.ConfigMarkItemView {
	constructor(e) {
		super(e),
			(this.uLi = (e) => {
				(
					ModelManager_1.ModelManager.MapModel?.GetMarkExtraShowState(
						this.Holder.MarkId,
					)
				).ShowFlag === Protocol_1.Aki.Protocol.MapMarkShowFlag.ShowDisable
					? this.GetSprite(2).SetUIActive(!0)
					: this.GetSprite(2).SetUIActive(!1);
			});
	}
	OnInitialize() {
		super.OnInitialize();
	}
	OnAfterShow() {
		super.OnAfterShow(),
			this.OnIconPathChanged(this.Holder.IconPath),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnMarkItemShowStateChange,
				this.uLi,
			);
	}
	OnAfterHide() {
		super.OnAfterHide(),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnMarkItemShowStateChange,
				this.uLi,
			);
	}
	OnIconPathChanged(e) {
		var t = this.GetSprite(1),
			r = this.Holder,
			i = ModelManager_1.ModelManager.MapModel?.GetMarkExtraShowState(
				this.Holder.MarkId,
			);
		this.GetSprite(1).SetUIActive(!0),
			this.LoadIcon(t, e),
			r.IsDungeonEntrance && !r.IsFogUnlock
				? this.GetChildIconComponentAsync().then(
						(e) => {
							e.SetUiActive(!0),
								(e.Icon =
									ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
										SUB_ICON_PATH,
									));
						},
						void 0,
					)
				: this.ChildIconComponentInternal?.SetUiActive(!1),
			i.ShowFlag === Protocol_1.Aki.Protocol.MapMarkShowFlag.ShowDisable
				? this.GetSprite(2).SetUIActive(!0)
				: this.GetSprite(2).SetUIActive(!1);
	}
	OnSelectedStateChange(e) {
		e &&
			(
				ModelManager_1.ModelManager.MapModel?.GetMarkExtraShowState(
					this.Holder.MarkId,
				)
			).ShowFlag === Protocol_1.Aki.Protocol.MapMarkShowFlag.ShowDisable &&
			ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
				"Map_TeleportMark_Disable_Tips",
			);
	}
}
exports.TeleportMarkItemView = TeleportMarkItemView;
//# sourceMappingURL=TeleportMarkItemView.js.map
