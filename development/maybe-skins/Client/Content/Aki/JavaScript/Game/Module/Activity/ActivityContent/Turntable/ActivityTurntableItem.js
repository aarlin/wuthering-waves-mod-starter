"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ActivityTurntableToggleItem =
		exports.ActivityTurntableToggleGroupItem =
		exports.ActivityTurntableQuestItem =
			void 0);
const UE = require("ue"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
	UiManager_1 = require("../../../../Ui/UiManager"),
	GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract"),
	LguiUtil_1 = require("../../../Util/LguiUtil"),
	ActivitySmallItemGrid_1 = require("../UniversalComponents/ActivitySmallItemGrid");
class ActivityTurntableQuestItem extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.FRe = 0),
			(this.LOe = 0),
			(this.gOe = void 0),
			(this.KIn = () => {
				this.FRe &&
					(UiManager_1.UiManager.OpenView("QuestView", this.FRe),
					this.Pbn()?.ReadCurrentUnlockQuest());
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIText],
			[2, UE.UIItem],
			[3, UE.UIButtonComponent],
			[4, UE.UIItem],
		]),
			(this.BtnBindInfo = [[3, this.KIn]]);
	}
	async OnBeforeStartAsync() {
		var e = new ActivitySmallItemGrid_1.ActivitySmallItemGrid();
		await e.CreateThenShowByActorAsync(this.GetItem(2).GetOwner()),
			(this.gOe = e);
	}
	Refresh(e, t, i, n) {
		this.gOe.Refresh({ Item: t, HasClaimed: e }),
			this.GetButton(3).RootUIComp.SetUIActive(!e),
			(this.FRe = i),
			(this.LOe = n);
	}
	SetTitle(e, ...t) {
		LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e, ...t);
	}
	SetTxtById(e, ...t) {
		LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e, ...t);
	}
	SetTxt(e) {
		this.GetText(1).SetText(e);
	}
	SetRedDot(e) {
		this.GetItem(4).SetUIActive(e);
	}
	Pbn() {
		if (this.LOe)
			return ModelManager_1.ModelManager.ActivityModel.GetActivityById(
				this.LOe,
			);
	}
}
exports.ActivityTurntableQuestItem = ActivityTurntableQuestItem;
class ActivityTurntableToggleGroupItem extends GridProxyAbstract_1.GridProxyAbstract {
	constructor() {
		super(...arguments),
			(this.QIn = void 0),
			(this.XIn = void 0),
			(this.eji = void 0),
			(this.CanToggleExecuteChange = void 0),
			(this.ToggleCallBack = void 0);
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIItem],
		];
	}
	async OnBeforeStartAsync() {
		var e = this.GetItem(0);
		(this.QIn = new ActivityTurntableToggleItem()),
			await this.QIn.CreateThenShowByActorAsync(e.GetOwner()),
			(this.QIn.ToggleCallBack = this.ToggleCallBack),
			(this.QIn.CanToggleExecuteChange = this.CanToggleExecuteChange),
			(e = this.GetItem(1));
		(this.XIn = new ActivityTurntableToggleItem()),
			await this.XIn.CreateThenShowByActorAsync(e.GetOwner()),
			(this.XIn.ToggleCallBack = this.ToggleCallBack),
			(this.XIn.CanToggleExecuteChange = this.CanToggleExecuteChange);
	}
	OnStart() {
		this.SetToggleDisable(!1);
	}
	SetToggleDisable(e) {
		var t = this.GetToggleState();
		(this.eji = e ? this.XIn : this.QIn),
			void 0 !== t && this.eji.SetToggleState(1 === t),
			this.GetItem(0)?.SetUIActive(!e),
			this.GetItem(1)?.SetUIActive(e);
	}
	Refresh(e) {
		this.QIn.Refresh(e), this.XIn.Refresh(e);
	}
	GetToggleState() {
		return this.eji?.GetToggleState();
	}
	SetToggleState(e, t = !1) {
		this.eji?.SetToggleState(e, t);
	}
}
exports.ActivityTurntableToggleGroupItem = ActivityTurntableToggleGroupItem;
class ActivityTurntableToggleItem extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.RoundId = 0),
			(this.Toggle = void 0),
			(this.CanToggleExecuteChange = void 0),
			(this.ToggleCallBack = void 0),
			(this.$ke = () =>
				!this.CanToggleExecuteChange ||
				this.CanToggleExecuteChange(this.RoundId)),
			(this.Yke = () => {
				this.ToggleCallBack &&
					this.ToggleCallBack(this.RoundId, 1 === this.Toggle.GetToggleState());
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIExtendToggle],
			[1, UE.UISprite],
			[2, UE.UISprite],
		]),
			(this.BtnBindInfo = [[0, this.Yke]]);
	}
	OnStart() {
		(this.Toggle = this.GetExtendToggle(0)),
			this.Toggle &&
				(this.Toggle.CanExecuteChange.Unbind(),
				this.Toggle.CanExecuteChange.Bind(this.$ke));
	}
	Refresh(e) {
		(this.RoundId = e), this.$In();
	}
	$In() {
		var e = "SP_TurntableSelect_Index0" + (t = this.RoundId + 1),
			t =
				((e =
					ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e)),
				(e =
					(this.SetSpriteByPath(e, this.GetSprite(2), !1),
					"SP_TurntableNormal_Index0" + t)),
				ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e));
		this.SetSpriteByPath(t, this.GetSprite(1), !1);
	}
	GetToggleState() {
		return this.Toggle.GetToggleState();
	}
	SetToggleState(e, t = !1) {
		this.Toggle.SetToggleState(e ? 1 : 0, t);
	}
}
exports.ActivityTurntableToggleItem = ActivityTurntableToggleItem;
