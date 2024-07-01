"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoleLevelUpSuccessEffectView = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
	GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView");
class RoleLevelUpSuccessEffectView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.Pe = void 0),
			(this.z_o = void 0),
			(this.nqe = () => {
				var e = this.Pe.ClickFunction;
				e && e(), this.CloseMe();
			}),
			(this.Z_o = () => new SuccessDescriptionItem());
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UILoopScrollViewComponent],
			[1, UE.UIItem],
			[2, UE.UIText],
			[3, UE.UIText],
			[4, UE.UIButtonComponent],
			[5, UE.UIButtonComponent],
		]),
			(this.BtnBindInfo = [
				[4, this.nqe],
				[5, this.nqe],
			]);
	}
	OnBeforeCreate() {
		void 0 === this.OpenParam
			? Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"Role",
					38,
					"RoleLevelUpSuccessEffectView 打开失败,未传入界面数据",
				)
			: ((this.Pe = this.OpenParam), this.IBt());
	}
	OnStart() {
		var e = this.GetItem(1);
		this.z_o = new LoopScrollView_1.LoopScrollView(
			this.GetLoopScrollViewComponent(0),
			e.GetOwner(),
			this.Z_o,
		);
	}
	OnBeforeShow() {
		this.ILt(), this.euo(), this.C_o();
	}
	OnBeforeDestroy() {
		this.z_o && (this.z_o.ClearGridProxies(), (this.z_o = void 0));
	}
	IBt() {
		var e = this.Pe.AudioId;
		e &&
			((e = ConfigManager_1.ConfigManager.AudioConfig.GetAudioPath(e).Path),
			this.SetAudioEvent(e));
	}
	C_o() {
		var e = this.Pe.ClickText ?? "Text_BackToView_Text";
		this.GetText(3).ShowTextNew(e);
	}
	ILt() {
		var e = this.Pe.Title ?? "Text_ActivedSucceed_Text";
		this.GetText(2).ShowTextNew(e);
	}
	euo() {
		var e;
		this.z_o &&
			(void 0 !== (e = this.Pe.TextList)
				? this.z_o.ReloadData(e)
				: this.GetLoopScrollViewComponent(0).RootUIComp.SetUIActive(!1));
	}
}
exports.RoleLevelUpSuccessEffectView = RoleLevelUpSuccessEffectView;
class SuccessDescriptionItem extends GridProxyAbstract_1.GridProxyAbstract {
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [[0, UE.UIText]];
	}
	SetDescriptionText(e) {
		LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e.TextId, ...e.Params);
	}
	Refresh(e, t, i) {
		this.SetDescriptionText(e);
	}
}
