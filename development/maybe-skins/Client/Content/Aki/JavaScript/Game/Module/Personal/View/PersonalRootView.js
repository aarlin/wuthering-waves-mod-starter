"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PersonalRootView = void 0);
const UE = require("ue"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
	CommonTabComponentData_1 = require("../../Common/TabComponent/CommonTabComponentData"),
	CommonTabData_1 = require("../../Common/TabComponent/CommonTabData"),
	CommonTabTitleData_1 = require("../../Common/TabComponent/CommonTabTitleData"),
	TabComponentWithCaptionItem_1 = require("../../Common/TabComponent/TabComponentWithCaptionItem"),
	PersonalTabItem_1 = require("../../Common/TabComponent/TabItem/PersonalTabItem"),
	TabViewComponent_1 = require("../../Common/TabComponent/TabViewComponent"),
	UiSceneManager_1 = require("../../UiComponent/UiSceneManager");
class PersonalRootView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.TabViewComponent = void 0),
			(this.TabDataList = []),
			(this.w5i = void 0),
			(this.TabComponent = void 0),
			(this.v4i = void 0),
			(this.pqe = (e) => {
				var t = this.TabDataList[e],
					o = t.ChildViewName;
				e = this.TabComponent.GetTabItemByIndex(e);
				this.TabViewComponent.ToggleCallBack(t, o, e, this.v4i);
			}),
			(this.dVe = (e, t) => new PersonalTabItem_1.PersonalTabItem()),
			(this.yqe = (e) => (
				(e = this.TabDataList[e]),
				new CommonTabData_1.CommonTabData(
					e.Icon,
					new CommonTabTitleData_1.CommonTabTitleData(e.TabName),
				)
			)),
			(this.CloseClick = () => {
				this.CloseMe();
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIButtonComponent],
			[1, UE.UIItem],
			[2, UE.UIItem],
		]),
			(this.BtnBindInfo = [[0, this.CloseClick]]);
	}
	async OnBeforeStartAsync() {
		(this.v4i = this.OpenParam),
			(ModelManager_1.ModelManager.PersonalModel.UiCachePersonalData =
				this.v4i),
			this.InitTabComponent(),
			await this.RebuildTabItem();
	}
	InitTabComponent() {
		var e = new CommonTabComponentData_1.CommonTabComponentData(
			this.dVe,
			this.pqe,
			this.yqe,
		);
		(this.TabComponent =
			new TabComponentWithCaptionItem_1.TabComponentWithCaptionItem(
				this.GetItem(1),
				e,
				this.CloseClick,
			)),
			(this.TabViewComponent = new TabViewComponent_1.TabViewComponent(
				this.GetItem(2),
			));
	}
	async RebuildTabItem() {
		this.TabDataList =
			ConfigManager_1.ConfigManager.DynamicTabConfig.GetViewTabList(
				"PersonalRootView",
			);
		var e = this.TabDataList.length;
		await this.TabComponent.RefreshTabItemByLengthAsync(e);
	}
	OnAfterShow() {
		this.TabComponent.SelectToggleByIndex(0, !0),
			this.TabViewComponent.SetCurrentTabViewState(!0);
	}
	OnBeforePlayCloseSequence() {
		UiSceneManager_1.UiSceneManager.ClearUiSequenceFrame();
	}
	OnAfterHide() {
		this.TabViewComponent.SetCurrentTabViewState(!1);
	}
	OnStart() {
		(this.w5i = UiSceneManager_1.UiSceneManager.InitRoleSystemRoleActor(1)),
			this.w5i.Model?.CheckGetComponent(1)?.SetTransformByTag("RoleCase");
	}
	OnBeforeDestroy() {
		UiSceneManager_1.UiSceneManager.DestroyRoleSystemRoleActor(this.w5i);
	}
}
exports.PersonalRootView = PersonalRootView;
