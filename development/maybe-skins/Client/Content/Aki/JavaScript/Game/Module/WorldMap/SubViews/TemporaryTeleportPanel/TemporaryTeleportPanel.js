"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TemporaryTeleportPanel = void 0);
const CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById"),
	MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang"),
	Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
	StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	ButtonAndTextItem_1 = require("../../../Common/Button/ButtonAndTextItem"),
	MapController_1 = require("../../../Map/Controller/MapController"),
	WorldMapSecondaryUi_1 = require("../../ViewComponent/WorldMapSecondaryUi"),
	WorldMapDefine_1 = require("../../WorldMapDefine");
class TemporaryTeleportPanel extends WorldMapSecondaryUi_1.WorldMapSecondaryUi {
	constructor() {
		super(...arguments),
			(this.dko = void 0),
			(this.UUt = void 0),
			(this.g2o = void 0),
			(this.f2o = () => {
				MapController_1.MapController.RequestTeleportToTargetByTemporaryTeleport(
					this.dko.TeleportId,
				),
					this.Close();
			}),
			(this.p2o = () => {
				MapController_1.MapController.RequestRemoveDynamicMapMark(
					this.dko.MarkId,
				),
					this.Close();
			});
	}
	GetResourceId() {
		return "UiItem_TemporaryTeleportPanel_Prefab";
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos =
			WorldMapDefine_1.secondaryUiPanelComponentsRegisterInfoB;
	}
	OnStart() {
		this.RootItem.SetRaycastTarget(!1),
			(this.UUt = new ButtonAndTextItem_1.ButtonAndTextItem(this.GetItem(8))),
			this.UUt.BindCallback(this.f2o),
			(this.g2o = new ButtonAndTextItem_1.ButtonAndTextItem(this.GetItem(7))),
			this.g2o.BindCallback(this.p2o);
	}
	OnShowWorldMapSecondaryUi(e) {
		(this.dko = e),
			this.GetText(1).SetText(
				StringUtils_1.StringUtils.Format(
					"{0}{1}/{2}",
					this.dko.GetTitleText(),
					ModelManager_1.ModelManager.MapModel.GetMarkCountByType(
						15,
					).toString(),
					CommonParamById_1.configCommonParamById
						.GetIntConfig("TemporaryTeleportCountLimit")
						.toString(),
				),
			),
			this.SetSpriteByPath(this.dko.IconPath, this.GetSprite(0), !1),
			this.GetText(2).SetText(this.dko.GetDescText()),
			this.GetText(3).SetUIActive(!1),
			this.GetItem(5).SetUIActive(!1),
			this.l1i();
	}
	l1i() {
		this.g2o.SetText(
			MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
				"Text_TeleportDelete_Text",
			),
		);
		var e =
			ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(
				"TeleportFastMove",
			);
		(e =
			(this.UUt.SetText(MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e)),
			ModelManager_1.ModelManager.OnlineModel.GetIsTeamModel()
				? this.g2o.SetActive(
						ModelManager_1.ModelManager.OnlineModel.GetIsMyTeam(),
					)
				: this.g2o.SetActive(!0),
			ModelManager_1.ModelManager.MapModel?.GetMarkExtraShowState(
				this.dko.MarkId,
			))).ShowFlag === Protocol_1.Aki.Protocol.BNs.Proto_ShowDisable
			? this.UUt.RefreshEnable(!1)
			: this.UUt.RefreshEnable(!0);
	}
}
exports.TemporaryTeleportPanel = TemporaryTeleportPanel;
