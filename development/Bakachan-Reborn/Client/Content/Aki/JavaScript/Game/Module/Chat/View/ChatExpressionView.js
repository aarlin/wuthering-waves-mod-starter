"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ChatExpressionView = void 0);
const UE = require("ue"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
	UiManager_1 = require("../../../Ui/UiManager"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView"),
	ChatExpressionGroupItem_1 = require("./ChatExpressionGroupItem"),
	ChatExpressionItem_1 = require("./ChatExpressionItem");
class ChatExpressionView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.$9e = void 0),
			(this.JMt = new Map()),
			(this.zMt = void 0),
			(this.z9e = () => {
				var e = new ChatExpressionItem_1.ChatExpressionItem();
				return e.BindOnClicked(this.ZMt), e;
			}),
			(this.eSt = (e) => {
				this.tSt(e);
			}),
			(this.ZMt = (e) => {
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.OnSelectExpression,
					e,
				),
					UiManager_1.UiManager.CloseView("ChatExpressionView");
			}),
			(this.iSt = () => {
				UiManager_1.UiManager.CloseView("ChatExpressionView");
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIItem],
			[2, UE.UIItem],
			[3, UE.UILoopScrollViewComponent],
			[4, UE.UIItem],
			[5, UE.UIButtonComponent],
		]),
			(this.BtnBindInfo = [[5, this.iSt]]);
	}
	OnStart() {
		var e = this.GetItem(1),
			t = this.GetItem(0),
			i = t.GetOwner();
		(this.$9e = new LoopScrollView_1.LoopScrollView(
			this.GetLoopScrollViewComponent(3),
			i,
			this.z9e,
		)),
			t.SetUIActive(!1),
			e.SetUIActive(!1),
			this.bl();
	}
	OnBeforeDestroy() {
		this.oSt(), this.JMt.clear(), (this.zMt = void 0), (this.$9e = void 0);
	}
	bl() {
		if (
			(this.oSt(),
			(e =
				ConfigManager_1.ConfigManager.ChatConfig.GetAllExpressionGroupConfig()))
		) {
			for (const t of e) this.rSt(t);
			var e;
			(e = e[0]) && ((e = e?.Id), this.tSt(e));
		}
	}
	tSt(e) {
		this.zMt && this.zMt.SetState(0);
		var t =
			((t = this.nSt(e)).SetState(1),
			(this.zMt = t),
			ConfigManager_1.ConfigManager.ChatConfig.GetAllExpressionConfigByGroupId(
				e,
			));
		this.$9e.ReloadData(t);
	}
	rSt(e) {
		var t = this.GetItem(1).GetOwner();
		t = LguiUtil_1.LguiUtil.DuplicateActor(t, this.GetItem(4));
		(t = new ChatExpressionGroupItem_1.ChatExpressionGroupItem(t)).Refresh(e),
			t.SetState(0),
			t.BindOnClicked(this.eSt),
			t.SetActive(!0),
			this.JMt.set(e.Id, t);
	}
	nSt(e) {
		return this.JMt.get(e);
	}
	oSt() {
		for (const e of this.JMt.values()) e.Destroy();
	}
}
exports.ChatExpressionView = ChatExpressionView;
