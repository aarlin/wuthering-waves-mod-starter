"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.DropDownTitle = exports.LordGymChallengeRecordView = void 0);
const UE = require("ue"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
	CommonDropDown_1 = require("../../Common/DropDown/CommonDropDown"),
	DropDownItemBase_1 = require("../../Common/DropDown/Item/DropDownItemBase"),
	TitleItemBase_1 = require("../../Common/DropDown/Item/TitleItemBase"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew"),
	LordGymDefine_1 = require("../LordGymDefine"),
	LordRecordItemView_1 = require("./LordRecordItemView"),
	MIN_DIFFICULTY = 1,
	MAX_DIFFICULTY = 6;
class LordGymChallengeRecordView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.tMi = 1),
			(this.SIt = LordGymDefine_1.NONE_FILTER_TYPE),
			(this.iMi = void 0),
			(this.rMi = void 0),
			(this.oMi = (e, i) => {
				return new DropDownItem(e);
			}),
			(this.nMi = (e) => {
				return new DropDownTitle(e);
			}),
			(this.sMi = (e, i) => {
				(this.SIt = i.Id), this.aMi();
			}),
			(this.hMi = () => {
				(this.tMi = Math.max(MIN_DIFFICULTY, this.tMi - 1)), this.aMi();
			}),
			(this.lMi = () => {
				(this.tMi = Math.min(MAX_DIFFICULTY, this.tMi + 1)), this.aMi();
			}),
			(this._Mi = () => new LordRecordItemView_1.LoadRecordItemView());
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIScrollViewWithScrollbarComponent],
			[2, UE.UIItem],
			[3, UE.UIButtonComponent],
			[4, UE.UIButtonComponent],
			[5, UE.UIItem],
			[6, UE.UIText],
		]),
			(this.BtnBindInfo = [
				[3, this.hMi],
				[4, this.lMi],
			]);
	}
	async OnBeforeStartAsync() {
		(this.iMi = new CommonDropDown_1.CommonDropDown(
			this.GetItem(5),
			this.oMi,
			this.nMi,
		)),
			await this.iMi.Init();
	}
	OnStart() {
		this.iMi.InitScroll(
			ConfigManager_1.ConfigManager.LordGymConfig.GetAllLordGymFilterTypeConfig(),
			(e) => e,
		),
			this.iMi?.SetOnSelectCall(this.sMi),
			this.iMi?.SetShowType(1),
			(this.rMi = new GenericScrollViewNew_1.GenericScrollViewNew(
				this.GetScrollViewWithScrollbar(1),
				this._Mi,
			));
	}
	OnBeforeDestroy() {
		this.iMi?.Destroy(), (this.iMi = void 0);
	}
	OnBeforeShow() {
		this.aMi();
	}
	uMi() {
		var e =
			ConfigManager_1.ConfigManager.LordGymConfig.GetLordGymAllConfigByDifficulty(
				this.tMi,
			);
		return (
			e?.filter((e) => !e.IsDebug),
			this.SIt === LordGymDefine_1.NONE_FILTER_TYPE
				? e
				: e?.filter((e) => e.FilterType === this.SIt)
		);
	}
	aMi() {
		this.GetButton(3)?.SetSelfInteractive(this.tMi !== MIN_DIFFICULTY),
			this.GetButton(4)?.SetSelfInteractive(this.tMi !== MAX_DIFFICULTY);
		var e = this.uMi();
		e && this.rMi.RefreshByData(e),
			LguiUtil_1.LguiUtil.SetLocalTextNew(
				this.GetText(6),
				"LordGymDifficulty",
				this.tMi,
			);
	}
}
exports.LordGymChallengeRecordView = LordGymChallengeRecordView;
class DropDownItem extends DropDownItemBase_1.DropDownItemBase {
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIExtendToggle],
			[1, UE.UIText],
		];
	}
	OnShowDropDownItemBase(e) {
		LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e.Name);
	}
	GetDropDownToggle() {
		return this.GetExtendToggle(0);
	}
}
const TEXT_INDEX = 0;
class DropDownTitle extends TitleItemBase_1.TitleItemBase {
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [[TEXT_INDEX, UE.UIText]];
	}
	ShowTemp(e, i) {
		LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(TEXT_INDEX), e.Name);
	}
}
exports.DropDownTitle = DropDownTitle;
//# sourceMappingURL=LordGymChallengeRecordView.js.map
