"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.DetectorPanel = void 0);
const CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById"),
	StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	ButtonItem_1 = require("../../../Common/Button/ButtonItem"),
	MapController_1 = require("../../../Map/Controller/MapController"),
	WorldMapSecondaryUi_1 = require("../../ViewComponent/WorldMapSecondaryUi"),
	WorldMapDefine_1 = require("../../WorldMapDefine");
class DetectorPanel extends WorldMapSecondaryUi_1.WorldMapSecondaryUi {
	constructor() {
		super(...arguments),
			(this.dko = void 0),
			(this.$Ut = void 0),
			(this.Rko = () => {
				MapController_1.MapController.RequestRemoveDynamicMapMark(
					this.dko.MarkId,
				),
					this.Close();
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
	OnBeforeDestroy() {
		this.$Ut.Destroy();
	}
	OnShowWorldMapSecondaryUi(t) {
		(this.dko = t),
			this.Uko(),
			(t =
				CommonParamById_1.configCommonParamById.GetIntConfig(
					"TreasureBoxDetectionMaxNum",
				) ?? 0),
			this.GetText(1).SetText(
				StringUtils_1.StringUtils.Format(
					"{0}{1}/{2}",
					this.dko.GetTitleText(),
					ModelManager_1.ModelManager.MapModel.GetMarkCountByType(
						17,
					).toString(),
					t.toString(),
				),
			),
			this.GetText(4).SetText(this.dko.GetDescText()),
			this.SetSpriteByPath(this.dko.IconPath, this.GetSprite(0), !1),
			this.GetItem(12).SetUIActive(!1),
			this.GetItem(2).SetUIActive(!1),
			this.GetVerticalLayout(7).RootUIComp.SetUIActive(!1),
			this.GetItem(6).SetUIActive(!1),
			this.GetVerticalLayout(5).RootUIComp.SetUIActive(!1),
			this.GetItem(9).SetUIActive(!1),
			this.GetItem(8).SetUIActive(!1);
	}
	Uko() {
		this.dko && this.$Ut.SetLocalTextNew("Text_TeleportDelete_Text");
	}
}
exports.DetectorPanel = DetectorPanel;
