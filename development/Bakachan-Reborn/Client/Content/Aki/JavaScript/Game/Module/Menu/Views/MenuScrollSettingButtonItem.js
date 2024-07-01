"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MenuScrollSettingButtonItem = void 0);
const UE = require("ue"),
	StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	GameQualitySettingsManager_1 = require("../../../GameQualitySettings/GameQualitySettingsManager"),
	UiManager_1 = require("../../../Ui/UiManager"),
	ChannelController_1 = require("../../Channel/ChannelController"),
	MenuController_1 = require("../MenuController"),
	MenuScrollSettingBaseItem_1 = require("./MenuScrollSettingBaseItem");
class MenuScrollSettingButtonItem extends MenuScrollSettingBaseItem_1.MenuScrollSettingBaseItem {
	constructor() {
		super(...arguments),
			(this.Pe = void 0),
			(this.Hwi = "{0}x{1}"),
			(this.jwi = "Account,"),
			(this.Wwi = () => {
				this.GetActive() && this.ZGe();
			}),
			(this.Kwi = () => {
				var e, t;
				this.GetItemClickLimit(this.GetButton(1)) ||
					((e = this.Pe.MenuDataButtonViewName).includes(this.jwi)
						? void 0 !== (t = Number(e.substring(this.jwi.length))) &&
							ChannelController_1.ChannelController.ProcessAccountSetting(t)
						: (t = MenuController_1.MenuController.OpenViewFuncMap.get(e))
							? t()
							: UiManager_1.UiManager.OpenView(e, [this.Pe, this.Qwi]));
			}),
			(this.Qwi = (e, t) => {
				void 0 !== this.Pe &&
					e === this.Pe.MenuDataFunctionId &&
					(6 === e
						? this.Xwi(t, !0)
						: 7 === e
							? this.FireSaveMenuChange(t)
							: this.SetButtonText(this.Pe.MenuDataOptionsNameList[t], t, !0));
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIButtonComponent],
			[2, UE.UIText],
		]),
			(this.BtnBindInfo = [[1, this.Kwi]]);
	}
	OnStart() {
		this.GetButton(1).SetCanClickWhenDisable(!0), this.Ore();
	}
	OnBeforeDestroy() {
		this.Pe && (this.Pe = void 0), this.kre();
	}
	Ore() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.ChangeConfigValue,
			this.Wwi,
		);
	}
	kre() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.ChangeConfigValue,
			this.Wwi,
		);
	}
	OnClear() {
		this.GetButton(1)?.OnClickCallBack.Unbind();
	}
	Update(e) {
		(this.Pe = e), this.RefreshTitle(), this.ZGe();
	}
	RefreshTitle() {
		this.GetText(0).ShowTextNew(this.Pe.MenuDataFunctionName ?? "");
	}
	ZGe() {
		this.GetRootItem().SetUIActive(!0);
		var e = MenuController_1.MenuController.GetTargetConfig(
			this.Pe.MenuDataFunctionId,
		);
		6 === this.Pe.MenuDataFunctionId
			? this.Xwi(e)
			: this.SetButtonText(this.Pe.MenuDataOptionsNameList[e], e);
	}
	Xwi(e, t = !1) {
		var i =
			GameQualitySettingsManager_1.GameQualitySettingsManager.Get().GetResolutionByList(
				e,
			);
		this.GetText(2).SetText(
			StringUtils_1.StringUtils.FormatStaticBuilder(this.Hwi, i.X, i.Y),
		);
		for (
			let e = 0;
			e <
			GameQualitySettingsManager_1.GameQualitySettingsManager.Get().GetResolutionList()
				.length;
			e++
		)
			this.Pe.MenuDataOptionsValueList.push(e);
		t && this.FireSaveMenuChange(e);
	}
	SetButtonText(e, t, i = !1) {
		var n = this.Pe.MenuDataButtonTextId,
			s = this.GetText(2);
		n ? s.ShowTextNew(n) : s.ShowTextNew(e), i && this.FireSaveMenuChange(t);
	}
	SetInteractionActive(e) {
		this.GetButton(1).SetSelfInteractive(e);
	}
}
exports.MenuScrollSettingButtonItem = MenuScrollSettingButtonItem;
