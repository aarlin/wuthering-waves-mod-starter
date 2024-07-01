"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BattlePassTaskView = void 0);
const UE = require("ue"),
	CommonDefine_1 = require("../../../../../Core/Define/CommonDefine"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	UiTabViewBase_1 = require("../../../../Ui/Base/UiTabViewBase"),
	ConfirmBoxDefine_1 = require("../../../ConfirmBox/ConfirmBoxDefine"),
	GenericLayout_1 = require("../../../Util/Layout/GenericLayout"),
	LoopScrollView_1 = require("../../../Util/ScrollView/LoopScrollView"),
	BattlePassBackgroundPanel_1 = require("./BattlePassBackgroundPanel"),
	BattlePassTaskLoopItem_1 = require("./BattlePassTaskLoopItem"),
	BattlePassTaskTabItem_1 = require("./BattlePassTaskTabItem");
class BattlePassTaskView extends UiTabViewBase_1.UiTabViewBase {
	constructor() {
		super(...arguments),
			(this.NOe = CommonDefine_1.INVALID_VALUE),
			(this.vki = void 0),
			(this.Aki = void 0),
			(this.vkt = void 0),
			(this.Pki = []),
			(this.KVe = [1, 2, 0]),
			(this.xki = () => {
				this.wki();
			}),
			(this.Bki = (e) => {
				this.NOe !== CommonDefine_1.INVALID_VALUE &&
					((1 === this.KVe[this.NOe] || (2 === this.KVe[this.NOe] && e)) &&
						ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
							new ConfirmBoxDefine_1.ConfirmBoxDataNew(146),
						),
					this.wki());
			}),
			(this.Iki = () => new BattlePassTaskLoopItem_1.BattlePassTaskLoopItem()),
			(this.hPe = () => {
				var e = new BattlePassTaskTabItem_1.BattlePassTaskTabItem();
				return (
					e.SetSelectedCallBack(this.bki), e.SetCanExecuteChange(this.DTt), e
				);
			}),
			(this.bki = (e) => {
				var t;
				e !== this.NOe &&
					((t = this.NOe),
					(this.NOe = e),
					t !== CommonDefine_1.INVALID_VALUE &&
						(e = this.Aki.GetLayoutItemByIndex(t)) &&
						e.SetForceSwitch(0),
					this.wki());
			}),
			(this.DTt = (e) => this.NOe !== e);
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIVerticalLayout],
			[2, UE.UILoopScrollViewComponent],
			[3, UE.UIItem],
		];
	}
	async KLn() {
		this.vki = new BattlePassBackgroundPanel_1.BattlePassBackgroundPanel();
		var e = { IsRewardPanel: !1, WeaponObservers: this.ExtraParams };
		await this.vki.OnlyCreateByActorAsync(this.GetItem(0).GetOwner(), e),
			this.AddChild(this.vki);
	}
	async QLn() {
		(this.NOe = CommonDefine_1.INVALID_VALUE),
			(this.Aki = new GenericLayout_1.GenericLayout(
				this.GetVerticalLayout(1),
				this.hPe,
			)),
			await this.Aki.RefreshByDataAsync(this.KVe),
			(this.vkt = new LoopScrollView_1.LoopScrollView(
				this.GetLoopScrollViewComponent(2),
				this.GetItem(3).GetOwner(),
				this.Iki,
			)),
			this.SelectToggleByIndex(0, !0);
	}
	async OnBeforeStartAsync() {
		await Promise.all([this.KLn(), this.QLn()]);
	}
	OnAfterShow() {
		this.UiViewSequence?.PlaySequence("Switch"), this.wki();
	}
	SelectToggleByIndex(e, t = !1) {
		if (t) {
			const e = this.Aki.GetLayoutItemByIndex(this.NOe);
			e && e.SetForceSwitch(0), (this.NOe = CommonDefine_1.INVALID_VALUE);
		}
		const i = this.Aki.GetLayoutItemByIndex(e);
		i && i.SetForceSwitch(1, !0);
	}
	AddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.UpdateBattlePassTaskEvent,
			this.xki,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.ReceiveBattlePassTaskEvent,
				this.Bki,
			);
	}
	RemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.UpdateBattlePassTaskEvent,
			this.xki,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.ReceiveBattlePassTaskEvent,
				this.Bki,
			);
	}
	wki() {
		this.NOe !== CommonDefine_1.INVALID_VALUE &&
			(ModelManager_1.ModelManager.BattlePassModel.GetTaskList(
				this.KVe[this.NOe],
				this.Pki,
			),
			this.vkt.ReloadData(this.Pki));
	}
	OnBeforeDestroy() {
		this.vkt && (this.vkt.ClearGridProxies(), (this.vkt = void 0)),
			(this.Pki = []);
	}
}
exports.BattlePassTaskView = BattlePassTaskView;
