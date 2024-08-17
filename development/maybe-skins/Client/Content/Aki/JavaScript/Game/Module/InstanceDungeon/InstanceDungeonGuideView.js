"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.InstanceDungeonGuideView = void 0);
const UE = require("ue"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	UiViewBase_1 = require("../../Ui/Base/UiViewBase"),
	LguiUtil_1 = require("../Util/LguiUtil");
class InstanceDungeonGuideView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.ACt = () => {
				this.CloseMe();
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UITexture],
			[2, UE.UIItem],
			[3, UE.UIText],
			[5, UE.UIItem],
			[4, UE.UIButtonComponent],
			[6, UE.UIButtonComponent],
			[7, UE.UIItem],
			[8, UE.UIItem],
		]),
			(this.BtnBindInfo = [[6, this.ACt]]);
	}
	OnStart() {
		this.GetButton(4).RootUIComp.SetUIActive(!1),
			this.GetItem(7).SetUIActive(!1),
			this.GetItem(5).SetUIActive(!1),
			this.GetItem(8).SetUIActive(!1),
			this.GetItem(2).SetUIActive(!1),
			this._li();
	}
	_li() {
		var e =
			ModelManager_1.ModelManager.InstanceDungeonGuideModel.GetCurrentInstanceDungeonGuideValue();
		!e ||
			!(e =
				ConfigManager_1.ConfigManager.HelpConfig.GetHelpContentInfoByGroupId(
					e,
				)) ||
			e.length < 1 ||
			(LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e[0].Title),
			LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), e[0].Content),
			(e = e[0].Picture) && "" !== e
				? (this.GetTexture(1).SetUIActive(!0),
					this.SetTextureByPath(e, this.GetTexture(1)))
				: this.GetTexture(1).SetUIActive(!1));
	}
}
exports.InstanceDungeonGuideView = InstanceDungeonGuideView;
