"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CookMediumItemGrid = void 0);
const ConfigManager_1 = require("../../../Manager/ConfigManager"),
	LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
	LoopScrollMediumItemGrid_1 = require("../../Common/MediumItemGrid/LoopScrollMediumItemGrid"),
	CookController_1 = require("../CookController");
class CookMediumItemGrid extends LoopScrollMediumItemGrid_1.LoopScrollMediumItemGrid {
	constructor() {
		super(...arguments), (this.Gft = void 0);
	}
	OnStart() {
		this.Gft = new LevelSequencePlayer_1.LevelSequencePlayer(
			this.GetRootItem(),
		);
	}
	OnBeforeDestroy() {
		this.Gft.Clear(), (this.Gft = void 0);
	}
	OnSelected(e) {
		this.SetSelected(!0);
	}
	OnDeselected(e) {
		this.SetSelected(!1);
	}
	OnRefresh(e, o, t) {
		this.SetSelected(o);
		o = e.ItemId;
		var r = {
				Type: 4,
				Data: e,
				IsNewVisible: e.IsNew,
				IsProhibit: !e.IsUnLock,
				IsOmitBottomText: !0,
			},
			i = e.MainType;
		if (1 === i) {
			var n =
					ConfigManager_1.ConfigManager.CookConfig.GetCookProcessedById(
						o,
					).FinalItemId,
				a = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(n);
			if (!a) return;
			var l =
				CookController_1.CookController.CheckCanProcessed(o) && e.IsUnLock;
			(r.IsDisable = e.IsUnLock && !l),
				(r.BottomTextId = a.Name),
				(r.ItemConfigId = n),
				(r.StarLevel = a.QualityId);
		}
		if (0 === i) {
			if (
				((n = (l =
					ConfigManager_1.ConfigManager.CookConfig.GetCookFormulaById(o))
					.FoodItemId),
				!(a =
					ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(n)))
			)
				return;
			(i = e),
				(n = CookController_1.CookController.CheckCanCook(o) && e.IsUnLock),
				(r.IsDisable = e.IsUnLock && !n),
				(r.BottomTextId = a.Name),
				(r.ItemConfigId = l.FoodItemId),
				(r.StarLevel = a.QualityId),
				(r.IsTimeFlagVisible = 0 < i.ExistEndTime);
		}
		this.Apply(r);
	}
}
exports.CookMediumItemGrid = CookMediumItemGrid;
