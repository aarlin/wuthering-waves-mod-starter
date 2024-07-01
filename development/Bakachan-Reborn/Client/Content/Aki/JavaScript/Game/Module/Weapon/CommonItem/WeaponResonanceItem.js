"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.WeaponResonanceItem = void 0);
const UE = require("ue"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	LguiUtil_1 = require("../../Util/LguiUtil");
class WeaponResonanceItem extends UiPanelBase_1.UiPanelBase {
	constructor(e) {
		super(), this.CreateThenShowByActor(e.GetOwner());
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[2, UE.UIText],
			[0, UE.UIText],
			[1, UE.UIText],
			[3, UE.UIText],
			[4, UE.UISprite],
		];
	}
	UpdateItem(e) {
		var t = e.GetWeaponConfig(),
			n =
				(LguiUtil_1.LguiUtil.SetLocalText(
					this.GetText(2),
					"WeaponResonanceItemLevelText",
					e.GetResonanceLevel(),
				),
				ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponResonanceConfig(
					t.ResonId,
					e.GetResonanceLevel(),
				)),
			a =
				((n =
					(this.GetText(1).SetUIActive(void 0 !== n),
					this.GetText(3).SetUIActive(void 0 !== n),
					n &&
						this.GetText(3).SetText(
							ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponResonanceDesc(
								n.Name,
							),
						),
					LguiUtil_1.LguiUtil.SetLocalTextNew(
						this.GetText(0),
						e.GetItemConfig().BgDescription,
					),
					ModelManager_1.ModelManager.WeaponModel.GetWeaponConfigDescParams(
						t,
						e.GetResonanceLevel(),
					))),
				LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), t.Desc, ...n),
				t.WeaponType);
		for (const e of ConfigManager_1.ConfigManager.MappingConfig.GetWeaponConfList())
			if (a === e.Value) {
				this.SetSpriteByPath(e.Icon, this.GetSprite(4), !1);
				break;
			}
	}
}
exports.WeaponResonanceItem = WeaponResonanceItem;
