"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PhantomSelectView = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiActorPool_1 = require("../../../Ui/UiActorPool"),
	UiManager_1 = require("../../../Ui/UiManager"),
	ButtonItem_1 = require("../../Common/Button/ButtonItem"),
	GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
	RoguelikeDefine_1 = require("../Define/RoguelikeDefine"),
	RogueSelectResult_1 = require("../Define/RogueSelectResult"),
	RoguelikeController_1 = require("../RoguelikeController"),
	ElementPanel_1 = require("./ElementPanel"),
	PhantomSelectItem_1 = require("./PhantomSelectItem"),
	RogueSelectBaseView_1 = require("./RogueSelectBaseView"),
	TopPanel_1 = require("./TopPanel");
class PhantomSelectView extends RogueSelectBaseView_1.RogueSelectBaseView {
	constructor() {
		super(...arguments),
			(this.RoguelikeChooseData = void 0),
			(this.TopPanel = void 0),
			(this.ElementPanel = void 0),
			(this.ButtonItem = void 0),
			(this.PhantomSelectItemLayout = void 0),
			(this.IsShowChooseTips = !1),
			(this.ConfirmBtn = () => {
				var e = this.GetCommonSelectItem();
				e
					? ((ModelManager_1.ModelManager.RoguelikeModel.CurrentRogueGainEntry =
							e.RogueGainEntry),
						RoguelikeController_1.RoguelikeController.RogueChooseDataResultRequest(
							1,
						))
					: Log_1.Log.CheckError() &&
						Log_1.Log.Error("Roguelike", 9, "当前没有选中的声骸");
			}),
			(this.RefreshBtnEnableClick = (e) => {
				if (void 0 !== e)
					for (const t of this.PhantomSelectItemLayout.GetLayoutItemList())
						t.RogueGainEntry?.ConfigId !== e && t.SetToggleUnChecked();
				const t = this.GetCommonSelectItem();
				this.ButtonItem.SetEnableClick(void 0 !== t);
			}),
			(this.CreatePhantomSelectItem = () => {
				var e = new PhantomSelectItem_1.PhantomSelectItem();
				return e.SetToggleStateChangeCallback(this.RefreshBtnEnableClick), e;
			}),
			(this.RoguelikeChooseDataResult = (e, t, o, n) => {
				o &&
					n === this.RoguelikeChooseData?.Index &&
					(this.IsShowChooseTips
						? ((o = this.GetCommonSelectItem()),
							UiManager_1.UiManager.CloseAndOpenView(
								this.Info.Name,
								"RoguePhantomSelectResultView",
								new RogueSelectResult_1.RogueSelectResult(
									e,
									t,
									o?.RogueGainEntry,
								),
							))
						: UiManager_1.UiManager.CloseView(this.Info.Name));
			}),
			(this.OnDescModelChange = () => {
				this.bl();
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIHorizontalLayout],
			[2, UE.UIButtonComponent],
			[3, UE.UIItem],
		]),
			"RoguePhantomReplaceView" === this.Info.Name &&
				(this.ComponentRegisterInfos.push([4, UE.UIText]),
				this.ComponentRegisterInfos.push([5, UE.UIText]),
				this.ComponentRegisterInfos.push([6, UE.UIItem]));
	}
	GetCommonSelectItem() {
		for (const e of this.PhantomSelectItemLayout.GetLayoutItemList())
			if (e.IsSelect()) return e;
	}
	async OnCreateAsync() {
		var e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
			RoguelikeDefine_1.PHANTOM_SELECT_ITEM,
		);
		this.UiPoolActorPrivate = await UiActorPool_1.UiActorPool.GetAsync(e);
	}
	async OnBeforeStartAsync() {
		(this.ElementPanel = new ElementPanel_1.ElementPanel()),
			await this.ElementPanel.CreateThenShowByActorAsync(
				this.GetItem(3).GetOwner(),
			),
			(this.TopPanel = new TopPanel_1.TopPanel()),
			await this.TopPanel.CreateThenShowByActorAsync(
				this.GetItem(0).GetOwner(),
			);
	}
	OnStart() {
		this.UiPoolActorPrivate.UiItem.SetUIParent(
			this.GetHorizontalLayout(1).GetRootComponent(),
		),
			(ModelManager_1.ModelManager.RoguelikeModel.CurrentRogueGainEntry =
				void 0),
			(this.RoguelikeChooseData = this.OpenParam),
			(this.TopPanel.CloseCallback = this.CloseMySelf),
			(this.ButtonItem = new ButtonItem_1.ButtonItem(
				this.GetButton(2).GetRootComponent(),
			)),
			this.ButtonItem.SetFunction(this.ConfirmBtn),
			(this.PhantomSelectItemLayout = new GenericLayout_1.GenericLayout(
				this.GetHorizontalLayout(1),
				this.CreatePhantomSelectItem,
			));
	}
	OnBeforeDestroy() {
		this.TopPanel.Destroy(),
			this.ElementPanel.Destroy(),
			this.RecycleUiPoolActor();
	}
	OnBeforeShow() {
		this.bl();
	}
	bl() {
		this.RefreshPhantomSelectItemList(),
			this.RefreshTopPanel(),
			this.RefreshElementPanel(),
			this.RefreshBtnText(),
			this.RefreshBtnEnableClick(),
			this.Pao();
	}
	RefreshTopPanel() {
		this.TopPanel.RefreshTitle(RoguelikeDefine_1.ROGUELIKEVIEW_5_TEXT),
			this.TopPanel.RefreshSelectTipsText(
				RoguelikeDefine_1.ROGUELIKEVIEW_6_TEXT,
			);
	}
	RefreshElementPanel() {
		this.ElementPanel.Refresh();
	}
	RefreshPhantomSelectItemList() {
		this.PhantomSelectItemLayout.RefreshByData(
			this.RoguelikeChooseData.RogueGainEntryList ?? [],
		);
	}
	RefreshBtnText() {
		this.ButtonItem.SetShowText(RoguelikeDefine_1.ROGUELIKEVIEW_13_TEXT);
	}
	Pao() {
		"RoguePhantomReplaceView" === this.Info.Name &&
			(this.GetText(4).ShowTextNew(RoguelikeDefine_1.ROGUELIKEVIEW_22_TEXT),
			this.GetText(5).ShowTextNew(RoguelikeDefine_1.ROGUELIKEVIEW_24_TEXT));
	}
	GetGuideUiItemAndUiItemForShowEx(e) {
		if (2 === e.length || isNaN(Number(e[0]))) {
			var t = Number(e[0]),
				o = this.PhantomSelectItemLayout?.GetItemByIndex(t);
			if (o) {
				if ("All" === e[1]) return [o, o];
				if (
					"Sub" === e[1] &&
					((o =
						this.PhantomSelectItemLayout.GetLayoutItemByIndex(t)?.GetSubItem()),
					o)
				)
					return [o, o];
			}
		} else
			Log_1.Log.CheckError() &&
				Log_1.Log.Error("Guide", 54, "聚焦引导extraParam项配置有误", [
					"configParams",
					e,
				]);
	}
}
exports.PhantomSelectView = PhantomSelectView;
