"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.InstanceDungeonMonsterView = void 0);
const ue_1 = require("ue"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	UiViewBase_1 = require("../../Ui/Base/UiViewBase"),
	TowerElementItem_1 = require("../TowerDetailUi/View/TowerElementItem"),
	GenericLayout_1 = require("../Util/Layout/GenericLayout"),
	InstanceDungeonMonsterGrid_1 = require("./InstanceDungeonMonsterGrid");
class InstanceDungeonMonsterView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.MPr = 0),
			(this.Mhi = void 0),
			(this.Hli = void 0),
			(this.jli = () =>
				new InstanceDungeonMonsterGrid_1.InstanceDungeonMonsterGrid()),
			(this.jhi = () => new TowerElementItem_1.TowerElementItem());
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, ue_1.UIText],
			[1, ue_1.UIGridLayout],
			[2, ue_1.UIItem],
			[3, ue_1.UIHorizontalLayout],
		];
	}
	OnStart() {
		(this.MPr = this.OpenParam),
			this.GetText(0).ShowTextNew(
				ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(this.MPr)
					.MonsterTips,
			),
			(this.Hli = new GenericLayout_1.GenericLayout(
				this.GetGridLayout(1),
				this.jli,
			)),
			(this.Mhi = new GenericLayout_1.GenericLayout(
				this.GetHorizontalLayout(3),
				this.jhi,
			));
	}
	OnBeforeShow() {
		var e = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(
			this.MPr,
		);
		this.Hli.RefreshByData(e.MonsterPreview),
			0 < e.RecommendElement?.length
				? (this.GetItem(2)?.SetUIActive(!0),
					this.Mhi.RefreshByData(e.RecommendElement))
				: this.GetItem(2)?.SetUIActive(!1);
	}
	OnBeforeDestroy() {
		this.Hli.ClearChildren();
	}
}
exports.InstanceDungeonMonsterView = InstanceDungeonMonsterView;
