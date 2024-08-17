"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ObtainFragmentView = void 0);
const UE = require("ue"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	UiViewBase_1 = require("../../Ui/Base/UiViewBase"),
	UiManager_1 = require("../../Ui/UiManager"),
	LguiUtil_1 = require("../Util/LguiUtil"),
	FragmentMemoryData_1 = require("./FragmentMemoryData");
class ObtainFragmentView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.vxn = void 0),
			(this.tjt = () => {
				this.CloseMe(() => {
					var e = new FragmentMemoryData_1.FragmentMemoryMainViewOpenData();
					(e.FragmentMemoryTopicData = this.vxn.GetTopicData()),
						(e.CurrentSelectId = this.vxn.GetId()),
						(ModelManager_1.ModelManager.FragmentMemoryModel.MemoryFragmentMainViewTryPlayAnimation =
							"Start02"),
						UiManager_1.UiManager.OpenView("MemoryFragmentMainView", e);
				});
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UITexture],
			[1, UE.UIText],
			[2, UE.UIText],
			[3, UE.UIButtonComponent],
		]),
			(this.BtnBindInfo = [[3, this.tjt]]);
	}
	OnBeforeShow() {
		var e =
			((e = this.ChildPopView.PopItem) &&
				(e.SetCaptionTitleVisible(!1), e.SetCaptionTitleIconVisible(!1)),
			this.OpenParam);
		(this.vxn =
			ModelManager_1.ModelManager.FragmentMemoryModel.GetCollectDataById(e)),
			(ModelManager_1.ModelManager.FragmentMemoryModel.CurrentUnlockCollectId = 0),
			this.Og();
	}
	Og() {
		this.Mxn(), this.C4e(), this.$2e();
	}
	Sxn() {
		return this.vxn.GetThemeBg();
	}
	Mxn() {
		this.SetTextureByPath(this.Sxn(), this.GetTexture(0));
	}
	Exn() {
		return this.vxn.GetTitle();
	}
	C4e() {
		LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), this.Exn());
	}
	ke() {
		return this.vxn.GetTimeText();
	}
	$2e() {
		LguiUtil_1.LguiUtil.SetLocalTextNew(
			this.GetText(2),
			"FragmentMemoryCollectTime",
			this.ke(),
		);
	}
}
exports.ObtainFragmentView = ObtainFragmentView;
