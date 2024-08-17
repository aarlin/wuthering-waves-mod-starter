"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MenuScrollSettingDropDown = void 0);
const UE = require("ue"),
	CommonDropDown_1 = require("../../Common/DropDown/CommonDropDown"),
	OneTextDropDownItem_1 = require("../../Common/DropDown/Item/OneText/OneTextDropDownItem"),
	OneTextTitleItem_1 = require("../../Common/DropDown/Item/OneText/OneTextTitleItem"),
	DropDownLogicCreator_1 = require("../DropDownLogic.ts/DropDownLogicCreator"),
	MenuScrollSettingBaseItem_1 = require("./MenuScrollSettingBaseItem");
class MenuScrollSettingDropDown extends MenuScrollSettingBaseItem_1.MenuScrollSettingBaseItem {
	constructor() {
		super(...arguments),
			(this.hBi = void 0),
			(this.Pe = void 0),
			(this.lBi = void 0),
			(this.i6e = (e) => this.lBi.GetDataTextId(e, this.Pe));
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIItem],
		];
	}
	async OnBeforeStartAsync() {
		(this.hBi = new CommonDropDown_1.CommonDropDown(
			this.GetItem(1),
			(e) => new OneTextDropDownItem_1.OneTextDropDownItem(e),
			(e) => new OneTextTitleItem_1.OneTextTitleItem(e),
		)),
			await this.hBi.Init(),
			this.hBi.SetOnSelectCall((e, t) => {
				this.lBi.TriggerSelectChange(t, this.Pe);
			});
	}
	OnStart() {}
	OnBeforeDestroy() {
		this.hBi.Destroy();
	}
	mGe() {
		this.GetText(0).ShowTextNew(this.Pe.MenuDataFunctionName ?? "");
	}
	_Bi() {
		this.lBi = DropDownLogicCreator_1.DropDownLogicCreator.GetDropDownLogic(
			this.Pe.MenuDataFunctionId,
		);
		var e = this.lBi.GetDropDownDataList(),
			t = this.lBi.GetDefaultIndex(this.Pe);
		this.hBi.InitScroll(e, this.i6e, t);
	}
	Update(e) {
		(this.Pe = e), this.mGe(), this._Bi();
	}
	async ClearAsync() {
		var e = [];
		for (const t of this.hBi.GetDropDownItemList()) e.push(t.DestroyAsync());
		await Promise.all(e);
	}
	SetInteractionActive(e) {}
}
exports.MenuScrollSettingDropDown = MenuScrollSettingDropDown;
