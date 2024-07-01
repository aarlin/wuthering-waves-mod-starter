"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RouletteGridEquipItem = void 0);
const AudioSystem_1 = require("../../../../Core/Audio/AudioSystem"),
	Log_1 = require("../../../../Core/Common/Log"),
	CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	RouletteController_1 = require("../RouletteController"),
	RouletteGridBase_1 = require("./RouletteGridBase");
class RouletteGridEquipItem extends RouletteGridBase_1.RouletteGridBase {
	Init() {
		var e, t, o;
		(this.Data.ShowNum = !1),
			this.IsDataValid()
				? ((o = this.Data.Id),
					(e = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfig(o)),
					(t = ConfigManager_1.ConfigManager.SpecialItemConfig.GetConfig(o)),
					e ||
						(Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"Phantom",
								38,
								"[FuncMenuWheel]轮盘道具格子对应ItemId不存在",
								["ItemId", o],
							)),
					t ||
						((this.Data.ShowNum = !0),
						(t =
							ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
								o,
							)),
						(this.Data.DataNum = t)),
					(this.Data.Name = e.Name),
					(this.IsIconTexture = !0),
					this.LoadIconByItemId(this.Data.Id))
				: ((this.Data.Name = "ExploreTools_10001_Name"),
					(this.IsIconTexture = !1),
					(o = CommonParamById_1.configCommonParamById.GetStringConfig(
						"Roulette_EmptyItem_Sprite",
					)),
					this.LoadSpriteIcon(o)),
			1 === this.Data.State && this.IsForbiddenState() && (this.Data.State = 0);
	}
	IsForbiddenState() {
		return !1;
	}
	OnSelect(e) {
		e &&
			(0 === this.Data.Id
				? RouletteController_1.RouletteController.OpenEmptyTips()
				: this.IsDataValid() &&
					RouletteController_1.RouletteController.EquipItemSetRequest(
						this.Data.Id,
						(e) => {
							e &&
								AudioSystem_1.AudioSystem.PostEvent(
									"play_ui_fx_spl_roulette_new_equip",
								);
						},
					));
	}
}
exports.RouletteGridEquipItem = RouletteGridEquipItem;
