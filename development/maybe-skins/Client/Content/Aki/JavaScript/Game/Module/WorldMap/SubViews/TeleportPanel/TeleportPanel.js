"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TeleportPanel = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
	Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	ButtonItem_1 = require("../../../Common/Button/ButtonItem"),
	MapController_1 = require("../../../Map/Controller/MapController"),
	WorldMapSecondaryUi_1 = require("../../ViewComponent/WorldMapSecondaryUi"),
	WorldMapController_1 = require("../../WorldMapController"),
	WorldMapDefine_1 = require("../../WorldMapDefine"),
	MULTI_MAP_SELECT_ICON_PATH = "SP_MarkMultiMapSelect",
	BLOCK_MARK_ICON_PATH = "SP_MarkBlock";
class TeleportPanel extends WorldMapSecondaryUi_1.WorldMapSecondaryUi {
	constructor() {
		super(...arguments),
			(this.dko = void 0),
			(this.$Ut = void 0),
			(this.Rko = () => {
				this.dko &&
					(this.dko.IsLocked
						? (Log_1.Log.CheckInfo() &&
								Log_1.Log.Info("Map", 50, "追踪", ["markId", this.dko.MarkId]),
							MapController_1.MapController.RequestTrackMapMark(
								this.dko.MarkType,
								this.dko.MarkId,
								!this.dko.IsTracked,
							),
							this.Uko(),
							this.Close())
						: (Log_1.Log.CheckInfo() &&
								Log_1.Log.Info("Map", 50, "传送", ["markId", this.dko.MarkId]),
							WorldMapController_1.WorldMapController.TryTeleport(this.dko)));
			});
	}
	GetResourceId() {
		return "UiItem_GeneralPanel_Prefab";
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos =
			WorldMapDefine_1.secondaryUiPanelComponentsRegisterInfoA),
			(this.BtnBindInfo = []);
	}
	OnStart() {
		this.RootItem.SetRaycastTarget(!1),
			(this.$Ut = new ButtonItem_1.ButtonItem(this.GetButton(11).RootUIComp)),
			this.$Ut.SetFunction(this.Rko);
	}
	OnShowWorldMapSecondaryUi(e) {
		this.dko = e;
		var t = ModelManager_1.ModelManager.MapModel?.GetMarkExtraShowState(
				this.dko.MarkId,
			),
			o =
				((o =
					(t.ShowFlag === Protocol_1.Aki.Protocol.BNs.Proto_ShowDisable
						? this.$Ut.SetEnableClick(!1)
						: this.$Ut.SetEnableClick(!0),
					this.Uko(),
					this.GetText(1).SetText(this.dko.GetTitleText()),
					this.dko.GetAreaText())) && this.GetText(3).SetText(o),
				this.GetText(4).ShowTextNew(this.dko.GetLocaleDesc()),
				this.SetSpriteByPath(this.dko.IconPath, this.GetSprite(0), !1),
				e.IsMultiMapTeleport);
		this.GetSprite(23).SetUIActive(o),
			o &&
				((e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
					"SP_MarkMultiMapSelect",
				)),
				this.SetSpriteByPath(e, this.GetSprite(23), !1)),
			(o = t.ShowFlag === Protocol_1.Aki.Protocol.BNs.Proto_ShowDisable);
		this.GetSprite(24).SetUIActive(o),
			o &&
				((e =
					ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
						"SP_MarkBlock",
					)),
				this.SetSpriteByPath(e, this.GetSprite(24), !1)),
			this.GetItem(12).SetUIActive(!1),
			this.GetVerticalLayout(7).RootUIComp.SetUIActive(!1),
			this.GetItem(6).SetUIActive(!1),
			this.GetVerticalLayout(5).RootUIComp.SetUIActive(!1),
			this.GetItem(9).SetUIActive(!1),
			this.GetItem(8).SetUIActive(!1),
			this.RootItem.SetUIActive(!0);
	}
	Uko() {
		this.dko &&
			(this.dko.IsLocked
				? this.$Ut.SetLocalText(
						this.dko.IsTracked
							? "InstanceDungeonEntranceCancelTrack"
							: "InstanceDungeonEntranceTrack",
					)
				: this.$Ut.SetLocalText("TeleportFastMove"));
	}
	OnBeforeDestroy() {
		this.$Ut.Destroy();
	}
}
exports.TeleportPanel = TeleportPanel;
