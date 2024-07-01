"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CookRoleView = void 0);
const UE = require("ue"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView"),
	CookRoleItem_1 = require("./CookRoleItem");
class CookRoleView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.sGt = void 0),
			(this.aGt = void 0),
			(this.gIt = 0),
			(this.hGt = 0),
			(this.z9e = () => {
				var e = new CookRoleItem_1.CookRoleItem();
				return e.BindOnClickedCallback(this.lGt), e;
			}),
			(this._Gt = () => {
				(this.aGt =
					ModelManager_1.ModelManager.CookModel.GetCookRoleItemDataList(
						this.gIt,
					)),
					this.sGt.ReloadData(this.aGt),
					this.uGt();
			}),
			(this.lGt = (e) => {
				this.hGt = e;
				let t = 0;
				for (
					this.sGt.DeselectCurrentGridProxy();
					t < this.aGt.length && e !== this.aGt[t].RoleId;
					t++
				);
				this.sGt.SelectGridProxy(t), this.sGt.RefreshGridProxy(t);
			}),
			(this.dIt = () => {
				(ModelManager_1.ModelManager.CookModel.CurrentCookRoleId = this.hGt),
					this.CloseMe(),
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.CloseCookRole,
					);
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UILoopScrollViewComponent],
			[1, UE.UIItem],
			[2, UE.UIButtonComponent],
			[3, UE.UIText],
		]),
			(this.BtnBindInfo = [[2, this.dIt]]);
	}
	OnBeforeDestroy() {
		this.sGt && (this.sGt.ClearGridProxies(), (this.sGt = void 0));
	}
	OnStart() {
		(this.sGt = new LoopScrollView_1.LoopScrollView(
			this.GetLoopScrollViewComponent(0),
			this.GetItem(1).GetOwner(),
			this.z9e,
		)),
			LguiUtil_1.LguiUtil.SetLocalText(
				this.GetText(3),
				"CookSelectRoleButtonText",
			);
		var e = this.OpenParam;
		this.ShowView(e);
	}
	OnBeforeShow() {
		this.ChildPopView?.PopItem?.SetTexBgVisible(!1);
	}
	HideView(e) {
		this.SetActive(!e);
	}
	ShowView(e) {
		this.SetActive(!0),
			(ModelManager_1.ModelManager.CookModel.CurrentCookViewType = 2),
			(this.gIt = e),
			(this.hGt = ModelManager_1.ModelManager.CookModel.CurrentCookRoleId),
			this._Gt();
	}
	uGt() {
		let e = 0;
		for (
			this.sGt.DeselectCurrentGridProxy();
			e < this.aGt.length && this.hGt !== this.aGt[e].RoleId;
			e++
		);
		this.sGt.ScrollToGridIndex(e), this.sGt.SelectGridProxy(e);
	}
}
exports.CookRoleView = CookRoleView;
