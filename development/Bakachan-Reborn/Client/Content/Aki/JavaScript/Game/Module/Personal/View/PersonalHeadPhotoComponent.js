"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PersonalHeadPhotoComponent = void 0);
const UE = require("ue"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	UiManager_1 = require("../../../Ui/UiManager"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew"),
	PersonalController_1 = require("../Controller/PersonalController"),
	PersonalRoleSmallItemGrid_1 = require("./PersonalRoleSmallItemGrid"),
	ConfigCommon_1 = require("../../../../Core/Config/ConfigCommon");
class PersonalHeadPhotoComponent extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.xqe = void 0),
			(this.RoleIdList = []),
			(this.n5i = (e, o) => {
				var t = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(e.Id),
					i = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(o.Id);
				return (void 0 !== t && void 0 !== i) || (void 0 === t && void 0 === i)
					? e.Id - o.Id
					: void 0 === i
						? -1
						: 1;
			}),
			(this.p4t = () => {
				PersonalController_1.PersonalController.SendChangeHeadPhotoRequest(
					this.s5i,
				),
					UiManager_1.UiManager.CloseView("PersonalEditView"),
					UiManager_1.UiManager.CloseView("PersonalOptionView");
			}),
			(this.J4i = () => {
				var e = new PersonalRoleSmallItemGrid_1.PersonalRoleSmallItemGrid();
				return e.BindToggleClickCallBack(this.a5i), e;
			}),
			(this.a5i = (e) => {
				this.h5i(e);
			});
	}
	get s5i() {
		var e = this.xqe.GetGenericLayout().GetSelectedGridIndex();
		return e < 0 || e >= this.RoleIdList.length ? 0 : this.RoleIdList[e];
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIScrollViewWithScrollbarComponent],
			[1, UE.UITexture],
			[2, UE.UIButtonComponent],
			[3, UE.UIText],
			[4, UE.UIInteractionGroup],
		]),
			(this.BtnBindInfo = [[2, this.p4t]]);
	}
	async OnBeforeStartAsync() {
		if (
			(this.InitRoleList(),
			(this.xqe = new GenericScrollViewNew_1.GenericScrollViewNew(
				this.GetScrollViewWithScrollbar(0),
				this.J4i,
			)),
			0 < this.RoleIdList.length)
		) {
			await this.xqe.RefreshByDataAsync(this.RoleIdList);
			const o = ModelManager_1.ModelManager.PersonalModel.GetHeadPhotoId();
			var e = this.RoleIdList.findIndex((e) => e === o);
			this.xqe.ScrollTo(this.xqe.GetItemByIndex(e)), this.h5i(o);
		}
		var o = this.RoleIdList.length;
		let t = 0;
		for (let e = 0; e < o; e++) {
			var i = this.RoleIdList[e];
			ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(i) && t++,
				LguiUtil_1.LguiUtil.SetLocalText(this.GetText(3), "Collected", t);
		}
	}
	InitRoleList() {
		var e = ConfigCommon_1.ConfigCommon.ToList(
				ConfigManager_1.ConfigManager.RoleConfig.GetRoleListByType(1),
			),
			o = (e.sort(this.n5i), e.length);
		this.RoleIdList = [];
		for (let i = 0; i < o; i++) {
			var t = e[i];
			t.IsTrial ||
				(ModelManager_1.ModelManager.RoleModel.IsMainRole(t.Id) &&
					ModelManager_1.ModelManager.RoleModel.GetCurSelectMainRoleId() !==
						t.Id) ||
				this.RoleIdList.push(t.Id);
		}
	}
	h5i(e) {
		var o = this.RoleIdList.findIndex((o) => o === e),
			t =
				((o =
					(this.xqe?.GetGenericLayout()?.SelectGridProxy(o),
					ModelManager_1.ModelManager.PersonalModel.GetHeadPhotoId())),
				void 0 !==
					ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(e));
		this.GetInteractionGroup(4).SetInteractable(t && o !== e),
			this.RefreshHeadPhotoInfo(e);
	}
	RefreshHeadPhotoInfo(e) {
		var o = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e);
		this.SetRoleIcon(o.RoleHeadIconLarge, this.GetTexture(1), e);
	}
}
exports.PersonalHeadPhotoComponent = PersonalHeadPhotoComponent;
