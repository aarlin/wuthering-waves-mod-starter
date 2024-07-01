"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoleBreachSuccessView = void 0);
const UE = require("ue"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
	UiSceneManager_1 = require("../../UiComponent/UiSceneManager"),
	GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
	RoleController_1 = require("../RoleController"),
	StarItem_1 = require("../View/StarItem");
class RoleBreachSuccessView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.zke = 0),
			(this.SuccessStarItem = void 0),
			(this.StarLayout = void 0),
			(this.StarList = []),
			(this.MaskClick = () => {
				RoleController_1.RoleController.SendRoleLevelUpViewRequestWithOpenView(
					this.zke,
					"RoleBreachSuccessView",
				);
			}),
			(this.sAt = () => new StarItem_1.StarItem());
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[1, UE.UIButtonComponent],
			[0, UE.UIHorizontalLayout],
			[2, UE.UIText],
			[3, UE.UIText],
		]),
			(this.BtnBindInfo = [[1, this.MaskClick]]);
	}
	async OnBeforeStartAsync() {
		this.zke = this.OpenParam;
		var e = (r = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(
				this.zke,
			).GetLevelData()).GetBreachLevel(),
			t = r.GetMaxBreachLevel(),
			a = r.GetLevel(),
			r = r.GetCurrentMaxLevel();
		this.GetText(2).SetText(a.toString()),
			this.GetText(3).SetText(r.toString()),
			(this.StarLayout = new GenericLayout_1.GenericLayout(
				this.GetHorizontalLayout(0),
				this.sAt,
			)),
			await this.UpdateStar(e, t);
	}
	OnHandleLoadScene() {
		UiSceneManager_1.UiSceneManager.ShowRoleSystemRoleActor();
		var e = UiSceneManager_1.UiSceneManager.GetRoleSystemRoleActor();
		e && e.Model?.CheckGetComponent(1)?.SetTransformByTag("RoleCase"),
			RoleController_1.RoleController.PlayRoleMontage(3, !0);
	}
	OnAfterPlayStartSequence() {
		this.SuccessStarItem?.PlayActiveSequence();
	}
	async UpdateStar(e, t) {
		var a = e - 1;
		if (!(a < 0)) {
			var r = new Array(t);
			for (let e = 0; e < t; ++e) {
				var o = {
					StarOnActive: e < a,
					StarOffActive: e >= a,
					StarNextActive: !1,
					StarLoopActive: !1,
					PlayLoopSequence: !1,
					PlayActivateSequence: !1,
				};
				r[e] = o;
			}
			await this.StarLayout.RefreshByDataAsync(r),
				(this.SuccessStarItem = this.StarLayout.GetLayoutItemByIndex(a));
		}
	}
}
exports.RoleBreachSuccessView = RoleBreachSuccessView;
