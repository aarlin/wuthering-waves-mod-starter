"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CookPopView = void 0);
const UE = require("ue"),
	MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
	UiManager_1 = require("../../../Ui/UiManager"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	GenericScrollView_1 = require("../../Util/ScrollView/GenericScrollView"),
	CookController_1 = require("../CookController"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder");
class CookPopView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.$qt = void 0),
			(this.Yqt = void 0),
			(this.S9 = 0),
			(this.InitCookPopItem = (t, e, o) => (
				(e = new CookPopItem(e)).Update(t), { Key: o, Value: e }
			)),
			(this.mIt = () => {
				this.Jqt();
			}),
			(this.zqt = () => {
				this.Jqt();
			}),
			(this.dIt = () => {
				CookController_1.CookController.SendFixToolRequest(
					CookController_1.CookController.GetCurrentFixId(),
					CookController_1.CookController.GetCurrentEntityId(),
				),
					this.Jqt();
			}),
			(this.Zqt = () => {
				this.Jqt();
			}),
			(this.eGt = () => {
				ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
					"MaterialShort",
				);
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIScrollViewWithScrollbarComponent],
			[2, UE.UIItem],
			[3, UE.UIText],
			[4, UE.UIItem],
			[5, UE.UIButtonComponent],
			[6, UE.UIButtonComponent],
			[7, UE.UIItem],
			[8, UE.UIButtonComponent],
			[9, UE.UIButtonComponent],
		]),
			(this.BtnBindInfo = [
				[5, this.zqt],
				[6, this.dIt],
				[8, this.Zqt],
				[9, this.eGt],
			]);
	}
	OnStart() {
		this.ChildPopView?.PopItem.OverrideBackBtnCallBack(this.mIt);
		var t = this.OpenParam;
		(this.S9 = t.CookRewardPopType),
			(this.$qt = new GenericScrollView_1.GenericScrollView(
				this.GetScrollViewWithScrollbar(1),
				this.InitCookPopItem,
			)),
			this.GetItem(2).SetUIActive(0 === this.S9 || 3 === this.S9),
			this.GetItem(4).SetUIActive(0 === this.S9),
			(t =
				1 === this.S9 && CookController_1.CookController.CheckCanShowExpItem());
		this.GetItem(7).SetUIActive(t),
			1 === this.S9 && (this.Yqt = new ExpItem(this.GetItem(7))),
			this.GetButton(8)
				.GetOwner()
				.GetUIItem()
				.SetUIActive(0 !== this.S9);
	}
	OnAddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.FixSuccess,
			this.mIt,
		);
	}
	OnRemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.FixSuccess,
			this.mIt,
		);
	}
	OnBeforeDestroy() {
		this.$qt && (this.$qt.ClearChildren(), (this.$qt = void 0)),
			this.Yqt && (this.Yqt.Destroy(), (this.Yqt = void 0));
	}
	OnAfterShow() {
		switch ((this.ILt(), this.tGt(), this.S9)) {
			case 0:
				this.iGt(), this.oGt();
				break;
			case 1:
				this.rGt();
				break;
			case 3:
				this.iGt();
		}
	}
	ILt() {
		switch (this.S9) {
			case 0:
				LguiUtil_1.LguiUtil.SetLocalText(this.GetText(0), "UnlockTitle");
				break;
			case 1:
			case 2:
				LguiUtil_1.LguiUtil.SetLocalText(this.GetText(0), "GetItem");
				break;
			case 3:
				LguiUtil_1.LguiUtil.SetLocalText(this.GetText(0), "StudyFail");
		}
	}
	tGt() {
		if (0 === this.S9) {
			var t = new Array();
			for (const o of ConfigManager_1.ConfigManager.CookConfig.GetCookFixToolById(
				CookController_1.CookController.GetCurrentFixId(),
			).Items) {
				var e =
					ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
						o[0],
					);
				t.push({ ItemId: o[0], ItemNum: e });
			}
			this.$qt.RefreshByData(t);
		} else
			this.$qt.RefreshByData(
				ModelManager_1.ModelManager.CookModel.GetCookItemList(),
			);
	}
	iGt() {
		if (0 === this.S9) {
			var t = ConfigManager_1.ConfigManager.CookConfig.GetCookFixToolById(
					CookController_1.CookController.GetCurrentFixId(),
				),
				e = ConfigManager_1.ConfigManager.CookConfig.GetLocalText(
					t.Description,
				);
			let i = 0,
				r = "";
			for (const e of t.Items) {
				i = e[1];
				var o = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(e[0]);
				r = ConfigManager_1.ConfigManager.CookConfig.GetLocalText(o.Name);
			}
			LguiUtil_1.LguiUtil.SetLocalText(this.GetText(3), "FixText", i, r, e);
		} else
			LguiUtil_1.LguiUtil.SetLocalText(this.GetText(3), "MaciningStudyFail");
	}
	rGt() {
		var t = ModelManager_1.ModelManager.CookModel.GetCookerInfo(),
			e = ModelManager_1.ModelManager.CookModel.GetSumExpByLevel(
				ModelManager_1.ModelManager.CookModel.GetCookerInfo().CookingLevel,
			);
		this.Yqt.SetExpSprite(t.TotalProficiencys, e),
			this.Yqt.SetAddText(t.AddExp),
			this.Yqt.SetLastText(t.TotalProficiencys),
			this.Yqt.SetSumText(e);
	}
	oGt() {
		var t = this.GetButton(6)
				.GetOwner()
				.GetComponentByClass(UE.UIInteractionGroup.StaticClass()),
			e = CookController_1.CookController.CheckCanFix();
		t.SetInteractable(e),
			this.GetButton(9).GetOwner().GetUIItem().SetUIActive(!e);
	}
	Jqt() {
		0 === this.S9
			? UiManager_1.UiManager.CloseView("CookPopFixView")
			: UiManager_1.UiManager.CloseView("CookPopView");
	}
}
exports.CookPopView = CookPopView;
class CookPopItem extends UiPanelBase_1.UiPanelBase {
	constructor(t) {
		super(),
			(this.dqt = void 0),
			(this.Kyt = () => {
				ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
					this.dqt.ItemId,
				);
			}),
			this.CreateThenShowByActor(t.GetOwner());
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[4, UE.UITexture],
			[5, UE.UISprite],
			[8, UE.UIText],
			[9, UE.UIButtonComponent],
		]),
			(this.BtnBindInfo = [[9, this.Kyt]]);
	}
	Update(t) {
		(this.dqt = t), this.Dnt(), this._xt(), this.GIt();
	}
	Dnt() {
		this.SetItemIcon(this.GetTexture(4), this.dqt.ItemId);
	}
	_xt() {
		this.SetItemQualityIcon(this.GetSprite(5), this.dqt.ItemId);
	}
	GIt() {
		this.GetText(8).SetText(this.dqt.ItemNum.toString());
	}
}
class ExpItem extends UiPanelBase_1.UiPanelBase {
	constructor(t) {
		super(), this.CreateThenShowByActor(t.GetOwner());
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UISprite],
			[1, UE.UIText],
			[2, UE.UIText],
			[3, UE.UIText],
		];
	}
	SetExpSprite(t, e) {
		(t = 1 < (t = MathUtils_1.MathUtils.GetFloatPointFloor(t / e, 3)) ? 1 : t),
			this.GetSprite(0).SetFillAmount(t);
	}
	SetAddText(t) {
		this.GetText(1).SetText(t.toString());
	}
	SetLastText(t) {
		this.GetText(2).SetText(t.toString());
	}
	SetSumText(t) {
		this.GetText(3).SetText(t.toString());
	}
}
