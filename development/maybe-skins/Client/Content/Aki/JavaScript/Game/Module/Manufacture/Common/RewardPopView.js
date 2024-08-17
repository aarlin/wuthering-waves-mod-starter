"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RewardPopView = void 0);
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
	CommonManager_1 = require("./CommonManager"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder");
class RewardPopView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.Kyi = void 0),
			(this.Yqt = void 0),
			(this.S9 = 0),
			(this.InitCommonPopItem = (e, t, i) => (
				(t = new RewardPopItem(t)).Update(e), { Key: i, Value: t }
			)),
			(this.mIt = () => {
				this.Jqt();
			}),
			(this.zqt = () => {
				this.Jqt();
			}),
			(this.dIt = () => {
				CommonManager_1.CommonManager.SendFixToolRequest(), this.Jqt();
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
		var e = this.OpenParam;
		(this.S9 = e.RewardPopType),
			(this.Kyi = new GenericScrollView_1.GenericScrollView(
				this.GetScrollViewWithScrollbar(1),
				this.InitCommonPopItem,
			)),
			this.GetItem(2).SetUIActive(0 === this.S9 || 3 === this.S9),
			this.GetItem(4).SetUIActive(0 === this.S9),
			(e =
				1 === this.S9 || CommonManager_1.CommonManager.CheckCanShowExpItem());
		this.GetItem(7).SetUIActive(e),
			e && (this.Yqt = new ExpItem(this.GetItem(7))),
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
		this.Kyi && (this.Kyi.ClearChildren(), (this.Kyi = void 0)),
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
				break;
			case 2:
				break;
			case 4:
				CommonManager_1.CommonManager.CheckCanShowExpItem() && this.rGt();
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
				break;
			case 4:
				LguiUtil_1.LguiUtil.SetLocalText(this.GetText(0), "ComposeSuccess");
				break;
			case 5:
				LguiUtil_1.LguiUtil.SetLocalText(this.GetText(0), "ForgingSuccess");
		}
	}
	tGt() {
		if (0 === this.S9) {
			var e = new Array();
			for (const i of ConfigManager_1.ConfigManager.CookConfig.GetCookFixToolById(
				CommonManager_1.CommonManager.GetCurrentFixId(),
			).Items) {
				var t =
					ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
						i[0],
					);
				e.push({ ItemId: i[0], ItemNum: t });
			}
			this.Kyi.RefreshByData(e);
		} else
			this.Kyi.RefreshByData(CommonManager_1.CommonManager.GetCommonItemList());
	}
	iGt() {
		if (0 === this.S9) {
			var e = ConfigManager_1.ConfigManager.CookConfig.GetCookFixToolById(
					CommonManager_1.CommonManager.GetCurrentFixId(),
				),
				t = ConfigManager_1.ConfigManager.CookConfig.GetLocalText(
					e.Description,
				);
			let o = 0,
				n = "";
			for (const t of e.Items) {
				o = t[1];
				var i = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(t[0]);
				n = ConfigManager_1.ConfigManager.CookConfig.GetLocalText(i.Name);
			}
			LguiUtil_1.LguiUtil.SetLocalText(this.GetText(3), "FixText", o, n, t);
		} else
			LguiUtil_1.LguiUtil.SetLocalText(this.GetText(3), "MaciningStudyFail");
	}
	rGt() {
		var e = CommonManager_1.CommonManager.GetSumExpByLevel(
				CommonManager_1.CommonManager.GetCurrentRewardLevel(),
			),
			t = CommonManager_1.CommonManager.GetCurrentRewardTotalProficiency();
		this.Yqt.SetExpSprite(t, e),
			this.Yqt.SetAddText(
				CommonManager_1.CommonManager.GetCurrentRewardAddExp(),
			),
			this.Yqt.SetLastText(t),
			this.Yqt.SetSumText(e);
	}
	oGt() {
		var e = this.GetButton(6)
				.GetOwner()
				.GetComponentByClass(UE.UIInteractionGroup.StaticClass()),
			t = CommonManager_1.CommonManager.CheckCanFix();
		e.SetInteractable(t),
			this.GetButton(9).GetOwner().GetUIItem().SetUIActive(!t);
	}
	Jqt() {
		switch (this.S9) {
			case 0:
				UiManager_1.UiManager.CloseView("CookPopFixView");
				break;
			case 4:
			case 5:
				UiManager_1.UiManager.CloseView("RewardPopView");
				break;
			default:
				UiManager_1.UiManager.CloseView("CookPopView");
		}
	}
}
exports.RewardPopView = RewardPopView;
class RewardPopItem extends UiPanelBase_1.UiPanelBase {
	constructor(e) {
		super(),
			(this.dqt = void 0),
			(this.Kyt = () => {
				ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
					this.dqt.ItemId,
				);
			}),
			this.CreateThenShowByActor(e.GetOwner());
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
	Update(e) {
		(this.dqt = e), this.Dnt(), this._xt(), this.GIt();
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
	constructor(e) {
		super(), this.CreateThenShowByActor(e.GetOwner());
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UISprite],
			[1, UE.UIText],
			[2, UE.UIText],
			[3, UE.UIText],
		];
	}
	SetExpSprite(e, t) {
		(e = 1 < (e = MathUtils_1.MathUtils.GetFloatPointFloor(e / t, 3)) ? 1 : e),
			this.GetSprite(0).SetFillAmount(e);
	}
	SetAddText(e) {
		this.GetText(1).SetText(e.toString());
	}
	SetLastText(e) {
		this.GetText(2).SetText(e.toString());
	}
	SetSumText(e) {
		this.GetText(3).SetText(e.toString());
	}
}
