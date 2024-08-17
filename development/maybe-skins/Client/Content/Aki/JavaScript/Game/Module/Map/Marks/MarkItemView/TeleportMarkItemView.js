"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TeleportMarkItemView = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
	Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController"),
	ConfigMarkItemView_1 = require("./ConfigMarkItemView"),
	SUB_ICON_PATH = "SP_MarkRecommend",
	MULTI_MAP_ICON_PATH = "SP_MarkMultiMap",
	MULTI_MAP_SELECT_ICON_PATH = "SP_MarkMultiMapSelect";
class TeleportMarkItemView extends ConfigMarkItemView_1.ConfigMarkItemView {
	constructor(e) {
		super(e),
			(this.OnMarkItemStateChange = (e) => {
				(
					ModelManager_1.ModelManager.MapModel?.GetMarkExtraShowState(
						this.Holder.MarkId,
					)
				).ShowFlag === Protocol_1.Aki.Protocol.BNs.Proto_ShowDisable
					? this.GetSprite(2).SetUIActive(!0)
					: this.GetSprite(2).SetUIActive(!1);
			});
	}
	OnInitialize() {
		super.OnInitialize();
	}
	OnAfterShow() {
		super.OnAfterShow(),
			this.UpdateMultiMapFloorSelectState(!0),
			this.OnIconPathChanged(this.Holder.IconPath);
	}
	OnSafeUpdate(e, t, o) {
		this.UpdateMultiMapFloorSelectState();
	}
	UpdateMultiMapFloorSelectState(e = !1) {
		(2 !== this.Holder?.MapType || e) &&
			(e = this.Holder).IsDirty &&
			((e.IsDirty = !1), this.hGn());
	}
	OnIconPathChanged(e) {
		var t = this.GetSprite(1),
			o = this.Holder,
			r = ModelManager_1.ModelManager.MapModel?.GetMarkExtraShowState(
				this.Holder.MarkId,
			);
		this.GetSprite(1).SetUIActive(!0),
			this.LoadIcon(t, e),
			o.IsDungeonEntrance && !o.IsFogUnlock
				? this.GetChildIconComponentAsync()
						.then(
							(e) => {
								e.SetUiActive(!0),
									(e.Icon =
										ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
											SUB_ICON_PATH,
										));
							},
							void 0,
						)
						.catch((e) => {
							e &&
								Log_1.Log.CheckError() &&
								Log_1.Log.Error(
									"Map",
									35,
									"TeleportMarkItemView OnIconPathChanged 设置副本入口图标错误",
									e,
								);
						})
						.finally(void 0)
				: this.ChildIconComponentInternal?.SetUiActive(!1),
			this.hGn(),
			r.ShowFlag === Protocol_1.Aki.Protocol.BNs.Proto_ShowDisable
				? this.GetSprite(2).SetUIActive(!0)
				: this.GetSprite(2).SetUIActive(!1);
	}
	hGn() {
		const e = this.Holder;
		e.IsMultiMapTeleport &&
			this.GetChildIconComponentAsync()
				.then((t) => {
					t.SetUiActive(!0),
						(t.Icon =
							ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
								e.IsSelectThisFloor
									? "SP_MarkMultiMapSelect"
									: "SP_MarkMultiMap",
							));
				})
				.catch((e) => {
					e &&
						Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Map",
							35,
							"TeleportMarkItemView OnIconPathChanged 设置多层地图图标错误",
							e,
						);
				})
				.finally(void 0);
	}
	OnSelectedStateChange(e) {
		e &&
			(
				ModelManager_1.ModelManager.MapModel?.GetMarkExtraShowState(
					this.Holder.MarkId,
				)
			).ShowFlag === Protocol_1.Aki.Protocol.BNs.Proto_ShowDisable &&
			ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
				"Map_TeleportMark_Disable_Tips",
			);
	}
}
exports.TeleportMarkItemView = TeleportMarkItemView;
