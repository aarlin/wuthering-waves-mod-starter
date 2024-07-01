"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PhotographOptionSetup = void 0);
const UE = require("ue"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	PhotographController_1 = require("../PhotographController");
class PhotographOptionSetup extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.AWi = 0),
			(this.PWi = void 0),
			(this.xWi = 0),
			(this.wWi = !1),
			(this.BWi = void 0),
			(this.EPe = void 0),
			(this.m2e = () => {
				this.fRt(!this.wWi),
					this.bWi(this.wWi),
					this.qWi(),
					this.BWi && this.BWi(this.xWi);
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIButtonComponent],
		]),
			(this.BtnBindInfo = [[1, this.m2e]]);
	}
	OnStart() {
		this.EPe = new LevelSequencePlayer_1.LevelSequencePlayer(
			this.GetButton(1).RootUIComp,
		);
	}
	OnBeforeDestroy() {
		this.EPe.Clear(), (this.EPe = void 0);
	}
	Initialize(e) {
		(this.AWi = e), this.Refresh(), this.SetEnable(!0);
	}
	fbt(e) {
		(this.xWi = e), this.GWi(this.xWi), this.qWi();
	}
	Refresh() {
		var e, t;
		(this.PWi =
			ConfigManager_1.ConfigManager.PhotographConfig.GetPhotoSetupConfig(
				this.AWi,
			)),
			0 === this.PWi.Type &&
				((e = ModelManager_1.ModelManager.PhotographModel.GetPhotographOption(
					this.AWi,
				)),
				this.fbt(e),
				(e = this.PWi.Name),
				(t = this.GetText(0)),
				LguiUtil_1.LguiUtil.SetLocalTextNew(t, e));
	}
	SetEnable(e) {
		this.RootItem.SetAlpha(e ? 1 : 0.5), this.GetButton(1).SetEnable(e);
	}
	BindOnIndexChanged(e) {
		this.BWi = e;
	}
	GetSetupId() {
		return this.AWi;
	}
	GetSetupConfig() {
		return this.PWi;
	}
	GWi(e) {
		var t = this.PWi.Options.length - 1;
		this.fRt(e === t, !1);
	}
	bWi(e) {
		var t = this.PWi.Options.length - 1;
		this.xWi = e ? t : 0;
	}
	fRt(e, t = !0) {
		(e = (this.wWi = e) ? "ClickL" : "ClickR"),
			this.EPe?.PlayLevelSequenceByName(e),
			t || this.EPe?.StopSequenceByKey(e, !1, !0);
	}
	qWi() {
		PhotographController_1.PhotographController.SetPhotographOption(
			this.PWi.ValueType,
			this.xWi,
		);
	}
}
exports.PhotographOptionSetup = PhotographOptionSetup;
