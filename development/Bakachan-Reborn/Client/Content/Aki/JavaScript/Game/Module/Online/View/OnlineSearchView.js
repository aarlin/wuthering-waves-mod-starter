"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.OnlineSearchView = void 0);
const puerts_1 = require("puerts"),
	UE = require("ue"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase"),
	LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView"),
	OnlineController_1 = require("../OnlineController"),
	OnlineHallItem_1 = require("./OnlineHallItem"),
	ButtonAndSpriteItem_1 = require("../../Common/Button/ButtonAndSpriteItem"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder");
class OnlineSearchView extends UiTickViewBase_1.UiTickViewBase {
	constructor() {
		super(...arguments),
			(this.s8t = void 0),
			(this.a8t = void 0),
			(this.sNi = () => {
				this.u6t();
			}),
			(this.oNi = () => new OnlineHallItem_1.OnlineHallItem(this.Info.Name)),
			(this.aNi = () => {
				var e,
					t,
					n = this.GetInputText(0);
				"" === n.GetText()
					? ((t = ("", puerts_1.$ref)("")),
						UE.LGUIBPLibrary.ClipBoardPaste(t),
						(e = (0, puerts_1.$unref)(t)),
						n.SetText(e))
					: n.SetText(""),
					this.h8t();
			}),
			(this.h8t = () => {
				"" === this.GetInputText(0).GetText()
					? this.a8t.RefreshSprite("SP_Paste")
					: this.a8t.RefreshSprite("SP_Clear");
			}),
			(this.l8t = () => {
				var e = this.GetInputText(0).GetText();
				0 < e.length
					? OnlineController_1.OnlineController.LobbyQueryPlayersRequest(
							Number(e),
						)
					: ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
							"OnlineInvalidUserId",
						);
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UITextInputComponent],
			[1, UE.UIItem],
			[2, UE.UIButtonComponent],
			[3, UE.UILoopScrollViewComponent],
			[4, UE.UIItem],
			[5, UE.UIItem],
		]),
			(this.BtnBindInfo = [[2, this.l8t]]);
	}
	OnStart() {
		(this.a8t = new ButtonAndSpriteItem_1.ButtonAndSpriteItem(this.GetItem(1))),
			this.a8t.BindCallback(this.aNi);
		var e = this.GetItem(4);
		(this.s8t = new LoopScrollView_1.LoopScrollView(
			this.GetLoopScrollViewComponent(3),
			e.GetOwner(),
			this.oNi,
		)),
			this.GetInputText(0).OnTextChange.Bind(this.h8t),
			this.u6t();
	}
	OnBeforeDestroy() {
		ModelManager_1.ModelManager.OnlineModel.CleanSearchResultList(),
			this.GetInputText(0).OnTextChange.Unbind();
	}
	OnAddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnSearchWorld,
			this.sNi,
		);
	}
	OnRemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnSearchWorld,
			this.sNi,
		);
	}
	u6t() {
		this.s8t.ReloadData(ModelManager_1.ModelManager.OnlineModel.SearchResult),
			this.d8t();
	}
	d8t() {
		this.h8t(),
			this.GetItem(5).SetUIActive(
				ModelManager_1.ModelManager.OnlineModel.SearchResult.length <= 0,
			);
	}
}
exports.OnlineSearchView = OnlineSearchView;
