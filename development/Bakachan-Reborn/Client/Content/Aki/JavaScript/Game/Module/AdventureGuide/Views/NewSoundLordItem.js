"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.NewSoundLordItem = void 0);
const UE = require("ue"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	LordGymController_1 = require("../../LordGym/LordGymController"),
	LguiUtil_1 = require("../../Util/LguiUtil");
class NewSoundLordItem extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super();
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UITexture],
			[2, UE.UIText],
			[3, UE.UIText],
		];
	}
	OnStart() {
		this.GetText(3)?.SetUIActive(!1);
	}
	Update(e) {
		if (0 !== e.Type) {
			var t = e.Conf,
				r = this.GetText(0);
			r = (LguiUtil_1.LguiUtil.SetLocalTextNew(r, t.Name), this.GetTexture(1));
			if (e.IsLock) this.SetTextureByPath(t.LockBigIcon, r);
			else {
				this.SetTextureByPath(t.BigIcon, r);
				const e = t.AdditionalId;
				LordGymController_1.LordGymController.LordGymInfoRequest().finally(
					() => {
						var t =
							ModelManager_1.ModelManager.LordGymModel?.GetLordGymEntranceFinish(
								e,
							);
						LguiUtil_1.LguiUtil.SetLocalTextNew(
							this.GetText(2),
							"LordGymDifficulty",
							t ?? "0/0",
						);
					},
				);
			}
		}
	}
}
exports.NewSoundLordItem = NewSoundLordItem;
