"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoleListComponent = void 0);
const UE = require("ue"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	RedDotController_1 = require("../../../RedDot/RedDotController"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	UiCameraAnimationManager_1 = require("../../UiCameraAnimation/UiCameraAnimationManager"),
	GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew"),
	RoleController_1 = require("../RoleController"),
	RoleListItem_1 = require("./RoleListItem"),
	Log_1 = require("../../../../Core/Common/Log");
class RoleListComponent extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.ScrollView = void 0),
			(this.RoleViewAgent = void 0),
			(this.DataList = void 0),
			(this.RoleSystemUiParams = void 0),
			(this.Hke = () => {
				var e = new RoleListItem_1.RoleListItem();
				return (
					(e.ToggleCallBack = this.llo),
					(e.CanToggleExecuteChange = this.d4e),
					e
				);
			}),
			(this.d4e = (e) =>
				this.ScrollView.GetGenericLayout().GetSelectedGridIndex() !== e &&
				!UiCameraAnimationManager_1.UiCameraAnimationManager.IsPlayingAnimation()),
			(this.llo = (e) => {
				this.ScrollView.GetGenericLayout().SelectGridProxy(e),
					this.RoleViewAgent?.SetCurSelectRoleId(this.CurSelectDataId),
					RoleController_1.RoleController.OnSelectedRoleChange(
						this.CurSelectDataId,
					),
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.RoleSystemChangeRole,
						this.CurSelectDataId,
					);
			});
	}
	get CurSelectDataId() {
		var e = this.ScrollView.GetGenericLayout().GetSelectedGridIndex();
		return !this.DataList || e < 0 || e >= this.DataList.length
			? 0
			: this.DataList[e].RoleDataId;
	}
	GetSelfScrollView() {
		return this.ScrollView;
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [[0, UE.UIScrollViewWithScrollbarComponent]];
	}
	OnStart() {
		(this.RoleViewAgent = this.OpenParam),
			void 0 === this.RoleViewAgent
				? Log_1.Log.CheckError() &&
					Log_1.Log.Error("Role", 59, "RoleViewAgent为空", [
						"界面名称",
						"RoleListComponent",
					])
				: (this.ScrollView = new GenericScrollViewNew_1.GenericScrollViewNew(
						this.GetScrollViewWithScrollbar(0),
						this.Hke,
					));
	}
	UnBindRedDot() {
		RedDotController_1.RedDotController.UnBindRedDot("RoleSystemRoleList");
	}
	SetRoleSystemUiParams(e) {
		this.RoleSystemUiParams = e;
	}
	async UpdateComponent(e) {
		var t = [];
		for (const o of e) {
			var i = new RoleListItem_1.RoleListItemData();
			(i.RoleDataId = o),
				(i.NeedShowTrial = this.RoleSystemUiParams?.RoleListNeedTrial ?? !0),
				(i.NeedRedDot = this.RoleSystemUiParams?.RoleListRedDot ?? !1),
				t.push(i);
		}
		(this.DataList = t), await this.ScrollView.RefreshByDataAsync(t);
	}
	SetCurSelection(e) {
		var t = this.DataList.findIndex((t) => t.RoleDataId === e);
		t < 0 ||
			t >= this.DataList.length ||
			(this.llo(t),
			(t = this.ScrollView.GetItemByIndex(t)) && this.ScrollView.ScrollTo(t));
	}
}
exports.RoleListComponent = RoleListComponent;
